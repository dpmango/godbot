import { useCallback } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

import { api, useAppSelector, useAppDispatch } from '@core';
import { getCurrentUser } from '@store';
import { reachGoal } from '@utils';
import { Toast } from '@ui';

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
      reachGoal('lk_trial_activation', 'Триал');
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
