import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { api } from '@core';
import { localizeKeys } from '@utils';
import { IPeriodObj } from '@core/interface/Tarif';
import { TarifCard } from '@c/Modals';
import { Loader } from '@c/UI/Loader';
import { IPlan } from '@interface/Tarif';

export const TarifWindow: React.FC<{}> = () => {
  const [data, setData] = useState<any>([]);
  const [activePeriodIdx, setActivePeriod] = useState<number>(0);

  const { pathname } = useLocation();
  const { t } = useTranslation('tariff');

  const localizeUnits = ({ number, units }: IPeriodObj) => {
    const plural = localizeKeys(number, 'units', units.toLowerCase(), t);

    return `${number} ${plural}`;
  };

  const displaySelectes: { title: string }[] | null = useMemo(() => {
    if (data && data.length) {
      return data[1].plans.map((x: IPlan) => {
        const giftStr =
          x.period.add_period.number !== 0
            ? `+ ${t('gift')} ${localizeUnits(x.period.add_period)}`
            : `- ${t('noGift')}`;

        return {
          title: `${localizeUnits(x.period.main_period)} ${giftStr}`,
        };
      });
    }

    return null;
  }, [data]);

  const getTarifs = async () => {
    const { data, error } = await api('get_tariffs/', {});

    if (error) {
      toast.error(`${error.status} ${error.message}`);
      return;
    }

    setData(data);
  };

  useEffect(() => {
    getTarifs();
  }, []);

  if (!data.length) return null;

  return (
    <div className="tarif">
      <Helmet>
        <title>Godbot | Tarifs</title>
      </Helmet>
      <Link to={pathname.slice(0, pathname.length - 7)} className="tarif__close">
        &times;
      </Link>
      <h4 className="tarif__title">Тарифы</h4>
      <div className="tarif__header">
        {displaySelectes &&
          displaySelectes.map((x, idx) => (
            <button
              key={idx}
              onClick={() => setActivePeriod(idx)}
              className={idx === activePeriodIdx ? 'active' : ''}>
              {x.title}
            </button>
          ))}
      </div>
      {window.innerWidth < 876 ? (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={true}
          pagination={{ clickable: true }}>
          <SwiperSlide>
            <TarifCard {...data[1]} activePeriodIdx={activePeriodIdx} />
          </SwiperSlide>
          <SwiperSlide>
            <TarifCard {...data[2]} activePeriodIdx={activePeriodIdx} />
          </SwiperSlide>
        </Swiper>
      ) : (
        <ul className="tarif__inner">
          <TarifCard {...data[1]} activePeriodIdx={activePeriodIdx} />
          <TarifCard {...data[2]} activePeriodIdx={activePeriodIdx} />
        </ul>
      )}
    </div>
  );
};