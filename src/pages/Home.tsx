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
                <h2>You Are Not Alone</h2>
                <div className="game-cards-container">
                    <GameCard title="Cyberbullying" image={sampleImg} description="A game about cyberbullying" />
                    <GameCard title="Depression" image={sampleImg} description="A game about depression" />
                    <GameCard title="Anxiety" image={sampleImg} description="A game about anxiety" />
                    <GameCard title="PTSD" image={sampleImg} description="A game about trauma recovery" />
                    <GameCard title="Eating Disorders" image={sampleImg} description="A game about body image and recovery" />
                    <GameCard title="Social Isolation" image={sampleImg} description="A game about loneliness and connection" />
                    <GameCard title="Grief & Loss" image={sampleImg} description="A game about processing loss" />
                    <GameCard title="Self-Harm" image={sampleImg} description="A game about healthy coping strategies" />
                </div>
            </section>

            <section className="testimonials-section">
                <h2>Hear Their Stories</h2>
                <div className='testimonials-container'>
                    <img className='testimonal-img' src="/src/assets/ex_testimonal.png" alt="" />

                    <div className='testimonal-quote'>
                        <p>"A game that resonated with my experience"</p>

                    </div>
                </div>
            </section>

            <section className="cta-section">
                <h2>Get Involved</h2>
                <div className='cta-container'>
                    <div className='cta-left'>
                        <h3>Join the Community</h3>
                        <p>Join the community to get involved with the community. Information about joining and participating goes here.</p>
                    </div>
                    <div className='cta-right'>
                        <input type="email" placeholder='Enter your email' />
                        <br />
                        <button>Sign Up</button>
                    </div>
                </div>
            </section>

            <section className="about-section">
                <h2>About Us</h2>
                <div className='about-container'>
                    <p>Information about the organization and team behind Play to Heal. Mission, vision, and values can be shared here.</p>
                </div>
                <a href="/about" className="about-button">Learn More</a>
            </section>

        </div>
    )
}

export default Home;