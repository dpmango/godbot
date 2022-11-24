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
    <li className="tarif__card">
      {/* <div className="tarif__service">Скидка 20% до 10.11.2022</div> */}

      <div className="tarif__wrapper">
        <div className="tarif__head">
          <h5>{title}</h5>
        </div>
        {currentPlan && (
          <p className="tarif__cost">
            {/* <strong>{formatPrice(plans[activePeriod].cost)}$</strong> */}
            {formatPrice(currentPlan.cost, 0)}$
            <span>
              /{t('pricePer')} {localizeUnits(currentPlan.period.main_period)}
            </span>
          </p>
        )}

        <a className="tarif__link" onClick={handleActivate}>
          {t('pay')}
        </a>
        <ul className="tarif__list">
          {descriptionList && descriptionList.map((x, idx) => <li key={idx}>{x}</li>)}
        </ul>
      </div>
    </li>
  );
};
