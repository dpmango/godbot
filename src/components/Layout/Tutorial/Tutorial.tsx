import './tutorial.scss';

// @ts-ignore
import Tour from 'reactour';

const svgInfo = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0Z"
      fill="white"
    />
    <path
      d="M7.17977 6.56494C6.8399 6.56494 6.56438 6.84046 6.56438 7.18033C6.56438 7.52019 6.8399 7.79571 7.17977 7.79571C7.29306 7.79571 7.3849 7.88755 7.3849 8.00084V12.1034C7.3849 12.4433 7.66041 12.7188 8.00028 12.7188C8.34015 12.7188 8.61567 12.4433 8.61567 12.1034V7.18033C8.61567 6.84046 8.34015 6.56494 8.00028 6.56494H7.17977Z"
      fill="#4572EE"
    />
    <circle cx="8.00008" cy="3.8981" r="0.615385" fill="#4572EE" />
  </svg>
);

export const Tutorial: React.FC<any> = () => {
  const { userData } = useAppSelector((state) => state.userState);
  const [step, setStep] = useState();

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { t, i18n } = useTranslation('tutorial');

  const onRequestClose = () => {
    setSearchParams({});
    dispatch(setTutorialComplete(true));

    // dispatch(setSimulator({ enabled: true }));
    // navigate('?simguide');

    if (i18n.language === 'ru-RU') {
      navigate('?guide');
    }
  };

  const showTutorial = useMemo(() => {
    if (isModalOpened(searchParams)) return false;

    if (searchParams.get('tutorial') !== null) {
      return true;
    }

    if (userData) {
      return userData.tariff && !userData.tutorial_complete;
    }

    return false;
  }, [userData, searchParams]);

  return (
    <div>
      <Tour
        isOpen={showTutorial}
        showButtons={false}
        showNumber={false}
        showNavigation={false}
        steps={[
          {
            content: ({ goTo, close }: { goTo: any; close: any }) => (
              <div className="tour">
                <h4>{t('steps.step.title')}</h4>
                <p>{t('steps.step.text')}</p>
                <div className="tourBtns">
                  <button className="tourNextBtn" onClick={() => goTo(1)}>
                    {t('btns.start')}
                  </button>
                  <button className="tourNextBtn tourNextBtn-white" onClick={() => close()}>
                    {t('btns.skip')}
                  </button>
                </div>
              </div>
            ),
            style: {
              maxWidth: '360px',
            },
          },
          {
            selector: '.chart',
            content: ({ goTo }: { goTo: any }) => (
              <div className="tourStep">
                <div className="tourStepText">
                  <span>1/10</span>
                  <span className="infoSvg">{svgInfo}</span>
                  <span>{t('steps.step1.text')}</span>
                </div>
                <div className="tourStep-btns">
                  <div className="tourStep-next" onClick={() => goTo(2)}>
                    {t('btns.next')}
                  </div>
                </div>
              </div>
            ),
            style: {
              maxWidth: '600px',
              backgroundColor: '#4572EE',
              color: '#fff',
            },
          },
          {
            selector: '.select:first-child',
            content: ({ goTo }: { goTo: any }) => (
              <div className="tourStep">
                <div className="tourStepText">
                  <span>2/10</span>
                  <span className="infoSvg">{svgInfo}</span>
                  <span>{t('steps.step2.text')}</span>
                </div>
                <div className="tourStep-btns">
                  <div className="tourStep-prev" onClick={() => goTo(1)}>
                    {t('btns.prev')}
                  </div>
                  <div className="tourStep-next" onClick={() => goTo(3)}>
                    {t('btns.next')}
                  </div>
                </div>
              </div>
            ),
            style: {
              maxWidth: '600px',
              backgroundColor: '#4572EE',
              color: '#fff',
            },
          },
          {
            selector: '.select:last-child',
            content: ({ goTo }: { goTo: any }) => (
              <div className="tourStep">
                <div className="tourStepText">
                  <span>3/10</span>
                  <span className="infoSvg">{svgInfo}</span>
                  <span>{t('steps.step3.text')}</span>
                </div>
                <div className="tourStep-btns">
                  <div className="tourStep-prev" onClick={() => goTo(2)}>
                    {t('btns.prev')}
                  </div>
                  <div className="tourStep-next" onClick={() => goTo(4)}>
                    {t('btns.next')}
                  </div>
                </div>
              </div>
            ),
            style: {
              maxWidth: '600px',
              backgroundColor: '#4572EE',
              color: '#fff',
            },
          },
          {
            selector: '.chart',
            content: ({ goTo }: { goTo: any }) => (
              <div className="tourStep">
                <div className="tourStepText">
                  <span>4/10</span>
                  <span className="infoSvg">{svgInfo}</span>
                  <span>{t('steps.step4.text')}</span>
                </div>
                <div className="tourStep-btns">
                  <div className="tourStep-prev" onClick={() => goTo(3)}>
                    {t('btns.prev')}
                  </div>
                  <div className="tourStep-next" onClick={() => goTo(5)}>
                    {t('btns.next')}
                  </div>
                </div>
              </div>
            ),
            style: {
              maxWidth: '600px',
              backgroundColor: '#4572EE',
              color: '#fff',
            },
          },
          {
            selector: '.chart__settings-opener',
            content: ({ goTo }: { goTo: any }) => (
              <div className="tourStep">
                <div className="tourStepText">
                  <span>5/10</span>
                  <span className="infoSvg">{svgInfo}</span>
                  <span>{t('steps.step5.text')}</span>
                </div>
                <div className="tourStep-btns">
                  <div className="tourStep-prev" onClick={() => goTo(4)}>
                    {t('btns.prev')}
                  </div>
                  <div className="tourStep-next" onClick={() => goTo(6)}>
                    {t('btns.next')}
                  </div>
                </div>
              </div>
            ),
            style: {
              maxWidth: '600px',
              backgroundColor: '#4572EE',
              color: '#fff',
            },
          },
          {
            selector: '.investing',
            content: ({ goTo }: { goTo: any }) => (
              <div className="tourStep">
                <div className="tourStepText">
                  <span>6/10</span>
                  <span className="infoSvg">{svgInfo}</span>
                  <span>{t('steps.step6.text')}</span>
                </div>
                <div className="tourStep-btns">
                  <div className="tourStep-prev" onClick={() => goTo(5)}>
                    {t('btns.prev')}
                  </div>
                  <div className="tourStep-next" onClick={() => goTo(7)}>
                    {t('btns.next')}
                  </div>
                </div>
              </div>
            ),
            style: {
              maxWidth: '600px',
              backgroundColor: '#4572EE',
              color: '#fff',
            },
          },
          {
            selector: '.investing__block',
            content: ({ goTo }: { goTo: any }) => (
              <div className="tourStep">
                <div className="tourStepText">
                  <span>7/10</span>
                  <span className="infoSvg">{svgInfo}</span>
                  <span>{t('steps.step7.text')}</span>
                </div>
                <div className="tourStep-btns">
                  <div className="tourStep-prev" onClick={() => goTo(6)}>
                    {t('btns.prev')}
                  </div>
                  <div className="tourStep-next" onClick={() => goTo(8)}>
                    {t('btns.next')}
                  </div>
                </div>
              </div>
            ),
            style: {
              maxWidth: '600px',
              backgroundColor: '#4572EE',
              color: '#fff',
            },
          },
          /*
          Пропускаем 8 шаг
           {
            selector: '.test123',
            content: ({ goTo }: { goTo: any }) => (
              <div className="tourStep">
                <div className="tourStepText">
                  <span>8/11</span>
                  <span className="infoSvg">{svgInfo}</span>
                  <span>{t('steps.step8.text')}</span>
                </div>
                <div className="tourStep-btns">
                  <div className="tourStep-prev" onClick={() => goTo(7)}>
                    {t('btns.prev')}
                  </div>
                  <div className="tourStep-next" onClick={() => goTo(9)}>
                    {t('btns.next')}
                  </div>
                </div>
              </div>
            ),
            style: {
              maxWidth: '600px',
              backgroundColor: '#4572EE',
              color: '#fff',
            },
          },
          */
          {
            selector: '.recommend',
            content: ({ goTo }: { goTo: any }) => (
              <div className="tourStep">
                <div className="tourStepText">
                  <span>8/10</span>
                  <span className="infoSvg">{svgInfo}</span>
                  <span>{t('steps.step9.text')}</span>
                </div>
                <div className="tourStep-btns">
                  <div className="tourStep-prev" onClick={() => goTo(7)}>
                    {t('btns.prev')}
                  </div>
                  <div className="tourStep-next" onClick={() => goTo(9)}>
                    {t('btns.next')}
                  </div>
                </div>
              </div>
            ),
            style: {
              maxWidth: '600px',
              backgroundColor: '#4572EE',
              color: '#fff',
            },
          },
          {
            selector: '.header__user-head',
            content: ({ goTo }: { goTo: any }) => (
              <div className="tourStep">
                <div className="tourStepText">
                  <span>9/10</span>
                  <span className="infoSvg">{svgInfo}</span>
                  <span>{t('steps.step10.text')}</span>
                </div>
                <div className="tourStep-btns">
                  <div className="tourStep-prev" onClick={() => goTo(8)}>
                    {t('btns.prev')}
                  </div>
                  <div className="tourStep-next" onClick={() => goTo(10)}>
                    {t('btns.next')}
                  </div>
                </div>
              </div>
            ),
            style: {
              maxWidth: '600px',
              backgroundColor: '#4572EE',
              color: '#fff',
            },
            highlightedSelectors: ['.header__user-dropdown'],
          },
          {
            selector: '.header__user-soc',
            content: ({ goTo, close }: { goTo: any; close: any }) => (
              <div className="tourStep">
                <div className="tourStepText">
                  <span>10/10</span>
                  <span className="infoSvg">{svgInfo}</span>
                  <span>{t('steps.step11.text')}</span>
                </div>
                <div className="tourStep-btns">
                  <div className="tourStep-prev" onClick={() => goTo(9)}>
                    {t('btns.prev')}
                  </div>
                  <div className="tourStep-next" onClick={() => close()}>
                    {t('btns.finish')}
                  </div>
                </div>
              </div>
            ),
            style: {
              maxWidth: '600px',
              backgroundColor: '#4572EE',
              color: '#fff',
            },
          },
        ]}
        maskClassName="mask"
        className="helper"
        rounded={5}
        onAfterOpen={() => (document.body.style.overflowY = 'hidden')}
        onBeforeClose={() => (document.body.style.overflowY = 'auto')}
        onRequestClose={onRequestClose}
        prevButton={false}
        getCurrentStep={(step: any) => {
          setStep(step);
          if (step === 6 || step === 7) {
            const btn = document.querySelector(
              '.tabs .tabs__link:last-child'
            ) as HTMLElement | null;

            if (btn != null) {
              btn.click();
            }
          } else if (step === 8) {
            const btn = document.querySelector(
              '.tabs .tabs__link:nth-child(2)'
            ) as HTMLElement | null;

            if (btn != null) {
              btn.click();
            }
          } else if (step === 9 || step === 10) {
            const btn = document.querySelector('.header__user-opener') as HTMLElement | null;

            if (btn != null) {
              btn.click();
            }
          } else {
            const btn = document.querySelector(
              '.tabs .tabs__link:first-child'
            ) as HTMLElement | null;

            if (btn != null) {
              btn.click();
            }
          }
        }}
      />
    </div>
  );
};
