import { Modal } from '@ui';
import { Helmet } from 'react-helmet';
import { Trans } from 'react-i18next';

export const SimGuide = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('simguide');

  const closeModal = () => {
    navigate(pathname);
    dispatch(setSimulator({ enabled: true }));
  };

  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);

  return (
    <>
      <Helmet>
        <title>Godbot | Guide</title>
      </Helmet>

      <Modal name="guide">
        <div className="modal__block" ref={modalRef}>
          <div className="modal__title">{t('title')}</div>

          <div className="modal__text">
            <Trans t={t} i18nKey={`description`} />
          </div>

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
