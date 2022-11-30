import cns from 'classnames';

import './pagination.sass';

export const Pagination: React.FC<{}> = () => {
  return (
    <div className="pagination">
      <div className="pagination__link pagination__link--disabled">
        <svg width="14" height="14">
          <use xlinkHref="/img/icons-sprite.svg#arrow-left"></use>
        </svg>
      </div>
      <div className="pagination__link">1</div>
      <div className="pagination__link pagination__link--active">2</div>
      <div className="pagination__link">3</div>
      <div className="pagination__link">...</div>
      <div className="pagination__link">10</div>
      <div className="pagination__link">
        <svg width="14" height="14">
          <use xlinkHref="/img/icons-sprite.svg#arrow-right"></use>
        </svg>
      </div>
    </div>
  );
};
