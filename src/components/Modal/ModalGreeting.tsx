import { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { Modal } from '@ui';
import { useClickOutside } from '@hooks';

export const ModalGreeting: React.FC<{}> = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('greeting');

  const closeModal = () => {
    navigate(pathname);
  };

  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);

  return (
    <>
      <Helmet>
        <title>Godbot | Greeting</title>
      </Helmet>

      <Modal name="greeting">
        <div className="modal__block" ref={modalRef}>
          <div className="modal__title">{t('title')}</div>
          <div className="modal__text">{t('text')}</div>
          <div className="modal__btns">
            <div className="btn btn--modal" onClick={closeModal}>
              {t('action')}
            </div>
            <div className="btn btn--secondary btn--modal">{t('skip')}</div>
          </div>
        </div>
      </Modal>
    </>
  );
};
