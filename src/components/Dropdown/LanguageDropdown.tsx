import { useEffect, useLayoutEffect, useState } from "react";
import { useDropdown } from "../../hooks/useDropdown";
import { IUseFetch, useFetch } from "../../hooks/useFetch";
import { Loader } from "../UIelems/Loader";

interface ILanguages {
  icon: string;
  language: string;
}

export const LanguageDropdown: React.FC<{}> = () => {
  const [languages, setLanguages] = useState<ILanguages[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState("");
  const { getFetch } = useFetch(setLanguages);

  const { handleStateChange, menuState } = useDropdown();

  useLayoutEffect(() => {
    getFetch("/languages");
  }, []);

  useLayoutEffect(() => {
    setCurrentLanguage(languages[0]?.icon);
  }, [languages]);

  const handleClick = (elem: string) => {
    handleStateChange();
    setCurrentLanguage(elem);
  };

  if (!languages.length) return <Loader />;

  return (
    <div className="language">
      <button
        className={menuState ? "language__button _active" : "language__button"}
        onClick={() => handleStateChange()}
      >
        <img src={`./images/${currentLanguage}`} alt="Current Language" />
      </button>
      <ul className={menuState ? "language__list _active" : "language__list"}>
        {languages &&
          languages.map((elem) => (
            <li
              className={
                elem.icon === currentLanguage
                  ? "language__item _disabled"
                  : "language__item"
              }
              key={elem.language}
              onClick={() => handleClick(elem.icon)}
            >
              <img src={`./images/${elem.icon}`} alt={elem.language} />
              {elem.language}
            </li>
          ))}
      </ul>
    </div>
  );
};
