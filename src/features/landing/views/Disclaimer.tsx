import "./Disclaimer.css";
export default function Disclaimer() {
   return (
      <div>
         <section className="disclaimer-section">
            <div className="disclaimer-container">
               <h1 className="disclaimer-title">Play to Heal Disclaimer</h1>
               <br></br>
               <p>Last Updated: 11/01/2025</p>
               <p>Effective Date: 11/01/2025</p>
            </div>

            <div className="disclaimer-list">
               <h2>Purpose</h2>
               <p>
                  The Play to Heal hub is a digital ecosystem created by Trance4mation
                  Games, LLC to promote healing, connection, and emotional well-being
                  through dialogue-based therapeutic games and additional support
                  elements. The platform offers resources for reflection, communication,
                  and community-building — not clinical or medical treatment.
               </p>
            </div>

            <div className="disclaimer-list">
               <h2>Not a Substitute for Therapy or Medical Care</h2>
               <p>
                  All content and interactions within the Play to Heal Platform— including
                  questions, reflections, exercises, and discussions — are for educational
                  and supportive purposes only. They do not replace mental health therapy,
                  medical care, or crisis intervention.
               </p>
               <br></br>
               <p>
                  If you are in crisis or experiencing distress, please seek immediate
                  support by:
               </p>
               <ul>
                  <li>Calling your local emergency number.</li>
                  <li>Contacting the 988 Suicide and Crisis Lifeline (U.S. specific).</li>
               </ul>
            </div>

            <div className="disclaimer-list">
               <h2>No Guarantee of Results</h2>
               <p>
                  The Play to Heal Platform aims to facilitate personal growth, connection
                  and emotional awareness. However, individual experiences and outcomes
                  may vary. We do not guarantee specific results, emotional states, or
                  behavioral outcomes from participation.
               </p>
            </div>

            <div className="disclaimer-list">
               <h2>Third-Party Links</h2>
               <p>
                  Play to Heal may include links or connections to other websites,
                  facilitators, or organizations. These are provided for convenience. We
                  do not control and are not responsible for the content or privacy
                  practices of any third-party sites.
               </p>
            </div>

            <div className="disclaimer-list">
               <h2>Limitation of Liability</h2>
               <p>
                  By using the Play to Heal Platform, you agree that Trance4mation Games,
                  LLC is not liable for any injury, emotional distress, or loss arising
                  from use of the platform, except where prohibited by law.
               </p>
            </div>

            <div className="disclaimer-list">
               <h2>Acceptance</h2>
               <p>
                  By using the Play to Heal Platform, you acknowledge that you have read,
                  understood, and agreed to this Disclaimer.
               </p>
            </div>
         </section>
      </div>
   );
}
