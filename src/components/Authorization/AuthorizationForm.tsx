import { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik';
import cns from 'classnames';
import { useTranslation } from 'react-i18next';

import { api } from '@core';
import { validEmail, localStorageSet, localStorageGet } from '@utils';

interface IFormValues {
  email: string;
}
const formInitial: IFormValues = {
  email: '',
};

export const AuthorizationForm: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [locked, setLocked] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation('auth');

  const handleValidation = (values: IFormValues) => {
    const errors: any = {};

    if (!values.email) {
      errors.email = t('email.validation.empty');
    } else if (!validEmail(values.email)) {
      errors.email = t('email.validation.mask');
    }

    return errors;
  };

  const handleSubmit = useCallback(
    async (values: IFormValues) => {
      if (loading) return;

      const lockedState = localStorageGet('locked');
      if (lockedState) {
        const secondsPast = Math.round((Date.now() - lockedState) / 1000);

        if (secondsPast < 60 * 60) {
          const minutesToUnlock = 60 - Math.round(secondsPast / 60);
          setError(`Вход заблокирован на ${minutesToUnlock} минут`);
          return;
        }
      }

      setLoading(true);
      localStorageSet('email', values.email);
      const { data, error } = await api('auth/login/', {
        method: 'POST',
        body: values,
      });
      setLoading(false);

      if (error) {
        // toast.error(`${error.status} ${error.message}`);
        setError(error.message);
        return;
      }

      localStorageSet('lastEmailSend', Date.now());
      navigate('/auth/validation');
    },
    [loading]
  );

  useEffect(() => {
    if (location.state?.error) {
      setError(location.state?.error);
      setLocked(true);
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Godbot | Authorization</title>
      </Helmet>

      <Formik initialValues={formInitial} validate={handleValidation} onSubmit={handleSubmit}>
        {({ isValid, dirty, errors, setFieldError }: FormikProps<IFormValues>) => (
          <Form className={cns('login__form', error && '_error')}>
            <div className="login__title">{t('entry.title')}</div>
            <div className="login__top-text">{t('entry.instruction')}</div>

            <Field type="text" name="email">
              {({ field, form: { setFieldValue }, meta, ...props }: FieldProps) => (
                <div
                  className={cns(
                    'login__input',
                    meta.touched && errors.email && 'login__input--invalid',
                    locked && 'login__input--disabled'
                  )}>
                  <input
                    {...field}
                    {...props}
                    value={field.value}
                    type="email"
                    placeholder={t('email.placeholder') as string}
                    disabled={locked}
                    onChange={(v) => {
                      setFieldValue(field.name, v.target.value);
                      setFieldError(field.name, '');
                      setError('');
                    }}
                  />
                  <svg width="24" height="24">
                    <use xlinkHref="/img/login-sprite.svg#email"></use>
                  </svg>
                </div>
              )}
            </Field>

            {(error || errors.email) && (
              <div className="login__input-info login__input-info--invalid">
                {error || errors.email}
              </div>
            )}

            <div className="login__submit">
              <button
                className={cns(
                  'btn login__btn',
                  (!dirty || !isValid || !!error) && 'btn--disabled'
                )}
                disabled={!dirty || !isValid || !!error}>
                {t('entry.action')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
