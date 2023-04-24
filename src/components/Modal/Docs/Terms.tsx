/* eslint-disable react/no-unescaped-entities */

import { Modal } from '@ui';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const DocsTerms = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('ui', { keyPrefix: 'modal' });

  const closeModal = () => {
    navigate(pathname);
  };

  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);

  return (
    <>
      <Helmet>
        <title>Godbot | Terms of Use, Policies and Disclaimers</title>
      </Helmet>

      <Modal name="terms">
        <div className="modal__block modal__block--text" ref={modalRef}>
          <div className="modal__text">
            <h1>Terms of Use, Policies and Disclaimers</h1>
            <p>
              Your affirmative act of using our website located at{' '}
              <a href="www.godbot.pro" target="_blank">
                www.godbot.pro
              </a>{' '}
              (and all associated sites linked to it) or services ("<strong>GodBot</strong>")
              signifies that you agree to the following terms and conditions of use ("
              <strong>Terms of Use</strong>"). If you do not agree, do not use GodBot. GodBot is the
              property of GodBot ("<strong>us</strong>", "<strong>we</strong>" or "
              <strong>our</strong>").{' '}
            </p>
            <h2>1. Changes to the terms of use</h2>
            <p>
              We may change these Terms of Use at any time. If you continue to use GodBot after we
              post changes to these Terms of Use, you are signifying your acceptance of the new
              terms. You will always have access to our Terms of Use and will be able to check it at
              any time. By reloading this page, you will have the most up-to-date version available
              to GodBot users.
            </p>
            <h2>2. Changes to GodBot</h2>
            <p>
              We may discontinue or change any service or feature on GodBot at any time without
              notice. We do not guarantee backward compatibility of our services and Application
              Programming Interface (API) in this case.
            </p>
            <h2>3. Ownership of information; License to use GodBot; redistribution of data</h2>
            <p>
              Unless otherwise noted, all rights, titles, and interests in GodBot, and all
              information made available through GodBot or our services, in all languages, formats,
              and media throughout the world, luding, but not limited to, all copyrights and
              trademarks therein, are the exclusive property of GodBot, our affiliates or our Data
              Providers, as defined in section 6 (disclaimer regarding content) below.
            </p>
            <p>
              Any methods of copying the contents of GodBot (both full and partial), as well as
              materials used on the site, are prohibited. You are prohibited from sublicensing,
              disposing, selling, leasing or otherwise distributing GodBot content on a commercial
              basis without prior written permission. You may not circumvent any of the site's
              built-in mechanisms to prevent copying or redistribution of GodBot content. For more
              information on commercial use and partnerships with GodBot, please visit the contact
              page. In case of distribution of any materials from the GodBot.pro website, the user
              undertakes to pay a fine in the amount of ten times the proceeds from illegal
              activities, but not less than $100,000 (one hundred thousand) US dollars.
            </p>
            <p>
              <strong>
                You agree that you will not sell any services or materials of the site in any form,
                for any purpose, without the prior written permission of GodBot and/or data
                providers, except as described in the previous paragraphs and expressly allowing it.
                . Without prior written permission from GodBot and their respective data providers,
                you will also not copy any software or documentation that may be made available
                electronically or otherwise, including (but not limited to) translation,
                decompilation, disassembly, or creation of derivative works. works.
              </strong>
            </p>
            <br />
            <p>
              Commercial use of any of our services is prohibited, except as expressly permitted in
              the previous paragraphs.
            </p>
            <h2>4. Attribution</h2>
            <p>
              GodBot grants all users of GodBot.com, and all other available versions of the site,
              to use snapshots of GodBot charts in analysis, press releases, books, articles, blog
              posts and other publications. In addition, GodBot grants the use of all previously
              mentioned materials in education sessions, the display of GodBot charts during video
              broadcasts, which ludes overviews, news, analytics and otherwise use or promote GodBot
              charts or any products from the GodBot website on the condition that GodBot
              attribution is clearly visible at all times when such charts and products are used.
            </p>
            <p>
              Attribution must lude a reference to GodBot, luding, but not limited to, those
              described herein.
            </p>
            <p>
              Use of GodBot charts during video or other promotions where GodBot attribution is not
              visible, must lude a description of the product used therein.
            </p>
            <p>
              You can use the "Snapshot" button in the top toolbar of the chart to instantly create
              a picture file of your current chart. GodBot will automatically take a snapshot with
              all required attributions and provide a link where you can view your chart, download
              it or share it. The use of any GodBot products outside the GodBot website, without a
              proper attribution of GodBot, is not allowed. This extends to any tools (such as
              widgets) obtained on the GodBot website and utilized on the outside resources, where
              attribution should remain as was originally designed and intended. Users who disobey
              this attribution rule herein may be banned permanently, and other legal actions may be
              taken to ensure compliance. This ludes, but is not limited to, cease-and-desist
              warnings, court orders, injunctions, fines, damages relief, and so on.
            </p>
            <h2>5. Third party sites and advertisers</h2>
            <p>
              GodBot may lude links to third party websites. Some of these sites may contain
              materials that are objectionable, unlawful, or inaccurate. You agree that GodBot shall
              not be held liable for any trading activities or other activities that occur on any
              website you access through links on GodBot. We provide these links as a convenience,
              and do not endorse the content or services offered by these other sites. Any dealings
              that you have with advertisers found on GodBot are between you and the advertiser and
              you acknowledge and agree that we are not liable for any loss or claim you may have
              against an advertiser.
            </p>
            <p>
              Unauthorized soliciting on GodBot is strictly prohibited and may result in penalties,
              luding, but not limited to, temporary or permanent bans of the account found in
              violation, and any appropriate and available legal action for monetary and other
              damages.
            </p>
            <h2>6. Disclaimer regarding content</h2>
            <p>
              GodBot cannot and does not represent or guarantee that any of the information
              available through our services or on GodBot is accurate, reliable, current, complete
              or appropriate for your needs. Various information available through our services or
              on GodBot may be specially obtained by GodBot from professional businesses or
              organizations, such as exchanges, news providers, market data providers and other
              content providers. Nevertheless, due to various factors — luding the inherent
              possibility of human and mechanical error — the accuracy, completeness, timeliness,
              results obtained from use, and correct sequencing of information available through our
              services and website are not and cannot be guaranteed by GodBot. We make no warranty
              and assume no obligation or liability for scripts, indicators, ideas and other content
              of third parties. Your use of any third-party scripts, indicators, ideas and other
              content is at your sole risk.
            </p>
            <h2>7. Disclaimer regarding investment decisions and trading</h2>
            <p>
              Decisions to buy, sell, hold or trade in securities, commodities and other investments
              involve risk and are best made based on the advice of qualified financial
              professionals. Any trading in securities or other investments involves a risk of
              substantial losses. The practice of "Day Trading" involves particularly high risks and
              can cause you to lose substantial sums of money. Before undertaking any trading
              program, you should consult a qualified financial professional. Please consider
              carefully whether such trading is suitable for you in light of your financial
              condition and ability to bear financial risks. Under no circumstances shall we be
              liable for any loss or damage you or anyone else urs as a result of any trading or
              investment activity that you or anyone else engages in based on any information or
              material you receive through GodBot or our services.
            </p>
            <h2>8. Disclaimer regarding hypothetical performance results</h2>
            <p>
              Hypothetical performance results have many inherent limitations, some of which are
              mentioned below. No representation is being made that any account will or is likely to
              achieve profits or losses similar to those shown. In fact, there are frequently sharp
              differences between hypothetical performance results and actual results subsequently
              achieved by any particular trading program.
            </p>
            <p>
              One of the limitations of hypothetical performance results is that they are generally
              prepared with the benefit of hindsight. In addition, hypothetical trading does not
              involve financial risk and no hypothetical trading record can completely account for
              the impact of financial risk in actual trading. For example the ability to withstand
              losses or to adhere to a particular trading program in spite of the trading losses are
              material points, which can also adversely affect trading results. There are numerous
              other factors related to the market in general or to the implementation of any
              specific trading program which cannot be fully accounted for in the preparation of
              hypothetical performance results and all of which can adversely affect actual trading
              results.
            </p>
            <h2>9. Access and security</h2>
            <p>
              You accept responsibility for the confidentiality and use of any username and email
              address that use to register for your access to and use of our services. You are
              responsible for maintaining the confidentiality of your password and account and are
              fully responsible for all activities that occur under your password or account. You
              agree to (a) immediately notify GodBot of any unauthorized use of your password or
              account or any other breach of security, and (b) ensure that you exit from your
              account at the end of each session. GodBot cannot and will not be liable for any loss
              or damage arising from your failure to comply.
            </p>
            <p>
              GodBot considers private information on the site (source code of protected or
              invite-only scripts, etc.) to be confidential to you. GodBot protects such private
              information from unauthorized use, access, or disclosure in the same manner that it
              protects personal data (please refer to our Privacy Policy for more information).
            </p>
            <h2>10. Payment and cancellation of service</h2>
            <ol>
              <li>
                By ordering any subscription on{' '}
                <a href="www.godbot.pro" target="_blank">
                  www.godbot.pro
                </a>{' '}
                (luding a free trial period) you confirm that you have read and accepted our Terms
                of Use and you authorize GodBot to automatically charge your bank card or PayPal
                account according to the billing period manually selected by you.
              </li>
              <li>Payment for services is carried out in advance.</li>
              <li>
                We do not issue refunds for original payments. If you pay for the service for the
                first time, please make sure that the order is placed correctly before paying for
                it.
              </li>
              <li>
                Our moderators are official representatives of GodBot who have the authority to warn
                and block users (even if they have a paid subscription) if they do not follow our
                Code of Conduct. We do not issue refunds if you have been blocked from posting
                content and interacting with other users, as your paid subscription, as well as all
                data and / or its functions, is still available during any ban.
              </li>
            </ol>
            <h2>11. Feedback to GodBot</h2>
            <p>
              By submitting ideas, content, suggestions, documents, and/or proposals
              ("Contributions") to GodBot through our contact or feedback webpages, you acknowledge
              and agree that: (a) your Contributions do not contain confidential or proprietary
              information; (b) GodBot is not under any obligation of confidentiality, expressed or
              implied, with respect to the Contributions; (c) GodBot shall be entitled to use or
              disclose (or choose not to use or disclose) such Contributions for any purpose, in any
              way, in any media worldwide; (d) GodBot may have something similar to the
              Contributions already under consideration or in development; (e) your Contributions
              automatically become the property of GodBot, without any obligation of GodBot to you;
              and (f) you are not entitled to any compensation or reimbursement of any kind from
              GodBot under any circumstances.
            </p>
            <h2>12. Disclaimer</h2>
            <p>
              You agree that you will indemnify and hold harmless GodBot, our subsidiaries,
              affiliates, officers, representatives, employees, partners and licensors for the
              satisfaction of any claims, including legal fees, provided to any third party for
              matters arising regarding content that you provide, post, transmit, edit, or otherwise
              make available by using the GodBot Services, connecting to the GodBot Services,
              violating the Terms of Use, or violating any other rules or agreements.
            </p>
            <h2>13. Email</h2>
            <p>
              By creating an account with GodBot, you agree that GodBot may use your email address
              to send you marketing information, service notices, important informational messages,
              special offers, etc. You can unsubscribe by clicking on the link in one of these
              emails.
            </p>
            <h2>14. Third party software</h2>
            <p>
              Our software, website and/or services may include software components provided by
              third parties, which are used with the permission of the direct licensor and/or
              copyright holder on the terms of such parties ("Third Party Software"). GodBot
              expressly disclaims warranty or other liability with respect to Third Party Software.
              Please note that your use of the Third Party Software is governed by the terms and
              conditions of use and privacy policies of the providers of the Third Party Software,
              and not by these Terms of Use or our Privacy Policy.
            </p>
            <p>GodBot may update these Rules at any time.</p>
          </div>

          <div className="modal__btns">
            <div className="btn btn--modal" onClick={closeModal}>
              {t('close')}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
