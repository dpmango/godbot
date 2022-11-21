import { useState, memo, useEffect } from 'react';

const SvgIcon = ({ name, clearColors = true }: { name: string; clearColors?: boolean }) => {
  const [viewBox, setViewBox] = useState<string>('0 0 0 0');
  const [width, setWidth] = useState<string>('1em');
  const [icon, setIcon] = useState<string | undefined>(undefined);

  useEffect(() => {
    try {
      const iconRaw = require(`@assets/icons/${name}.svg?raw`);
      // parse from DOM
      const parser = new DOMParser();
      const svg = parser.parseFromString(iconRaw, 'image/svg+xml');
      const viewBox = svg?.querySelector('svg')?.getAttribute('viewBox');
      let body = svg?.querySelector('svg')?.innerHTML;

      if (clearColors) {
        body = body?.replace(/fill="([^"]+)"/g, '').replace(/stroke="([^"]+)"/g, '');
      }

      const size: any = viewBox?.split(' ')?.slice(2);

      if (size && size.length === 2) {
        const ratio = `${(size[0] / size[1]).toFixed(2)}em`;

        setWidth(ratio);
        setViewBox(viewBox || '');
        setIcon(body);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('error loading svg icon', err);
    }
  }, []);

  return icon ? (
    <svg
      style={{ width: width }}
      viewBox={viewBox}
      className={`svg-icon svg-icon--${name}`}
      preserveAspectRatio="none"
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  ) : null;
};

export default memo(SvgIcon);
