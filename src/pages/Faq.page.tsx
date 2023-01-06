import React, { ChangeEvent, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { Layout } from '@c/Layout/Layout';
import { FaqSidebar, FaqHead, FaqCard } from '@c/Faq';
import { IFaqCard } from '@core/interface/Faq';
import { prepareSmartSearchRegexp, clearMorphologyInSearchTerm } from '@utils';

export const FaqPage: React.FC<{}> = () => {
  const { t, i18n } = useTranslation('faq');
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('start');

  const handleSearchClose = () => {
    setSearch('');
  };

  const handleCategoryChange = (id: string) => {
    setSearch('');
    setCategory(id);
  };

  const hasSearch = search.trim().length >= 2;

  const displayItems = useMemo(() => {
    let list = t('accordion', { returnObjects: true }) as IFaqCard[];

    if (hasSearch) {
      const searchRegex = prepareSmartSearchRegexp(
        clearMorphologyInSearchTerm(search.toLowerCase())
      );

      list = list.filter((x) => {
        const regExpObject = new RegExp(searchRegex, 'i');
        const titleMatch = regExpObject.test(x.title.toLowerCase());

        const descriptionMatch = x.body?.some((obj) => {
          const key = Object.keys(obj)[0];

          if (key === 'text') {
            return regExpObject.test((obj[key] as string).toLowerCase());
          } else if (key === 'list') {
            return (obj[key] as string[]).some((y) => regExpObject.test(y.toLowerCase()));
          } else {
            return false;
          }
        });

        return titleMatch || descriptionMatch;
      });
    }

    if (category && !hasSearch) {
      list = list.filter((x) => x.category === category);
    }

    return list;
  }, [category, search, i18n.language]);

  return (
    <Layout>
      <Helmet>
        <title>Godbot | Faq</title>
      </Helmet>

      <div className="content">
        <div className="container">
          <FaqHead search={search} setSearch={setSearch} onSearch={() => true} />
          <div className="faq">
            <FaqSidebar
              category={category}
              setCategory={handleCategoryChange}
              searchActive={hasSearch}
            />

            <div className="faq__body">
              <div className="faq__grid">
                {displayItems && displayItems.length ? (
                  displayItems.map((card, idx) => {
                    return <FaqCard key={idx} {...card} />;
                  })
                ) : (
                  <div className="faq__body faq__body--empty">
                    <div className="faq__empty">
                      <div className="faq__empty-title">{t('notFound.title')}</div>
                      {t('notFound.try')}
                      <br />
                      {t('notFound.can')}
                      <div className="faq__empty-close" onClick={() => handleSearchClose()} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
