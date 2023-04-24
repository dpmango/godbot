/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-auto-import
export {}
declare global {
  const LOG: typeof import('./src/core/utils/dev')['LOG'];
  const PerformanceLog: typeof import('./src/core/utils/dev')['PerformanceLog'];
  const Plurize: typeof import('./src/core/utils/localize')['Plurize'];
  const VERSION: typeof import('./src/core/utils/dev')['VERSION'];
  const api: typeof import('./src/core/api')['api'];
  const buildParams: typeof import('./src/core/utils/api')['buildParams'];
  const capitalizeFirstLetter: typeof import('./src/core/utils/search')['capitalizeFirstLetter'];
  const clearMorphologyInSearchTerm: typeof import('./src/core/utils/search')['clearMorphologyInSearchTerm'];
  const clearPhone: typeof import('./src/core/utils/validation')['clearPhone'];
  const clearString: typeof import('./src/core/utils/validation')['clearString'];
  const cns: typeof import('classnames')['default'];
  const copyToClipboard: typeof import('./src/core/utils/clipboard')['copyToClipboard'];
  const createRef: typeof import('react')['createRef'];
  const dateToDDMMMM: typeof import('./src/core/utils/datetime')['dateToDDMMMM'];
  const forecastState: typeof import('./src/store/forecast.store')['forecastState'];
  const forecastStore: typeof import('./src/store/forecast.store')['default'];
  const formatDate: typeof import('./src/core/utils/datetime')['formatDate'];
  const formatPrice: typeof import('./src/core/utils/price')['formatPrice'];
  const formatUGC: typeof import('./src/core/utils/search')['formatUGC'];
  const formatUnixDate: typeof import('./src/core/utils/datetime')['formatUnixDate'];
  const forwardRef: typeof import('react')['forwardRef'];
  const getChart: typeof import('./src/store/forecast.store')['getChart'];
  const getCoins: typeof import('./src/store/forecast.store')['getCoins'];
  const getCurrentUser: typeof import('./src/store/user.store')['getCurrentUser'];
  const getInvesting: typeof import('./src/store/investor.store')['getInvesting'];
  const getLanguageByKey: typeof import('./src/core/utils/lang')['getLanguageByKey'];
  const getPartnership: typeof import('./src/store/user.store')['getPartnership'];
  const getPluralKey: typeof import('./src/core/utils/localize')['getPluralKey'];
  const getRandomInt: typeof import('./src/core/utils/dev')['getRandomInt'];
  const getSalesTime: typeof import('./src/core/utils/sales')['getSalesTime'];
  const getSignals: typeof import('./src/store/signals.store')['getSignals'];
  const getTimezone: typeof import('./src/core/utils/datetime')['getTimezone'];
  const investorState: typeof import('./src/store/investor.store')['investorState'];
  const investorStore: typeof import('./src/store/investor.store')['default'];
  const isDevelopmentSite: typeof import('./src/core/utils/dev')['isDevelopmentSite'];
  const isModalOpened: typeof import('./src/core/utils/url')['isModalOpened'];
  const isValidNumber: typeof import('./src/core/utils/validation')['isValidNumber'];
  const languageList: typeof import('./src/core/utils/lang')['languageList'];
  const lazy: typeof import('react')['lazy'];
  const localStorageGet: typeof import('./src/core/utils/localstorage')['localStorageGet'];
  const localStorageSet: typeof import('./src/core/utils/localstorage')['localStorageSet'];
  const localizeKeys: typeof import('./src/core/utils/localize')['localizeKeys'];
  const memo: typeof import('react')['memo'];
  const openExternalLink: typeof import('./src/core/utils/url')['openExternalLink'];
  const pad: typeof import('./src/core/utils/datetime')['pad'];
  const prepareSmartSearchRegexp: typeof import('./src/core/utils/search')['prepareSmartSearchRegexp'];
  const reachGoal: typeof import('./src/core/utils/tracker')['reachGoal'];
  const removeQueryParam: typeof import('./src/core/utils/url')['removeQueryParam'];
  const resetUser: typeof import('./src/store/user.store')['resetUser'];
  const secondsToStamp: typeof import('./src/core/utils/datetime')['secondsToStamp'];
  const setFilter: typeof import('./src/store/signals.store')['setFilter'];
  const setSimulator: typeof import('./src/store/forecast.store')['setSimulator'];
  const setStateCoin: typeof import('./src/store/forecast.store')['setStateCoin'];
  const setStateTime: typeof import('./src/store/forecast.store')['setStateTime'];
  const setTeletypeReady: typeof import('./src/store/ui.store')['setTeletypeReady'];
  const setTutorialComplete: typeof import('./src/store/user.store')['setTutorialComplete'];
  const setVideoModal: typeof import('./src/store/ui.store')['setVideoModal'];
  const signalState: typeof import('./src/store/signals.store')['signalState'];
  const signalsStore: typeof import('./src/store/signals.store')['default'];
  const startTransition: typeof import('react')['startTransition'];
  const store: typeof import('./src/core/store')['store'];
  const timeDiff: typeof import('./src/core/utils/datetime')['timeDiff'];
  const timeToTz: typeof import('./src/core/utils/datetime')['timeToTz'];
  const uiState: typeof import('./src/store/ui.store')['uiState'];
  const uiStore: typeof import('./src/store/ui.store')['default'];
  const useAppDispatch: typeof import('./src/core/store')['useAppDispatch'];
  const useAppSelector: typeof import('./src/core/store')['useAppSelector'];
  const useCallback: typeof import('react')['useCallback'];
  const useChart: typeof import('./src/core/hooks/useChart')['useChart'];
  const useClickOutside: typeof import('./src/core/hooks/useClickOutside')['useClickOutside'];
  const useContext: typeof import('react')['useContext'];
  const useDebounce: typeof import('./src/core/hooks/useDebounce')['useDebounce'];
  const useDebugValue: typeof import('react')['useDebugValue'];
  const useDeferredValue: typeof import('react')['useDeferredValue'];
  const useEffect: typeof import('react')['useEffect'];
  const useI18n: typeof import('./src/core/i18n')['useI18n'];
  const useId: typeof import('react')['useId'];
  const useImperativeHandle: typeof import('react')['useImperativeHandle'];
  const useInsertionEffect: typeof import('react')['useInsertionEffect'];
  const useLayoutEffect: typeof import('react')['useLayoutEffect'];
  const useMemo: typeof import('react')['useMemo'];
  const useProfile: typeof import('./src/core/hooks/useProfile')['useProfile'];
  const useReducer: typeof import('react')['useReducer'];
  const useRef: typeof import('react')['useRef'];
  const useScrollLock: typeof import('./src/core/hooks/useScrollLock')['useScrollLock'];
  const useState: typeof import('react')['useState'];
  const useSyncExternalStore: typeof import('react')['useSyncExternalStore'];
  const useTariff: typeof import('./src/core/hooks/useTariff')['useTariff'];
  const useTransition: typeof import('react')['useTransition'];
  const useTranslation: typeof import('react-i18next')['useTranslation'];
  const useWindowParams: typeof import('./src/core/hooks/useWindowParams')['useWindowParams'];
  const userState: typeof import('./src/store/user.store')['userState'];
  const userStore: typeof import('./src/store/user.store')['default'];
  const validDate: typeof import('./src/core/utils/validation')['validDate'];
  const validEmail: typeof import('./src/core/utils/validation')['validEmail'];
  const validPhone: typeof import('./src/core/utils/validation')['validPhone'];
}