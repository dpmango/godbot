import { useLayoutEffect, useState, useRef } from 'react';
import { useSkeleton, useDropdown, useClickOutside } from '@hooks';

import { SvgIcon } from '@ui';

interface ILanguages {
  icon: string;
  language: string;
}

export const LanguageDropdown: React.FC<{}> = () => {
  const [languages, setLanguages] = useState<ILanguages[]>([
    { language: 'RU', icon: 'rus.svg' },
    // { language: "EN", icon: "eng.svg" },
  ]);
  const [currentLanguage, setCurrentLanguage] = useState('');

  const { loading } = useSkeleton(Boolean(languages.length));

  const { handleStateChange, menuState } = useDropdown();
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => handleStateChange(false));

  useLayoutEffect(() => {
    setCurrentLanguage(languages[0]?.icon);
  }, [languages]);

  const handleClick = (elem: string) => {
    handleStateChange();
    setCurrentLanguage(elem);
  };

  return (
    <div className="language" ref={wrapperRef}>
      <button
        className={menuState ? 'language__button _active' : 'language__button'}
        onClick={() => handleStateChange()}>
        {loading ? (
          <div
            className="skeleton-box"
            style={{ width: '20px', height: '21px', borderRadius: '4px' }}></div>
        ) : (
          <>
            <img src={`./images/${currentLanguage}`} alt="Current Language" />
            <div className="language__toggle">
              <SvgIcon name="chevron" />
            </div>
          </>
        )}
      </button>
      <ul className={menuState ? 'language__list _active' : 'language__list'}>
        {languages &&
          languages.map((elem) => (
            <li
              className={
                elem.icon === currentLanguage ? 'language__item _disabled' : 'language__item'
              }
              key={elem.language}
              onClick={() => handleClick(elem.icon)}>
              <img src={`./images/${elem.icon}`} alt={elem.language} />
              {/* {elem.language} */}
            </li>
          ))}
      </ul>
    </div>
  );
};
