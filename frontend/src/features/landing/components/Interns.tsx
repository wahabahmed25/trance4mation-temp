"use client";
import React, { useState } from "react";
import Modal from "@/features/landing/components/Modal";
import Image from "next/image";

import "./Interns.css";

export interface Intern {
   id: number;
   name: string;
   role: string;
   image: string;
   description: string;
   extra1: string;
   extra2: string;
   section: string;
}

// list of intern info - 15 currently
const interns: Intern[] = [
   {
      id: 1,
      name: "Michael Coleman",
      role: "Co-Lead",
      image: "/landing-page-img/MichealColeman.jpeg",
      description:
         "Michael is a creative and detail-oriented computer science student at Hunter College, with a strong foundation in software development, web technologies, and database design. He is passionate about web development and making impactful, user-friendly websites. Michael has built everything from achievement tracking systems to interactive games and full-stack applications. Michael blends technical skills with real-world experience, having worked in roles ranging from audio engineering to tutoring and customer service. With professional proficiency in Spanish and a passion for problem-solving, he brings versatility and energy to every project.",
      extra1:
         '"I am excited to use my technical skills to help create games that will engage people in meaningful ways."',
      extra2: "  ",
      section:
         "Speak to Me and Trill Addictions Prevention & Recovery Game Development Team",
   },
   {
      id: 2,
      name: "Aleksandra Shifrina",
      role: "Co-Lead",
      image: "/landing-page-img/SashaShifrina.jpeg",
      description:
         "Aleksandra is currently majoring in computer science at Hunter College. She has a passion for software engineering - starting from scratch, to give life to an idea, and ultimately creating something impactful at scale. Aleksandra is a Daedalus Scholar with a strong track record in software development and data engineering and has built creative projects like SelfGrowth, a gamified iOS productivity app, and Milo, a fitness-focused AI web app developed at the Cornell AI Hackathon. She also interned at Cognizant TriZetto, helping reimagine large-scale healthcare dataflows. With experience in full-stack development, machine learning, and UI design, Aleksandra combines technical depth with a passion for building tools that engage and empower users.",
      extra1:
         '"I am excited to work on this project because Trance4mation Games mission resonates with my goal to make accessible, meaningful applications for those that may not have many resources at their disposable. I’m incredibly grateful for the opportunity to directly contribute to such a significant project this semester. "',
      extra2: "  ",
      section:
         "Speak to Me and Trill Addictions Prevention & Recovery Game Development Team",
   },
   {
      id: 3,
      name: "Kelvin Chen",
      role: "Developer",
      image: "/landing-page-img/KelvinChen.jpg",
      description:
         "Kelvin is a Computer Science student at Hunter College who loves turning ideas into interactive, user-friendly apps. He has worked on projects like News.AI, which uses AI to summarize news, and AI Flashcards, a smart study tool for students. Kelvin is always looking for new ways to grow his skills and to build cool, impactful projects. He is passionate about being able to use technology to make a positive impact on the world.",
      extra1:
         ' "I am excited about this project because I get the chance to be able to help create therapeutic games that could help people to improve their mental health and build connections. I am excited about being part of a team that is improving the world through innovative solutions."',
      extra2: "  ",
      section:
         "Speak to Me and Trill Addictions Prevention & Recovery Game Development Team",
   },
   {
      id: 4,
      name: "An Van",
      role: "Developer",
      image: "/landing-page-img/AnVan.jpg",
      description:
         "An Van is a computer science student at Hunter College with a passion for game development and creative tech solutions. He has built several projects, including Tetris and Pong clones in C++, and a Spotify-powered Raspberry Pi music box. He also developed StreetMate, a web app for finding nearby parking, at HackPrinceton. With experience as a coding instructor and IT assistant, An Van combines strong technical skills with a talent for teaching and automation. He is fluent in Python, C++, and JavaScript, and enjoys turning ideas into working, user-friendly products.",
      extra1:
         '"I am excited to work on this project because I want to make impactful projects that are helpful to people in need. I think helping people with mental health issues with games is a perfect solution."',
      extra2: "  ",
      section:
         "Speak to Me and Trill Addictions Prevention & Recovery Game Development Team",
   },
   {
      id: 5,
      name: "Zhen Tao Pan",
      role: "Developer",
      image: "/landing-page-img/ZhenTaoPan.jpg",
      description:
         "Zhen Tao Pan is a computer science and mathematics student at Hunter College with a passion for software engineering and AI. As a Discrete Math and Computer Science Teaching Assistant, Zhen has helped over 350 students strengthen their reasoning and problem-solving skills, contributing to measurable academic improvement. His favorite coding languages are Python and C++.",
      extra1: "   ",
      extra2: "LinkedIn",
      section:
         "Speak to Me and Trill Addictions Prevention & Recovery Game Development Team",
   },
   {
      id: 6,
      name: "Wahab Ahmed",
      role: "Lead",
      image: "/landing-page-img/WahabAhmed.jpeg",
      description:
         "Wahab is a Lead for the play to Heal Campus Connection Platform. He is a Computer Science student at Hunter College with hands-on experience in both technology and customer service. \n Wahab has developed a full-stack social media application using React.js, Node.js, and MySQL, highlighting his skills in building user-focused digital platforms. Beyond academics, Wahab is dedicated to community impact, from providing senior care at Effective Home-Care Agency to contributing to collaborative projects through the Hunter College Computer Science Club.",
      extra1:
         '"I am excited to create this platform as it focuses on CUNY students and students everywhere, such as myself!"',
      extra2: "LinkedIn",
      section:
         "Play to Heal and Campus Connection Platform Development || Keep It Real & Keep It Real 100 Game Development Team",
   },
   {
      id: 7,
      name: "Ragib Asif",
      role: "Co-Lead",
      image: "/landing-page-img/RagibAsif.jpg",
      description:
         "Ragib is a computer science student at CUNY Hunter College with a strong focus on systems programming, compilers, and cloud-based software architecture. He has developed projects ranging from a self-compiling C compiler to a dynamic memory debugger and a multi-client chat server. Passionate about building efficient, secure, and scalable software, Ragib is eager to contribute to innovative engineering teams.",
      extra1: "  ",
      extra2: "GitHub",
      section:
         "Play to Heal and Campus Connection Platform Development || Keep It Real & Keep It Real 100 Game Development Team",
   },
   {
      id: 8,
      name: "Efti Saroare",
      role: "Developer",
      image: "/landing-page-img/EftiSoarare.jpeg",
      description:
         "Efti is a junior at Hunter College pursuing a dual concentration in Computer Science and Mathematics. With hands-on experience as a research assistant in computer vision and pose estimation, Efti applies programming skills in Python, C++, and data visualization to real-world projects. Bilingual in multiple languages and skilled in problem-solving, collaboration, and communication. Efti brings both technical expertise and interpersonal strengths to roles in software development, AI research, and data analysis.",
      extra1:
         '"I am super excited for this project because I believe what we\'re building has the potential to make a real impact. I look forward to continuing to work with my amazing team and contributing to something truly meaningful."',
      extra2: "LinkedIn",
      section:
         "Play to Heal and Campus Connection Platform Development || Keep It Real & Keep It Real 100 Game Development Team",
   },
   {
      id: 9,
      name: "Kevin Li",
      role: "Developer",
      image: "/landing-page-img/KevinLi.jpg",
      description:
         "Kevin is a senior studying computer science at Hunter College and is a part of their Daedalus honors program, with a perfect 4.0 GPA. He has always been interested in game development, and last summer, he picked up game development again by trying to digitize a board game. Passionate about game development and data-driven design, Kevin has built projects like Songfest, a real-time music game using React and Socket.io, and Restaurant Surfer, an NYC data visualizer integrating sanitation and licensing records. He interned at STEMKasa, contributed to AI-powered web apps, and tutored fellow students in calculus. With experience in full-stack development, Unity, and Cypress testing, Kevin blends creativity with precision in everything he builds.",
      extra1:
         ' "I am excited to work on this project to hone my game development skills and am proud to contribute towards the effort to foster connection and healing on college campuses. "',
      extra2: "GitHub  ",
      section:
         "Play to Heal and Campus Connection Platform Development || Keep It Real & Keep It Real 100 Game Development Team",
   },
   {
      id: 10,
      name: "Khadeja Ahmar",
      role: "Developer",
      image: "/landing-page-img/KhadejaAhmar.jpeg",
      description:
         "Khadeja is a full-stack engineer with experience building web and mobile apps using React, Node.js, and Python. Additionally, she has also worked in data analysis and machine learning, specifically in the health sector. In her free time, Khadeja enjoys crocheting, painting, and reading, and one of her favorite books is “A Thousand Splendid Suns” by Khaled Hosseini.",
      extra1:
         ' "I am excited to be working on this project since I love utilizing my skills in tech to assist other people. I’m fascinated by all the work Trance4mation Games is doing to create awareness and help people through untraditional pathways, and would love contributing to that effort!"',
      extra2: "LinkedIn and GitHub",
      section:
         "Play to Heal and Campus Connection Platform Development || Keep It Real & Keep It Real 100 Game Development Team",
   },
   {
      id: 11,
      name: "Faraaz Ali",
      role: "Lead",
      image: "/landing-page-img/FaraazAli.png",
      description:
         "Faraaz is a Software Engineer and Illustrator, always looking to turn complicated problems into artistic solutions, as well as a Hunter College Computer Science and Math Honors student who loves turning big ideas into digital realities. From building Unity games and web apps for nonprofits to designing art for 70+ clients, he thrives at the intersection of creativity and tech. Always eager to learn, Faraaz has organized successful charity events, joined Google’s Software Engineering Program, and is passionate about using code to make a difference. Faraaz is the Lead for the team building the Remembrance Grief Support game and the Call It Out Loud Anti-Bullying Game. ",
      extra1:
         ' "I am excited about this project because the mission resonates with me, and I am honored to work on a project that\'ll help build bridges between people."',
      extra2: "LinkedIn",
      section:
         "Call It Out Anti-Bullying Game || Remembrance Grief & Loss Support Game Development Team",
   },
   {
      id: 12,
      name: "Gordon Mo",
      role: "Co-Lead",
      image: "/landing-page-img/GordonMo.jpg",
      description:
         "Gordon is a Computer Science major at Hunter College with a passion for web development and video games. His main coding languages are Python and JavaScript, and he has applied them in building full-stack applications, interactive games, and mentorship projects. Gordon enjoys using technology to solve problems, create engaging experiences, and continuously sharpen his skills in software development. Fun fact: he likes to try new restaurants.",
      extra1:
         '"I am excited to contribute to this project because I want to foster a place for people to heal and grow from their trauma. This project offers a rare opportunity to learn through playing board games."',
      extra2: "  ",
      section:
         "Call It Out Anti-Bullying Game || Remembrance Grief & Loss Support Game Development Team",
   },
   {
      id: 13,
      name: "Paulo Zapata",
      role: "Developer",
      image: "/landing-page-img/PauloZapata.jpeg",
      description:
         "Paulo is a computer science student at CUNY Hunter College with a focus on web development and a passion for software engineering, focusing more on app development, taking ideas from concept to execution. He enjoys working in teams to exchange ideas and collaborate on meaningful projects. As an aspiring engineer, Paulo aims to give back to the community by contributing to projects that provide solutions to real-world problems.  He won 1st place in the sustainability track at HunterHacks 2025 for developing Fridge Friends, a food-sharing web app designed to reduce waste on campus, and has completed technical programs with Bloomberg and CodePath. Bilingual in English and Spanish, Paulo has also worked as a coding and math tutor, helping younger students gain confidence in STEM.",
      extra1:
         '"I am excited to collaborate on this project because it combines my passion for software development with a mission that really matters. I believe technology can play a powerful role in creating positive experiences."',
      extra2: "  ",
      section:
         "Call It Out Anti-Bullying Game || Remembrance Grief & Loss Support Game Development Team",
   },
   {
      id: 14,
      name: "Jan Calle-Ortiz",
      role: "Developer and Digital Engagement Lead",
      image: "/landing-page-img/JanCalle-Ortiz.jpg",
      description:
         "Jan is currently pursuing a double major in Computer Science and Chinese through the Chinese Flagship Program. Alongside his studies, he creates content on TikTok and Instagram (@jancalleortiz), and you can find all of his projects and socials here. \n With a strong interest in technology, equity, and global cultures, Jan combines technical skills with real-world impact. He earned 2nd place in the Macaulay Honors x MTA Datathon for analyzing public transit equity and is currently part of the Google Mentorship Program, building a full-stack web app with peers. As a Chinese Flagship Scholar, Jan studied abroad in Taiwan and speaks fluent English and Spanish, with intermediate Mandarin. \n Jan is also learning guitar and exploring music composition, which is his passion for creativity and self-expression. In the future, Jan hopes to combine his technical skills, language abilities, and creative interests to contribute to impactful global projects.",
      extra1: "  ",
      extra2: "Linktree, Tiktok, and Instagram  ",
      section:
         "Call It Out Anti-Bullying Game || Remembrance Grief & Loss Support Game Development Team",
   },
   {
      id: 15,
      name: "Jin Wang",
      role: "Lead",
      image: "/landing-page-img/JinWang.jpg",
      description:
         "Jin is currently pursuing a computer science major and a media studies minor at CUNY Hunter College. She is passionate about web development and software engineering, hoping to create impactful projects that can help others. Jin has created a website focused on spreading awareness about Asian hate crimes during the pandemic, as well as participated in the 2025 Macaulay Honors x MTA Datathon, cleaning and sorting datasets to investigate the effects of congestion pricing on ACE violations. She loves to draw and read in her free time, and she is fluent in English and Mandarin.",
      extra1: "  ",
      extra2: "LinkedIn",
      section: "Landing Page Design and Development Team",
   },
];

