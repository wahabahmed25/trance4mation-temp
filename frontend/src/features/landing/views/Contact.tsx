import ContactUs from "@/features/landing/components/ContactForm";
import "./Contact.css";

function Contact() {
   return (
      <div>
         <div className="fade-in-top">
            <section className="contact-us-container">
               <div className="left-flex">
                  <h1>Contact Us!</h1>
                  <div className="div-rectangle"></div>
                  <p>
                     <b>
                        We truly value your feedback, comments, and suggestions about the
                        Play to Heal Hub!
                     </b>{" "}
                     Your voice matters, and we want to hear what’s working well and what
                     we can improve. Don’t hesitate to reach out to us at
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

               <div className="input-contact">
                  <ContactUs />
               </div>
            </section>
         </div>
      </div>
   );
}
export default Contact;
