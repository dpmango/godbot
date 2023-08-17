import './_simulator-modals.scss';

import { Modal } from '@ui';
import { Trans } from 'react-i18next';

interface IProps {
  namespace: 'introModal' | 'introLinesModal';
  closeModal: () => void;
}

export const ForecastSimulatorModalInfo: React.FC<IProps> = ({ namespace, closeModal }) => {
  const { t } = useTranslation('simulator', { keyPrefix: namespace });

  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);

  return (
    <Modal name={`simulator-${namespace}`}>
      <div className="modal__block sim-modal" ref={modalRef}>
        <div className="modal__title">{t('title')}</div>
        <div className="modal__text">
          <Trans t={t} i18nKey={'description'} />
        </div>

        <div className="modal__btns">
          <div className="btn btn--modal" onClick={closeModal}>
            {t('action')}
          </div>
        </div>
      </div>
    </Modal>
  );
};
