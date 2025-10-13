"use client";
import React, { useState } from "react";
import "./ContactForm.css";

interface formData {
   name: string;
   email: string;
   message: string;
}

const ContactUs: React.FC = () => {
   const [formData, setFormData] = useState<formData>({
      name: "",
      email: "",
      message: "",
   });
   const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Form is submitted: ", formData);
   };
   return (
      <form onSubmit={handleSubmit}>
         <div className="contact-us">
            <div className="full-name">
               <label htmlFor="full-name"></label>
               <input type="text" id="full-name" name="name" value={formData.name} onChange={handleInput} placeholder="Your Name" />
            </div>

            <br></br>

            <div className="email-address">
               <label htmlFor="email-address"></label>
               <input type="text" id="email-address" name="email" value={formData.email} onChange={handleInput} placeholder="Your Email" />
            </div>

            <br></br>

            <textarea
               className="message-box"
               id="messageBox"
               name="message"
               value={formData.message}
               onChange={handleInput}
               placeholder="Your message here"></textarea>

            <br></br>

            <div className="submit-button">
               <button>Submit</button>
            </div>
         </div>
      </form>
   );
};

export default ContactUs;
