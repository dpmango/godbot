interface ISvgIcon {
  prefix?: string;
  name: string;
}

import './_icon.scss';

export const SvgIcon: React.FC<ISvgIcon> = ({ prefix = 'icon', name }) => {
  const symbolId = `#${prefix}-${name}`;
  return (
    <svg className="svg-icon" aria-hidden="true">
      <use href={symbolId} />
    </svg>
  );
};
