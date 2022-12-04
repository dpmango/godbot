import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@core';
import { getCurrentUser, resetUser } from '@store';
import { localStorageGet } from '@utils';

const useProfile = () => {
  const { userData } = useAppSelector((state) => state.userState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchProfileWithLogout = useCallback(async () => {
    const { payload } = await dispatch(getCurrentUser());

    if (payload && !payload.name) {
      dispatch(resetUser());

      if (localStorageGet('email') && localStorageGet('lastEmailSend')) {
        navigate('/auth/validation', { state: { resend: true }, replace: true });
      } else {
        navigate('/auth', { replace: true });
      }
    }
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
  };
};

export { useProfile };
