import './Home.css';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import sampleImg from '../assets/sample_img.jpg';

function Home() {
    const navigate = useNavigate();
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
                    <button className="cta-button" onClick={() => navigate('/game')}>Start Your Journey</button>
                </div>
            </section>

            <section className="game-section">
                <h2>You're Not Alone</h2>
                <div className="game-cards-container">
                    <GameCard title="Cyberbullying" image={sampleImg} description="A game about cyberbullying" />
                    <GameCard title="Depression" image={sampleImg} description="A game about depression" />
                    <GameCard title="Anxiety" image={sampleImg} description="A game about anxiety" />
                </div>
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