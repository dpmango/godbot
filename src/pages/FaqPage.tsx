import React from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '@c/Layout/Layout';
import cns from 'classnames';

export const FaqPage: React.FC<{}> = () => {
  return (
    <Layout>
      <Helmet>
        <title>Godbot | Faq</title>
      </Helmet>
      <div className={cns('content')}>
        <div className="mainwrap themeLight">
          <div className="content">
            <div className="container">
              <form className="search">
                <div className="search__text">
                  <div className="search__title">Часто задаваемые вопросы</div>
                  Здесь размещены все ответы на вопросы, которые могут у вас возникнуть
                </div>
                <div className="search__form">
                  <div className="search__input-wrap">
                    <input
                      className="search__input"
                      type="text"
                      placeholder="Введите вопрос для поиска"
                    />
                    <svg width="20" height="20">
                      <use xlinkHref="img/icons-sprite.svg#search"></use>
                    </svg>
                  </div>
                  <button className="btn btn--search">НАЙТИ</button>
                </div>
              </form>
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
                    <div className="question">
                      <div className="question__title">
                        Что такое открытый и закрытый ключи?
                        <svg width="18" height="18">
                          <use xlinkHref="img/icons-sprite.svg#chevrondown"></use>
                        </svg>
                      </div>
                      <div className="question__inner">
                        <p>
                          Заинтересованность в покупке криптовалюты впоследствии приведет вас к
                          часто задаваемым вопросам о криптовалюте, связанным с криптокошельками.
                          Криптокошельки — это в основном платформы для безопасного хранения
                          цифровых активов по сравнению с биржами. Пользователи могут держать
                          кошелек через учетную запись биржи или депозитный кошелек и даже из-за
                          пределов биржи. На самом деле, криптовалютные кошельки помогают хранить
                          закрытые ключи от вашей криптовалюты в блокчейне.
                        </p>
                        <div className="question__media">
                          <img src="img/temp/3.png" alt="" />
                        </div>
                        <p>
                          Заинтересованность в покупке криптовалюты впоследствии приведет вас к
                          часто задаваемым вопросам о криптовалюте, связанным с криптокошельками.
                          Криптокошельки — это в основном платформы для безопасного хранения
                          цифровых активов по сравнению с биржами. Пользователи могут держать
                          кошелек через учетную запись биржи или депозитный кошелек и даже из-за
                          пределов биржи. На самом деле, криптовалютные кошельки помогают хранить
                          закрытые ключи от вашей криптовалюты в блокчейне.
                        </p>
                        <div className="question__media">
                          <a href="#">
                            <img src="img/temp/4.png" alt="" />
                            <span className="question__play"></span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="question">
                      <div className="question__title">
                        Как работают криптовалюты?
                        <svg width="18" height="18">
                          <use xlinkHref="img/icons-sprite.svg#chevrondown"></use>
                        </svg>
                      </div>
                      <div className="question__inner">
                        <p>
                          Заинтересованность в покупке криптовалюты впоследствии приведет вас к
                          часто задаваемым вопросам о криптовалюте, связанным с криптокошельками.
                          Криптокошельки — это в основном платформы для безопасного хранения
                          цифровых активов по сравнению с биржами. Пользователи могут держать
                          кошелек через учетную запись биржи или депозитный кошелек и даже из-за
                          пределов биржи. На самом деле, криптовалютные кошельки помогают хранить
                          закрытые ключи от вашей криптовалюты в блокчейне.
                        </p>
                        <div className="question__media">
                          <img src="img/temp/3.png" alt="" />
                        </div>
                        <p>
                          Заинтересованность в покупке криптовалюты впоследствии приведет вас к
                          часто задаваемым вопросам о криптовалюте, связанным с криптокошельками.
                          Криптокошельки — это в основном платформы для безопасного хранения
                          цифровых активов по сравнению с биржами. Пользователи могут держать
                          кошелек через учетную запись биржи или депозитный кошелек и даже из-за
                          пределов биржи. На самом деле, криптовалютные кошельки помогают хранить
                          закрытые ключи от вашей криптовалюты в блокчейне.
                        </p>
                        <div className="question__media">
                          <a href="#">
                            <img src="img/temp/4.png" alt="" />
                            <span className="question__play"></span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="question">
                      <div className="question__title">
                        В чем причины популярности криптовалют?
                        <svg width="18" height="18">
                          <use xlinkHref="img/icons-sprite.svg#chevrondown"></use>
                        </svg>
                      </div>
                      <div className="question__inner">
                        <p>
                          Заинтересованность в покупке криптовалюты впоследствии приведет вас к
                          часто задаваемым вопросам о криптовалюте, связанным с криптокошельками.
                          Криптокошельки — это в основном платформы для безопасного хранения
                          цифровых активов по сравнению с биржами. Пользователи могут держать
                          кошелек через учетную запись биржи или депозитный кошелек и даже из-за
                          пределов биржи. На самом деле, криптовалютные кошельки помогают хранить
                          закрытые ключи от вашей криптовалюты в блокчейне.
                        </p>
                        <div className="question__media">
                          <img src="img/temp/3.png" alt="" />
                        </div>
                        <p>
                          Заинтересованность в покупке криптовалюты впоследствии приведет вас к
                          часто задаваемым вопросам о криптовалюте, связанным с криптокошельками.
                          Криптокошельки — это в основном платформы для безопасного хранения
                          цифровых активов по сравнению с биржами. Пользователи могут держать
                          кошелек через учетную запись биржи или депозитный кошелек и даже из-за
                          пределов биржи. На самом деле, криптовалютные кошельки помогают хранить
                          закрытые ключи от вашей криптовалюты в блокчейне.
                        </p>
                        <div className="question__media">
                          <a href="#">
                            <img src="img/temp/4.png" alt="" />
                            <span className="question__play"></span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="question">
                      <div className="question__title">
                        Что такое криптовалютные кошельки?
                        <svg width="18" height="18">
                          <use xlinkHref="img/icons-sprite.svg#chevrondown"></use>
                        </svg>
                      </div>
                      <div className="question__inner">
                        <p>
                          Заинтересованность в покупке криптовалюты впоследствии приведет вас к
                          часто задаваемым вопросам о криптовалюте, связанным с криптокошельками.
                          Криптокошельки — это в основном платформы для безопасного хранения
                          цифровых активов по сравнению с биржами. Пользователи могут держать
                          кошелек через учетную запись биржи или депозитный кошелек и даже из-за
                          пределов биржи. На самом деле, криптовалютные кошельки помогают хранить
                          закрытые ключи от вашей криптовалюты в блокчейне.
                        </p>
                        <div className="question__media">
                          <img src="img/temp/3.png" alt="" />
                        </div>
                        <p>
                          Заинтересованность в покупке криптовалюты впоследствии приведет вас к
                          часто задаваемым вопросам о криптовалюте, связанным с криптокошельками.
                          Криптокошельки — это в основном платформы для безопасного хранения
                          цифровых активов по сравнению с биржами. Пользователи могут держать
                          кошелек через учетную запись биржи или депозитный кошелек и даже из-за
                          пределов биржи. На самом деле, криптовалютные кошельки помогают хранить
                          закрытые ключи от вашей криптовалюты в блокчейне.
                        </p>
                        <div className="question__media">
                          <a href="#">
                            <img src="img/temp/4.png" alt="" />
                            <span className="question__play"></span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="question">
                      <div className="question__title">
                        Как работают криптовалюты?
                        <svg width="18" height="18">
                          <use xlinkHref="img/icons-sprite.svg#chevrondown"></use>
                        </svg>
                      </div>
                      <div className="question__inner">
                        <p>
                          Заинтересованность в покупке криптовалюты впоследствии приведет вас к
                          часто задаваемым вопросам о криптовалюте, связанным с криптокошельками.
                          Криптокошельки — это в основном платформы для безопасного хранения
                          цифровых активов по сравнению с биржами. Пользователи могут держать
                          кошелек через учетную запись биржи или депозитный кошелек и даже из-за
                          пределов биржи. На самом деле, криптовалютные кошельки помогают хранить
                          закрытые ключи от вашей криптовалюты в блокчейне.
                        </p>
                        <div className="question__media">
                          <img src="img/temp/3.png" alt="" />
                        </div>
                        <p>
                          Заинтересованность в покупке криптовалюты впоследствии приведет вас к
                          часто задаваемым вопросам о криптовалюте, связанным с криптокошельками.
                          Криптокошельки — это в основном платформы для безопасного хранения
                          цифровых активов по сравнению с биржами. Пользователи могут держать
                          кошелек через учетную запись биржи или депозитный кошелек и даже из-за
                          пределов биржи. На самом деле, криптовалютные кошельки помогают хранить
                          закрытые ключи от вашей криптовалюты в блокчейне.
                        </p>
                        <div className="question__media">
                          <a href="#">
                            <img src="img/temp/4.png" alt="" />
                            <span className="question__play"></span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="question">
                      <div className="question__title">
                        В чем причины популярности криптовалют?
                        <svg width="18" height="18">
                          <use xlinkHref="img/icons-sprite.svg#chevrondown"></use>
                        </svg>
                      </div>
                      <div className="question__inner">
                        <p>
                          Заинтересованность в покупке криптовалюты впоследствии приведет вас к
                          часто задаваемым вопросам о криптовалюте, связанным с криптокошельками.
                          Криптокошельки — это в основном платформы для безопасного хранения
                          цифровых активов по сравнению с биржами. Пользователи могут держать
                          кошелек через учетную запись биржи или депозитный кошелек и даже из-за
                          пределов биржи. На самом деле, криптовалютные кошельки помогают хранить
                          закрытые ключи от вашей криптовалюты в блокчейне.
                        </p>
                        <div className="question__media">
                          <img src="img/temp/3.png" alt="" />
                        </div>
                        <p>
                          Заинтересованность в покупке криптовалюты впоследствии приведет вас к
                          часто задаваемым вопросам о криптовалюте, связанным с криптокошельками.
                          Криптокошельки — это в основном платформы для безопасного хранения
                          цифровых активов по сравнению с биржами. Пользователи могут держать
                          кошелек через учетную запись биржи или депозитный кошелек и даже из-за
                          пределов биржи. На самом деле, криптовалютные кошельки помогают хранить
                          закрытые ключи от вашей криптовалюты в блокчейне.
                        </p>
                        <div className="question__media">
                          <a href="#">
                            <img src="img/temp/4.png" alt="" />
                            <span className="question__play"></span>
                          </a>
                        </div>
                      </div>
                    </div>
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
