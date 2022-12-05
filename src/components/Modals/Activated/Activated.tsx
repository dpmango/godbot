import { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { useAppSelector } from '@core';
import { Modal } from '@ui';
import { useClickOutside } from '@hooks';

export const Activated: React.FC<{}> = () => {
  const { currentModal } = useAppSelector((state) => state.modalState);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('activated');

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

      <Modal name="activated">
        <div className="modal__block" ref={modalRef}>
          <div className="modal__title">{t('title')}</div>
          <div className="modal__text">{t('text')}</div>
          <div className="modal__btns">
            <div className="btn btn--modal" onClick={closeModal}>
              {t('action')}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
