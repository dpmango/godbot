import { Autoplay, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import './authorization.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

export const AuthorizationSlider: React.FC<{}> = () => {
  return (
    <div className="authorization__swiper">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay
        loop
        pagination={{ clickable: true }}>
        <SwiperSlide>
          <p className="authorization__title">Торгуй и зарабатывай на прогнозах нейросети</p>
          <img src="/images/autho-1.svg" alt="Slider image" />
          <p className="authorization__text">
            На нашей платформе ты получишь уникальную возможность торговать и зарабатывать на
            прогнозах нейросети. Нейросеть не ошибается, в отличии от трейдеров.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <p className="authorization__title">Стань экспертом в криптовалютах</p>
          <img src="/images/autho-2.svg" alt="Slider image" />
          <p className="authorization__text">
            На платформе ты найдешь образовательные видео на любые темы, начиная от устройства
            блокчейна, заканчивая Web3 и DAO.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <p className="authorization__title">Зарабатывай на привлечении рефералов</p>
          <img src="/images/autho-3.svg" alt="Slider image" />
          <p className="authorization__text">
            Мы выплачиваем 10% от каждого платежа твоего реферала. Честно. Без оговорок и скрытых
            комиссий.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <p className="authorization__title">Инвестируй с крупнейшими фондами</p>
          <img src="/images/autho-4.svg" alt="Slider image" />
          <p className="authorization__text">
            На нашей платформе у тебя есть возможность вложиться в проекты, в которые инвестируют
            крупнейшие венчурные фонды: Binance Lab, Sequoia Capital и другие.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <p className="authorization__title">Выиграй MacBook, iPhone или другие подарки</p>
          <img src="/images/autho-5.svg" alt="Slider image" />
          <p className="authorization__text">
            Мы проводим турниры по P&L трейдеров, торгующих по прогнозам нейросети. Каждые 3 месяца
            мы подводим итоги. Победители получают MacBook, iPhone или другие призы.
          </p>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
