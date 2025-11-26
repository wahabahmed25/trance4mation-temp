import Image from "next/image";
import "./Game.css";

function Game() {
   return (
      <div className="game-container">
         <section id="Remembrance" className="fade-in">
            <div className="game-content">
               <Image
                  src="/landing-page-img/Remembrance.png"
                  alt="Remembrance Image"
                  width={600}
                  height={400}
               />
               <div className="game-text">
                  <h1 className="game-title">Remembrance</h1>
                  <div className="tag-list">
                     <span className="tag multiplayer">Multiplayer</span>
                     <span className="tag grief">Grief and Loss Support</span>
                  </div>
                  <p>
                     Remembrance is a gentle, conversation-based game that offers comfort,
                     connection, and healing for those navigating grief and loss. Through
                     thoughtful prompts and shared reflections, it creates a safe space to
                     honor memories, express emotions, and feel less alone on the journey
                     of healing.
                  </p>
                  <a
                     target="_blank"
                     rel="noopener noreferrer"
                     href="https://remembrance.onrender.com/">
                     <button className="play-button">Play Now</button>
                  </a>
               </div>
            </div>
         </section>

         <section id="Keep-It-Real-100" className="fade-in">
            <div className="game-content">
               <Image
                  src="/landing-page-img/KIR100 Logo.png"
                  alt="Keep It Real 100 Image"
                  width={600}
                  height={400}
               />
               <div className="game-text">
                  <h1 className="game-title">Keep It Real 100</h1>
                  <div className="tag-list">
                     <span className="tag multiplayer">Multiplayer</span>
                  </div>
                  <p>
                     Keep It Real 100 Game is a sacred space in the form of a game—where
                     BIPOC youth, adults, and allies gather to speak truth, share stories,
                     and listen with heart. Through 16 soul-stirring categories, it
                     invites us to unpack pain, reclaim joy, and to foster connection and
                     collective healing through love, honesty, and mutual respect. It is
                     more than a game, it is a home for healing, a mirror for truth, and a
                     pathway to collective transformation.
                  </p>
                  <a
                     target="_blank"
                     rel="noopener noreferrer"
                     href="https://playtohealhub.com/keepitreal100/">
                     <button className="play-button">Play Now</button>
                  </a>
               </div>
            </div>
         </section>

         <section id="Speak-to-me" className="fade-in-top">
            <div className="game-content">
               <Image
                  src="/landing-page-img/SpeaktoMe.jpg"
                  alt="Speak to Me Game Image"
                  width={600}
                  height={400}
               />
               <div className="game-text">
                  <h1 className="game-title">Speak to Me</h1>
                  <div className="tag-list">
                     <span className="tag coming-soon">Coming Soon</span>
                     <span className="tag multiplayer">Multiplayer</span>
                  </div>
                  <p>
                     Speak to Me isn’t just a game – it is a call-out to your soul.
                     <br />
                     It’s where masks drop, walls fall, and truth takes the mic.
                     <br />
                     You’ll laugh, you’ll think, you’ll feel. <br />
                     Cause this is <em>real</em> talk lives.
                     <br />
                     For those who feel too much, say too little, or hold it all in,
                     <br />
                     <em>Speak to Me</em> cracks open the silence. <br />
                     It’s bold, it’s raw, it’s a space to be seen, <br />
                     To say what’s real and feel what you mean. <br />
                     In a world that often asks us to hide, <em>Speak to Me</em> dares us
                     to be seen.
                  </p>
               </div>
            </div>
         </section>

         {/* Keep It Real Inclusion */}
         <section id="Keep-It-Real" className="fade-in">
            <div className="game-content">
               <Image
                  src="/landing-page-img/KeepItReal.png"
                  alt="Keep It Real Logo"
                  width={600}
                  height={400}
               />
               <div className="game-text">
                  <h1 className="game-title">Keep It Real Inclusion</h1>
                  <div className="tag-list">
                     <span className="tag coming-soon">Coming Soon</span>
                     <span className="tag facilitator">Facilitator Required</span>
                  </div>
                  <p>
                     Keep It Real Game- the most fun you will ever have, having some of
                     the most important conversations of your life. Designed for college
                     students who crave deeper connection and real talk, Keep It Real
                     invites you to laugh, reflect, and be fully seen. It creatively asks
                     the questions most people are too intimidated to ask, boldly unmasks
                     truths, and enlightens minds—without ever feeling heavy. <br />
                     <b>Keep It Real harbors a magic that changes people.</b> Come play.
                     Come heal. Come connect.
                  </p>
               </div>
            </div>
         </section>

         {/* Other sections */}
         <section id="Home-is-the-Heart" className="fade-in">
            <div className="game-content">
               <Image
                  src="/landing-page-img/HomeIsTheHeart.png"
                  alt="Home is the Heart"
                  width={600}
                  height={400}
               />
               <div className="game-text">
                  <h1 className="game-title">Home is the Heart</h1>
                  <div className="tag-list">
                     <span className="tag coming-soon">Coming Soon</span>
                  </div>
                  <p>
                     Home is the Heart is a heartfelt family connection game that brings
                     loved ones closer through meaningful conversations, shared stories,
                     and moments of laughter and love. Designed to spark multigenerational
                     dialogue, it invites family members to reflect on the past, express
                     their emotions, and dream about the future together.
                  </p>
               </div>
            </div>
         </section>

         <section id="Call-It-Out" className="fade-in">
            <div className="game-content">
               <Image
                  src="/landing-page-img/CallitOut.png"
                  alt="Call It Out Image"
                  width={600}
                  height={400}
               />
               <div className="game-text">
                  <h1 className="game-title">Call It Out Loud</h1>
                  <div className="tag-list">
                     <span className="tag coming-soon">Coming Soon</span>
                     <span className="tag anti-bullying">Anti-Bullying</span>
                  </div>
                  <p>
                     Call It Out Loud is a bold, comic-style board game that empowers
                     players to tackle bullying through dialogue, empathy, and action.
                     With 10 dynamic categories, from <em>Real Talk</em> to{" "}
                     <em>Drop the Mic</em>, players dive into personal stories, practice
                     standing up, lift each other up, and rewrite the narrative around
                     bullying. More than just a game, Call It Out is a movement—one that
                     sparks courage, connection, and change. It turns silence into
                     strength and bystanders into changemakers.
                  </p>
               </div>
            </div>
         </section>

         <section id="Trill" className="fade-in">
            <div className="game-content">
               <Image
                  src="/landing-page-img/TrillAddictionsPrevention&Recovery.png"
                  alt="Trill (True & Real) Image"
                  width={600}
                  height={400}
               />
               <div className="game-text">
                  <h1 className="game-title">
                     Trill (Addictions Prevention and Recovery)
                  </h1>
                  <div className="tag-list">
                     <span className="tag coming-soon">Coming Soon</span>
                  </div>
                  <p>
                     Trill (Addictions Prevention and Recovery) is a therapeutic dialogue
                     game designed to support individuals and communities impacted by
                     addiction. Through guided questions, honest conversations, and
                     playful interactions, it helps players confront challenges, share
                     their truths, and discover their strengths. By fostering trust and
                     resilience, Trill creates a safe and supportive space where recovery
                     becomes a shared journey, not a solitary struggle.
                  </p>
               </div>
            </div>
         </section>
      </div>
   );
}

export default Game;
