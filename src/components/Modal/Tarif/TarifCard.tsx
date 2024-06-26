import { IPeriodObj, ITarifDto, ITarifMetaData } from '@interface/Tarif';
import { SvgIcon, Toast } from '@ui';
import dayjs from 'dayjs';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import ym from 'react-yandex-metrika';

import { TarifQueModal } from './QueModal';

interface IFormValues {
  contact: string;
}
const formInitial: IFormValues = {
  contact: '',
};

interface ITarifCard extends ITarifDto {
  activePeriodIdx: number;
  metaData: ITarifMetaData;
  onRequestUpdate: () => void;
}

export const TarifCard: React.FC<ITarifCard> = ({
  title,
  description,
  plans,
  active_days,
  activePeriodIdx,
  metaData,
  onRequestUpdate,
}) => {
  const { userData, tariffActive } = useAppSelector((state) => state.userState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [focused, setFocused] = useState(false);

  const { t, i18n } = useTranslation('tariff');
  const { t: tUnits } = useTranslation('units');

  const descriptionList: { cross: boolean; label: string }[] = useMemo(() => {
    if (description) {
      return description
        .split(';')
        .map((str) => str.trim())
        .filter((x) => x)
        .map((str) => {
          if (str.startsWith('-')) {
            return {
              cross: true,
              label: str.replaceAll('-', ''),
            };
          } else {
            return {
              cross: false,
              label: str,
            };
          }
        });
    }

    // if (title === 'Trader') {
    //   return t('description.trader', { returnObjects: true });
    // } else if (title === 'PRO Trader') {
    //   return t('description.protrader', { returnObjects: true });
    // }

    return [];
  }, [description, i18n.language]);

  const localizeUnits = ({ number, units }: IPeriodObj) => {
    const plural = localizeKeys(number, units.toLowerCase(), tUnits);

    return `${number} ${plural}`;
  };

  const currentPlan = useMemo(() => {
    const findByMainPeriod = plans[activePeriodIdx];
    const periodNumber = findByMainPeriod.period.main_period.number;
    const periodWithDiscout = periodNumber + findByMainPeriod.period.add_period.number;

    let basePrice = 99;
    if (title === 'PRO Trader') {
      basePrice = 999;
    }

    let discountPercent = 10;

    if (periodNumber === 6) {
      discountPercent = 25;
    } else if (periodNumber === 12) {
      discountPercent = 33;
    }

    let discountDate = dayjs('20.12', 'DD.MM', true);

    if (discountDate.isBefore(dayjs())) {
      discountDate = dayjs();
    }

    return {
      ...findByMainPeriod,
      scopedPeriod: {
        ...findByMainPeriod.period.main_period,
        number: periodWithDiscout,
      },
      oldPrice: periodWithDiscout * basePrice,
      discount: {
        percent: discountPercent,
        // date: discountDate.format('DD.MM'),
      },
    };
  }, [activePeriodIdx, plans]);

  // когда откроются продажи
  // число - выдает количество свободных мест
  // строка - дата когда будет следующая продажа
  const nextSaleData = useMemo(() => {
    if (title === 'PRO Trader') {
      const now = new Date();
      const curDayInMonth = now.getDate();
      const nextDayForStart = null;

      const startSales = active_days?.start ? +active_days?.start : 0;
      const endSales = active_days?.end ? +active_days?.end : 0;

      if (curDayInMonth >= startSales && curDayInMonth <= endSales) {
        return metaData.pro_free_space;
      }

      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, startSales || 1);
      return nextMonth.toLocaleString('default', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });
    }

    return false;
  }, [metaData, active_days, metaData]);

  const localizePlaceUnits = (number: number) => {
    const plural = localizeKeys(number, 'places', t);

    return `${number} ${plural}`;
  };

  interface IQueModal {
    active: boolean;
    phone: string;
  }
  const [queModalState, setQueModalState] = useState<IQueModal>({
    active: false,
    phone: '',
  });

  const buttonData = useMemo(() => {
    let translationKey = 'pay';

    if (userData?.tariff === 'Trader') {
      if (title === 'Trader' && tariffActive) {
        translationKey = 'prolong';
      } else if (title === 'PRO Trader') {
        translationKey = 'upgrade';
      }
    } else if (userData?.tariff === 'PRO Trader') {
      if (title === 'Trader') {
        // isDisabled = true;
      } else if (title === 'PRO Trader' && tariffActive) {
        translationKey = 'prolong';
      }
    }

    // Определение встать в очередь
    if (title === 'PRO Trader' && userData?.tariff !== 'PRO Trader' && !!nextSaleData) {
      if (metaData.is_wanting_pro) {
        translationKey = 'queued';
      } else if (queModalState.active) {
        translationKey = 'queue';
      } else if (typeof nextSaleData !== 'number') {
        translationKey = 'queuestart';
      }
    }

    return {
      trans: translationKey,
    };
  }, [userData?.tariff, title, metaData, nextSaleData, queModalState]);

  const handleActivate = useCallback(async () => {
    const { data, error } = await api('activate_tariff/', {
      method: 'POST',
      body: {
        id: currentPlan?.id,
        redirect_url: `${window.location.origin}/?success=${clearString(
          title,
          true
        ).toLowerCase()}`,
      },
    });

    // @ts-ignore
    if (ym && import.meta.env.VITE_YM_ID) {
      let tariff = '';
      const month = currentPlan.period.main_period.number;

      if (title === 'Trader') {
        tariff = 'trader';
      } else if (title === 'PRO Trader') {
        tariff = 'traderpro';
      }

      reachGoal(``, `Инициализация оплаты ${tariff}${month}`, false);
      if (window.fbq) {
        window.fbq('track', 'AddToCart', { value: currentPlan.cost, content_category: tariff });
      }
    }

    if (error) {
      Toast('error', error.message);
      return;
    }

    openExternalLink(data.url);
  }, [currentPlan]);

  const standInQue = useCallback(async () => {
    const { data, error } = await api('stand_in_queue_to_tariff_pro/', {
      method: 'POST',
      body: {
        wants_pro: true,
      },
    });

    if (!error) {
      onRequestUpdate && onRequestUpdate();
    }
  }, [metaData, onRequestUpdate]);

  const handleQueue = useCallback(() => {
    setQueModalState((prev) => ({ ...prev, active: true }));
  }, [setQueModalState]);

  const handleValidation = (values: IFormValues) => {
    const errors: any = {};

    if (!values.contact) {
      errors.contact = t('contact.validation.empty');
    }

    return errors;
  };

  const handleSubmit = useCallback(
    async (values: IFormValues) => {
      const errors = handleValidation(values);

      if (loading && Object.keys(errors).length) return;
      setLoading(true);

      const { data, error } = await api('user_settings/', {
        method: 'POST',
        body: { contact: values.contact },
      });

      setLoading(false);

      if (error) {
        setError(error.message);
        return;
      }

      handleQueModalClose(true);
    },
    [loading]
  );

  const handleQueModalClose = useCallback((isUpdatedContact?: boolean) => {
    setQueModalState((prev) => ({ ...prev, active: false }));

    if (isUpdatedContact) {
      standInQue();
    }
  }, []);

  const [sales, setSales] = useState({ diff: 0, days: [0], hours: [0], minutes: [0] });
  useEffect(() => {
    if (typeof nextSaleData !== 'string') {
      return;
    }

    // Вычисление данных для вывода даты следеющей продажи
    setSales(getSalesTime(nextSaleData));

    const secondsLeft = 60 - dayjs().get('second');

    // Каждую минуту обновлять состояние sales объекта
    setTimeout(
      () => setInterval(() => setSales(getSalesTime(nextSaleData)), 60 * 1000),
      secondsLeft * 1000
    );
  }, [nextSaleData]);

  const getSalesNumbers = useCallback(
    (numList: Array<number>, text: string) =>
      Array.isArray(numList) && numList.length > 0 ? (
        <>
          {numList.map((num, idx) => (
            <span className="tarifes__sales-num" key={idx}>
              {num}
            </span>
          ))}
          <span className="tarifes__sales-label">{text}</span>
        </>
      ) : null,
    []
  );

  return (
    <div className={cns('tarifes__block', userData?.tariff === title && 'tarifes__block--active')}>
      {/* <div className="tarifes__gift">{t('discount', currentPlan?.discount)}</div> */}
      {!!nextSaleData && (
        <>
          {typeof nextSaleData === 'number' && (
            <div className="tarifes__gift">
              <div
                className="tarifes__gift-free"
                style={{ backgroundColor: 'rgba(202, 57, 12, 0.7)' }}>
                {t('placesFree')} {localizePlaceUnits(nextSaleData)}
              </div>
            </div>
          )}
          {typeof nextSaleData === 'string' && sales?.diff > 0 && (
            <div className="tarifes__sales">
              <div className="tarifes__sales-big">{t('willOpen')}</div>
              {getSalesNumbers(sales.days, t('sales.days'))}
              {getSalesNumbers(sales.hours, t('sales.hours'))}
              {getSalesNumbers(sales.minutes, t('sales.minutes'))}
            </div>
          )}
        </>
      )}

      <div className="tarifes__name">{title}</div>
      {currentPlan && (
        <>
          <div className="tarifes__price">
            {currentPlan.cost !== currentPlan.oldPrice && (
              <del>${formatPrice(currentPlan.oldPrice, 0)}</del>
            )}
            <strong>${formatPrice(currentPlan.cost, 0)}</strong>{' '}
            <span>
              /{t('pricePer')} {localizeUnits(currentPlan.scopedPeriod)}
            </span>
          </div>
          {queModalState.active ? (
            <Formik
              initialValues={formInitial}
              validate={handleValidation}
              validateForm={handleValidation}
              onSubmit={handleSubmit}>
              {({ isValid, dirty, errors, setFieldError }: FormikProps<IFormValues>) => (
                <Form className={cns('btn btn-que', error && '_error')}>
                  <Field type="text" name="contact">
                    {({ field, form: { setFieldValue }, meta, ...props }: FieldProps) => (
                      <input
                        {...field}
                        {...props}
                        value={field.value}
                        type="text"
                        className={cns(!focused && (error || errors.contact) && '_invalid')}
                        placeholder={t(buttonData.trans) as string}
                        onChange={(v) => {
                          setFieldValue(field.name, v.target.value);
                          setFieldError(field.name, '');
                          setError('');
                        }}
                        onFocus={() => {
                          setFocused(true);
                        }}
                        onBlur={() => {
                          setFocused(false);
                        }}
                      />
                    )}
                  </Field>

                  {/* {!focused && (error || errors.contact) && (
                    <div className="login__input-info login__input-info--invalid">
                      {error || errors.contact}
                    </div>
                  )} */}

                  <button
                    type="submit"
                    className={cns('btn-tarif-icon', (!isValid || !!error) && '--disabled')}>
                    <SvgIcon name="checkmark" />
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <a
              className={cns(
                'btn btn--tarifes',
                `_${buttonData.trans}`,
                !currentPlan.available && buttonData.trans !== 'queuestart' && 'btn--disabled'
              )}
              onClick={buttonData.trans === 'queuestart' ? handleQueue : handleActivate}>
              {t(buttonData.trans)}
              <span className="btn-tarif-icon">
                <SvgIcon name="checkmark" />
              </span>
            </a>
          )}
        </>
      )}

      <ul className="tarifes__text">
        {descriptionList &&
          descriptionList.map((x, idx) => (
            <li key={idx} className={cns(x.cross && 'is_cross')}>
              {x.label}
            </li>
          ))}
      </ul>
    </div>
  );
};
