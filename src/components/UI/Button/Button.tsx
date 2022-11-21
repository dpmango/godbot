import { memo } from 'react';
import { Link, To } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Spinner } from '@ui';
import st from './Button.module.scss';

interface IButton {
  children: React.ReactElement[] | React.ReactElement | string;
  className?: string;
  theme?: 'primary';
  variant?: 'default' | 'small';
  type?: 'button' | 'submit' | 'reset';
  isLink?: boolean;
  block?: boolean;
  loading?: boolean;
  iconLeft?: string;
  iconRight?: string;
  to?: To;
  disabled?: boolean;
}

const Button: React.FC<IButton> = ({
  children,
  className,
  theme = 'primary',
  variant = 'default',
  type = 'button',
  isLink,
  block,
  loading,
  iconLeft,
  iconRight,
  to,
  disabled,
  ...props
}) => {
  const classStyle = cns(
    st.btn,
    theme && st[`_${theme}`],
    variant && st[`_${variant}`],
    block && st._block,
    (iconLeft || iconRight) && st._iconed,
    loading && st._loading,
    iconLeft && st._iconLeft,
    iconRight && st._iconRight,
    disabled && st._disabled,
    className,
    'btn'
  );

  if (isLink && to) {
    return (
      <Link to={to} className={classStyle} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classStyle} type={type} {...props}>
      {iconLeft && <SvgIcon name={iconLeft} />}

      {children}

      {loading && <Spinner theme="button" color="#FFF" />}

      {iconRight && <SvgIcon name={iconRight} />}
    </button>
  );
};

export default memo(Button);
