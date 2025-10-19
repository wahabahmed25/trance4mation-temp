"use client";
import ContactUs from "../../components/ContactForm";
import Questions from "../../components/Questions";
import faqQuestions from "../../components/questions.json";
import "./FAQ.css";
import { useState } from "react";

function FAQ() {
   const [active, setActive] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
   const isSomeActive = active.some((element) => element);
   const handleClick = () => {
      isSomeActive
         ? setActive([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
         : setActive([true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]);
   };

   return (
      <div className="faq-container">
         <section className="contact-us-section">
            <div className="contact-us-container">
               <div className="left-flex">
                  <h1>Contact Us!</h1>
                  <div className="div-rectangle"></div>
                  <p>
                     We truly value your feedback, comments, and suggestions about the Play to Heal Campus Connection Hub! Your voice matters, and we want to hear what’s working well and
                     what we can improve. Don’t hesitate to reach out to us at
                     <a href="mailto:info@playtohealhub.com">
                        <span>
                           <b> info@playtohealhub.com </b>
                        </span>
                     </a>
                  </p>

                  <br></br>
                  <p>
                     <b>Together, we can build an even more supportive and inclusive community.</b>
                  </p>
                  <div className="socmed-icons">
                     <div>
                        <a href="">
                           <img src="/landing-page-img/Phone.svg" width={47} height={47} />
                        </a>
                     </div>
                     <div>
                        <a href="mailto:info@playtohealhub.com">
                           <img src="/landing-page-img/Mail.svg" width={55} height={55} />
                        </a>
                     </div>
                     <div>
                        <a href="">
                           <img src="/landing-page-img/Facebook.svg" />
                        </a>
                     </div>
                     <div>
                        <a href="">
                           <img src="/landing-page-img/Instagram.svg" />
                        </a>
                     </div>
                  </div>
               </div>
               <div className="input-contact">
                  <ContactUs />
               </div>
            </div>
            <Questions handleClick={handleClick} isSomeActive={isSomeActive} faqQuestions={faqQuestions} turn={active} setTurn={setActive} />
         </section>
      </div>
   );
}

export default FAQ;
