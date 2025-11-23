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
         const firstCard = testimonialsRef.current.querySelector<HTMLDivElement>(".testimonial-card");
         if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const gap = parseInt(getComputedStyle(testimonialsRef.current).gap) || 0;
            testimonialsRef.current.scrollBy({ left: -(cardWidth + gap), behavior: "smooth" });
         }
      }
   };

   const scrollTestimonialsRight = () => {
      if (testimonialsRef.current) {
         const firstCard = testimonialsRef.current.querySelector<HTMLDivElement>(".testimonial-card");
         if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const gap = parseInt(getComputedStyle(testimonialsRef.current).gap) || 0;
            testimonialsRef.current.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
         }
      }
   };

   const testimonials = [
      {
         quote:
            "There has never been a board game like this … EVER!!! KEEP IT REAL will stay with us in potentially life altering ways in rebuilding our perceptions of others and ourselves, while having us run a fun filled spectrum of emotions in the process. No one has ever enjoyed themselves or explored themselves this much with a board game before!",
         author:
            "Gerard Brown, Teacher/Screenwriter who wrote the screenplay for &ldquo;Juice&rdquo; starring Tupac Shakur",
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
            "When we are affected so deeply by grief, it is difficult to find the words to begin the healing journey. Not only are we suffering, but so are our loved ones around us. It is the lack of connection and understanding that can sharpen the edges of grieving, making it even more painful to maneuver. Remembrance not only brings out the joy and love we had for our loved ones, but also initiates heartfelt conversation, invoking connectivity and love.. With these doors open, healing is finally possible",
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
                     powerful it feels to be part of a community that&apos;s got your back.
                     Whether you&apos;re looking for support, inspiration, or just a safe space
                     to be yourself—you&apos;ve found it. Let&apos;s play, connect, and heal
                     together!
                  </p>
                  <button
                     className="cta-button"
                     onClick={() => router.push("/landing/game")}
                  >
                     Start Your Journey
                  </button>
               </div>
            </section>
         </div>

         {/* Games Carousel */}
         <div className="fade-in">
            <section className="game-section">
               <h2>Our Games: You Are Not Alone</h2>
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
                           <span className="testimonial-author">- {testimonial.author}</span>
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
      </div>
   );
}

export default Home;
