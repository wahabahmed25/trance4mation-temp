import React, { Dispatch, useEffect, useRef } from "react";
import "./QuestionAccordion.css";
type Props = {
   question: string;
   answer: string;
   id: number;
   turn: boolean[];
   setTurn: Dispatch<React.SetStateAction<boolean[]>>;
};
const QuestionAccordion = ({ question, answer, id, turn, setTurn }: Props) => {
   const contentRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (contentRef.current) {
         contentRef.current.style.maxHeight = turn[id] ? `${contentRef.current.scrollHeight}px` : "0px";
      }
   }, [contentRef, turn, id]);

   const toggleAccordion = () => {
      let newTurn = [...turn!]; // keep copy of turn
      newTurn[id] = !newTurn[id]; // toggle the clicked accordion
      setTurn!(newTurn); // set the new state
   };
   const formattedAnswer = (answer: string) => {
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const newLines = answer.split("\n");

      return newLines.map((line, index) => {
         const formattedLine = line.replace(emailRegex, (email) => {
            return `<a href="mailto:${email}" class="email-link">${email}</a>`;
         });
         return <div key={index} dangerouslySetInnerHTML={{ __html: formattedLine }}></div>;
      });
   };

   return (
      <div className="fade-in-top">
         <div className="accordion-container">
            <button onClick={toggleAccordion} className={`accordion-button ${turn[id] ? "active" : ""}`}>
               <div>
                  <div className="accordion-block">
                     <div className="questions">
                        <div className="questions-header">
                           <h3> {question}</h3>
                           <div>
                              {turn![id] ? <img src="/landing-page-img/Minus.svg" alt="" width={40} height={40} /> : <img src="/landing-page-img/Plus.svg" alt="" width={40} height={40} />}
                           </div>
                        </div>
                        <div className="div-rectangle"></div>
                     </div>
                     <div ref={contentRef} className="answer">
                        <div className="answer-style">{formattedAnswer(answer)}</div>
                     </div>
                  </div>
               </div>
            </button>
         </div>
      </div>
   );
};
export default QuestionAccordion;
