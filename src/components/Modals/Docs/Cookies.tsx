import { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { useAppSelector } from '@core';
import { Modal } from '@ui';
import { useClickOutside } from '@hooks';

export const DocsCookies: React.FC<{}> = () => {
  const { currentModal } = useAppSelector((state) => state.modalState);

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
        <title>Godbot | Cookies Policy</title>
      </Helmet>

      <Modal name="cookies">
        <div className="modal__block modal__block--text" ref={modalRef}>
          <div className="modal__title">Cookies Policy</div>
          <div className="modal__text">
            <p>
              This Cookies Policy (<strong>&quot;Cookies Policy&quot;</strong>) describes cookies
              and other technologies that GodBot,&nbsp;&nbsp;(<strong>&quot;GodBot&quot;</strong>,{' '}
              <strong>&quot;we&quot;</strong>, <strong>&quot;us&quot;</strong> or{' '}
              <strong>&quot;our&quot;</strong>) uses on its website (
              <strong>&quot;Site&quot;</strong>) and the choices that users have. This Cookies
              Policy is a part of GodBot&rsquo;s Privacy Policy.&nbsp;
            </p>
            <p>
              When you first visit the Site, you will be asked to consent to the use of cookies in
              accordance with this Cookies Policy. Note that if you accept, we will store them on
              your computer.
            </p>
            <p>
              <strong>What is a cookie?</strong>
            </p>
            <p>
              A &apos;cookie&apos; is a piece of information that is sent to your browser by a
              website you visit. The Site uses first party cookies (those set by a website that is
              being visited by the user at the time. For example, cookies via www.GodBot.pro) as
              well as third-party cookies (set by a different domain), as described below.
            </p>
            <p>
              Cookies can be stored on your computer for various periods of time. They can be in a
              form of either &quot;session cookies&quot; or &quot;persistent cookies.&quot; A
              session cookie only lasts as long as the browser session and is automatically deleted
              when you close your browser. A persistent cookie lasts long after your browser is
              closed and will remain until it expires (as determined by the third party in charge of
              placing it) or until you delete the cookie. Persistent cookies are used to help sites
              recognize and identify your computer when you open your browser and surf the Internet
              again.
            </p>
            <p>
              The data collected through cookies may lude information about the IP (Internet
              Protocol) address of your device, browser type, language, operating system, the state
              or country from which you have accessed the Site, the date and the time of your
              visit(s), the number of links you click on this Site, the functions you use, the
              searches you request, and the data you have saved while on this Site. GodBot may use
              the information collected for a variety of necessary, legitimate purposes, luding user
              authentication, user interface customization, security, research and analysis to
              improve the functionality of our Site, and advertising (for more information on how we
              use your data, please read our Privacy Policy).
            </p>
            <p>
              <strong>How do we use cookies?</strong>
            </p>
            <p>
              The following sets out how we use different categories of cookies, as well as
              information on your options for managing your settings for the data collected by these
              technologies:
            </p>
            <ul>
              <li>
                <strong>Necessary cookies:</strong> These cookies are used to provide users with
                services available through a Site and to use some of its features, such as the
                ability to log-in and access secure areas, provide pop-up notices, and accept
                language from sign-up forms. These cookies are essential for using and navigating a
                Site. Without them, basic functions of our Site would not work. Because these
                cookies are strictly necessary to deliver our Site&rsquo;s essential services, you
                cannot refuse them.&nbsp;
              </li>
              <li>
                <strong>Performance/Analytics cookies:</strong> These cookies are used to recognize
                and count the number of Site visitors, gather statistics regarding how visitors move
                around the Site (luding number of page views and the amount time spent on each page)
                and for conversion tracking and click hotspots. This helps us improve the way our
                Site works and general user experience. For example, these cookies allow us to
                ensure that users are able to find what they need easily.&nbsp;
              </li>
              <li>
                <strong>Advertising cookies (ad cookies):</strong> These cookies are used to show
                advertising that is relevant to you.&nbsp;
              </li>
              <li>
                <strong>Cookies used to integrate third party services:</strong> These cookies are
                used to integrate third-party functions on the Site, such as videos, maps, or social
                network plug-ins.&nbsp;
              </li>
              <li>
                <strong>Other third party cookies:</strong> On some parts of the Site, luding, but
                not limited, to news widgets, we use content provided by other websites (third
                parties). These third party sites are able to set their own cookies in some cases.
                Note that we have no control over these third-party cookies. You can turn them off
                by disabling them on your browser. You can find more information on the most popular
                web-browser help pages:&nbsp;
                <ul>
                  <li>
                    <a href="https://support.google.com/chrome/answer/95647">Google Chrome</a>&nbsp;
                  </li>
                  <li>
                    <a href="https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer">
                      Mozilla Firefox
                    </a>
                    &nbsp;
                  </li>
                  <li>
                    <a href="https://support.microsoft.com/help/4027947/windows-delete-cookies">
                      Microsoft Edge
                    </a>
                    &nbsp;
                  </li>
                  <li>
                    <a href="https://support.apple.com/guide/safari/sfri11471/mac">
                      Safari (macOS)
                    </a>
                    &nbsp;
                  </li>
                  <li>
                    <a href="https://support.apple.com/HT201265">Safari (iOS)</a>&nbsp;
                  </li>
                </ul>
              </li>
            </ul>
            <p>
              For other browsers, please consult the documentation that your browser manufacturer
              provides.
            </p>
            <p>
              <strong>Web beacons</strong>
            </p>
            <p>
              Web beacons, also called tracking pixels, are tiny graphics with unique identifiers
              that allow us to track usage patterns, count users who have visited a particular page,
              advertising impressions and clicks (ad reactions), etc. Web beacons can only collect
              limited information, including a cookie number, time and date of a page view, and a
              description of the page on which the web beacon resides. These beacons do not carry
              any personal data and are only used to track the effectiveness of this Site and to
              show advertisements based on user interests. We use web beacons in connection with
              Google Analytics and advertising services as well as our Snowplow Tracker. The
              information generated relating to our Site is used for various necessary and
              legitimate purposes, including the creation of reports on the use of this site as well
              as the development, testing, and improvement of services. Google will store
              information of users&rsquo; actions on the GodBot Site and it will be collected by
              Google services. For more information on Google&rsquo;s use of data for marketing and
              analytics purposes, please see{' '}
              <a href="https://www.google.com/policies/technologies/ads">
                Advertising &ndash; Privacy &amp; Terms
              </a>{' '}
              and <a href="https://policies.google.com/privacy">Google&rsquo;s Privacy Policy</a>
              .&nbsp;
            </p>
            <p>
              <strong>Changes</strong>
            </p>
            <p>
              We may change the type of third party service providers that place cookies on our Site
              and amend this Cookies Policy at any time by posting the amended version on our Site.
              Unless additional notice or consent is required by applicable laws, this will serve as
              your official notification of these changes.
            </p>
            <p>
              <br />
            </p>
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
