import cns from 'classnames';

interface ISocialsProps {
  className?: string;
}

export const Socials: React.FC<ISocialsProps> = ({ className }) => {
  return (
    <div className={cns('header__user-soc', className)}>
      <a href={'https://twitter.com/godbot_pro'} target="_blank" title="Twitter">
        <img src="/img/social/twitter.svg" alt="Twitter" />
      </a>
      <a href={'https://discord.com/invite/Jnptpsmcmx'} target="_blank" title="Discord">
        <img src="/img/social/discord.svg" alt="Discord" />
      </a>
      <a href={'https://t.me/godbot_pro'} target="_blank" title="Telegram">
        <img src="/img/social/telegram.svg" alt="Telegram" />
      </a>
    </div>
  );
};
