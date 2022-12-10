import { useEffect, useMemo, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { api } from '@core';
import { localizeKeys } from '@utils';
import { Modal } from '@ui';
import { useClickOutside } from '@hooks';
import { IPeriodObj } from '@core/interface/Tarif';
import { TarifCard } from '@c/Modals';
import { Toast } from '@ui';
import { IPlan, ITarifDto } from '@interface/Tarif';

// import './tarifes.sass';

export const TarifWindow: React.FC<{}> = () => {
  const [data, setData] = useState<ITarifDto[]>([]);
  const [activePeriodIdx, setActivePeriod] = useState<number>(0);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('tariff');

  const closeModal = () => {
    navigate(pathname);
  };

  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);

  const localizeUnits = ({ number, units }: IPeriodObj) => {
    const plural = localizeKeys(number, 'units', units.toLowerCase(), t);

    return `${number} ${plural}`;
  };

  const displaySelectes: { title: string }[] | null = useMemo(() => {
    if (data && data.length) {
      return data[0].plans.map((x: IPlan) => {
        const giftStr =
          x.period.add_period.number !== 0
            ? `+ ${x.period.add_period.number} ${t('gift')}`
            : `- ${t('noGift')}`;

        return {
          title: `${localizeUnits(x.period.main_period)} ${giftStr}`,
        };
      });
    }

    return null;
  }, [data, i18n.language]);

  const getTarifs = async () => {
    const { data, error } = await api('get_tariffs/', {});

    if (error) {
      Toast('error', `${error.status} ${error.message}`);
      return;
    }

    let updateData: ITarifDto[] = data.map((x: ITarifDto) => ({
      ...x,
      plans: x.plans.sort((planA: IPlan, planB: IPlan) => {
        return planA.period.main_period.number - planB.period.main_period.number;
      }),
    }));

    setData(updateData);
  };

  useEffect(() => {
    getTarifs();
  }, []);

  if (!data.length) return null;

  return (
    <>
      <Helmet>
        <title>Godbot | Tarifs</title>
      </Helmet>

      <Modal name="tarifes">
        <div className="tarifes" ref={modalRef}>
          <div className="tarifes__title">{t('title')}</div>
          <div className="tarifes__labels">
            {displaySelectes &&
              displaySelectes.map((x, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePeriod(idx)}
                  className={cns(
                    'tarifes__label',
                    idx === activePeriodIdx && 'tarifes__label--active'
                  )}>
                  {x.title}
                </div>
              ))}
          </div>
          <div className="tarifes__grid">
            {data.map((tarif, idx) => (
              <TarifCard {...tarif} key={idx} activePeriodIdx={activePeriodIdx} />
            ))}
          </div>
          <div className="modal__close" onClick={closeModal}></div>
        </div>
      </Modal>
    </>
  );
};
