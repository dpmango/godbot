import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation, Trans } from 'react-i18next';

import { Modal } from '@ui';
import { useClickOutside } from '@hooks';
import { Socials } from '@c/Layout/Header';
import { reachGoal } from '@/core/utils';

interface IModalInfoProps {
  name: string;
}

export const ModalInfo: React.FC<IModalInfoProps> = ({ name }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const { t } = useTranslation(name);

  const closeModal = () => {
    navigate(pathname);
  };

  // установка цели в зависимости от оплаченного тарифа (pro, trader)
  useEffect(() => {
    if (name === 'paymentAwait') {
      // if (searchParams.get('success') === 'protrader') {
      //   reachGoal('complete_order_pro', 'Оплачен Pro Trader');
      // } else {
      //   reachGoal('lk_complete_order', 'Оплачен Trader');
      // }
    }
  }, [name, searchParams]);

  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);

  return (
    <>
      <Helmet>
        <title>{t('pagetitle')}</title>
      </Helmet>

      <Modal name="activated">
        <div className="modal__block" ref={modalRef}>
          <div className="modal__title">{t('title')}</div>
          <div className="modal__text">
            <Trans t={t} i18nKey={'text'} />
          </div>
          {name === 'activated' && <Socials className="center" />}

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
