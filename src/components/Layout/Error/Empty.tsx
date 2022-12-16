import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const LayoutEmpty: React.FC<{}> = () => {
  const { t } = useTranslation('error');

  return (
    <div className="empty">
      <div className="container container--empty">
        <div className="empty__text">
          <div className="empty__title">{t('notfound.title')}</div>
          <Link to="/" className="btn empty__btn">
            {t('notfound.action')}
          </Link>
        </div>
        <div className="empty__image">
          <img src="/img/hand.png" alt="" />
        </div>
      </div>
    </div>
  );
};
