import { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation, Trans } from 'react-i18next';
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik';
import { Modal, SpriteIcon } from '@ui';
import { api, useAppSelector } from '@core';
import { useClickOutside } from '@hooks';
import cns from 'classnames';

interface IFormValues {
  address: string;
  summ: number | null;
}
const formInitial: IFormValues = {
  address: '',
  summ: null,
};

export const Withdraw = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [focused, setFocused] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const { partner } = useAppSelector((state) => state.userState);

  const { t } = useTranslation('partner', { keyPrefix: 'withdraw' });

  const closeModal = () => {
    navigate(pathname);
  };

  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);

  const handleValidation = (values: IFormValues) => {
    const errors: any = {};

    if (!values.address) {
      errors.address = t('address.validation.empty');
    } else if (values.address[0] !== 'T' || values.address.length !== 34) {
      errors.address = t('address.validation.mask');
    } else if (values.summ && values.summ < 1) {
      errors.summ = t('summ.validation.min');
    } else if (values.summ && values.summ > (partner?.balance || 0)) {
      errors.summ = t('summ.validation.max');
    }

    return errors;
  };

  const handleSubmit = useCallback(
    async (values: IFormValues) => {
      const errors = handleValidation(values);

      if (loading && Object.keys(errors).length) return;
      setLoading(true);

      const { data, error } = await api('crypto/add_withdraw', {
        method: 'POST',
        body: {
          wallet: values.address,
          amount: values.summ ? values.summ.toString() : 0,
        },
      });

      setLoading(false);

      if (error) {
        setError(error.message);
        return;
      }

      closeModal();
    },
    [loading]
  );

  return (
    <>
      <Helmet>
        <title>{t('pagetitle')}</title>
      </Helmet>

      <Modal name="activated">
        <div className="modal__block" ref={modalRef}>
          <div className="modal__title">{t('title')}</div>

          <Formik
            initialValues={formInitial}
            validate={handleValidation}
            validateForm={handleValidation}
            onSubmit={handleSubmit}>
            {({ isValid, dirty, errors, setFieldError }: FormikProps<IFormValues>) => (
              <Form className={cns('modal__form', error && '_error')}>
                <Field type="text" name="address">
                  {({ field, form: { setFieldValue }, meta, ...props }: FieldProps) => (
                    <div
                      className={cns(
                        'login__input',
                        !focused && (error || errors.address) && 'login__input--invalid'
                      )}>
                      <input
                        {...field}
                        {...props}
                        value={field.value}
                        type="text"
                        placeholder={t('address.placeholder') as string}
                        onChange={(v) => {
                          setFieldValue(field.name, v.target.value);
                          setFieldError(field.name, '');
                          setError('');
                        }}
                        onFocus={() => {
                          setFocused(true);
                        }}
                        onBlur={() => {
                          setFocused(false);
                        }}
                      />
                    </div>
                  )}
                </Field>

                <Field type="number" name="summ">
                  {({ field, form: { setFieldValue }, meta, ...props }: FieldProps) => (
                    <div
                      className={cns(
                        'login__input',
                        !focused && (error || errors.summ) && 'login__input--invalid'
                      )}>
                      <input
                        {...field}
                        {...props}
                        value={field.value}
                        type="number"
                        placeholder={t('summ.placeholder') as string}
                        onChange={(v) => {
                          setFieldValue(field.name, v.target.value);
                          setFieldError(field.name, '');
                          setError('');
                        }}
                        onFocus={() => {
                          setFocused(true);
                        }}
                        onBlur={() => {
                          setFocused(false);
                        }}
                      />
                    </div>
                  )}
                </Field>

                {!focused && (error || errors.address || errors.summ) && (
                  <div className="login__input-info login__input-info--invalid">
                    {error || errors.address || errors.summ}
                  </div>
                )}

                <div className="login__submit">
                  <button
                    className={cns('btn login__btn', (!isValid || !!error) && 'btn--disabled')}
                    disabled={!isValid || !!error}>
                    {t('action')}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};
