import { Modal } from '@ui';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import { Trans } from 'react-i18next';

interface IProps {
  closeModal: (isUpdatedContact?: boolean) => void;
}

interface IFormValues {
  contact: string;
}
const formInitial: IFormValues = {
  contact: '',
};

export const TarifQueModal: React.FC<IProps> = ({ closeModal }) => {
  const { t } = useTranslation('tariff', { keyPrefix: 'queModal' });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [focused, setFocused] = useState(false);

  const handleCloseModal = () => {
    closeModal();
  };

  const handleValidation = (values: IFormValues) => {
    const errors: any = {};

    if (!values.contact) {
      errors.contact = t('contact.validation.empty');
    }

    return errors;
  };

  const handleSubmit = useCallback(
    async (values: IFormValues) => {
      const errors = handleValidation(values);

      if (loading && Object.keys(errors).length) return;
      setLoading(true);

      const { data, error } = await api('user_settings/', {
        method: 'POST',
        body: { contact: values.contact },
      });

      setLoading(false);

      if (error) {
        setError(error.message);
        return;
      }

      closeModal(!error);
    },
    [loading]
  );

  const modalRef = useRef(null);
  useClickOutside(modalRef, handleCloseModal);

  return (
    <Modal name="que-modal">
      <div className="modal__block" ref={modalRef}>
        <div className="modal__title">{t(`title`)}</div>
        <div className="modal__text">
          <Trans t={t} i18nKey={`description`} />
        </div>

        <Formik
          initialValues={formInitial}
          validate={handleValidation}
          validateForm={handleValidation}
          onSubmit={handleSubmit}>
          {({ isValid, dirty, errors, setFieldError }: FormikProps<IFormValues>) => (
            <Form className={cns('modal__form que-form', error && '_error')}>
              <Field type="text" name="contact">
                {({ field, form: { setFieldValue }, meta, ...props }: FieldProps) => (
                  <div
                    className={cns(
                      'login__input',
                      !focused && (error || errors.contact) && 'login__input--invalid'
                    )}>
                    <input
                      {...field}
                      {...props}
                      value={field.value}
                      type="text"
                      placeholder={t('contact.placeholder') as string}
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

              {!focused && (error || errors.contact) && (
                <div className="login__input-info login__input-info--invalid">
                  {error || errors.contact}
                </div>
              )}

              <div className="modal__btns">
                <div className="btn btn--modal" onClick={handleCloseModal}>
                  {t('action.close')}
                </div>
                <button
                  className={cns('btn btn--modal', (!isValid || !!error) && 'btn--disabled')}
                  disabled={!isValid || !!error}>
                  {t('action.send')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
