import { useState, useMemo, useRef, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { SpriteIcon } from '@ui';
import { useClickOutside, useProfile } from '@hooks';

export const Languages: React.FC<{}> = () => {
  const [opened, setOpened] = useState(false);

  const { t, i18n } = useTranslation();
  const { setUserSettings } = useProfile();

  const languages = [
    { key: 'ru', lang: 'ru-RU' },
    { key: 'en', lang: 'en-US' },
    { key: 'tr', lang: 'tr-TR' },
  ];

  const activeLanguage = useMemo(() => {
    return languages.find((x) => x.lang === i18n.language) || { key: 'ru', lang: 'ru-RU' };
  }, [i18n.language]);

  const displayLanguages = useMemo(() => {
    return languages.filter((x) => x.lang !== i18n.language);
  }, [i18n.language]);

  const handleLanguageSelect = (e: MouseEvent, lang: string) => {
    e.preventDefault();
    i18n.changeLanguage(lang);
    setOpened(false);
    setUserSettings();
  };

  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => opened && setOpened(false));

  return (
    <div className="header__lang" ref={dropdownRef}>
      <div
        className={cns('header__lang-opener', opened && 'header__lang-opener--active')}
        onClick={() => setOpened(true)}>
        <img src={`img/language/${activeLanguage.key}.svg`} alt={activeLanguage?.key} />
        <SpriteIcon name="chevrondown" width="18" height="18" />
      </div>
      <div className={cns('header__lang-dropdown', opened && 'header__lang-dropdown--active')}>
        {displayLanguages.map((lang) => (
          <a
            key={lang.key}
            className="header__lang-link"
            title={lang.key}
            onClick={(e) => handleLanguageSelect(e, lang.lang)}>
            <img src={`img/language/${lang.key}.svg`} alt="En" />
          </a>
        ))}
      </div>
    </div>
  );
};
