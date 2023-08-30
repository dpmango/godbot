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

export const ForecastSimulatorModalResult: React.FC<IProps> = ({
  simulatorPosition,
  positionPL,
  positionWeight,
  closeModal,
}) => {
  const { t } = useTranslation('simulator');

  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);

  return (
    <Modal name="simulator-modal">
      <div className="modal__block sim-modal" ref={modalRef}>
        <div className="modal__title">{t('totalModal.title')}</div>
        <div className="modal__text">
          <Trans t={t} i18nKey={'totalModal.description'} />
        </div>

        {/* <ForecastSimulatorModalStats
          positionWeight={positionWeight}
          simulatorPosition={simulatorPosition}
          positionPL={positionPL}
        /> */}

        <div className="modal__btns">
          <div className="btn btn--modal" onClick={closeModal}>
            {t('totalModal.action')}
          </div>
        </div>
      </div>
    </Modal>
  );
};
