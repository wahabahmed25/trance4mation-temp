import './Home.css';

function Home() {
    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-left">
                    <img src="/src/assets/logo.png" alt="Play to Heal Logo" />
                </div>
                <div className="hero-right">
                    <h1>PLAY TO HEAL</h1>
                    <div className='tag-lines'>
                        <h3>Break Isolation</h3>
                        <h3>Build Connection</h3>
                        <h3>Heal Together</h3>
                    </div>
                    <button className="cta-button">Get Started</button>
                </div>
            </section>

            <section className="filler-section">
                <h2>You're Not Alone</h2>
                <p>This is sample text for the first section. Here we can add content about how users are not alone in their healing journey.</p>
                <p>More text can go here to fill out the section and demonstrate the layout. This helps show how the page will look with real content.</p>
            </section>

            <section className="filler-section">
                <h2>Hear Their Stories</h2>
                <p>This section is for sharing stories from users who have benefited from our platform. Testimonials and success stories go here.</p>
                <p>Additional text content to make the section look complete and show the proper spacing and layout.</p>
            </section>

            <section className="filler-section">
                <h2>Get Involved</h2>
                <p>This section encourages users to get involved with the community. Information about joining and participating goes here.</p>
                <p>More details about how users can contribute and be part of the healing community.</p>
            </section>

            <section className="filler-section">
                <h2>About Us</h2>
                <p>Information about the organization and team behind Play to Heal. Mission, vision, and values can be shared here.</p>
                <p>Additional details about the founders, team members, and the story behind the platform.</p>
            </section>

            <section className="filler-section">
                <h2>Contact Us</h2>
                <p>Contact information and ways to reach out to the team. Email, phone, and social media links can be included here.</p>
                <p>Additional contact details and information about how users can get in touch with support.</p>
            </section>

            <section className="filler-section">
                <h2>Final Section</h2>
                <p>This is the last section to demonstrate the page layout and scrolling behavior. The navigation bar will scroll with the content.</p>
                <p>This helps show how the page will look with real content and demonstrates the static navigation behavior.</p>
            </section>
        </div>
    )
}

export default Home;