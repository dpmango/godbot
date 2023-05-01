import './_simulator-modals.scss';

import { Modal } from '@ui';
import { Trans } from 'react-i18next';

import { IPositionElement } from '../ForecastSimulator';
import { ForecastSimulatorModalStats } from './Stats';

interface IProps {
  simulatorPosition: IPositionElement;
  positionPL: number;
  positionWeight: number;
  closeModal: () => void;
}

export const ForecastSimulatorModalInterval: React.FC<IProps> = ({
  simulatorPosition,
  positionPL,
  positionWeight,
  closeModal,
}) => {
  const { t } = useTranslation('simulator');

  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);

  const transKeyByResult = useMemo(() => {
    if (positionPL === 0) {
      return 'neutral';
    } else if (positionPL < 0) {
      return 'loss';
    } else if (positionPL > 0) {
      return 'profit';
    }
  }, [positionPL]);

  return (
    <Modal name="simulator-modal">
      <div className="modal__block sim-modal" ref={modalRef}>
        <div className="modal__title">{t(`intervalModal.${transKeyByResult}.title`)}</div>
        <div className="modal__text">
          <Trans t={t} i18nKey={`intervalModal.${transKeyByResult}.description`} />
        </div>

        <ForecastSimulatorModalStats
          positionWeight={positionWeight}
          simulatorPosition={simulatorPosition}
          positionPL={positionPL}
        />

        <div className="modal__btns">
          <div className="btn btn--modal" onClick={closeModal}>
            {t('intervalModal.action')}
          </div>
        </div>
      </div>
    </Modal>
  );
};
