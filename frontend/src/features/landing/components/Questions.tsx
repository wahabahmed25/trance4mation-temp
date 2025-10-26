import React, { Dispatch, SetStateAction } from "react";
import QuestionAccordian from "@/features/landing/components/QuestionAccordion";
import "./Questions.css";

type Props = {
   question: string;
   answer: string;
   id: number;
};
interface QuestionsProps {
   handleClick: React.MouseEventHandler<HTMLButtonElement>;
   isSomeActive: boolean;
   turn: boolean[];
   setTurn: Dispatch<SetStateAction<boolean[]>>;
   faqQuestions: Props[];
}

const Questions = ({ handleClick, isSomeActive, faqQuestions, turn, setTurn }: QuestionsProps) => {
   return (
      <div className="questions-container">
         <div className="questions-header-button">
            <h1>Frequently Asked Questions</h1>
            <div className="opencollapse-container">
               <button className="opencollapse-button" onClick={handleClick}>
                  <span> {!isSomeActive ? "Open All" : "Close All"}</span>
                  <div className={`rotate ${isSomeActive ? "rotate-180" : "rotate-0"}`}>
                     <img src="/landing-page-img/ArrowUp.svg" alt="" width={40} height={40} />
                  </div>
               </button>
            </div>
         </div>

         {faqQuestions.map((el, i) => {
            return (
               <div className="questions-open" key={"question" + i}>
                  <QuestionAccordian question={el.question} answer={el.answer} turn={turn} setTurn={setTurn} id={el.id} />
               </div>
            );
         })}
      </div>
   );
};

export default Questions;
