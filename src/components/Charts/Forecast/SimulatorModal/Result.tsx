import { Modal } from '@ui';
import { Trans } from 'react-i18next';

export const ForecastSimulatorModalResult = ({ ...props }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('simulator');

  const closeModal = () => {
    navigate(pathname);
  };

  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);

  return (
    <Modal name="simulator-modal">
      <div className="modal__block" ref={modalRef}>
        <div className="modal__title">{t('title')}</div>
        <div className="modal__text">
          <Trans t={t} i18nKey={'text'} />
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
