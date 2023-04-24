import audioNotify from '@assets/audio/notify.mp3';
import { SignalCard } from '@c/Signal';
import { Loader, LockScreen, Pagination, Select, Toast } from '@ui';
import { SpriteIcon } from '@ui';

import { placeholderSignals } from './placeholderData';

export const Signals = () => {
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
  const navigate = useNavigate();

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
          // eslint-disable-next-line no-empty
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

  const onOpenTutorial = useCallback(() => {
    navigate('?spot-tutorial');
  }, []);

  // условия || viewLocked для отображения плейсхолдера под блюром
  return (
    <div className={cns('recommend recommend--active', viewLocked && 'recommend--locked')}>
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

        {i18n.language === 'ru-RU' ? (
          <a
            onClick={onOpenTutorial}
            className="btn recommend__head-btn"
            title={t('guide.btn') || 'tutorial'}>
            <SpriteIcon name="play-min" width="24" height="24" />
            <span>{t('guide.btn')}</span>
          </a>
        ) : (
          <span className="recommend__head-btn-empty" />
        )}

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
