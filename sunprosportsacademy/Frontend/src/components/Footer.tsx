import './Footer.css'
import { FaLinkedin, FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa6'

export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="footer-content">
                <div className="footer-section brand">
                    <h2>Sun Pro Sports Academy</h2>
                    <p className="footer-tagline">BUILDING THE FUTURE OF SPORTS INFRASTRUCTURE</p>
                    <p className="footer-desc">
                        India's premier sports infrastructure firm specializing in stadium development, multi-sport facility design, and athletic consulting.
                    </p>
                </div>

                <div className="footer-section navigate">
                    <h3>NAVIGATE</h3>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">What We Do</a></li>
                        <li><a href="#expertise">Expertise</a></li>
                        <li><a href="#services">Why Choose Us</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-section visit">
                    <h3>VISIT US</h3>
                    <p><strong>Corporate Office</strong></p>
                    <p>#119 5th main 2nd Cross</p>
                    <p>Jabbor block, Vyalikaval</p>
                    <p>Bangalore-560003, India</p>
                    <p className="footer-inquiry"><strong>Inquiries</strong></p>
                    <p><a href="mailto:Bhanumurthy@Sunprosportsacademy.com">Bhanumurthy@Sunprosportsacademy.com</a></p>
                </div>

                <div className="footer-section insights">
                    <h3>STRATEGIC INSIGHTS</h3>
                    <p>Subscribe to receive our latest insights on sports infrastructure and facility management.</p>
                    <div className="footer-newsletter">
                        <input type="email" placeholder="Email Address" />
                        <button className="join-btn">JOIN</button>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 Sun Pro Sports Academy. All rights reserved.</p>
                <div className="footer-socials">
                    <a href="#"><FaLinkedin /></a>
                    <a href="#"><FaInstagram /></a>
                    <a href="#"><FaPhone /></a>
                    <a href="#"><FaEnvelope /></a>
                </div>
            </div>
        </footer>
    )
}
