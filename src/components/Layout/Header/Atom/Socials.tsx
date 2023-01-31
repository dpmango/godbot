import cns from 'classnames';
import { reachGoal } from '@utils';

interface ISocialsProps {
  className?: string;
}

export const Socials: React.FC<ISocialsProps> = ({ className }) => {
  return (
    <div className={cns('header__user-soc', className)}>
      <a
        href={'https://twitter.com/godbot_pro'}
        target="_blank"
        title="Twitter"
        onClick={() => reachGoal('', 'Клик твиттер')}>
        <img src="/img/social/twitter.svg" alt="Twitter" />
      </a>
      <a
        href={'https://discord.com/invite/Jnptpsmcmx'}
        target="_blank"
        title="Discord"
        onClick={() => reachGoal('', 'Клик дискорд')}>
        <img src="/img/social/discord.svg" alt="Discord" />
      </a>
      <a
        href={'https://t.me/godbot_pro'}
        target="_blank"
        title="Telegram"
        onClick={() => reachGoal('', 'Клик Телеграм')}>
        <img src="/img/social/telegram.svg" alt="Telegram" />
      </a>
    </div>
  );
};
