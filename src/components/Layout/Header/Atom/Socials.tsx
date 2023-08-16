interface ISocialsProps {
  className?: string;
}

export const Socials: React.FC<ISocialsProps> = ({ className }) => {
  const { i18n } = useTranslation('charts');

  return (
    <div className={cns('header__user-soc', className)}>
      <a
        href={'https://twitter.com/godbot_ai'}
        target="_blank"
        title="Twitter"
        onClick={() => reachGoal('twitter', 'Переход в Твиттер')}
        rel="noreferrer">
        <img src="/img/social/twitter.svg" alt="Twitter" />
      </a>
      {/* <a
        href={'https://discord.com/invite/Jnptpsmcmx'}
        target="_blank"
        title="Discord"
        onClick={() => reachGoal('discordd', 'Переход в Дискорд')}
        rel="noreferrer">
        <img src="/img/social/discord.svg" alt="Discord" />
      </a> */}
      {i18n.language === 'ru-RU' && (
        <a
          href={'https://t.me/godbot_pro'}
          target="_blank"
          title="Telegram"
          onClick={() => reachGoal('telegram', 'Переход в телеграмм')}
          rel="noreferrer">
          <img src="/img/social/telegram.svg" alt="Telegram" />
        </a>
      )}
    </div>
  );
};
