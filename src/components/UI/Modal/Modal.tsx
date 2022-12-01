import cns from 'classnames';

// import './modal.sass';

interface IModalProps {
  name: string;
  children: React.ReactElement[] | React.ReactElement;
}

export const Modal: React.FC<IModalProps> = ({ name, children }) => {
  return (
    <div className={cns('modal', `modal--${name}`)}>
      <div className="fader fader--active fader--modal"></div>

      <div className="container container--modal">{children}</div>
    </div>
  );
};
