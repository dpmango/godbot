import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
import dayjs from 'dayjs';
import ym from 'react-yandex-metrika';

import { Toast } from '@ui';
import { formatPrice, localizeKeys, openExternalLink, reachGoal, clearString } from '@utils';
import { api, useAppSelector } from '@core';
import { ITarifDto, IPeriodObj, ITarifMetaData } from '@interface/Tarif';

interface ITarifCard extends ITarifDto {
  activePeriodIdx: number;
  metaData: ITarifMetaData;
}

export const TarifCard: React.FC<ITarifCard> = ({
  title,
  description,
  plans,
  active_days,
  activePeriodIdx,
  metaData,
}) => {
  const { userData } = useAppSelector((state) => state.userState);

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
      let nextDayForStart = null;

      let startSales = active_days?.start ? +active_days?.start : 0;
      let endSales = active_days?.end ? +active_days?.end : 0;

      if (curDayInMonth >= startSales && curDayInMonth <= endSales) {
        return metaData.pro_free_space;
      }

      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, startSales || 1);
      return nextMonth.toLocaleString('default', { day: 'numeric', month: 'numeric' });
    }

    return false;
  }, [metaData, active_days, metaData]);

  const localizePlaceUnits = (number: number) => {
    const plural = localizeKeys(number, 'places', t);

    return `${number} ${plural}`;
  };

  const buttonData = useMemo(() => {
    let translationKey = 'pay';

    if (userData?.tariff === 'Trader') {
      if (title === 'Trader') {
        translationKey = 'prolong';
      } else if (title === 'PRO Trader') {
        translationKey = 'upgrade';
      }
    } else if (userData?.tariff === 'PRO Trader') {
      if (title === 'Trader') {
        // isDisabled = true;
      } else if (title === 'PRO Trader') {
        translationKey = 'prolong';
      }
    }

    // Определение встать в очередь
    if (title === 'PRO Trader' && userData?.tariff !== 'PRO Trader') {
      if (metaData.is_wanting_pro) {
        translationKey = 'queued';
      } else if (typeof nextSaleData !== 'number') {
        translationKey = 'queue';
      }
    }

    return {
      trans: translationKey,
    };
  }, [userData?.tariff, title, metaData, nextSaleData]);

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
    if (ym && process.env.REACT_APP_YM_ID) {
      let tariff = '';
      const month = currentPlan.period.main_period.number;

      if (title === 'Trader') {
        tariff = 'trader';
      } else if (title === 'PRO Trader') {
        tariff = 'traderpro';
      }

      reachGoal(`${tariff}${month}`, `Инициализация оплаты ${tariff}${month}`);
    }

    if (error) {
      Toast('error', error.message);
      return;
    }

    openExternalLink(data.url);
  }, [currentPlan]);

  const handleQueue = useCallback(async () => {
    const { data, error } = await api('stand_in_queue_to_tariff_pro/', {
      method: 'POST',
      body: {
        wants_pro: true,
      },
    });
  }, [metaData]);

  return (
    <div className="tarifes__block">
      {/* <div className="tarifes__gift">{t('discount', currentPlan?.discount)}</div> */}

      {nextSaleData && (
        <div className="tarifes__gift">
          <div className="tarifes__gift-free" style={{ backgroundColor: 'rgba(202, 57, 12, 0.7)' }}>
            {typeof nextSaleData === 'number' && (
              <>
                {t('placesFree')} {localizePlaceUnits(nextSaleData)}
              </>
            )}
            {typeof nextSaleData === 'string' && (
              <>
                {t('willOpen')} {nextSaleData}
              </>
            )}
          </div>
        </div>
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
          <a
            className={cns(
              'btn btn--tarifes',
              !currentPlan.available && buttonData.trans !== 'queue' && 'btn--disabled'
            )}
            onClick={buttonData.trans === 'queue' ? handleQueue : handleActivate}>
            {t(buttonData.trans)}
          </a>
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
