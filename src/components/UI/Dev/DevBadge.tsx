import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

export const DevBadge: React.FC<{}> = () => {
  const [menu, setMenu] = useState(false);

  const { t } = useTranslation('header');

  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        top: '80%',
        background: 'tomato',
        color: 'white',
        fontSize: '0.7em',
        borderRadius: 4,
        opacity: 0.7,
        padding: '0.2em 0.4em',
      }}>
      DEV
    </div>
  );
};
