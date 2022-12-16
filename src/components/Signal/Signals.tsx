import { useEffect, useState, useLayoutEffect, useRef, useMemo } from 'react';
import xorBy from 'lodash/xorBy';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { useAppDispatch, useAppSelector } from '@core';
import { getSignals } from '@store';
import { LockScreen } from '@/components/UI/LockScreen/LockScreen';
import { Pagination, Select, Toast } from '@ui';
import { getPluralKey } from '@utils';
import { ISignal } from '@interface/Signal';

import { SignalCard } from '@c/Signal';
import { placeholderSignals } from './placeholderData';

export const Signals: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.signalState);
  const { userData, tariffActive } = useAppSelector((state) => state.userState);
  const [filter, setFilter] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);
  const [prevSignals, setPrevSignals] = useState<ISignal[] | null>(null);

  const viewLocked = !tariffActive;

  const { t, i18n } = useTranslation('signal');

  const selectOptions = useMemo(() => {
    return [
      { value: '', label: t('select.all') },
      { value: 'active', label: t('status.active') },
      { value: 'waiting', label: t('status.waiting') },
      { value: 'cancel', label: t('status.cancel') },
      { value: 'profit', label: t('status.profit') },
      { value: 'loss', label: t('status.loss') },
    ];
  }, [i18n.language]);

  const signalsWithFilter = useMemo(() => {
    if (viewLocked) {
      return placeholderSignals;
    }

    if (filter && data?.length) {
      return data.filter((elem: ISignal) => elem?.status?.toLowerCase().trim() === filter);
    }

    return data;
  }, [filter, data, viewLocked]);

  const winrate = useMemo(() => {
    if (data?.length) {
      const closedTrades = data?.filter((elem: ISignal) =>
        ['profit', 'loss'].includes(elem?.status?.toLowerCase().trim())
      );

      const profitTrades = data?.filter(
        (elem: ISignal) => elem?.status?.toLowerCase().trim() === 'profit'
      );

      if (profitTrades.length) {
        return Math.round((profitTrades.length / closedTrades.length) * 100);
      }
    }

    return null;
  }, [data]);

  const timerConfirm: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    if (userData?.allowed_functions.includes('Signal') && tariffActive) {
      dispatch(getSignals());

      timerConfirm.current = setInterval(() => {
        dispatch(getSignals());
      }, 1 * 60 * 1000);
    }

    return () => {
      clearInterval(timerConfirm.current as NodeJS.Timeout);
    };
  }, [userData?.allowed_functions[0], tariffActive]);

  useEffect(() => {
    const newSignals = xorBy(prevSignals, data, 'date');

    if (loaded && data?.length && newSignals.length) {
      const count = newSignals.length;
      const transKey = getPluralKey(count);
      Toast('info', t(`notify.new.${transKey}`, { count }));
    }

    if (data?.length) {
      setLoaded(true);
    }

    setPrevSignals(data);
  }, [data]);

  return (
    <div className={cns('recommend', viewLocked && 'recommend--locked')}>
      <div className="recommend__head">
        <div className="recommend__title">
          <div>{t('title')}</div>
          {winrate && (
            <div className="recommend__title-winrate">
              Winrate - <strong>{winrate}</strong>%
            </div>
          )}
        </div>

        <Select
          value={filter}
          placeholder={t('select.placeholder')}
          options={selectOptions}
          onSelect={(v) => setFilter(v.value as string)}
        />
      </div>

      <div className="recommend__table">
        <table>
          <thead>
            <tr>
              <th className="recommend__hide-mobile">{t('table.date')}</th>
              <th colSpan={2}>{t('table.name')}</th>
              <th className="recommend__table-center">{t('table.type')}</th>
              <th className="recommend__table-center">{t('table.status')}</th>
              <th className="recommend__table-center">{t('table.enter')}</th>
              <th className="recommend__table-center">{t('table.exit')}</th>
              <th className="recommend__table-center">{t('table.stop')}</th>
              <th className="recommend__table-center">{t('table.risk')}</th>
            </tr>
          </thead>

          <tbody>
            {signalsWithFilter?.map((x, idx) => (
              <SignalCard key={idx} signal={x} />
            ))}
          </tbody>
        </table>
      </div>

      {/* temp */}
      {viewLocked && <Pagination />}

      {viewLocked && <LockScreen section={t('lock')} textModifier={'big'} />}
    </div>
  );
};
