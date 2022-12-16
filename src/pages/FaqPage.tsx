import React, { ChangeEvent, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { Layout } from '@c/Layout/Layout';
import cns from 'classnames';

interface IFaq {
  title: string;
  descr: any;
  open?: boolean;
}

export const FaqPage: React.FC<{}> = () => {
  const { t } = useTranslation('faq');
  const [accordion, setAccordion] = useState<IFaq[]>(t('accordion', { returnObjects: true }));
  const accordionStore: [] = t('accordion', { returnObjects: true });
  const [search, setSearch] = useState<string>('');

  const handleCLick = (index: number) => () => {
    const accordionChange = JSON.parse(JSON.stringify(accordion));
    accordionChange.map((e: IFaq, indexNew: number) => {
      if (accordion[index].open) {
        e.open = false;
      } else {
        e.open = indexNew === index;
      }
    });
    setAccordion(accordionChange);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSearch = () => {
    const searchNew: IFaq[] = [];
    accordionStore.map((e: IFaq) => {
      if (e.title.toLowerCase().includes(search)) {
        searchNew.push(e);
      }
    });
    setAccordion(searchNew);
  };

  const handleSearchClose = () => () => {
    setSearch('');
    setAccordion(accordionStore);
  };

  return (
    <Layout>
      <Helmet>
        <title>Godbot | Faq</title>
      </Helmet>
      <div className={cns('content')}>
        <div className="mainwrap themeLight">
          <div className="content">
            <div className="container">
              <div className="search">
                <div className="search__text">
                  <div className="search__title">{t('title')}</div>
                  {t('titleHelp')}
                </div>
                <div className="search__form">
                  <div className="search__input-wrap">
                    <input
                      className="search__input"
                      type="text"
                      placeholder="Введите вопрос для поиска"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleSearchChange(e.target.value)
                      }
                      value={search}
                    />
                    <svg width="20" height="20">
                      <use xlinkHref="img/icons-sprite.svg#search"></use>
                    </svg>
                  </div>
                  <button className="btn btn--search" onClick={handleSearch}>
                    {t('search')}
                  </button>
                </div>
              </div>
              <div className="faq">
                <div className="faq__menu">
                  <div className="swiper swiper--faq">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <a className="faq__menu-link faq__menu-link--active">
                          <svg width="16" height="16">
                            <use xlinkHref="img/icons-sprite.svg#home"></use>
                          </svg>
                          Getting started
                        </a>
                      </div>
                      <div className="swiper-slide">
                        <a className="faq__menu-link">
                          <svg width="16" height="16">
                            <use xlinkHref="img/icons-sprite.svg#user"></use>
                          </svg>
                          Account
                        </a>
                      </div>
                      <div className="swiper-slide">
                        <a className="faq__menu-link">
                          <svg width="16" height="16">
                            <use xlinkHref="img/icons-sprite.svg#money"></use>
                          </svg>
                          Billing
                        </a>
                      </div>
                      <div className="swiper-slide">
                        <a className="faq__menu-link">
                          <svg width="16" height="16">
                            <use xlinkHref="img/icons-sprite.svg#rocket"></use>
                          </svg>
                          Features
                        </a>
                      </div>
                      <div className="swiper-slide">
                        <a className="faq__menu-link">
                          <svg width="16" height="16">
                            <use xlinkHref="img/icons-sprite.svg#dots"></use>
                          </svg>
                          Other
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="faq__body">
                  <div className="faq__grid">
                    <>
                      {accordion.map((e: IFaq, index: number) => {
                        return (
                          <div className="question" key={index}>
                            <div
                              className={`question__title ${e.open && 'question__title--active'}`}
                              onClick={handleCLick(index)}>
                              {e.title}
                              <svg width="18" height="18">
                                <use xlinkHref="img/icons-sprite.svg#chevrondown"></use>
                              </svg>
                            </div>
                            <div
                              className={`question__inner ${e.open && 'question__inner--active'}`}>
                              <p>{e.descr.text1}</p>
                              <div className="question__media">
                                <img src="img/temp/3.png" alt="" />
                              </div>
                              <p>{e.descr.text1}</p>
                              <div className="question__media">
                                <a href="#">
                                  <img src="img/temp/4.png" alt="" />
                                  <span className="question__play"></span>
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {!accordion.length && (
                        <div className="faq__body faq__body--empty">
                          <div className="faq__empty">
                            <div className="faq__empty-title">{t('notFound.title')}</div>
                            {t('notFound.try')}
                            <br />
                            {t('notFound.can')}
                            <div className="faq__empty-close" onClick={handleSearchClose()} />
                          </div>
                        </div>
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
