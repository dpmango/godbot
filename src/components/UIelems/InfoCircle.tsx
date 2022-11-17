import { useState } from 'react';
import './uielems.scss';

export const InfoCircle: React.FC<{ title: string }> = ({ title }) => {
  const [visible, setVisible] = useState(false);
  const handleHover = () => {
    setVisible(!visible);
  };

  return (
    <div className={visible ? 'ui__info' : 'ui__info visible'}>
      <p style={{ opacity: visible ? '1' : '0' }}>{title}</p>
      <button onMouseEnter={handleHover} onMouseLeave={handleHover}>
        i
      </button>
    </div>
  );
};
