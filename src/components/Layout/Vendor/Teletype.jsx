import { useLayoutEffect } from 'react';

export const TeletypeWidget = () => {
  useLayoutEffect(() => {
    if (!window._teletypeWidget) {
      window._teletypeWidget = window._teletypeWidget || {};
      !(function () {
        var t = document.getElementsByTagName('app-teletype-root');
        if (t.length > 0 && _teletypeWidget.init) return;
        var d = new Date().getTime();
        var n = document.createElement('script'),
          c = document.getElementsByTagName('script')[0];
        (n.id = 'teletype-widget-embed'),
          (n.src = 'https://widget.teletype.app/init.js?_=' + d),
          (n.async = !0),
          n.setAttribute('data-embed-version', '0.1');
        c.parentNode.insertBefore(n, c);
      })();

      // document.addEventListener('teletype.ready', function () {
      //   console.log('Teletype ready');
      // });

      window.teletypeExternalId = process.env.REACT_APP_TELETYPE_KEY;
    }
  });

  return (
    <>
      <app-teletype-root />
    </>
  );
};
