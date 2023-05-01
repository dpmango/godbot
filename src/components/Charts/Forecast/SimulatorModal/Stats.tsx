import { IPositionElement } from '../ForecastSimulator';

interface IProps {
  simulatorPosition: IPositionElement;
  positionPL: number;
  positionWeight: number;
}

export const ForecastSimulatorModalStats: React.FC<IProps> = ({
  simulatorPosition,
  positionPL,
  positionWeight,
}) => {
  const { t } = useTranslation('simulator');

  return (
    <div className="sim-modal__stats">
      <div className="sim-modal__stat">
        P/L:{' '}
        <span
          className={cns('sim-modal__pl', positionPL < 0 && 'c-red', positionPL > 0 && 'c-green')}>
          {positionPL > 0 ? '+' : ''}
          {formatPrice(positionPL, 0)} $
        </span>
      </div>
      <div className="sim-modal__stat">
        <span className="sim-modal__position">
          {simulatorPosition.dir === 'long' ? (
            <span className="c-green">
              {t('actions.long')} x{simulatorPosition.quantity}
            </span>
          ) : (
            <span className="c-red">
              {t('actions.short')} x{simulatorPosition.quantity}
            </span>
          )}{' '}
          ({formatPrice(positionWeight)}$)
        </span>
      </div>

      <div className="sim-modal__stat">
        Avarage: <span>{formatPrice(simulatorPosition.avarage, 0)} $</span>
      </div>
    </div>
  );
};
