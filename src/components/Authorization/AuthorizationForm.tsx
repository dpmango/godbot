import { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik';
import cns from 'classnames';

import { Button } from '@ui';
import { api } from '@core';
import { validEmail, localStorageSet, localStorageGet } from '@utils';
import './authorization.scss';

interface IFormValues {
  email: string;
}
const formInitial: IFormValues = {
  email: '',
};

export const AuthorizationForm: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleValidation = (values: IFormValues) => {
    const errors: any = {};

    if (!values.email) {
      errors.email = 'Введите email';
    } else if (!validEmail(values.email)) {
      errors.email = 'Неверный формат email';
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
    }
  }, [location]);

  return (
    <div className="authorization__form">
      <Helmet>
        <title>Godbot | Authorization</title>
      </Helmet>

      <h2 className="authorization__title">Вход / Регистрация</h2>

      <Formik initialValues={formInitial} validate={handleValidation} onSubmit={handleSubmit}>
        {({ isValid, touched, errors, setFieldError }: FormikProps<IFormValues>) => (
          <Form className={cns('authorization__label', error && '_error')}>
            <p>Введите ваш Email для получения кода авторизации</p>

            <Field type="text" name="email">
              {({ field, form: { setFieldValue }, meta, ...props }: FieldProps) => (
                <input
                  {...field}
                  {...props}
                  value={field.value}
                  className={cns('authorization__input', meta.touched && errors.email && '_error')}
                  placeholder="Введите ваш Email"
                  type="email"
                  onChange={(v) => {
                    setFieldValue(field.name, v.target.value);
                    setFieldError(field.name, '');
                    setError('');
                  }}
                />
              )}
            </Field>

            {error && <div className="authorization__text _error _error-main">{error}</div>}

            <Button
              type="submit"
              loading={loading}
              block={true}
              disabled={!touched.email || !isValid}>
              Войти
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
