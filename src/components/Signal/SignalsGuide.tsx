import { Modal } from '@ui';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';

export const SignalsGuide = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('signal', { keyPrefix: 'guide.modal' });

  const closeModal = () => {
    navigate(pathname);
  };

  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);

  return (
    <>
      <Helmet>
        <title>Godbot | SpotTutorial</title>
      </Helmet>

      <Modal name="SpotTutorial">
        <div className="modal__block modal__block--video" ref={modalRef}>
          <div className="modal__title">{t('title')}</div>
          <div className="video">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/CPkNwWalL-Y"
              frameBorder="0"
              title="YouTube video player"
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
