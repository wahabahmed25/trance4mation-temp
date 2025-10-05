import "./About.css";
import ContactUs from "../components/ContactForm";
import InternList from "../components/Interns";

function About() {
   return (
      <div className="about-page">
         <section>
            <h1>About Us</h1>
            <div className="about-section">
               <img src="/src/assets/logo.png" width="30%" alt="About us" />
               <div>
                  <p>
                     The purpose of the Play to Heal Campus Connection Hub is to create a safe, accessible, and student-driven space where young people can come together to share, listen,
                     and heal. Grounded in therapeutic dialogue games, the platform empowers students to break through isolation, reduce stigma around mental health, and build resilience
                     through peer-to-peer support. It is designed not only to address crises but also to foster belonging, strengthen community, and equip students with lifelong tools for
                     connection and emotional well-being.
                  </p>
                  <br></br>
                  <p>
                     The Play to Heal Campus Connection Hub is essential because today’s students are facing unprecedented levels of stress, isolation, and mental health challenges, while
                     campus counseling centers remain overwhelmed and stigma keeps many from seeking help. By creating a student-driven, peer-to-peer platform grounded in therapeutic
                     dialogue games, Play to Heal provides an inclusive, accessible, and proactive space for healing, resilience, and belonging. Without it, campuses will continue to see
                     rising crises, dropout rates, and disconnection, especially among first-generation and marginalized students, losing the chance to transform silence and suffering into
                     connection, empowerment, and collective well- being. The Play to Heal Campus Connection Hub addresses this urgent need by creating a structured, student-driven platform
                     where young people can come together for healing dialogue, emotional support, and community building.
                  </p>
                  <br></br>
                  <p>
                     Unlike traditional interventions, Play to Heal meets students where they are—peer-to-peer, accessible 24/7, grounded in therapeutic games designed to open safe
                     conversations about mental health, resilience, and connection. It shifts the model from reactive crisis management to proactive prevention and empowerment.
                  </p>
               </div>
            </div>
         </section>

         <section className="contact-us-section">
            <h1>Contact Us</h1>
            <div className="contact-us-container">
               <div className="socmed-icons">
                  <div>
                     <img src="/src/assets/Tiktok.png" />
                  </div>
                  <div>
                     <img src="/src/assets/insta.png" />
                  </div>
               </div>
               <ContactUs />
            </div>
         </section>

         <section className="founder">
            <div>
               <h1>Meet the Founder</h1>
            </div>
            <div className="founder-container">
               <img src="/src/assets/intern_placeholder.jpeg" width="20%" />
               <div>
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                     exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                     pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                     ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                     proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
               </div>
            </div>
         </section>

         <section className="interns">
            <h1>Meet the Interns</h1>
            <div>
               <ul className="interns-container">
                  <InternList />
               </ul>
            </div>
         </section>

         <section>
            <div className="contributors-partners">
               <h1>Meet Our Contributors || Partners to Mentors || Sponsors</h1>
            </div>
         </section>
      </div>
   );
}

export default About;
