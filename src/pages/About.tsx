import "./About.css";

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
                     where young people can come together for healing dialogue, emotional support, and community building. Unlike traditional interventions, Play to Heal meets students where
                     they are—peer-to-peer, accessible 24/7, grounded in therapeutic games designed to open safe conversations about mental health, resilience, and connection. It shifts the
                     model from reactive crisis management to proactive prevention and empowerment.
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
               <div className="contact-us">
                  <div className="full-name">
                     <label htmlFor="full-name"></label>
                     <input type="text" id="full-name" name="fullName" placeholder="Your Name" />
                  </div>

                  <br></br>

                  <div className="email-address">
                     <label htmlFor="email-address"></label>
                     <input type="text" id="email-address" name="emailAddress" placeholder="Your Email" />
                  </div>

                  <br></br>

                  <textarea className="message-box" placeholder="Your message here"></textarea>

                  <br></br>

                  <div className="submit-button">
                     <button>Submit</button>
                  </div>
               </div>
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
                  <h2>Speak to Me Game || Trill Addictions Prevention & Recovery Game</h2>
                  <div className="intern-group">
                     <div>
                        <li>
                           <img src="/src/assets/intern_placeholder.jpeg" width="60%" alt="Intern 1" />
                           <div>
                              <h3>Michael Coleman</h3>
                              <h2>Co-Lead</h2>
                              <h2>Insert sentence here</h2>
                           </div>
                        </li>
                     </div>

                     <div>
                        <li>
                           <img src="/src/assets/intern_placeholder.jpeg" width="60%" alt="Intern 2" />
                           <div>
                              <h2>Sasha Shifrina</h2>
                              <h2>Co-Lead</h2>
                              <h2>Insert sentence here</h2>
                           </div>
                        </li>
                     </div>

                     <div>
                        <li>
                           <img src="/src/assets/intern_placeholder.jpeg" width="60%" alt="Intern 2" />
                           <div>
                              <h2>Kelvin Chen</h2>
                              <h2>Role</h2>
                              <h2>Insert sentence here</h2>
                           </div>
                        </li>
                     </div>

                     <div>
                        <li>
                           <img src="/src/assets/intern_placeholder.jpeg" width="60%" alt="Intern 2" />
                           <div>
                              <h2>An Van</h2>
                              <h2>Role</h2>
                              <h2>Insert sentence here</h2>
                           </div>
                        </li>
                     </div>

                     <div>
                        <li>
                           <img src="/src/assets/intern_placeholder.jpeg" width="60%" alt="Intern 2" />
                           <div>
                              <h2>Zhen Tao Pan</h2>
                              <h2>Co-Lead in Platform and Landing Page Development</h2>
                              <h2>Insert sentence here</h2>
                           </div>
                        </li>
                     </div>
                  </div>
                  <h2>Play to Heal || Campus Connection Platform Development Team || Keep It Real & Keep It Real 100 Games</h2>
                  <div className="intern-group">
                     <div>
                        <li>
                           <img src="/src/assets/intern_placeholder.jpeg" width="60%" alt="Intern 1" />
                           <div>
                              <h2>Wahab Ahmed</h2>
                              <h2>Lead</h2>
                              <h2>Insert sentence here</h2>
                           </div>
                        </li>
                     </div>

                     <div>
                        <li>
                           <img src="/src/assets/intern_placeholder.jpeg" width="60%" alt="Intern 2" />
                           <div>
                              <h2>Ragib</h2>
                              <h2>Co-Lead</h2>
                              <h2>Insert sentence here</h2>
                           </div>
                        </li>
                     </div>

                     <div>
                        <li>
                           <img src="/src/assets/intern_placeholder.jpeg" width="60%" alt="Intern 2" />
                           <div>
                              <h2>Efti Saroare</h2>
                              <h2> Role</h2>
                              <h2>Insert sentence here</h2>
                           </div>
                        </li>
                     </div>

                     <div>
                        <li>
                           <img src="/src/assets/intern_placeholder.jpeg" width="60%" alt="Intern 2" />
                           <div>
                              <h2>Kevin Li</h2>
                              <h2>Role</h2>
                              <h2>Insert sentence here</h2>
                           </div>
                        </li>
                     </div>

                     <div>
                        <li>
                           <img src="/src/assets/intern_placeholder.jpeg" width="60%" alt="Intern 2" />
                           <div>
                              <h2>Khadeja Ahmar</h2>
                              <h2>Role</h2>
                              <h2>Insert sentence here</h2>
                           </div>
                        </li>
                     </div>
                  </div>
                  <h2>Call It Out Anti-Bullying Game || Remembrance Grief & Loss Support Game</h2>
                  <div className="intern-group">
                     <div>
                        <li>
                           <img src="/src/assets/intern_placeholder.jpeg" width="60%" alt="Intern 1" />
                           <div>
                              <h2>Faraaz Ali</h2>
                              <h2>Lead</h2>
                              <h2>Insert sentence here</h2>
                           </div>
                        </li>
                     </div>

                     <div>
                        <li>
                           <img src="/src/assets/intern_placeholder.jpeg" width="60%" alt="Intern 2" />
                           <div>
                              <h2>Gordon Mo</h2>
                              <h2>Co-Lead</h2>
                              <h2>Insert sentence here</h2>
                           </div>
                        </li>
                     </div>

                     <div>
                        <li>
                           <img src="/src/assets/intern_placeholder.jpeg" width="60%" alt="Intern 2" />
                           <div>
                              <h2>Paulo Zapata</h2>
                              <h2>Role</h2>
                              <h2>Insert sentence here</h2>
                           </div>
                        </li>
                     </div>

                     <div>
                        <li>
                           <img src="/src/assets/intern_placeholder.jpeg" width="60%" alt="Intern 2" />
                           <div>
                              <h2>Jan Calle-Ortiz</h2>
                              <h2>Developer and Social Media & Digital Engagement Lead</h2>
                              <h2>Insert sentence here</h2>
                           </div>
                        </li>
                     </div>
                  </div>
                  <h2>Landing Page Design & Development || Campus Resources Directory UI</h2>
                  <div className="intern-group">
                     <div>
                        <li>
                           <img src="/src/assets/intern_placeholder.jpeg" width="60%" alt="Intern 1" />
                           <div>
                              <h2>Jin Wang</h2>
                              <h2>Lead</h2>
                              <h2>Insert sentence here</h2>
                           </div>
                        </li>
                     </div>
                  </div>
                  {/* <h2>Social Media & Digital Engagement Lead</h2>
                  <div className="intern-group">
                     <div>
                        <li>
                           <img src="/src/assets/intern_placeholder.jpeg" width="60%" alt="Intern 1" />
                           <div>
                              <h2>Jan Calle-Ortiz</h2>
                              <h2>Role</h2>
                              <h2>Insert sentence here</h2>
                           </div>
                        </li>
                     </div>
                  </div>*/}
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
