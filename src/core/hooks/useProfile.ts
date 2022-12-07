import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch, api } from '@core';
import { getCurrentUser, resetUser } from '@store';
import { localStorageGet, getTimezone } from '@utils';

const useProfile = () => {
  const { userData } = useAppSelector((state) => state.userState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { i18n } = useTranslation();

  const fetchProfileWithLogout = useCallback(async () => {
    const { payload } = await dispatch(getCurrentUser());

    if (payload && !payload.name) {
      dispatch(resetUser());
      navigate('/auth', { replace: true });

      return false;
    }

    return true;
  }, []);

  const setUserSettings = useCallback(async () => {
    const { data, error } = await api('user_settings/', {
      method: 'POST',
      body: { timezone: getTimezone(), language: i18n.language },
    });

    return { data, error };
  }, []);

  const allowedFunctions = useMemo(() => {
    return {
      forecast: !!userData?.allowed_functions?.includes('Forecast'),
      investing: !!userData?.allowed_functions?.includes('Investing'),
      signal: !!userData?.allowed_functions?.includes('Signal'),
    };
  }, [userData?.allowed_functions]);

  return {
    allowedFunctions,
    fetchProfileWithLogout,
    setUserSettings,
  };
};

export { useProfile };
