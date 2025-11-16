"use client";
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
         <Questions
            handleClick={handleClick}
            isSomeActive={isSomeActive}
            faqQuestions={faqQuestions}
            turn={active}
            setTurn={setActive}
         />
      </div>
   );
}

export default FAQ;
