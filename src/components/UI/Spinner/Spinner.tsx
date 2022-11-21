import { memo } from 'react';
import cns from 'classnames';
import ClipLoader from 'react-spinners/ClipLoader';

import st from './Spinner.module.scss';

const Spinner = ({ className = '', theme = 'primary', color = '#182D78', ...props }) => {
  return (
    <div className={cns(st.loader, theme && st[`${theme}`], 'spinner', className)}>
      <ClipLoader color={color} loading={true} size={24} />
    </div>
  );
};

export default memo(Spinner);
