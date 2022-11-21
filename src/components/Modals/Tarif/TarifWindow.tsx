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
import { TarifCard } from '@c/Modals';
import { Loader } from '@c/UI/Loader';
import { IPlan } from '@interface/Tarif';

export const TarifWindow: React.FC<{}> = () => {
  const [data, setData] = useState<any>([]);
  const [activePeriod, setActivePeriod] = useState<string>('1 Month');

  const { pathname } = useLocation();
  const { t } = useTranslation('tariff');

  const displaySelectes: { key: string; title: string }[] | null = useMemo(() => {
    if (data && data.length) {
      return data[0].plans.map((x: IPlan) => {
        const giftStr = !x.period.add_period.startsWith('0')
          ? `+ ${t('gift')} ${x.period.add_period}`
          : `- ${t('noGift')}`;

        return {
          key: x.period.main_period,
          title: `${x.period.main_period} ${giftStr}`,
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

  if (!data.length)
    return (
      <div>
        <Loader />
      </div>
    );

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
          displaySelectes.map((x) => (
            <button
              key={x.key}
              onClick={() => setActivePeriod(x.key)}
              className={x.key === activePeriod ? 'active' : ''}>
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
            <TarifCard {...data[1]} activePeriod={activePeriod} />
          </SwiperSlide>
          <SwiperSlide>
            <TarifCard {...data[0]} activePeriod={activePeriod} />
          </SwiperSlide>
        </Swiper>
      ) : (
        <ul className="tarif__inner">
          <TarifCard {...data[1]} activePeriod={activePeriod} />
          <TarifCard {...data[0]} activePeriod={activePeriod} />
        </ul>
      )}
    </div>
  );
};
