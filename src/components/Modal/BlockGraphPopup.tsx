import { LegacyRef, Ref, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useClickOutside, useDebounce } from '@hooks';
import { useAppSelector } from '@/core';
import { Link, useLocation } from 'react-router-dom';

interface IModalTurnMessageProps {
  pointX?: number;
  graphRef: any;
}

const LEFT_GRAPH_SHIFT = 58;
const HIDE_WIDTH = 10;
const VISIBLE_SIZE = 10;

export const BlockGraphPopup: React.FC<IModalTurnMessageProps> = ({ pointX = 500, graphRef }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentWidth, setCurrentWidth] = useState(0);
  const { pathname } = useLocation();
  const modalRef = useRef(null);
  const { prolongation } = useAppSelector((state) => state.forecastState);
  const debouncePointX = pointX; //useDebounce(pointX, 50);

  const { t } = useTranslation('forecast');
  const { t: tTariff } = useTranslation('tariff');

  const closeModal = useCallback(() => setIsOpen(false), []);

  useClickOutside(modalRef, closeModal);

  useEffect(() => {
    const containerWidth = graphRef?.offsetWidth || 0;

    const width = containerWidth - pointX - LEFT_GRAPH_SHIFT;
    const containerWithShift = containerWidth - VISIBLE_SIZE;

    setCurrentWidth(width < containerWithShift ? width : containerWithShift);
  }, [debouncePointX]);

  if (!isOpen || currentWidth < HIDE_WIDTH || pointX <= 0 || prolongation.required === 0) {
    return null;
  }

  return (
    <div style={{ width: currentWidth }} className={'chart-graph-block'}>
      <div className="fader__text fader__text--big chart-graph-block__content">
        <svg width="32" height="32">
          <use xlinkHref="/img/icons-tea.svg#lock"></use>
        </svg>

        <div>{t('block.graph')}</div>

        <Link className="btn" to={`${pathname}?tariffs`}>
          {tTariff('prolong')}
        </Link>
      </div>
    </div>
  );
};
