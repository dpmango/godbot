import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

export const PromoStream = () => {
  const { t, i18n } = useTranslation('signal');

  return (
    <div className="countdown" style={{ backgroundImage: 'url("img/countdown/bg-red.png")' }}>
      <div
        className="countdown__image"
        style={{ backgroundImage: 'url("img/countdown/youtube.png")' }}></div>
      <div className="countdown__text countdown__text--stream">
        <div className="countdown__big">Не пропусти стрим!</div>
        <div>Торгуем в реальном времени по прогнозам ИИ GodBot</div>
      </div>
      <div className="countdown__timer">
        <span className="countdown__num">1</span>
        <span className="countdown__num">6</span>
        <span className="countdown__dots"></span> <span className="countdown__num">2</span>
        <span className="countdown__num">7</span>
        <span className="countdown__dots"></span> <span className="countdown__num">3</span>
        <span className="countdown__num">8</span>
      </div>
      <div className="countdown__close">Не интересно</div>
    </div>
  );
};
