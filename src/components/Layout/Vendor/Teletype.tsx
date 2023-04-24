// @ts-nocheck
export const TeletypeWidget = () => {
  const { teletypeReady } = useAppSelector((state) => state.uiState);
  const { userData } = useAppSelector((state) => state.userState);

  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    if (!window._teletypeWidget) {
      window._teletypeWidget = window._teletypeWidget || {};
      !(function () {
        const t = document.getElementsByTagName('app-teletype-root');
        if (t.length > 0 && window._teletypeWidget.init) return;
        const d = new Date().getTime();
        const n = document.createElement('script'),
          c = document.getElementsByTagName('script')[0];
        (n.id = 'teletype-widget-embed'),
          (n.src = 'https://widget.teletype.app/init.js?_=' + d),
          (n.async = !0),
          n.setAttribute('data-embed-version', '0.1');
        c.parentNode.insertBefore(n, c);
      })();

      document.addEventListener('teletype.ready', function () {
        dispatch(setTeletypeReady(true));
      });

      window.teletypeExternalId = import.meta.env.VITE_TELETYPE_KEY;
    }
  });

  useEffect(() => {
    if (teletypeReady && userData) {
      const integrationData = {
        email: userData?.name,
        name: userData?.name,
        payload: {
          language: i18n.language,
          timezone: getTimezone(),
          user: userData,
        },
      };

      window._teletypeWidget.setPersonData(integrationData);
    }
  }, [userData?.tariff, teletypeReady]);

  return (
    <>
      <app-teletype-root />
    </>
  );
};
