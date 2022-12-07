import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

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
    if (findByMainPeriod) {
      let basePrice = 99;
      if (title === 'PRO Trader') {
        basePrice = 999;
      }

      return {
        ...findByMainPeriod,
        old: findByMainPeriod.period.main_period.number * basePrice,
        scopedPeriod: {
          ...findByMainPeriod.period.main_period,
          number:
            findByMainPeriod.period.main_period.number + findByMainPeriod.period.add_period.number,
        },
      };
    }

    return null;
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
      {/* <div class="tarifes__gift">В подарок 1 неделя</div> */}

      <div className="tarifes__name">{title}</div>
      {currentPlan && (
        <>
          <div className="tarifes__price">
            {currentPlan.cost !== currentPlan.old && <del>${formatPrice(currentPlan.old, 0)}</del>}
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
