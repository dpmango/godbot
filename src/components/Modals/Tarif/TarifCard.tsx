import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
import dayjs from 'dayjs';

import { formatPrice, localizeKeys, openExternalLink } from '@utils';
import { api, useAppSelector } from '@core';
import { ITarifDto, IPeriodObj } from '@interface/Tarif';

interface ITarifCard extends ITarifDto {
  activePeriodIdx: number;
}

export const TarifCard: React.FC<ITarifCard> = ({ title, description, plans, activePeriodIdx }) => {
  const { userData } = useAppSelector((state) => state.userState);

  const { t, i18n } = useTranslation('tariff');

  const descriptionList: string[] = useMemo(() => {
    if (title === 'Trader') {
      return t('description.trader', { returnObjects: true });
    } else if (title === 'PRO Trader') {
      return t('description.protrader', { returnObjects: true });
    }

    return [];
  }, [i18n.language]);

  const localizeUnits = ({ number, units }: IPeriodObj) => {
    const plural = localizeKeys(number, 'units', units.toLowerCase(), t);

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
    if (discountDate.isBefore(dayjs(), 'day')) {
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
        date: discountDate.format('DD.MM'),
      },
    };
  }, [activePeriodIdx, plans]);

  const buttonData = useMemo(() => {
    let translationKey = 'pay';
    let isDisabled = false;

    if (userData?.tariff === 'Trader') {
      if (title === 'Trader') {
        translationKey = 'prolong';
      } else if (title === 'PRO Trader') {
        translationKey = 'upgrade';
      }
    } else if (userData?.tariff === 'PRO Trader') {
      if (title === 'Trader') {
        isDisabled = true;
      } else if (title === 'PRO Trader') {
        translationKey = 'prolong';
      }
    }

    return {
      disabled: isDisabled,
      trans: translationKey,
    };
  }, [userData?.tariff, title]);

  const handleActivate = useCallback(async () => {
    const { data, error } = await api('activate_tariff/', {
      method: 'POST',
      body: { id: currentPlan?.id },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    openExternalLink(data.url);
  }, [currentPlan]);

  return (
    <div className="tarifes__block">
      <div className="tarifes__gift">{t('discount', currentPlan?.discount)}</div>

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
            className={cns('btn btn--tarifes', buttonData.disabled && 'btn--disabled')}
            onClick={handleActivate}>
            {t(buttonData.trans)}
          </a>
        </>
      )}

      <ul className="tarifes__text">
        {descriptionList && descriptionList.map((x, idx) => <li key={idx}>{x}</li>)}
      </ul>
    </div>
  );
};
