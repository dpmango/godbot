import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import xorBy from 'lodash/xorBy';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { useAppDispatch, useAppSelector, api } from '@core';
import { getSignals, setFilter } from '@store';
import { Loader, Pagination, Select, Toast, LockScreen } from '@ui';
import { useProfile } from '@hooks';
import { getPluralKey, isValidNumber, clearString, localStorageGet, localStorageSet } from '@utils';

import { SignalCard } from '@c/Signal';
import { SpriteIcon } from '@ui';
import { placeholderSignals } from './placeholderData';
import audioNotify from '@assets/audio/notify.mp3';

export const Signals: React.FC<{ isOnlyMobileView?: boolean }> = ({ isOnlyMobileView = false }) => {
  const dispatch = useAppDispatch();
  const { data, filter, metadata } = useAppSelector((state) => state.signalState);
  const { tariffActive } = useAppSelector((state) => state.userState);
  const [loading, setLoading] = useState<boolean>(true);
  const [calculator, setCalculator] = useState<string>(localStorageGet('signalCalculator') || '');
  const [calculatorLocked, setCalculatorLocked] = useState<boolean>(
    !!localStorageGet('signalCalculator')
  );

  const { allowedFunctions } = useProfile();
  const { t, i18n } = useTranslation('signal');

  const viewLocked = !tariffActive;

  // отображение
  const selectOptions = useMemo(() => {
    return [
      { value: '', label: t('select.all') },
      { value: 'ACTIVE', label: t('status.active') },
      { value: 'WAITING', label: t('status.waiting') },
      { value: 'CANCEL', label: t('status.cancel') },
      { value: 'PROFIT', label: t('status.profit') },
      { value: 'LOSS', label: t('status.loss') },
      { value: 'BREAKEVEN', label: t('status.breakeven') },
    ];
  }, [i18n.language]);

  const displaySignals = useMemo(() => {
    if (viewLocked) return placeholderSignals;
    return data;
  }, [data, viewLocked]);

  // калькулятор
  const handleCalculatorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (calculatorLocked) return;
      const clearVal = clearString(e.target.value, true);
      const newVal = isValidNumber(clearVal) ? clearVal : calculator;

      setCalculator(newVal);
      localStorageSet('signalCalculator', newVal);
    },
    [calculator, calculatorLocked]
  );

  const handleCalcClick = useCallback(() => {
    setCalculatorLocked(!calculatorLocked);
  }, [calculatorLocked]);

  // запросы и условия по обновлению
  const requestSignals = useCallback(
    async ({ page, loader = true }: { page?: number; loader?: boolean }) => {
      // получить по целевой странице либо текущая с метаданных
      if (loader) setLoading(true);

      await dispatch(getSignals({ per: 10, page }));

      if (loader) setLoading(false);
    },
    []
  );

  useEffect(() => {
    requestSignals({});
  }, [filter]);

  const timerConfirm: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    if (allowedFunctions.signal) {
      requestSignals({});

      timerConfirm.current = setInterval(() => {
        requestSignals({ loader: false });
      }, 1 * 60 * 1000);
    }

    return () => {
      clearInterval(timerConfirm.current as NodeJS.Timeout);
    };
  }, [allowedFunctions.signal]);

  // получение обновлений + уведомления
  const timerUpdates: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    const requestUpdates = async () => {
      const { data } = await api('get_new_signals/', {});

      if (data && data.count) {
        const transKey = getPluralKey(data.count);
        Toast('info', t(`notify.new.${transKey}`, { count: data.count }));
        try {
          const notify = new Audio(audioNotify);
          notify.play();
        } catch {}
      }
    };

    if (allowedFunctions.signal) {
      timerUpdates.current = setInterval(() => {
        requestUpdates();
      }, 1 * 60 * 1000);
    }

    return () => {
      clearInterval(timerUpdates.current as NodeJS.Timeout);
    };
  }, [allowedFunctions.signal]);

  // условия || viewLocked для отображения плейсхолдера под блюром
  return (
    <div
      className={cns(
        'recommend recommend--active',
        isOnlyMobileView && 'recommend--active-mobile',
        viewLocked && 'recommend--locked'
      )}>
      <div className="recommend__head">
        <div className="recommend__title">{t('title')}</div>

        <form className="recommend__calc">
          <div>{t('calc.title')}</div>
          <div className="recommend__calc-input">
            <input
              type="text"
              inputMode="decimal"
              placeholder="1 000"
              value={calculator}
              disabled={calculatorLocked}
              onChange={handleCalculatorChange}
            />

            <div
              className={cns('btn btn--recommend-calc', calculatorLocked && 'btn--yellow')}
              onClick={handleCalcClick}>
              <SpriteIcon
                name={calculatorLocked ? 'pencil' : 'signin-mini'}
                width="12"
                height="12"
              />
            </div>
          </div>
        </form>

        {metadata?.winrate && metadata?.winrate !== '0%' && (
          <div className="recommend__title-winrate">
            Winrate: <strong>{metadata?.winrate}</strong>
          </div>
        )}
        <div className="btn_UPDATEME recommend__head-btn"></div>

        <Select
          value={filter}
          placeholder={t('select.placeholder')}
          options={selectOptions}
          onSelect={(v) => {
            dispatch(setFilter(v.value as string));
          }}
        />
      </div>

      {data?.length === 0 && <div className="recommend__empty-text">Не найдено сигналов</div>}

      {(data?.length || viewLocked) && (
        <div className="recommend__table">
          <table>
            <thead>
              <tr>
                <th className="recommend__table-date recommend__hide-mobile">{t('table.date')}</th>
                <th colSpan={2}>{t('table.name')}</th>
                <th className="recommend__table-type recommend__table-center">{t('table.type')}</th>
                <th className="recommend__table-status recommend__table-center">
                  {t('table.status')}
                </th>
                <th className="recommend__table-price recommend__table-center">
                  {t('table.enter')}
                </th>
                <th className="recommend__table-price recommend__table-center">
                  {t('table.exit')}
                </th>
                <th className="recommend__table-stop recommend__table-center">{t('table.stop')}</th>
                <th className="recommend__table-risk recommend__table-center">
                  {t(calculator && calculatorLocked ? 'table.order' : 'table.risk')}
                </th>
              </tr>
            </thead>

            <tbody>
              {displaySignals?.map((x, idx) => (
                <SignalCard key={idx} signal={x} calculator={calculatorLocked ? calculator : ''} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(metadata || viewLocked) && (
        <Pagination
          page={metadata?.current_page || 1}
          count={metadata?.total || 100}
          limit={metadata?.paginated_by || 10}
          onChange={(p) => requestSignals({ page: p })}
        />
      )}

      <Loader theme="overlay" active={loading} />

      {viewLocked && <LockScreen section={t('lock')} textModifier={'big'} />}
    </div>
  );
};
