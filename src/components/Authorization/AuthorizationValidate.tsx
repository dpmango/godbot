import { useRef, useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import cns from 'classnames';

import { api } from '@core';
import { useAppDispatch, getCurrentUser } from '@store';
import { SvgIcon, Button } from '@ui';
import { secondsToStamp, localStorageGet, localStorageSet } from '@utils';
import './authorization.scss';

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

  const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
    validInput.current?.focus();
    (e.target as HTMLElement).classList.add('cursor-active');
  };

  const handleTest: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isNaN(+(e.nativeEvent as any).data)) {
      setError('');
      const clearedStr = e.target.value.replace(/[^0-9]/g, '').substring(0, 6);
      const validationCode = clearedStr.split('');

      const inputParent = inputsBox?.current?.childNodes[validationCode.length];
      inputsBox?.current?.childNodes.forEach((elem: HTMLInputElement | any, index: number) => {
        elem.classList.remove('cursor-active');
        if (inputParent.childNodes[0].value === '') {
          inputParent.classList.add('cursor-active');
        }
        elem.childNodes[0].value = validationCode[index] || '';
      });
      setValue(clearedStr);
    }
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
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
    inputsBox?.current?.childNodes.forEach((elem: HTMLInputElement | any, index: number) => {
      elem.classList.remove('cursor-active');
      elem.childNodes[0].value = '';
    });
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

  return (
    <form className="authorization__form validation" action="" onSubmit={handleSubmit}>
      <Helmet>
        <title>Godbot | Validation</title>
      </Helmet>
      <input
        className="invisible"
        value={value}
        autoComplete="off"
        ref={validInput}
        onChange={handleTest}
        type="text"
      />
      <h2 className="authorization__title">Верификация</h2>
      <label className="authorization__label" htmlFor="">
        Вы получите электронное письмо с кодом подтверждения. Введите его здесь, чтобы подтвердить
        вход
      </label>

      <div className={cns('authorization__wrapper', error && '_error')} ref={inputsBox}>
        {[0, 1, 2, 3, 4, 5].map((elem, idx) => (
          <div className="authorization__window" key={idx}>
            <input
              key={elem}
              maxLength={1}
              className="authorization__input validation"
              onClick={handleClick}
              type="text"
            />
          </div>
        ))}
        <button
          type="button"
          className={
            countdownConfirm
              ? 'authorization__resend onMobile disabled'
              : 'authorization__resend onMobile'
          }
          onClick={handleResend}>
          {countdownConfirm ? <strong>{secondsToStamp(countdownConfirm, false)}s</strong> : ''}{' '}
          Отправить снова
        </button>
      </div>

      <button
        type="button"
        className={countdownConfirm ? 'authorization__resend disabled' : 'authorization__resend'}
        onClick={handleResend}>
        {countdownConfirm ? <strong>{secondsToStamp(countdownConfirm, false)}s</strong> : ''}{' '}
        Отправить снова
      </button>

      {error ? (
        <label className="authorization__text _error" htmlFor="">
          {error}
        </label>
      ) : (
        <label className="authorization__text" htmlFor="">
          Если вы не получили письмо, проверьте спам
        </label>
      )}

      <Button
        type="submit"
        className="authorization__confirm"
        loading={loading}
        block={true}
        disabled={value.length !== 6}>
        Подтвердить
      </Button>

      <button className="authorization__return" onClick={() => navigate('/auth')}>
        <SvgIcon name="arrow-left" />
        Назад
      </button>
    </form>
  );
};
