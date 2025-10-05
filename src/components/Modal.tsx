// Modal.tsx
import React from "react";
import "./Modal.css";
import type { Intern } from "./Interns";

// Define the type for props
interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   intern: Intern | null; // This can be null or an intern object
}

// embedding links into description
const embeddedLinks = (description: string, links: { [key: string]: string }) => {
   const parts: React.ReactNode[] = [];

   let currentIndex = 0;

   Object.keys(links).forEach((key) => {
      const regex = new RegExp(key, "g");
      let match;

      while ((match = regex.exec(description)) !== null) {
         const start = match.index;
         const end = start + match[0].length;

         if (start > currentIndex) {
            parts.push(description.slice(currentIndex, start));
         }

         parts.push(
            <a href={links[key]} target="_blank" rel="noopener noreferrer" key={start}>
               {match[0]}
            </a>
         );

         currentIndex = end;
      }
   });

   if (currentIndex < description.length) {
      parts.push(description.slice(currentIndex));
   }

   return <>{parts}</>;
};

const extraLinks = (extra2: string, id: number, links: { [key: number]: { [key: string]: string } }) => {
   const parts: React.ReactNode[] = [];
   let currentIndex = 0;

   // link specific to intern
   const internLinks = links[id];

   if (!internLinks) {
      return <>{extra2}</>;
   }
   Object.keys(internLinks).forEach((key) => {
      const regex = new RegExp(`(${key})`, "g");
      let match;

      // Find all occurrences of the keyword
      while ((match = regex.exec(extra2)) !== null) {
         const start = match.index;
         const end = start + match[0].length;

         if (start > currentIndex) {
            parts.push(extra2.slice(currentIndex, start)); // Push text before the match
         }

         // Create the clickable link for the matched keyword
         parts.push(
            <a href={internLinks[key]} target="_blank" rel="noopener noreferrer" key={`${key}-${start}`}>
               {match[0]}
            </a>
         );

         currentIndex = end;
      }
   });

   // Add the remaining text after the last match
   if (currentIndex < extra2.length) {
      parts.push(extra2.slice(currentIndex));
   }

   return <>{parts}</>;
};
const linkContents = {
   here: "https://linktr.ee/jancalleortiz?utm_source=linktree_profile_share&ltsid=6c6fccc9-65b4-4c20-91ba-d8c79b9e2e60",
};
const extraLinkContents = {
   6: {
      LinkedIn:
         "https://www.linkedin.com/in/wahab-ahmed-12020a298?utm_source=share&amp;utm_campaign=share_via&amp;utm_content=profile&amp;utm_medium=ios_app",
   },
   7: {
      GitHub: "https://github.com/ragibasif",
   },
   8: {
      LinkedIn: "www.linkedin.com/in/efti-saroare-515b84205",
   },
   9: {
      GitHub: "https://github.com/Luominai",
   },
   10: {
      LinkedIn:
         "https://www.linkedin.com/in/khadeja-ahmar-098909282?utm_source=share&amp;utm_campaign=share_via&amp;utm_content=profile&amp;utm_medium=ios_app",
      GitHub: "https://github.com/khadeja02",
   },
   11: {
      LinkedIn: "https://www.linkedin.com/in/faraaz-k-ali/",
   },

   12: {},
};
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, intern }) => {
   // If not open or intern is null, don't render
   if (!isOpen || !intern) return null;

   return (
      <div className="modal-overlay" onClick={onClose}>
         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={onClose}>
               X
            </button>
            <img src={intern.image} alt={intern.name} className="modal-image" />
            <div className="modal-text">
               <h2>{intern.name}</h2>
               <h3>{intern.role}</h3>
               <p>{intern.extra1}</p>
               <div className="internDescription"> {embeddedLinks(intern.description, linkContents)}</div>
               <div className="internDescription"> {extraLinks(intern.extra2, intern.id, extraLinkContents)}</div>
            </div>
         </div>
      </div>
   );
};

export default Modal;
