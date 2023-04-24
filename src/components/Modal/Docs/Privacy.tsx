/* eslint-disable react/no-unescaped-entities */

import { Modal } from '@ui';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const DocsPrivacy = () => {
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
        <title>Godbot | Privacy Policy</title>
      </Helmet>

      <Modal name="privacy">
        <div className="modal__block modal__block--text" ref={modalRef}>
          <div className="modal__text">
            <h1>Privacy Policy</h1>
            <p>
              <strong>In brief:</strong> We are GodBot ("<strong>GodBot</strong>," "
              <strong>we</strong>" or "<strong>us</strong>"). We respect your privacy and work hard
              to protect the confidentiality of information that you give us. We will share your
              personal data with third parties only in the event that it’s needed for the provision
              of services and data you have requested (explained in detail in this privacy policy).{' '}
            </p>
            <h2>About Us</h2>
            <p>
              GodBot is the data controller responsible for your personal data and is the sole owner
              of the GodBot.com website ("<strong>Website</strong>"), GodBot mobile and desktop
              applications, GodBot services (each, a "<strong>Service</strong>") and all of the
              information collected on it. GodBot collects information from users in several ways
              (explained in detail in this privacy policy).
            </p>
            <p>
              This privacy policy applies to personal data that we collect from you when you visit
              this Website, create an account, use our applications or services ("
              <strong>you</strong>" or "<strong>your</strong>" being interpreted accordingly). It
              provides information on what personal data we collect, why we collect personal data,
              how it is used, the lawful basis on which your personal data is processed, how it is
              stored, and how we share information.
            </p>
            <p>
              As used in this privacy policy, "<strong>personal data</strong>" means any information
              that relates to you from which you can be identified. By using our Service or
              submitting your personal data, you are agreeing to accept the terms of this privacy
              policy, so please read it carefully. If you disagree with this privacy policy at any
              point or time, you should stop using our Services and delete your user account.
            </p>
            <h2>Updates</h2>
            <p>
              We may update this privacy policy at our discretion from time to time by posting a new
              version on our Website. You should check our Website occasionally to ensure any
              changes made are suitable for you. If required by applicable law, you will be informed
              of any significant changes made to the privacy policy.
            </p>
            <p>The current version of this privacy policy was modified on August 15, 2022.</p>
            <h2>Personal data that we collect:</h2>
            <p>
              <strong>
                If you decide to create an account, you will need to provide us with some personal
                data so we can provide you with access to our additional services that users benefit
                from. You may also elect to provide us with additional information about you, as
                described below.
              </strong>
            </p>
            <p>During registration you will be required to provide us with your email address;</p>
            <p>
              We also process any personal data that you choose to provide when contacting us by
              phone, e-mail or other means, as well as interacting with this Website.
            </p>
            <h3>Cookies and other technologies</h3>
            <p>
              We use browser cookies (small text files placed on your device) to administer our
              Site, gather and analyze statistical information, ensure security, to fight spam, and
              for advertising purposes. Cookies allow us to provide you with a better user
              experience when you browse our Website and helps to improve its features. More
              detailed information on the use of cookies can be found in our Cookies Policy.
            </p>
            <p>
              We also use web beacons (tiny graphics with a unique identifier) for analytics and
              advertising purposes and to develop, test, and improve our services further, as
              described in our Cookies Policy.
            </p>
            <h3>Log files</h3>
            <p>
              Like most websites, we use web server log files. Records in our log files include
              internet protocol (IP) addresses (see the "Device information" section below for
              further details), browser types, internet service providers, referring pages, exit
              pages, platform types, and date/time stamps. We use web server log files to administer
              the site, provide broad traffic information for site planning purposes, and to ensure
              that our terms of service agreement is being adhered to. Note that IP addresses are
              not tied to personal data in our web server log files.
            </p>
            <h3>Device information</h3>
            <p>
              We collect the following information about the devices you use to interact with our
              services: IP address of the device (from which we can also infer the country you are
              connecting from), operating system, and browser version. We collect this information
              to prevent spam and abuse of our services. IP addresses may be considered personal
              data in certain jurisdictions, and will be treated in accordance with this privacy
              policy.
            </p>
            <h3>Analytics</h3>
            <p>
              When you are using our Website, mobile and desktop applications, or widgets we provide
              to another site, we may collect analytics information automatically. This information
              may include your general device information, device identifiers (for example, Google
              Advertising ID, if you are using an Android device, or Advertising Identifier (IDFA),
              if you are using an iOS device), network information, website, and application
              interaction events. We collect pseudonymous data only and this analytic information
              does not include any personal identifiable information from your profile. We use this
              information to analyze and improve the work of our services and applications, and to
              develop, test, and improve our service further. For this purpose we may use internal
              analytic as well as third party service providers. For further details about our use
              of third party service providers, please refer to the Analytics providers section
              below.
            </p>
            <h2>How personal information is used</h2>
            <p>
              We use personal data in various ways that are necessary to provide the services you
              intend to use, certain legitimate interests, and as a necessity in order to comply
              with applicable law, as further described below.
            </p>
            <p>
              We do not generally rely on your consent to allow us to process your personal data if
              there is another lawful ground available. If we do rely on your consent, we will make
              this clear to you at that time.
            </p>
            <h3>Marketing</h3>
            <p>
              We may send you marketing emails about our products or services that are similar to
              the products or services you are subscribed to, including information about events and
              other promotions we feel may interest you. This is unless you have indicated to us
              that you do not wish to receive communications in this manner. We will send you other
              promotional information by email only with your consent, which was given at the time
              you provided us with your personal data. Users can opt out of receiving marketing
              communications at any time by clicking "unsubscribe" in one of the emails (for more
              information on your rights, please see the "User rights" section below).
            </p>
            <h3>Service-Related Announcements</h3>
            <p>
              On rare occasions, it may be necessary to send out service-related announcements. For
              instance, if our service is interrupted for a prolonged period or a major
              functionality upgrade is released, we might send all users an email message.
            </p>
            <h3>Customer Service</h3>
            <p>
              When you open a support ticket, we use your contact details as well as information
              about your device, server logs, a description of the problem, along with any other
              supporting materials (videos, screenshots, etc.) to help resolve the issue(s).
            </p>
            <h3>Legitimate interests</h3>
            <p>
              We will process your personal data as necessary for certain legitimate business
              interests, which include the following:
            </p>
            <ul>
              <li>
                where we are asked to respond to any of your inquiries, comments, or grievances;
              </li>
              <li>
                to administer our services in order to better understand how visitors interact with
                the Website and application, and ensure that they are presented in the most
                effective manner for you and your computer/device;
              </li>
              <li>to develop and improve our mobile applications;</li>
              <li>
                to share personal data among our affiliated businesses for administrative purposes,
                provide subscription services, and in relation to our sales and marketing
                activities, except where we require your consent, as described above;
              </li>
              <li>
                to send you information about our products or services that are similar to the
                products or services you subscribed to (unless you have refused or opted out of
                receiving these emails at the time you provided us with your email address or you
                have indicated to us that you do not wish to receive communications in this manner).
                Our legitimate interest is to ensure our marketing is relevant to you, so we may
                process your data to send you information on our products or services that is
                specifically tailored to your interests;
              </li>
              <li>
                we may anonymize, pseudonymize, aggregate and de-identify the data that we collect
                and use this data for our own internal business purposes, including sharing it with
                our business partners, our affiliated businesses, agents and other third parties for
                commercial, statistical and market research purposes. For example, to allow those
                parties to analyse patterns among groups of people and conducting research on
                demographics, interests, and behavior;
              </li>
              <li>
                for internal business/technical operations, including troubleshooting, data
                analysis, testing, research, statistical and survey purposes, and as part of our
                efforts to keep our Website, network, and information systems secure; and
              </li>
              <li>
                to (a) comply with legal obligations, (b) respond to requests from competent
                authorities; (c) enforce our Terms of Use or House Rules; (d) protect our operations
                or those of any of our affiliated businesses; (e) protect our rights, safety or
                property, and/or that of our affiliated businesses, you or others; and (f) enforce
                or defend legal rights, or prevent damage. This means we can store and disclose your
                information to law enforcement authorities, state, or government agencies if we
                establish that such disclosure is necessary to comply with the law. This includes
                responses to court orders or subpoenas, as well as other judicial or regulatory
                processes.
              </li>
            </ul>
            <p>
              As used in this privacy policy, “legitimate interests” means the interests of GodBot
              and our affiliated businesses in conducting and managing our business. When we process
              your personal data for our legitimate interests, we make sure to consider and balance
              any potential impact on you and your rights under data protection laws. Our legitimate
              interests do not automatically override your interests. We do not use personal data
              for activities where our interests override the impact they may have on our users,
              unless we have their explicit consent or those activities are otherwise required or
              permitted by law. You have the right to object to the processing of your personal data
              that is based on our legitimate interests at any time, on grounds relating to your
              particular situation.
            </p>
            <h2>Security of personal data</h2>
            <p>
              We use technical and organizational safeguards to protect your personal data and
              require third parties with whom we work to do the same.
            </p>
            <p>
              We use Transport Layer Security (TLS) encryption technology in order to protect
              certain information that you submit to us. This technology protects you from having
              your information intercepted by anyone while it is being transmitted to GodBot or
              payment processor. While on a secure page, such as our order form, the "lock" icon in
              the browser window is displayed, confirming that a secure and encrypted connection has
              been established with the Website. We work hard to ensure that our Service is secure
              and that we meet industry standards. We also use other safeguards, such as firewalls,
              authentication systems (i.e. passwords, and personal identification numbers), and
              access control mechanisms to control unauthorized access to systems and data. If you
              have chosen to create an account, you are responsible for doing everything you
              reasonably can to keep your access details secret. You must not share these details
              with anyone else.
            </p>
            <p>
              We also do our best to protect user information offline. All of our users' personal
              information is restricted to our offices. Only employees who need to see the
              information to perform their jobs are allowed to access it.
            </p>
            <p>
              The servers that store personal data are located in a secure environment in a locked
              facility.
            </p>
            <p>
              We are constantly improving the ways we secure, store, and process the data we
              collect, including the addition of physical security measures that help us counter
              unauthorized access to our systems. However, no method of electronic transmission or
              storage is 100% secure. Therefore, we cannot guarantee its absolute security.
            </p>
            <h2>EEA and UK users' specific rights</h2>
            <p>
              Individuals subject to European and United Kingdom ("UK") data protection laws may
              have data subject rights in relation to the personal data we hold on them (described
              in detail below). This may, in and of itself, be subject to limitations and/or
              restrictions.
            </p>
            <p>If you are located in the EEA or UK, please contact us to exercise your rights.</p>
            <h3>Accessing data</h3>
            <p>
              If prompted, we will confirm whether or not we are processing your personal data and
              if so, we will provide you with a copy of that personal data along with any other
              pertinent details. If you require additional copies, we may need to charge a
              reasonable fee, but this can be discussed and depends on the situation.
            </p>
            <h3>Restricting the processing of personal data</h3>
            <p>
              You may ask us to restrict or ‘block’ the processing of your personal data in certain
              circumstances, for example, if you contest the accuracy of the data or object to us
              processing it. We will notify you before we lift any restriction on processing. If we
              share your personal data with others, we will notify them of the restriction wherever
              possible. If prompted, and if it is possible and lawful to do so, we will also notify
              you with whom we have shared or will share your personal data so you can contact them
              directly.
            </p>
            <h3>Objections</h3>
            <p>You may:</p>
            <ul>
              <li>
                ask us to stop processing your personal data at any time, and we will do so. If we
                are relying on a legitimate interest to process your personal data, then it should
                not be a problem unless we demonstrate compelling legitimate grounds for processing;
              </li>
              <li>
                object to our processing of your data for the purposes of direct marketing at any
                time. This can be done by clicking the "unsubscribe" button in our marketing emails;
                and
              </li>
              <li>
                refuse to receive service notifications via email (for example, when a user you are
                subscribed to publishes a chart, idea, etc.). This can be adjusted in the User
                Settings.
              </li>
            </ul>
            <h3>Withdrawal of consent</h3>
            <p>
              If we rely on your consent to process your personal data, you have the right to
              withdraw that consent at any time. This will not affect the lawfulness with which we
              process your data before receiving notice of your wish to withdraw your consent. We
              emphasize that we do not generally rely on your consent to allow us to process your
              personal data if there is another lawful ground available. If we do rely on your
              consent, we will make this clear to you at that time.
            </p>
            <h2>Contact information</h2>
            <p>
              If you have any questions or suggestions regarding the processing of personal data,
              please contact us at <a href="mailto:privacy@godbot.pro">privacy@godbot.pro</a>{' '}
              (please note that we do not provide user or account support via email, this address is
              for privacy inquiries only).
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
