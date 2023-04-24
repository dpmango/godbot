import { Toast } from '@ui';
import Cookies from 'js-cookie';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const useTariff = () => {
  const { isProUser, userData } = useAppSelector((state) => state.userState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { t } = useTranslation('tariff');

  const activateTrial = async () => {
    if (userData?.tariff === 'Trial' || userData?.expire_date) {
      Toast('error', t('trial.alreadyActivated'));
      return;
    }

    const { data: trialData, error: trialError } = await api('get_trial/', {});

    if (trialError) {
      Toast('error', trialError.message);
      return;
    }

    const { data, error } = await api('activate_tariff/', {
      method: 'POST',
      body: { id: trialData.trial_id },
    });

    if (error) {
      Toast('error', error.message);
      return;
    }

    if (data) {
      reachGoal('lk_trial_activation', 'ЛК - Активация триал-периода');
    }

    navigate(`${pathname}?activated`);

    // Cookies.remove('trial');
    await dispatch(getCurrentUser());
  };

  return {
    activateTrial,
  };
};

export { useTariff };
