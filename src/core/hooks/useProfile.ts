import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast, Id } from 'react-toastify';

import { useAppSelector, useAppDispatch, api } from '@core';
import { getCurrentUser, resetUser } from '@store';
import { IUserDto } from '@core/interface/User';
import { localStorageGet, getTimezone } from '@utils';
import { Toast } from '@ui';

const useProfile = () => {
  const { userData } = useAppSelector((state) => state.userState);
  const networkErrorCount = useRef(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const networkToast = useRef<Id>();

  const { t, i18n } = useTranslation('error');

  const allowedFunctions = useMemo(() => {
    return {
      forecast: !!userData?.allowed_functions?.includes('Forecast'),
      investing: !!userData?.allowed_functions?.includes('Investing'),
      signal: !!userData?.allowed_functions?.includes('Signal'),
    };
  }, [userData?.allowed_functions]);

  const fetchProfileWithLogout = useCallback(async (): Promise<IUserDto | null> => {
    const { payload } = await dispatch(getCurrentUser());

    if (payload && !payload.name) {
      dispatch(resetUser());
      navigate('/auth', { replace: true });

      return null;
    } else if (payload === null) {
      networkErrorCount.current = networkErrorCount.current + 1;
      if (networkErrorCount.current >= 5) {
        networkToast.current = Toast('error', t('network.connect'), {
          toastId: 'networkToast',
          autoClose: false,
        });
      }
    } else if (payload) {
      networkErrorCount.current = 0;
      toast.dismiss(networkToast.current);
    }

    return payload;
  }, [networkErrorCount]);

  const setUserSettings = useCallback(async () => {
    const { data, error } = await api('user_settings/', {
      method: 'POST',
      body: { timezone: getTimezone(), language: i18n.language },
    });

    return { data, error };
  }, [i18n.language]);

  return {
    allowedFunctions,
    fetchProfileWithLogout,
    setUserSettings,
  };
};

export { useProfile };
