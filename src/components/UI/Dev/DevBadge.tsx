import { useState } from 'react';
import cns from 'classnames';

import { isDevelopmentSite } from '@utils';
import { VERSION } from '@utils/dev';

export const DevBadge: React.FC<{}> = () => {
  if (!isDevelopmentSite) return null;

  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        top: '80%',
        background: 'tomato',
        color: 'white',
        fontSize: 10,
        fontWeight: 600,
        borderRadius: 4,
        opacity: 0.85,
        padding: '0.2em 0.35em',
      }}>
      DEV {VERSION}
    </div>
  );
};
