"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";

import "./ContactForm.css";

const ContactForm = () => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
   });

   const [status, setStatus] = useState("");
   const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
         setStatus("Please enter a valid email address.");
         return;
      }
      const form = new FormData();
      form.append("access_key", "ed099da3-b0dc-4bd9-bec4-f2412f65d543");
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
         method: "POST",
         body: form,
      });

      const data = await response.json();

      if (data.success) {
         setStatus("Message sent successfully!");
         setFormData({
            name: "",
            email: "",
            message: "",
         });
      } else {
         setStatus("Someting went wrong, please try again.");
      }
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <div className="contact-us">
               <div className="full-name">
                  <label htmlFor="full-name"></label>
                  <input
                     type="text"
                     id="full-name"
                     name="name"
                     value={formData.name}
                     onChange={handleInput}
                     placeholder="Your Name"
                     required
                  />
               </div>

               <br></br>

               <div className="email-address">
                  <label htmlFor="email-address"></label>
                  <input
                     type="email"
                     id="email-address"
                     name="email"
                     value={formData.email}
                     onChange={handleInput}
                     placeholder="Your Email"
                     required
                  />
               </div>

               <br></br>

               <textarea
                  className="message-box"
                  id="messageBox"
                  name="message"
                  value={formData.message}
                  onChange={handleInput}
                  placeholder="Your message here">
                  required
               </textarea>

               <div className="submit-button">
                  <button>Submit</button>
               </div>
            </div>
         </form>
      </div>
   );
};
export default ContactForm;
