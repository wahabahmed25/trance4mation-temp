import '../about.css';

function About() {
    return (
        <div className="about-page">
            <h1>About Us</h1>
            
            <div className="about-section">
                <img src="/src/assets/placeholder.png" width="30%" alt="About us" />
                <div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum
                    </p>
                </div>
            </div>

            <div className="contact-us">
                <h1>Contact Us</h1>
            </div>
            
            <div className="founder">
                <h1>Meet the Founder</h1>
            </div>

            <div className="interns">
                <h1>Meet the Interns</h1>
            </div>

            <div className="contributors-partners">
                <h1>Meet Our Contributors</h1>
            </div>
        </div>
    )
}

export default About;