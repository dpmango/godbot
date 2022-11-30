import { useEffect, useState, useLayoutEffect, useRef, useMemo } from 'react';
import xorBy from 'lodash/xorBy';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@core';
import { getSignals } from '@store';
import { LockScreen } from '@/components/UI/LockScreen/LockScreen';
import { Pagination, Select } from '@ui';
import { ISignal } from '@interface/Signal';

import { SignalCard } from '@c/Signal';

export const Signals: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.signalState);
  const { userData, tariffActive } = useAppSelector((state) => state.userState);
  const [filter, setFilter] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);
  const [prevSignals, setPrevSignals] = useState<ISignal[] | null>(null);

  const { t } = useTranslation('signal');

  const selectOptions = useMemo(() => {
    return [
      { value: '', label: t('select.all') },
      { value: 'active', label: t('status.active') },
      { value: 'waiting', label: t('status.waiting') },
      { value: 'cancel', label: t('status.cancel') },
      { value: 'profit', label: t('status.profit') },
      { value: 'loss', label: t('status.loss') },
    ];
  }, []);

  const signalsWithFilter = useMemo(() => {
    if (filter && data?.length) {
      return data.filter((elem: ISignal) => elem?.status?.toLowerCase().trim() === filter);
    }

    return data;
  }, [filter, data]);

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
      toast.info(`Добавлено ${newSignals.length} новых сигналов`);
    }

    if (data?.length) {
      setLoaded(true);
    }

    setPrevSignals(data);
  }, [data]);

  return (
    <div className="recommend">
      <div className="recommend__head">
        <div className="recommend__title">{t('title')}</div>
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

      {/* <Pagination /> */}

      {(!userData?.tariff || !tariffActive) && (
        <LockScreen section={t('lock')} textModifier={'big'} />
      )}
    </div>
  );
};
