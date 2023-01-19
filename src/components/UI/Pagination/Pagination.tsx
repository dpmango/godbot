import { useMemo, useCallback } from 'react';
import cns from 'classnames';

import { SpriteIcon } from '@ui';

// import './pagination.sass';

interface IPaginationProps {
  page: number;
  count: number;
  limit: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({ page, count, limit, onChange }) => {
  const paginationBuilder = useCallback(
    (currentPage: number, pageCount: number, pagesShown: number, minPageSize: number) => {
      const getRange = (start: number, end: number) => {
        const length = end - start + 1;
        return Array.from({ length }, (_, i) => start + i);
      };

      const clamp = (number: number, lower: number, upper: number) => {
        return Math.min(Math.max(number, lower), upper);
      };

      let delta;
      currentPage = clamp(currentPage, 1, pageCount);
      pagesShown = clamp(pagesShown, minPageSize, pageCount);
      const centerPagesShown = pagesShown - 5;
      const boundaryPagesShown = pagesShown - 3;

      if (pageCount <= pagesShown) {
        delta = pagesShown;
      } else {
        delta =
          currentPage < boundaryPagesShown || currentPage > pageCount - boundaryPagesShown
            ? boundaryPagesShown
            : centerPagesShown;
      }

      const range = {
        start: Math.round(currentPage - delta / 2),
        end: Math.round(currentPage + delta / 2),
      };

      // if (range.start - 1 === 1 || range.end + 1 === pageCount) {
      //   range.start += 1;
      //   range.end += 1;
      // }

      let pages =
        currentPage > delta
          ? getRange(Math.min(range.start, pageCount - delta), Math.min(range.end, pageCount))
          : getRange(1, Math.min(pageCount, delta + 1));

      if (currentPage > pageCount - boundaryPagesShown && pageCount > pagesShown) {
        pages = getRange(pageCount - delta, pageCount);
      }

      const withDots = (value: number, pair: any[]) =>
        pages.length + 1 !== pageCount ? pair : [value];
      const lastPage = pages[pages.length - 1];

      if (pages[0] !== 1) {
        pages = withDots(1, [1, '...']).concat(pages);
      }

      if (lastPage && lastPage < pageCount) {
        pages = pages.concat(withDots(pageCount, ['...', pageCount]));
      }

      return pages;
    },
    []
  );

  const countWithLimit = useMemo(() => {
    return Math.ceil(count / limit);
  }, [count, limit]);

  const items = useMemo(() => {
    const pages = [5, 7];

    return paginationBuilder(page, countWithLimit, pages[0], pages[1]);
  }, [page, countWithLimit]);

  const prevAvailable = useMemo(() => {
    return page > 1;
  }, [page]);

  const nextAvailable = useMemo(() => {
    return page < countWithLimit;
  }, [page, countWithLimit]);

  const handlePrev = useCallback(() => {
    if (prevAvailable) {
      onChange(page - 1);
    }
  }, [page, prevAvailable]);

  const handleNext = useCallback(() => {
    if (nextAvailable) {
      onChange(page + 1);
    }
  }, [page, nextAvailable]);

  return (
    <div className="pagination">
      <div
        onClick={handlePrev}
        className={cns('pagination__link', !prevAvailable && 'pagination__link--disabled')}>
        <SpriteIcon name="arrow-left" width="14" height="14" />
      </div>

      {items.map((item, idx) => (
        <div
          className={cns(
            'pagination__link',
            item === page && 'pagination__link--active',
            typeof item === 'string' && 'disabled'
          )}
          onClick={() => typeof item === 'number' && onChange(item)}
          key={idx}>
          {typeof item === 'number' && <>{item}</>}
          {typeof item === 'string' && <>...</>}
        </div>
      ))}

      <div
        onClick={handleNext}
        className={cns('pagination__link', !nextAvailable && 'pagination__link--disabled')}>
        <SpriteIcon name="arrow-right" width="14" height="14" />
      </div>
    </div>
  );
};
