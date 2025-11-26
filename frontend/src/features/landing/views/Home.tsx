"use client";
import Image from "next/image";
import "./Home.css";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import GameCard from "@/features/landing/components/GameCard";

function Home() {
   const router = useRouter();
   const carouselRef = useRef<HTMLDivElement>(null);
   const testimonialsRef = useRef<HTMLDivElement>(null);

   const scrollLeft = () => {
      if (carouselRef.current) {
         carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
      }
   };

   const scrollRight = () => {
      if (carouselRef.current) {
         carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
      }
   };

   const scrollTestimonialsLeft = () => {
      if (testimonialsRef.current) {
         const firstCard =
            testimonialsRef.current.querySelector<HTMLDivElement>(".testimonial-card");
         if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const gap = parseInt(getComputedStyle(testimonialsRef.current).gap) || 0;
            testimonialsRef.current.scrollBy({
               left: -(cardWidth + gap),
               behavior: "smooth",
            });
         }
      }
   };

   const scrollTestimonialsRight = () => {
      if (testimonialsRef.current) {
         const firstCard =
            testimonialsRef.current.querySelector<HTMLDivElement>(".testimonial-card");
         if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const gap = parseInt(getComputedStyle(testimonialsRef.current).gap) || 0;
            testimonialsRef.current.scrollBy({
               left: cardWidth + gap,
               behavior: "smooth",
            });
         }
      }
   };

   const testimonials = [
      {
         quote:
            "There has never been a board game like this … EVER!!! KEEP IT REAL will stay with us in potentially life altering ways in rebuilding our perceptions of others and ourselves, while having us run a fun filled spectrum of emotions in the process. No one has ever enjoyed themselves or explored themselves this much with a board game before!",
         author:
            "Gerard Brown, Teacher/Screenwriter who wrote the screenplay for “Juice” starring Tupac Shakur",
         image: "/landing-page-img/user.svg",
      },
      {
         quote:
            "Playing Keep It Real was a blast. It is amazing that a game that is so much fun also gets people tuned in to themselves, helps them to learn who they are and to respect diversity in others, and to connect with the other players. This game opens the heart, mind and imagination, and gets people talking and thinking about life in so many dimensions. It is awesome!",
         author: "Mangy-Nkoli, Filmmaker of 'Smoking Cessation'",
         image: "/landing-page-img/user2.svg",
      },
      {
         quote:
            "When we are affected so deeply by grief, it is difficult to find the words to begin the healing journey. Not only are we suffering, but so are our loved ones around us. It is the lack of connection and understanding that can sharpen the edges of grieving, making it even more painful to maneuver. Remembrance not only brings out the joy and love we had for our loved ones, but also initiates heartfelt conversation, invoking connectivity and love. With these doors open, healing is finally possible",
         author: "Leah Hodous",
         image: "/landing-page-img/user.svg",
      },
      {
         quote:
            "I cannot say enough wonderful things about the Remembrance game. I played the game with my family as we recently suffered multiple losses in our family. Playing the game provided a safe environment to begin the healing process. There were laughter and tears, as well as memories and storytelling. We learned about one another in the process. Anyone who has ever suffered from grief and loss should own and play this game to help with the grieving process and begin healing.",
         author: "Donna Reilly-Middleton",
         image: "/landing-page-img/user2.svg",
      },
   ];

   return (
      <div className="home-page">
         {/* Hero Section */}
         <div className="fade-in-top">
            <section className="hero-section">
               <div className="hero-left">
                  <Image
                     src="/landing-page-img/logo.png"
                     alt="Play to Heal Logo"
                     width={400}
                     height={140}
                  />
               </div>
               <div className="hero-right">
                  <h1>PLAY TO HEAL</h1>
                  <div className="tag-lines">
                     <h3>Break Isolation</h3>
                     <h3>Build Connection</h3>
                     <h3>Heal Together</h3>
                  </div>
                  <p>
                     This is your place to connect, laugh, share, and discover just how
                     powerful it feels to be part of a community that&apos;s got your
                     back. Whether you&apos;re looking for support, inspiration, or just a
                     safe space to be yourself—you&apos;ve found it. Let&apos;s play,
                     connect, and heal together!
                  </p>
                  <button
                     className="cta-button"
                     onClick={() => router.push("/landing/game")}
                  >
                     Start Your Journey
                  </button>
                  <div className="welcome-section">
                     <h1>Play to Heal: What It Is & How It Works</h1>
                  </div>
               </div>
            </section>
         </div>

         {/* Welcome Section */}
         <div className="fade-in">
            <section>
               <div className="welcome-div">
                  <h3>
                     Play to Heal is more than a platform. It is a movement of connection,
                     compassion, and transformation through dialogue-based games. This
                     presentation (Explore the heart, mission and how it all works)
                     introduces you to the spirit of Play to Heal: what it is, how it
                     works, and the simple agreements that make every experience safe,
                     meaningful, and real. Before you play, take a moment to explore the
                     heart behind it all.
                  </h3>
                  <div>
                     <a href="/landing-page/Mission.pdf" target="_blank">
                        <button className="welcome-button">
                           Explore the Heart, Mission, & How it All Works
                        </button>
                     </a>
                     <br />
                     <a
                        href="https://youtu.be/0IKEGc1yPEE?si=4BUw6Jg2Q_xZ1Ucl"
                        target="_blank"
                     >
                        <button className="welcome-button">
                           Our Warm Welcome Video
                        </button>
                     </a>
                  </div>
               </div>
            </section>
         </div>

         {/* Games Carousel */}
         <div className="fade-in">
            <section className="game-section">
               <h2>Our Games: You Are Not Alone</h2>
               <h4>
                  Choose your game and click on it to play - let’s begin the magic! Your
                  story, your heart, your journey are all welcome here.
               </h4>
               <div className="carousel-wrapper">
                  <button
                     className="carousel-arrow carousel-arrow-left"
                     onClick={scrollLeft}
                  >
                     &#8249;
                  </button>
                  <div className="game-cards-container" ref={carouselRef}>
                     <GameCard
                        title="Remembrance"
                        image="/landing-page-img/Remembrance.png"
                        description="A gentle, conversation-based game that offers comfort, connection, and healing for those navigating grief and loss."
                        path="/landing/game#Remembrance"
                     />
                     <GameCard
                        title="Keep It Real 100"
                        image="/landing-page-img/KIR100 Logo.png"
                        description="Where BIPOC youth, adults, and allies gather to speak truth, share stories, and listen with heart."
                        path="/landing/game#Keep-It-Real-100"
                     />
                     <GameCard
                        title="Keep It Real Inclusion"
                        image="/landing-page-img/KeepItReal.png"
                        description="Keep It Real harbors a magic that changes people."
                        path="/landing/game#Keep-It-Real"
                     />
                     <GameCard
                        title="Speak to Me"
                        image="/landing-page-img/SpeaktoMe.jpg"
                        description="In a world that often asks us to hide, Speak to Me dares us to be seen."
                        path="/landing/game#Speak-to-me"
                     />
                  </div>
                  <button
                     className="carousel-arrow carousel-arrow-right"
                     onClick={scrollRight}
                  >
                     &#8250;
                  </button>
               </div>
            </section>
         </div>

         {/* Testimonials */}
         <section className="testimonials-section fade-in">
            <h2>Hear Their Stories</h2>
            <div className="testimonials-carousel-wrapper">
               <button
                  className="carousel-arrow carousel-arrow-left"
                  onClick={scrollTestimonialsLeft}
               >
                  &#8249;
               </button>
               <div className="testimonials-container" ref={testimonialsRef}>
                  {testimonials.map((testimonial, i) => (
                     <div key={i} className="testimonial-card">
                        <Image
                           src={testimonial.image}
                           alt={testimonial.author}
                           width={80}
                           height={80}
                        />
                        <div className="testimonial-quote">
                           <p>&quot;{testimonial.quote}&quot;</p>
                           <span className="testimonial-author">
                              - {testimonial.author}
                           </span>
                        </div>
                     </div>
                  ))}
               </div>
               <button
                  className="carousel-arrow carousel-arrow-right"
                  onClick={scrollTestimonialsRight}
               >
                  &#8250;
               </button>
            </div>
         </section>

         <div className="more-section">
            <div className="cta-container">
               <h2>Ready to Begin Your Healing Journey?</h2>

               <div className="socmed-icons">
                  <div className="phone-icon-text">
                     <Image
                        src="/landing-page-img/Phone.svg"
                        alt="Phone icon"
                        width={30}
                        height={30}
                     />
                     <span>917-302-5086</span>
                  </div>

                  <div className="icon-text">
                     <a href="mailto:info@playtohealhub.com">
                        <Image
                           src="/landing-page-img/Mail.svg"
                           alt="Mail icon"
                           width={30}
                           height={30}
                        />
                        <span>info@playtohealhub.com</span>
                     </a>
                  </div>

                  <div className="icon-text">
                     <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.linkedin.com/company/trance4mation-games/"
                     >
                        <Image
                           src="/landing-page-img/LinkedIn.svg"
                           alt="LinkedIn icon"
                           width={30}
                           height={30}
                        />
                        <span>Trance4mation Games</span>
                     </a>
                  </div>

                  <div className="icon-text">
                     <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.tiktok.com/@trance4mationgames?_r=1&_t=ZP-91DUqXF2mEx"
                     >
                        <Image
                           src="/landing-page-img/TikTok.svg"
                           alt="TikTok icon"
                           width={30}
                           height={30}
                        />
                        <span>Trance4mation Games</span>
                     </a>
                  </div>
               </div>
            </div>

            <div className="more-image">
               <Image
                  src="/landing-page-img/love1.png"
                  alt="Join the Play to Heal Community"
                  width={500}
                  height={500}
               />
            </div>

            <div className="more-links">
               <div className="general-links">
                  <li>
                     <ul>
                        <a href="/landing">Home</a>
                     </ul>
                     <ul>
                        <a href="/landing/game">Games</a>
                     </ul>
                     <ul>
                        <a href="/landing/about">About Us</a>
                     </ul>
                     <ul>
                        <a href="/landing/contact">Contact</a>
                     </ul>
                     <ul>
                        <a href="/landing/faq">FAQ</a>
                     </ul>
                  </li>
               </div>

               <div className="policy-links">
                  <li>
                     <ul>
                        <a href="/landing/privacy">Privacy Policy</a>
                     </ul>
                     <ul>
                        <a href="/landing/cookies">Cookies Policy</a>
                     </ul>
                     <ul>
                        <a href="/landing/terms">Terms of Use</a>
                     </ul>
                     <ul>
                        <a href="/landing/disclaimer">Disclaimer</a>
                     </ul>
                  </li>
               </div>
            </div>
         </div>

         <div className="footer">
            <p>© 2025 Trance4mation Games, LLC. All rights reserved.</p>
         </div>
      </div>
   );
}

export default Home;
