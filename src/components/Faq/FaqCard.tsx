import React, { ChangeEvent, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import cns from 'classnames';

import { SpriteIcon } from '@ui';
import { IFaqCard } from '@core/interface/Faq';

interface IFaqCardProps extends IFaqCard {}

export const FaqCard: React.FC<IFaqCardProps> = ({ title, body, category }) => {
  const [opened, setOpened] = useState<boolean>(false);
  const { t, i18n } = useTranslation('faq', { keyPrefix: 'head' });

  const handleCardClick = () => {
    setOpened(!opened);
  };

  return (
    <div className="question">
      <div
        className={cns('question__title', opened && 'question__title--active')}
        onClick={() => handleCardClick()}>
        {title}
        <SpriteIcon name="chevrondown" width="18" height="18" />
      </div>

      <div className={cns('question__inner', opened && 'question__inner--active')}>
        {body &&
          body.map((obj, idx) => {
            const key = Object.keys(obj)[0];
            const isText = key === 'text';
            const isImage = key === 'img';

            return (
              <React.Fragment key={idx}>
                {isText && (
                  <p>
                    <Trans t={t}>{obj[key]}</Trans>
                  </p>
                )}
                {isImage && (
                  <div className="question__media">
                    <img src={obj[key]} alt="" />
                  </div>
                )}
              </React.Fragment>
            );
          })}

        {/* <div className="question__media">
          <a href="#">
            <img src="img/temp/4.png" alt="" />
            <span className="question__play"></span>
          </a>
        </div> */}
      </div>
    </div>
  );
};
