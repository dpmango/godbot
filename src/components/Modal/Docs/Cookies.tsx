import { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { Modal } from '@ui';
import { useClickOutside } from '@hooks';

export const DocsCookies: React.FC<{}> = () => {
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
          <div className="modal__text">
            <h1>Cookies Policy</h1>
            <p>
              This Cookies Policy ("<strong>Cookies Policy</strong>") describes cookies and other
              technologies that GodBot, ("<strong>GodBot</strong>", "<strong>we</strong>", "
              <strong>us</strong>" or "<strong>our</strong>") uses on its website ("
              <strong>Site</strong>") and the choices that users have. This Cookies Policy is a part
              of GodBot’s Privacy Policy. When you first visit the Site, you will be asked to
              consent to the use of cookies in accordance with this Cookies Policy. Note that if you
              accept, we will store them on your computer.
            </p>
            <h2>What is a cookie?</h2>
            <p>
              A 'cookie' is a piece of information that is sent to your browser by a website you
              visit. The Site uses first party cookies (those set by a website that is being visited
              by the user at the time. For example, cookies via www.GodBot.pro) as well as
              third-party cookies (set by a different domain), as described below.
            </p>
            <p>
              Cookies can be stored on your computer for various periods of time. They can be in a
              form of either "session cookies" or "persistent cookies." A session cookie only lasts
              as long as the browser session and is automatically deleted when you close your
              browser. A persistent cookie lasts long after your browser is closed and will remain
              until it expires (as determined by the third party in charge of placing it) or until
              you delete the cookie. Persistent cookies are used to help sites recognize and
              identify your computer when you open your browser and surf the Internet again.
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
            <h2>How do we use cookies?</h2>
            <p>
              The following sets out how we use different categories of cookies, as well as
              information on your options for managing your settings for the data collected by these
              technologies:
            </p>
            <ul>
              <li>
                Necessary cookies: These cookies are used to provide users with services available
                through a Site and to use some of its features, such as the ability to log-in and
                access secure areas, provide pop-up notices, and accept language from sign-up forms.
                These cookies are essential for using and navigating a Site. Without them, basic
                functions of our Site would not work. Because these cookies are strictly necessary
                to deliver our Site’s essential services, you cannot refuse them.
              </li>
              <li>
                Performance/Analytics cookies: These cookies are used to recognize and count the
                number of Site visitors, gather statistics regarding how visitors move around the
                Site (luding number of page views and the amount time spent on each page) and for
                conversion tracking and click hotspots. This helps us improve the way our Site works
                and general user experience. For example, these cookies allow us to ensure that
                users are able to find what they need easily.
              </li>
              <li>
                Advertising cookies (ad cookies): These cookies are used to show advertising that is
                relevant to you.
              </li>
              <li>
                Cookies used to integrate third party services: These cookies are used to integrate
                third-party functions on the Site, such as videos, maps, or social network plug-ins.
              </li>
              <li>
                Other third party cookies: On some parts of the Site, luding, but not limited, to
                news widgets, we use content provided by other websites (third parties). These third
                party sites are able to set their own cookies in some cases. Note that we have no
                control over these third-party cookies. You can turn them off by disabling them on
                your browser. You can find more information on the most popular web-browser help
                pages:
                <ul>
                  <li>
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank">
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer"
                      target="_blank">
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.microsoft.com/help/4027947/windows-delete-cookies"
                      target="_blank">
                      Microsoft Edge
                    </a>
                  </li>
                  <li>
                    <a href="https://support.apple.com/guide/safari/sfri11471/mac" target="_blank">
                      Safari (macOS)
                    </a>
                  </li>
                  <li>
                    <a href="https://support.apple.com/HT201265" target="_blank">
                      Safari (iOS)
                    </a>
                  </li>
                </ul>
                For other browsers, please consult the documentation that your browser manufacturer
                provides.
              </li>
            </ul>
            <h2>Web beacons</h2>
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
              information of users’ actions on the GodBot Site and it will be collected by Google
              services. For more information on Google’s use of data for marketing and analytics
              purposes, please see{' '}
              <a href="https://www.google.com/policies/technologies/ads" target="_blank">
                Advertising – Privacy &amp; Terms
              </a>{' '}
              and{' '}
              <a href="https://policies.google.com/privacy" target="_blank">
                Google’s Privacy Policy
              </a>
              .
            </p>
            <h2>Changes</h2>
            <p>
              We may change the type of third party service providers that place cookies on our Site
              and amend this Cookies Policy at any time by posting the amended version on our Site.
              Unless additional notice or consent is required by applicable laws, this will serve as
              your official notification of these changes.
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
