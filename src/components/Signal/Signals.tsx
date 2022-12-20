import { useEffect, useState, useLayoutEffect, useRef, useMemo, useCallback } from 'react';
import xorBy from 'lodash/xorBy';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { useAppDispatch, useAppSelector } from '@core';
import { getSignals } from '@store';
import { LockScreen } from '@/components/UI/LockScreen/LockScreen';
import { Pagination, Select, Toast } from '@ui';
import { useProfile } from '@hooks';
import { getPluralKey } from '@utils';
import { ISignal } from '@interface/Signal';

import { SignalCard } from '@c/Signal';
import { placeholderSignals } from './placeholderData';
import audioNotify from '@assets/audio/notify.mp3';

export const Signals: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { data, metadata } = useAppSelector((state) => state.signalState);
  const { tariffActive } = useAppSelector((state) => state.userState);
  const [filter, setFilter] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);
  const [prevSignals, setPrevSignals] = useState<ISignal[] | null>(null);

  const { allowedFunctions } = useProfile();
  const { t, i18n } = useTranslation('signal');

  const viewLocked = !tariffActive;

  const selectOptions = useMemo(() => {
    return [
      { value: '', label: t('select.all') },
      { value: 'ACTIVE', label: t('status.active') },
      { value: 'WAITING', label: t('status.waiting') },
      { value: 'CANCEL', label: t('status.cancel') },
      { value: 'PROFIT', label: t('status.profit') },
      { value: 'LOSS', label: t('status.loss') },
    ];
  }, [i18n.language]);

  const displaySignals = useMemo(() => {
    if (viewLocked) {
      return placeholderSignals;
    }

    return data;
  }, [data, viewLocked]);

  const requestSignals = useCallback(
    (page?: number) => {
      // получить по целевой странице либо текущая с метаданных
      dispatch(getSignals({ status: filter, page: page || metadata?.current_page }));
    },
    [filter, metadata?.current_page]
  );

  const timerConfirm: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    if (allowedFunctions.signal) {
      requestSignals();

      timerConfirm.current = setInterval(() => {
        requestSignals();
      }, 1 * 60 * 1000);
    }

    return () => {
      clearInterval(timerConfirm.current as NodeJS.Timeout);
    };
  }, [allowedFunctions.signal, requestSignals]);

  useEffect(() => {
    requestSignals();
  }, [filter]);

  useEffect(() => {
    // const newSignals = xorBy(prevSignals, data, 'date');
    // if (loaded && data?.length && newSignals.length) {
    //   const count = newSignals.length;
    //   const transKey = getPluralKey(count);
    //   Toast('info', t(`notify.new.${transKey}`, { count }));
    //   const notify = new Audio(audioNotify);
    //   notify.play();
    // }
    // if (data?.length) {
    //   setLoaded(true);
    // }
    // setPrevSignals(data);
  }, [data]);

  return (
    <div className={cns('recommend', viewLocked && 'recommend--locked')}>
      <div className="recommend__head">
        <div className="recommend__title">
          <div>{t('title')}</div>
          {metadata?.winrate && (
            <div className="recommend__title-winrate">
              Winrate - <strong>{metadata?.winrate}</strong>
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

      {data?.length === 0 && <div className="recommend__empty-text">Не найдено сигналов</div>}

      {(data?.length || viewLocked) && (
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
              {displaySignals?.map((x, idx) => (
                <SignalCard key={idx} signal={x} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {metadata && (
        <Pagination
          page={metadata?.current_page}
          count={metadata?.total}
          limit={metadata?.paginated_by}
          onChange={requestSignals}
        />
      )}

      {viewLocked && <LockScreen section={t('lock')} textModifier={'big'} />}
    </div>
  );
};
