import { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { Modal } from '@ui';
import { useClickOutside } from '@hooks';

export const ForecastGuide: React.FC<{}> = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('forecast', { keyPrefix: 'guide.modal' });

  const closeModal = () => {
    navigate(pathname);
  };

  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);

  return (
    <>
      <Helmet>
        <title>Godbot | Guide</title>
      </Helmet>

      <Modal name="guide">
        <div className="modal__block modal__block--video" ref={modalRef}>
          <div className="modal__title">{t('title')}</div>
          <div className="video">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/enetmn2vZmg"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen={false}
            />
          </div>
          <div className="modal__close" onClick={closeModal} />
        </div>
      </Modal>
    </>
  );
};
