import { Link } from 'react-router-dom';

export const LayoutEmpty = () => {
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
