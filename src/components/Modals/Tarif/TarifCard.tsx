import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { formatPrice } from '@utils';
import { ITarifDto } from '@interface/Tarif';

interface ITarifCard extends ITarifDto {
  activePeriod: string;
}

export const TarifCard: React.FC<ITarifCard> = ({ title, description, plans, activePeriod }) => {
  const { t } = useTranslation('tariff');

  const descriptionList = useMemo(() => {
    console.log(title, description);
    try {
      return description.split('\r\n');
    } catch {
      return [];
    }
  }, [description]);

  const currentPlan = useMemo(() => {
    const findByMainPeriod = plans.find((x) => x.period.main_period === activePeriod);
    if (findByMainPeriod) return findByMainPeriod;

    return null;
  }, [activePeriod, plans]);

  return (
    <li className="tarif__card">
      {/* <div className="tarif__service">Скидка 20% до 10.11.2022</div> */}

      <div className="tarif__wrapper">
        <div className="tarif__head">
          <h5>{title}</h5>
        </div>
        <p className="tarif__cost">
          {/* <strong>{formatPrice(plans[activePeriod].cost)}$</strong> */}
          {formatPrice(currentPlan?.cost, 0)}$
          <span>
            /{t('pricePer')} {currentPlan?.period.main_period}
          </span>
        </p>
        <Link className="tarif__link" to={'/payment'}>
          {t('pay')}
        </Link>
        <ul className="tarif__list">
          {descriptionList && descriptionList.map((x, idx) => <li key={idx}>{x}</li>)}
        </ul>
      </div>
    </li>
  );
};
