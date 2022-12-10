import { toast, ToastOptions } from 'react-toastify';

export const Toast = (
  type: 'success' | 'error' | 'info',
  message: string,
  params?: ToastOptions
) => {
  const renderImage = () => {
    if (type === 'success') {
      return <img src="/img/CheckCircle-green.svg" alt="" />;
    } else if (type === 'error') {
      return <img src="/img/XCircle.svg" alt="" />;
    } else if (type === 'info') {
      return <img src="/img/CheckCircle-green.svg" alt="" />;
    }
  };

  return toast[type](
    () => {
      return (
        <div className="toast-wrap">
          {renderImage()}
          <div className="toast-wrap__text">{message}</div>
          <div className="close-wrap">
            <svg className="close-wrap__circle">
              <circle className="bg" cx="18" cy="18" r="9" />
              <circle className="meter-1" cx="18" cy="18" r="9" />
            </svg>
            <img className="close-wrap__close" src="/img/XCircleBlue.svg" alt="" />
          </div>
        </div>
      );
    },
    {
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: false,
      ...params,
    }
  );
};
