import cns from 'classnames';

interface ISpriteIconProps {
  name: string;
  width?: number | string;
  height?: number | string;
  spritePath?: string;
}

export const SpriteIcon: React.FC<ISpriteIconProps> = ({
  name,
  width,
  height,
  spritePath = '/img/icons-sprite.svg',
}) => {
  return (
    <svg width={width} height={height}>
      <use xlinkHref={`${spritePath}#${name}`} />
    </svg>
  );
};
