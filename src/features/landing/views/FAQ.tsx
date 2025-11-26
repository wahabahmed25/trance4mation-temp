"use client";
import Questions from "@/features/landing/components/Questions";
import faqQuestions from "@/features/landing/components/questions.json";
import "./FAQ.css";
import { useState } from "react";

function FAQ() {
   const [active, setActive] = useState(
      Array(faqQuestions.length).fill(false)
   );

   const isSomeActive = active.some((element) => element);

   const handleClick = () => {
      setActive(Array(active.length).fill(!isSomeActive));
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
