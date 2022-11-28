import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { localStorageGet, localStorageSet } from '@utils';
import { useAppDispatch, getCurrentUser, resetUser } from '@store';

const useProfileRequest = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const requestProfile = async () => {
    const { payload } = await dispatch(getCurrentUser());

    if (!payload) {
      dispatch(resetUser());

      if (localStorageGet('email') && localStorageGet('lastEmailSend')) {
        navigate('/auth/validation', { state: { resend: true }, replace: true });
      } else {
        navigate('/auth', { replace: true });
      }
    }
  };

  return {
    requestProfile,
  };
};
export { useProfileRequest };
