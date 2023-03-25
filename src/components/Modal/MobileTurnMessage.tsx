import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal, SpriteIcon } from '@ui';
import { useClickOutside } from '@hooks';

interface IModalTurnMessageProps {}

export const MobileTurnMessage: React.FC<IModalTurnMessageProps> = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation('ui');

  const closeModal = useCallback(() => setIsOpen(false), []);

  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);

  if (!isOpen) {
    return null;
  }

  return (
    <Modal name="activated">
      <div className="modal__block" ref={modalRef}>
        <SpriteIcon name="turn-phone" width="150" height="150" />

        <div className="modal__text modal__text-padding">{t('info.turnPhone')}</div>

        <div className="modal__btns">
          <div className="btn btn--modal" onClick={closeModal}>
            {t('modal.close')}
          </div>
        </div>
      </div>
    </Modal>
  );
};
