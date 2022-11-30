import { useState, useMemo, useRef, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { SpriteIcon } from '@ui';
import { useClickOutside } from '@hooks';

export const Languages: React.FC<{}> = () => {
  const [opened, setOpened] = useState(false);

  const { t, i18n } = useTranslation();

  const languageList = useMemo(() => {
    return [{ key: 'ru' }, { key: 'en' }, { key: 'tr' }].filter((x) => x.key !== i18n.language);
  }, [i18n.language]);

  const handleLanguageSelect = (e: MouseEvent, lang: string) => {
    e.preventDefault();
    i18n.changeLanguage(lang);
    setOpened(false);
  };

  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => opened && setOpened(false));

  return (
    <div className="header__lang" ref={dropdownRef}>
      <div
        className={cns('header__lang-opener', opened && 'header__lang-opener--active')}
        onClick={() => setOpened(true)}>
        <img src={`img/language/${i18n.language}.svg`} alt={i18n.language} />
        <SpriteIcon name="chevrondown" width="18" height="18" />
      </div>
      <div className={cns('header__lang-dropdown', opened && 'header__lang-dropdown--active')}>
        {languageList.map((lang) => (
          <a
            key={lang.key}
            className="header__lang-link"
            title={lang.key}
            onClick={(e) => handleLanguageSelect(e, lang.key)}>
            <img src={`img/language/${lang.key}.svg`} alt="En" />
          </a>
        ))}
      </div>
    </div>
  );
};
