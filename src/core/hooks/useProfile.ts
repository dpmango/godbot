import { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast, Id } from 'react-toastify';

import { useAppSelector, useAppDispatch, api } from '@core';
import { getCurrentUser, resetUser } from '@store';
import { IUserDto } from '@core/interface/User';
import { localStorageGet, getTimezone } from '@utils';

const useProfile = () => {
  const { userData } = useAppSelector((state) => state.userState);

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
      networkToast.current = toast.error(t('network.connect'), {
        toastId: 'networkToast',
        autoClose: false,
      });
    } else if (payload) {
      toast.dismiss(networkToast.current);
    }

    return payload;
  }, []);

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
