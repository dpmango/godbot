import { SpriteIcon } from '@ui';

interface IFaqHeadProps {
  search: string;
  setSearch: (x: string) => void;
  onSearch: () => void;
}

export const FaqHead: React.FC<IFaqHeadProps> = ({ search, setSearch, onSearch }) => {
  const { t, i18n } = useTranslation('faq', { keyPrefix: 'head' });

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="search">
      <div className="search__text">
        <div className="search__title">{t('title')}</div>
        {t('description')}
      </div>
      <div className="search__form">
        <div className="search__input-wrap">
          <input
            className="search__input"
            type="text"
            placeholder={t('placeholder') as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearchChange(e.target.value)
            }
            value={search}
          />
          <SpriteIcon name="search" width="20" height="20" />
        </div>
        <button className="btn btn--search" onClick={onSearch}>
          {t('search')}
        </button>
      </div>
    </div>
  );
};
