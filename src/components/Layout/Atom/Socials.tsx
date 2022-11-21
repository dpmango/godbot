import { Link } from 'react-router-dom';
import { SvgIcon } from '@ui';
export const Socials = () => {
  return (
    <ul className="mobile__socials">
      <li>
        <Link to={'https://twitter.com'} target="_blank">
          <SvgIcon name="social-twitter" />
        </Link>
      </li>
      <li>
        <Link to={'https://discord.com'} target="_blank">
          <SvgIcon name="social-discord" />
        </Link>
      </li>
      <li>
        <Link to={'https://tg.me'} target="_blank">
          <SvgIcon name="social-telegram" />
        </Link>
      </li>
    </ul>
  );
};
