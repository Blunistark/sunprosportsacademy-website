import { Instagram, Mail, Phone, Linkedin } from 'lucide-react'
import './Footer.css'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer" id="footer">
            <div className="container">
                <div className="footer-inner">
                    {/* Brand */}
                    <div className="footer-brand-col">
                        <div className="footer-brand-name">Sun Pro Sports Academy</div>
                        <div className="footer-brand-tagline">Building the Future of Sports Infrastructure</div>
                        <p className="footer-brand-desc">
                            India's premier sports infrastructure firm specializing in stadium development, multi-sport facility design, and athletic consulting.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="footer-col-title">Navigate</h4>
                        <ul className="footer-col-list">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#what-we-do">What We Do</a></li>
                            <li><a href="#partnerships">Partnerships</a></li>
                            <li><a href="#why-choose-us">Why Choose Us</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    {/* Visit Us */}
                    <div>
                        <h4 className="footer-col-title">Visit Us</h4>
                        <ul className="footer-col-list">
                            <li><strong>Corporate Office</strong></li>
                            <li>#119 5th main 2nd Cross</li>
                            <li>Jabbor block, Vyalikaval</li>
                            <li>Bangalore-560003, India</li>
                            <li style={{ marginTop: 12 }}><strong>Inquiries</strong></li>
                            <li>Bhanumurthy@Sunprosportsacademy.com</li>
                        </ul>
                    </div>

                    {/* Stay Connected */}
                    <div>
                        <h4 className="footer-col-title">Strategic Insights</h4>
                        <p className="footer-newsletter-desc">
                            Subscribe to receive our latest insights on sports infrastructure and facility management.
                        </p>
                        <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                className="footer-newsletter-input"
                                placeholder="Email Address"
                                aria-label="Email for newsletter"
                            />
                            <button type="submit" className="btn btn-primary footer-newsletter-btn" aria-label="Subscribe">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <span className="footer-copyright">
                        © {currentYear} Sun Pro Sports Academy. All rights reserved.
                    </span>
                    <div className="footer-social-links">
                        <a href="https://linkedin.com" className="footer-social-link" aria-label="LinkedIn">
                            <Linkedin size={18} />
                        </a>
                        <a href="https://instagram.com" className="footer-social-link" aria-label="Instagram">
                            <Instagram size={18} />
                        </a>
                        <a href="tel:+919731882974" className="footer-social-link" aria-label="Phone">
                            <Phone size={18} />
                        </a>
                        <a href="mailto:Bhanumurthy@Sunprosportsacademy.com" className="footer-social-link" aria-label="Email">
                            <Mail size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
