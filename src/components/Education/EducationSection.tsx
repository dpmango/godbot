import { useState } from 'react';
import cns from 'classnames';
import { useTranslation } from 'react-i18next';

import { SpriteIcon } from '@ui';
import { IEducationDto } from '@core/interface/Education';

import { EducationCard } from '@c/Education';

export const EducationSection: React.FC<IEducationDto> = ({
  access_level,
  title,
  subtitle,
  description,
  videos,
}) => {
  const [visible, setVisible] = useState<boolean>(true);

  const { t } = useTranslation('education', { keyPrefix: 'section' });

  return (
    <div className="education__section">
      <div className="education__head">
        <div className="education__head-name">
          <div className="education__head-bigname">{title}</div>
          {subtitle}
        </div>
        <div className="education__head-descr">{description}</div>
        {/* <div className="education__head-status">
          <div className="education__head-circle education__head-circle--green"></div>
          <div>
            ПРОСМОТРЕНО <strong>4</strong> ВИДЕО ИЗ 16
          </div>
        </div> */}
        <div
          className={cns('btn education__head-btn', visible && 'education__head-btn--active')}
          onClick={() => setVisible(!visible)}>
          {t(visible ? 'hide' : 'show')}
          <SpriteIcon name="chevrondown" width="18" height="18" />
        </div>
      </div>
      {visible && (
        <div className="education__grid">
          {videos.map((video, idx) => (
            <EducationCard key={idx} access_level={access_level} {...video} />
          ))}
        </div>
      )}
    </div>
  );
};
