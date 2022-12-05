import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

import { api, useAppDispatch } from '@core';
import { getCurrentUser, resetUser } from '@store';

const useTariff = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { t } = useTranslation('tariff');

  const activateTrial = async () => {
    const { data: trialData, error: trialError } = await api('get_trial/', {});

    if (trialError) {
      toast.error(trialError.message);
      return;
    }

    const { data, error } = await api('activate_tariff/', {
      method: 'POST',
      body: { id: trialData.trial_id },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    // toast.success(t('trial.activate'));
    navigate(`${pathname}?activated`);

    Cookies.remove('trial');
    await dispatch(getCurrentUser());
  };

  return {
    activateTrial,
  };
};

export { useTariff };
