import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { formatPrice, localizeKeys, openExternalLink } from '@utils';
import { api } from '@core';
import { ITarifDto, IPeriodObj } from '@interface/Tarif';

interface ITarifCard extends ITarifDto {
  activePeriodIdx: number;
}

export const TarifCard: React.FC<ITarifCard> = ({ title, description, plans, activePeriodIdx }) => {
  const { t } = useTranslation('tariff');

  const descriptionList = useMemo(() => {
    try {
      return description.split('\r\n');
    } catch {
      return [];
    }
  }, [description]);

  const localizeUnits = ({ number, units }: IPeriodObj) => {
    const plural = localizeKeys(number, 'units', units.toLowerCase(), t);

    return `${number} ${plural}`;
  };

  const currentPlan = useMemo(() => {
    const findByMainPeriod = plans[activePeriodIdx];
    if (findByMainPeriod) return findByMainPeriod;

    return null;
  }, [activePeriodIdx, plans]);

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
            {/* <del>$6 930</del> */}
            <strong>${formatPrice(currentPlan.cost, 0)}</strong>{' '}
            <span>
              /{t('pricePer')} {localizeUnits(currentPlan.period.main_period)}
            </span>
          </div>
          <a className="btn btn--tarifes" onClick={handleActivate}>
            {t('pay')}
          </a>
        </>
      )}

      <ul className="tarifes__text">
        {descriptionList && descriptionList.map((x, idx) => <li key={idx}>{x}</li>)}
      </ul>
    </div>
  );
};
