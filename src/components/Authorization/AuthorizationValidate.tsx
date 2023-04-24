import { Toast } from '@ui';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';

const enLettersRegex = /^[a-zA-Z]+$/;
const allowLetters = false;

const initialDigits: string[] = Array.from<string>({ length: 6 }).fill('');
const initialInputs: HTMLInputElement[] = Array.from({ length: 6 });

export const AuthorizationValidate = () => {
  const lastEmailRest = useMemo(() => {
    const last = localStorageGet('lastEmailSend') as number;
    if (!last) return 60;

    const secondsPast = Math.round((Date.now() - last) / 1000);
    return secondsPast < 60 ? 60 - secondsPast : 0;
  }, []);

  const [countdownConfirm, setCountdownConfirm] = useState<number>(lastEmailRest);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [digits, setDigits] = useState<string[]>(initialDigits);
  const inputRefs = useRef<HTMLInputElement[]>(initialInputs as HTMLInputElement[]);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { t } = useTranslation('auth');

  const updateDigits = useCallback(
    (index: number, value: string) => {
      if (!allowLetters && +value < 0 && +value > 9) {
        return;
      } else if (allowLetters && +value < 0 && +value > 9 && !enLettersRegex.test(value)) {
        return;
      }

      const newDigits = [...digits] as string[];
      newDigits[index] = allowLetters ? value.toUpperCase() : value.replace(/[^\d]$/, '');

      setValue(newDigits.join(''));
      setDigits(newDigits);
    },
    [digits]
  );

  const handleChangeDigits = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement> | null,
      forcedValue?: string,
      forcedIndex?: string
    ) => {
      let selectIndexDigit = '',
        val = '';

      if (event) {
        selectIndexDigit = event.target.dataset.index || '';
        val = event.target.value || '';
      } else {
        selectIndexDigit = forcedIndex || '';
        val = forcedValue || '';
      }

      const inputs = inputRefs.current;

      // handle code paste
      const clearedStr = val.replace(/[^0-9]/g, '').substring(0, 6);

      if (clearedStr.length > 1) {
        const newDigits = [...initialDigits];
        for (let i = 0; i < clearedStr.length; i++) {
          newDigits[i] = clearedStr.charAt(i);
        }

        setValue(newDigits.join(''));
        setDigits(newDigits);

        if (clearedStr.length !== 6) {
          // @ts-ignore
          inputs[clearedStr.length - 1].focus({ cursor: 'all' });
        } else {
          // @ts-ignore
          inputs.forEach((input: any) => {
            input.blur();
          });
        }

        return;
      }

      if (value.length === 6 || !selectIndexDigit) {
        return;
      }

      // single type
      if (!allowLetters && isNaN(+val)) {
        return;
      } else if (allowLetters && isNaN(+val) && !enLettersRegex.test(val)) {
        return;
      }

      updateDigits(+selectIndexDigit, val);

      if (+selectIndexDigit < inputs.length - 1) {
        // @ts-ignore
        inputs[+selectIndexDigit + 1].focus({ cursor: 'all' });
      } else if (+selectIndexDigit !== inputs.length - 1) {
        inputs[+selectIndexDigit].blur();
      }
    },
    [digits, inputRefs, value]
  );

  const handleKeyBackspace = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const selectIndexDigit = +(event.currentTarget.dataset.index ?? 0);
      const keyPressed = event.nativeEvent.key;

      if (keyPressed !== 'Backspace') {
        return;
      }

      if (digits[selectIndexDigit]) {
        updateDigits(+selectIndexDigit, '');
      } else if (selectIndexDigit > 0) {
        updateDigits(+selectIndexDigit - 1, '');
        inputRefs.current[selectIndexDigit - 1].focus();
      }
    },
    [digits, inputRefs]
  );

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
      setError(error.message);
      resetForm(false);

      if (error.message.includes('60')) {
        navigate('/auth', { state: { error: error.message }, replace: true });
        localStorageSet('locked', Date.now());
      }

      return;
    }

    resetForm();

    reachGoal('lk_registration', 'ЛК - Регистрация');
    Cookies.set('auth', Date.now().toString(), { expires: 7 });
    await dispatch(getCurrentUser());
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (value.length === 6) {
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
      Toast('error', `${error.status} ${error.message}`);
      return;
    }

    resetForm();
    setCountdownConfirm(60);
  };

  const resetForm = (clearError = true) => {
    if (clearError) setError('');
    setValue('');
    setDigits(initialDigits);
    inputRefs.current[0] && inputRefs.current[0].focus();
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
          <div className={cns('login__code-inputs', error && 'login__code-inputs--invalid')}>
            {digits.map((digit: string, index: number) => (
              <div className="login__input" key={index}>
                <input
                  ref={(ref: HTMLInputElement) => {
                    inputRefs.current[index] = ref;
                  }}
                  onKeyDown={handleKeyBackspace}
                  onChange={handleChangeDigits}
                  data-index={index}
                  key={index}
                  inputMode="numeric"
                  type="text"
                  value={digit}
                />
              </div>
            ))}
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
