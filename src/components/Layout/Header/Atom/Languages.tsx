import { useState, useMemo, useRef, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import cns from 'classnames';

import { SpriteIcon } from '@ui';
import { languageList, ILangSelect } from '@utils';
import { useClickOutside, useProfile } from '@hooks';

export const Languages: React.FC<{}> = () => {
  const [opened, setOpened] = useState(false);

  const { t, i18n } = useTranslation();
  const { setUserSettings } = useProfile();

  const activeLanguage = useMemo(() => {
    return languageList.find((x) => x.lang === i18n.language) || { key: 'en', lang: 'en-US' };
  }, [i18n.language]);

  const displayLanguages = useMemo(() => {
    return languageList.filter((x) => x.lang !== i18n.language);
  }, [i18n.language]);

  const handleLanguageSelect = (e: MouseEvent, lang: ILangSelect) => {
    e.preventDefault();
    i18n.changeLanguage(lang.lang);
    dayjs.locale(lang.key);
    setOpened(false);
    setUserSettings();
  };

  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => opened && setOpened(false));

  return (
    <div className="header__lang" ref={dropdownRef}>
      <div
        className={cns('header__lang-opener', opened && 'header__lang-opener--active')}
        onClick={() => setOpened(!opened)}>
        <img src={`img/language/${activeLanguage.key}.svg`} alt={activeLanguage?.key} />
        <SpriteIcon name="chevrondown" width="18" height="18" />
      </div>
      <div className={cns('header__lang-dropdown', opened && 'header__lang-dropdown--active')}>
        {displayLanguages.map((lang) => (
          <a
            key={lang.key}
            className="header__lang-link"
            title={lang.key}
            onClick={(e) => handleLanguageSelect(e, lang)}>
            <img src={`img/language/${lang.key}.svg`} alt="En" />
          </a>
        ))}
      </div>
    </div>
  );
};
