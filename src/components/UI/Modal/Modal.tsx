import { useScrollLock } from '@/core/hooks';
import cns from 'classnames';
import { useEffect } from 'react';

// import './modal.sass';

interface IModalProps {
  name: string;
  children: React.ReactElement[] | React.ReactElement;
}

export const Modal: React.FC<IModalProps> = ({ name, children }) => {
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    lockScroll();

    return () => {
      unlockScroll();
    };
  }, []);

  return (
    <div className={cns('modal modal--active', `modal--${name}`)}>
      <div className="fader fader--active fader--modal"></div>

      <div className="container container--modal">{children}</div>
    </div>
  );
};