const InternSectionList: React.FC = () => {
   const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleImageClick = (intern: Intern) => {
      setSelectedIntern(intern);
      setIsModalOpen(true);
   };

   const closeModal = () => {
      setIsModalOpen(false);
      setSelectedIntern(null);
   };

   // section interns based on project
   const sections = [
      "Speak to Me and Trill Addictions Prevention & Recovery Game Development Team",
      "Play to Heal and Campus Connection Platform Development || Keep It Real & Keep It Real 100 Game Development Team",
      "Call It Out Anti-Bullying Game || Remembrance Grief & Loss Support Game Development Team",
      "Landing Page Design and Development Team",
   ];

   const groupedInterns = sections.reduce((acc, section) => {
      acc[section] = interns.filter((intern) => intern.section === section);
      return acc;
   }, {} as Record<string, Intern[]>);
   return (
      <div className="interns-list">
         {sections.map((section) => (
            <div key={section} className="intern-section">
               <h1>{section}</h1>
               <div className="interns-div-rectangle"></div>
               <div className="interns-row">
                  {groupedInterns[section].map((intern) => (
                     <div key={intern.id} className="intern-card">
                        <Image
                           src={intern.image}
                           alt={intern.name}
                           width={400}
                           height={300}
                           className="intern-image"
                           onClick={() => handleImageClick(intern)}
                        />
                        <h1>{intern.name}</h1>
                        <h2>{intern.role}</h2>
                     </div>
                  ))}
               </div>
            </div>
         ))}

         <Modal isOpen={isModalOpen} onClose={closeModal} intern={selectedIntern} />
      </div>
   );
};

export default InternSectionList;
