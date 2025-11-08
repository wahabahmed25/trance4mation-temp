"use client";
import ContactUs from "@/features/landing/components/ContactForm";
import Questions from "@/features/landing/components/Questions";
import faqQuestions from "@/features/landing/components/questions.json";
import "./FAQ.css";
import { useState } from "react";

function FAQ() {
   const [active, setActive] = useState([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
   ]);
   const isSomeActive = active.some((element) => element);
   const handleClick = () => {
      isSomeActive
         ? setActive([
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
           ])
         : setActive([
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
           ]);
   };

   return (
      <div className="faq-container">
         <section className="contact-us-section">
            <div className="fade-in-top">
               <div className="contact-us-container">
                  <div className="left-flex">
                     <h1>Contact Us!</h1>
                     <div className="div-rectangle"></div>
                     <p>
                        We truly value your feedback, comments, and suggestions about the
                        Play to Heal Campus Connection Hub! Your voice matters, and we
                        want to hear what’s working well and what we can improve. Don’t
                        hesitate to reach out to us at
                        <a href="mailto:info@playtohealhub.com">
                           <span>
                              <b> info@playtohealhub.com </b>
                           </span>
                        </a>
                     </p>

                     <br></br>
                     <p>
                        <b>
                           Together, we can build an even more supportive and inclusive
                           community.
                        </b>
                     </p>
                     <div className="socmed-img">
                        <div>
                           <img src="/landing-page-img/7.png" width={350} height={350} />
                        </div>

                        <div className="socmed-icons">
                           <div className="phone-icon-text">
                              <img
                                 src="/landing-page-img/Phone.svg"
                                 width={47}
                                 height={47}
                              />
                              <span>917-302-5086</span>
                           </div>

                           <div className="icon-text">
                              <a href="mailto:info@playtohealhub.com">
                                 <img
                                    src="/landing-page-img/Mail.svg"
                                    width={55}
                                    height={55}
                                 />
                                 <span>info@playtohealhub.com</span>
                              </a>
                           </div>

                           <div className="icon-text">
                              <a
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 href="https://www.linkedin.com/company/trance4mation-games/">
                                 <img src="/landing-page-img/LinkedIn.svg" />
                                 <span>Trance4mation Games</span>
                              </a>
                           </div>
                           <div className="icon-text">
                              <a
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 href="https://www.tiktok.com/@trance4mationgames?_r=1&_t=ZP-91DUqXF2mEx">
                                 <img src="/landing-page-img/TikTok.svg" />
                                 <span>Trance4mation Games</span>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
                  {/* <div>
                  <img
                     src="/landing-page-img/8.png"
                     width="90%"
                     alt="Contact Us Illustration"
                  />
               </div> */}
                  <div className="input-contact">
                     <ContactUs />
                  </div>
               </div>
            </div>
            <Questions
               handleClick={handleClick}
               isSomeActive={isSomeActive}
               faqQuestions={faqQuestions}
               turn={active}
               setTurn={setActive}
            />
         </section>
      </div>
   );
}

export default FAQ;
