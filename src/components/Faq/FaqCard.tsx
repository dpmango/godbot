import { IFaqCard } from '@interface/Faq';
import { SpriteIcon } from '@ui';
import React from 'react';
import { Trans } from 'react-i18next';

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
            const isList = key === 'list';
            const isImage = key === 'image';

            return (
              <React.Fragment key={idx}>
                {isText && <p dangerouslySetInnerHTML={{ __html: obj[key] as string }} />}
                {isList && (
                  <ul>
                    {(obj[key] as string[]).map((li, idx) => (
                      <li key={idx}>
                        <Trans t={t}>{li}</Trans>
                      </li>
                    ))}
                  </ul>
                )}
                {isImage && (
                  <div className="question__media">
                    <img src={obj[key] as string} alt="" />
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
