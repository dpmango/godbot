import './_simulator-modals.scss';

import { Modal } from '@ui';
import { Trans } from 'react-i18next';

import { IPositionElement } from '../ForecastSimulator';
import { ForecastSimulatorModalStats } from './Stats';

interface IProps {
  simulatorPosition: IPositionElement;
  positionPL: number;
  positionWeight: number;
  translationKey: string;
  closeModal: (shouldBack?: boolean) => void;
}

export const ForecastSimulatorModalInterval: React.FC<IProps> = ({
  simulatorPosition,
  positionPL,
  positionWeight,
  translationKey,
  closeModal,
}) => {
  const { t } = useTranslation('simulator');

  const handleCloseModal = () => {
    closeModal(translationKey !== 'profit');
  };

  const modalRef = useRef(null);
  useClickOutside(modalRef, handleCloseModal);

  return (
    <Modal name="simulator-modal">
      <div className="modal__block sim-modal" ref={modalRef}>
        <div className="modal__title">{t(`intervalModal.${translationKey}.title`)}</div>
        <div className="modal__text">
          <Trans t={t} i18nKey={`intervalModal.${translationKey}.description`} />
        </div>

        {/* <ForecastSimulatorModalStats
          positionWeight={positionWeight}
          simulatorPosition={simulatorPosition}
          positionPL={positionPL}
        /> */}

        <div className="modal__btns">
          <div className="btn btn--modal" onClick={handleCloseModal}>
            {t('intervalModal.action')}
          </div>
        </div>
      </div>
    </Modal>
  );
};
