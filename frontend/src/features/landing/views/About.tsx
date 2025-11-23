"use client";
import Image from "next/image";
import "./About.css";
import InternList from "@/features/landing/components/Interns";

function About() {
   return (
      <div className="about-container">
         <section className="fade-in-top">
            <div className="about-section">
               <Image
                  src="/landing-page-img/logo.png"
                  width={400}
                  height={140}
                  alt="Play to Heal Logo"
               />
               <div>
                  <h1>Play to Heal Hub™</h1>
                  <div className="about-rectangle"></div>
                  <div className="about-p">
                     <p>
                        The purpose of the <b> Play to Heal Hub™</b> is to create a{" "}
                        <b> safe, accessible, and student-driven space</b> where young
                        people can come together to share, listen, and heal. Grounded in
                        therapeutic dialogue games, the platform empowers students to
                        break through isolation, reduce stigma around mental health, and
                        build resilience through peer-to-peer support. It is designed not
                        only to address crises but also to foster belonging, strengthen
                        community, and equip students with lifelong tools for connection
                        and emotional well-being.
                     </p>
                     <br />
                     <p>
                        The Play to Heal Hub™ is <b>essential</b> because today&apos;s students are facing unprecedented levels of
                        stress, isolation, and mental health challenges, while campus
                        counseling centers remain overwhelmed and stigma keeps many from
                        seeking help. By creating a student-driven, peer-to-peer platform
                        grounded in therapeutic dialogue games, Play to Heal provides an
                        inclusive, accessible, and proactive space for healing,
                        resilience, and belonging. Without it, campuses will continue to
                        see rising crises, dropout rates, and disconnection, especially
                        among first-generation and marginalized students, losing the
                        chance to transform silence and suffering into connection,
                        empowerment, and collective well-being. The Play to Heal Hub
                        addresses this urgent need by creating a structured,
                        student-driven platform where young people can come together for
                        healing dialogue, emotional support, and community building.
                     </p>
                     <br />
                     <p>
                        Unlike traditional interventions, Play to Heal meets students
                        where they are —
                        <b>
                           {" "}
                           peer-to-peer, accessible 24/7, grounded in therapeutic games
                           designed to open safe conversations about mental health,
                           resilience, and connection.{" "}
                        </b>
                        It shifts the model from reactive crisis management to proactive
                        prevention and empowerment.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         <section className="fade-in">
            <div className="founder-container">
               <Image
                  src="/landing-page-img/Leslie.jpg"
                  width={200}
                  height={200}
                  alt="Leslie R. Robinson"
               />
               <div className="founder-text">
                  <h2>Leslie R. Robinson</h2>
                  <h3>Founder &amp; Visionary of Play to Heal Hub™</h3>
                  <div className="div-rectangle"></div>
                  <br />
                  <div className="text-scroll">
                     <p>
                        Leslie R. Robinson is a visionary therapist, inventor, and
                        award-winning social entrepreneur, and the founder of Play to Heal
                        Hub™, a groundbreaking platform designed to help college students
                        connect, heal, and thrive in today&apos;s increasingly stressful and
                        disconnected world. With over two decades of hands-on experience
                        working with underserved and marginalized populations—including
                        incarcerated youth and adults, foster care, individuals
                        experiencing homelessness and severe mental illness, runaway and
                        homeless teens, at-risk youth, and having had the honor to serve
                        as a Department of Defense Reintegration Speaker to thousands of
                        returning service members, Leslie brings a deep, empathetic
                        understanding of human struggle, resilience, and the critical need
                        for healing spaces.
                     </p>
                     <br />
                     <p>
                        As the Founder &amp; CEO of <b>Trance4mation Games</b>, she has
                        developed therapeutic, game-based tools that have impacted over
                        one million lives. Her games have been used to address trauma,
                        grief, addiction, reintegration, prison reentry, belonging,
                        emotional isolation and more - offering innovative solutions to
                        populations often left out of traditional mental health systems.
                     </p>
                     <br />
                     <p>
                        <b>The Play to Heal Hub™</b> extends this powerful mission to
                        students and adults at a time when students are facing
                        unprecedented levels of anxiety, depression, loneliness, and
                        social fragmentation. The platform provides a safe, inclusive
                        space for students to engage in guided, peer-to-peer dialogue that
                        fosters emotional expression, connection, and resilience. Through
                        meaningful conversations rooted in empathy and authenticity,
                        students rediscover a sense of belonging and support—without
                        stigma, pressure, or judgment. <b>This isn&apos;t just a project; it is a movement.</b> This Hub
                        responds to an urgent need: a call for community, healing, and
                        real human connection in an age of digital overload and emotional
                        disconnection.
                     </p>
                     <br />
                     <p>
                        Through the <b>Play to Heal Hub™</b>, Leslie continues her life&apos;s
                        mission: to transform lives, dismantle barriers, and create safe
                        spaces where healing and human connection flourish—especially for
                        those who need it most.
                     </p>
                     <br />
                     <p>
                        &quot;I am incredibly proud to be working alongside 15 brilliant
                        Macaulay Honors Computer Science student interns from Hunter
                        College—most of whom come from first-generation families and
                        proudly identify as Americans. Their dedication, passion, and
                        sense of purpose are truly inspiring. These students are not only
                        helping to digitize my therapeutic games, but they are also
                        playing a vital role in building the Play to Heal Hub™ platform
                        from the ground up. Their commitment to mental health, innovation,
                        and community healing embodies the very spirit of this initiative,
                        and reminds me daily that the future is in powerful, compassionate
                        hands.&quot;
                     </p>
                  </div>
               </div>
            </div>
         </section>

         <section className="interns-section">
            <h2>Meet the Interns</h2>
            <div>
               <ul className="interns-container">
                  <InternList />
               </ul>
            </div>
         </section>

         <section>
            <div className="contributors-partners">
               <h1>Meet Our Contributors</h1>
               <h2> Coming Soon...</h2>
            </div>
         </section>
      </div>
   );
}

export default About;
