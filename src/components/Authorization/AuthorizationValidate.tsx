import { useRef, useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import cns from 'classnames';
import { useTranslation } from 'react-i18next';

import { api, useAppDispatch } from '@core';
import { getCurrentUser } from '@store';
import { Button } from '@ui';
import { secondsToStamp, localStorageGet, localStorageSet } from '@utils';

export const AuthorizationValidate: React.FC<{}> = ({}) => {
  const lastEmailRest = useMemo(() => {
    const last = localStorageGet('lastEmailSend') as number;
    if (!last) return 60;

    const secondsPast = Math.round((Date.now() - last) / 1000);
    return secondsPast < 60 ? 60 - secondsPast : 0;
  }, []);

  const dispatch = useAppDispatch();

  const [countdownConfirm, setCountdownConfirm] = useState<number>(lastEmailRest);
  let [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const validInput: any = useRef();
  const inputsBox = useRef<HTMLDivElement | any>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation('auth');

  const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
    validInput.current?.focus();
    (e.target as HTMLElement).classList.add('cursor-active');
  };

  const handleTest: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isNaN(+(e.nativeEvent as any).data)) {
      setError('');
      const clearedStr = e.target.value.replace(/[^0-9]/g, '').substring(0, 6);
      const validationCode = clearedStr.split('');

      setValue(clearedStr);
    }
  };

  const handleSubmit = async (e: any) => {
    e?.preventDefault();
    if (loading) return;

    setLoading(true);
    const { data, error } = await api('auth/verification/', {
      method: 'POST',
      body: { code: value },
    });
    setLoading(false);

    if (error) {
      // toast.error(`${error.status} ${error.message}`);
      setError(error.message);
      if (error.message.includes('заблокирован')) {
        navigate('/auth', { state: { error: error.message }, replace: true });
        localStorageSet('locked', Date.now());
      }

      return;
    }

    Cookies.set('auth', Date.now().toString(), { expires: 7 });

    await dispatch(getCurrentUser());

    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (value.trim().length === 6) {
      handleSubmit(null);
    }
  }, [value]);

  const handleResend = async () => {
    if (loading) return;

    setLoading(true);
    const { data, error } = await api('auth/login/', {
      method: 'POST',
      body: {
        email: localStorageGet('email'),
      },
    });
    setLoading(false);

    if (error) {
      toast.error(`${error.status} ${error.message}`);
      return;
    }

    resetForm();
    setCountdownConfirm(60);
  };

  const resetForm = () => {
    setError('');
    setValue('');
  };

  const timerConfirm: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    if (countdownConfirm >= 1) {
      timerConfirm.current = setTimeout(() => {
        setCountdownConfirm((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timerConfirm.current as NodeJS.Timeout);
    };
  }, [countdownConfirm]);

  useEffect(() => {
    if (location.state?.resend) {
      handleResend();
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Godbot | Validation</title>
      </Helmet>

      <form className="login__form login__form--code" action="" onSubmit={handleSubmit}>
        <div className="login__title">{t('code.title')}</div>
        <div className="login__top-text">{t('code.instruction')}</div>
        <div className="login__code">
          <div
            className={cns('login__code-inputs', error && 'login__code-inputs--invalid')}
            ref={inputsBox}>
            {[0, 1, 2, 3, 4, 5].map((elem, idx) => (
              <div className="login__input" key={idx}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={value[idx]}
                  maxLength={1}
                  onClick={handleClick}
                />
              </div>
            ))}
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={value}
              autoComplete="off"
              ref={validInput}
              onChange={handleTest}
            />
          </div>

          <div
            className={cns('btn login__btn--code', countdownConfirm && 'btn--disabled')}
            onClick={handleResend}>
            {countdownConfirm ? <strong>{secondsToStamp(countdownConfirm, false)}s</strong> : ''}{' '}
            {t('code.resend')}
          </div>
        </div>

        <div className={cns('login__input-info', error && 'login__input-info--invalid')}>
          {error || t('code.spamcheck')}
        </div>

        <div className="login__submit">
          <button className="btn login__btn" disabled={value.length !== 6}>
            {t('code.confirm')}
          </button>
          <div className="login__back">
            <a onClick={() => navigate('/auth')}>
              <svg width="24" height="24">
                <use xlinkHref="/img/login-sprite.svg#back"></use>
              </svg>
              <span>{t('code.back')}</span>
            </a>
          </div>
        </div>
      </form>
    </>
  );
};
