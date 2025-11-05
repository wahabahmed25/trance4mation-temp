import "./Cookies.css";

export default function Cookies() {
   return (
      <div>
         <section className="cookies-section">
            <div className="cookies-container">
               <h1 className="cookies-title">Play to Heal Cookies Policy</h1>
               <br></br>
               <p>Last Updated: 11/01/2025</p>
               <p>Effective Date: 11/01/2025</p>
            </div>

            <div className="cookies-list">
               <h2>What Are Cookies?</h2>
               <p>
                  Cookies are small data files stored on your device when you visit a
                  website or use an app. They help improve functionality, personalize your
                  experience, and analyze site performance.
               </p>
            </div>

            <div className="cookies-list">
               <h2>How We Use Cookies</h2>
               <p>We use cookies to:</p>
               <ul>
                  <li>Keep you signed in and maintain session preferences.</li>
                  <li>Remember your settings and language preferences.</li>
                  <li>
                     Understand how you use Play to Heal so we can improve functionality.
                  </li>
                  <li>Support analytics that help us measure engagement and impact.</li>
               </ul>
            </div>

            <div className="cookies-list">
               <h2>Types of Cookies We Use</h2>
               <ul>
                  <li>
                     <b>Essential Cookies</b> – Required for basic site functionality and
                     login.
                  </li>
                  <li>
                     <b>Analytics Cookies</b> – Help us understand how users interact with
                     the platform.
                  </li>
                  <li>
                     <b>Preference Cookies</b> – Store your chosen settings.
                  </li>
                  <li>
                     <b>Third-Party Cookies</b> – Set by trusted partners (e.g., analytics
                     or embedded media).
                  </li>
               </ul>
            </div>

            <div className="cookies-list">
               <h2>Your Choices</h2>
               <p>
                  You can control or delete cookies at any time by adjusting your browser
                  settings. Disabling cookies may affect how certain parts of the Play to
                  Heal Platform function.
               </p>
            </div>

            <div className="cookies-list">
               <h2>Changes to This Policy</h2>
               <p>
                  We may update our Cookies Policy from time to time. Updates will appear
                  here with a revised “Last Updated” date.
               </p>
            </div>

            <div className="cookies-list">
               <h2>Contact</h2>
               <p>
                  Questions? Email us at
                  <a href="mailto:info@playtohealhub.com">
                     <span>
                        <b> info@playtohealhub.com </b>
                     </span>
                  </a>
               </p>
            </div>
         </section>
      </div>
   );
}
