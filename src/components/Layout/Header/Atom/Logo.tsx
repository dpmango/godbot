import { SpriteIcon } from '@ui';

export const Logo: React.FC<{}> = () => {
  return (
    <div className="header__logo">
      <svg width="25" height="32">
        <use xlinkHref="/img/logo-sprite.svg#pic"></use>
      </svg>
      <svg width="110" height="25">
        <use xlinkHref="/img/logo-sprite.svg#text"></use>
      </svg>
    </div>
  );
};
