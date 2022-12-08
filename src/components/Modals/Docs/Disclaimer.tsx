import { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { Modal } from '@ui';
import { useClickOutside } from '@hooks';

export const DocsDisclaimer: React.FC<{}> = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('ui', { keyPrefix: 'modal' });

  const closeModal = () => {
    navigate(pathname);
  };

  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);

  return (
    <>
      <Helmet>
        <title>Godbot | Disclaimer</title>
      </Helmet>

      <Modal name="disclaimer">
        <div className="modal__block modal__block--text" ref={modalRef}>
          <div className="modal__text">
            <h1>Disclaimer</h1>
            <h2>No Investment Advice Provided</h2>
            <p>
              Trading leveraged products carries a high degree of risk and you could lose more than
              your initial deposit. Any opinions, chats, messages, news, research, analyses, prices,
              or other information contained on this Website are provided as general market
              information for educational and entertainment purposes only, and do not constitute
              investment advice. The Website should not be relied upon as a substitute for extensive
              independent market research before making your actual trading decisions. Opinions,
              market data, recommendations or any other content is subject to change at any time
              without notice. GodBot will not accept liability for any loss or damage, including
              without limitation any loss of profit, which may arise directly or indirectly from use
              of or reliance on such information.
            </p>
            <p>
              We do not recommend the use of technical analysis as a sole means of trading
              decisions. We do not recommend making hurried trading decisions. You should always
              understand that PAST PERFORMANCE IS NOT NECESSARILY INDICATIVE OF FUTURE RESULTS.
            </p>
          </div>

          <div className="modal__btns">
            <div className="btn btn--modal" onClick={closeModal}>
              {t('close')}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
