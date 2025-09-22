import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import GameCard from '../components/GameCard';
import sampleImg from '../assets/sample_img.jpg';

function Home() {
    const navigate = useNavigate();
    // Pointer to the carousel div
    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        // If the carousel div exists, scroll it to the left
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' }); // card width + gap
        }
    };

    const scrollRight = () => {
        // If the carousel div exists, scroll it to the right
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' }); // card width + gap
        }
    };

    const testimonials = [
        {
            quote: "A game that resonated with my experience",
            author: "Sarah M.",
            image: "/src/assets/ex_testimonal.png"
        },
        {
            quote: "This platform helped me understand I wasn't alone in my struggles",
            author: "Alex Rodriguez", 
            image: "/src/assets/ex_testimonal.png"
        },
        {
            quote: "The interactive experiences gave me tools I never knew I needed",
            author: "Jordan Kim",
            image: "/src/assets/ex_testimonal.png"
        },
        {
            quote: "Finally, a safe space where I could explore my mental health journey",
            author: "Morgan Taylor",
            image: "/src/assets/ex_testimonal.png"
        }
    ];

    // Pointer to the testimonials carousel div
    const testimonialsRef = useRef<HTMLDivElement>(null);

    const scrollTestimonialsLeft = () => {
        // If the testimonials div exists, scroll it to the left
        if (testimonialsRef.current) {
            testimonialsRef.current.scrollBy({ left: -920, behavior: 'smooth' }); // testimonial card width + gap
        }
    };

    const scrollTestimonialsRight = () => {
        // If the testimonials div exists, scroll it to the right
        if (testimonialsRef.current) {
            testimonialsRef.current.scrollBy({ left: 920, behavior: 'smooth' }); // testimonial card width + gap
        }
    };

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
                <div className="carousel-wrapper">
                    <button className="carousel-arrow carousel-arrow-left" onClick={scrollLeft}>
                        &#8249;
                    </button>
                    <div className="game-cards-container" ref={carouselRef}>
                        <GameCard title="Cyberbullying" image={sampleImg} description="A game about cyberbullying" />
                        <GameCard title="Depression" image={sampleImg} description="A game about depression" />
                        <GameCard title="Anxiety" image={sampleImg} description="A game about anxiety" />
                        <GameCard title="PTSD" image={sampleImg} description="A game about trauma recovery" />
                        <GameCard title="Eating Disorders" image={sampleImg} description="A game about body image and recovery" />
                        <GameCard title="Social Isolation" image={sampleImg} description="A game about loneliness and connection" />
                        <GameCard title="Grief & Loss" image={sampleImg} description="A game about processing loss" />
                        <GameCard title="Self-Harm" image={sampleImg} description="A game about healthy coping strategies" />
                    </div>
                    <button className="carousel-arrow carousel-arrow-right" onClick={scrollRight}>
                        &#8250;
                    </button>
                </div>
            </section>

            <section className="testimonials-section">
                <h2>Hear Their Stories</h2>
                <div className="testimonials-carousel-wrapper">
                    <button className="carousel-arrow carousel-arrow-left" onClick={scrollTestimonialsLeft}>
                        &#8249;
                    </button>
                    <div className="testimonials-container" ref={testimonialsRef}>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card">
                                <img className="testimonial-img" src={testimonial.image} alt={testimonial.author} />
                                <div className="testimonial-quote">
                                    <p>"{testimonial.quote}"</p>
                                    <span className="testimonial-author">- {testimonial.author}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-arrow carousel-arrow-right" onClick={scrollTestimonialsRight}>
                        &#8250;
                    </button>
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