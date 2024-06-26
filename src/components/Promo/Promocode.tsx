import { Modal, SpriteIcon } from '@ui';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import { Helmet } from 'react-helmet';

interface IFormValues {
  promocode: string;
}

const searchParamsToCode = (v: string) => {
  if (v && [6, 10].includes(v.length)) return v;
  return '';
};

export const Promocode = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [focused, setFocused] = useState(false);
  const [locked, setLocked] = useState(false);

  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { t } = useTranslation('promocode');
  const closeModal = () => {
    navigate(pathname);
  };

  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);

  const formInitial: IFormValues = {
    promocode: searchParamsToCode(searchParams.get('v') || ''),
  };

  const handleValidation = (values: IFormValues) => {
    const errors: any = {};

    if (!values.promocode) {
      errors.promocode = t('field.validation.empty');
    } else if (![6, 10].includes(values.promocode.length)) {
      errors.promocode = t('field.validation.length');
    }

    return errors;
  };

  const handleSubmit = useCallback(
    async (values: IFormValues) => {
      const errors = handleValidation(values);

      if (loading && Object.keys(errors).length) return;
      setLoading(true);

      const { data, error } = await api('coupon/activate', {
        method: 'GET',
        params: {
          coupon_code: values.promocode,
        },
      });

      setLoading(false);

      if (data) {
        reachGoal('promocode_activate', 'Активирован промокод');
      }

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
                <Field type="text" name="promocode">
                  {({ field, form: { setFieldValue }, meta, ...props }: FieldProps) => (
                    <div
                      className={cns(
                        'login__input',
                        !focused && (error || errors.promocode) && 'login__input--invalid',
                        locked && 'login__input--disabled'
                      )}>
                      <input
                        {...field}
                        {...props}
                        value={field.value}
                        type="text"
                        placeholder={t('field.placeholder') as string}
                        disabled={locked}
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
                      <SpriteIcon name="coupon" width="16" height="16" />
                    </div>
                  )}
                </Field>

                {!focused && (error || errors.promocode) && (
                  <div className="login__input-info login__input-info--invalid">
                    {error || errors.promocode}
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
