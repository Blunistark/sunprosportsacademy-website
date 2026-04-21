import { motion } from 'framer-motion'
import { StaggerContainer, StaggerItem } from './Animations'
import aboutImg from '../assets/about-salon.png'
import './About.css'

export default function About() {
    return (
        <section className="about section" id="vision">
            <div className="container">
                <div className="about-inner">
                    {/* Image */}
                    <StaggerItem className="about-image-wrapper" xOffset={-40} yOffset={0}>
                        <img src={aboutImg} alt="Christalin Mirrors Salon" className="about-image" loading="lazy" />
                    </StaggerItem>

                    {/* Text */}
                    <StaggerContainer>
                        <StaggerItem>
                            <p className="section-label about-label">Our Vision</p>
                        </StaggerItem>
                        <StaggerItem>
                            <h2 className="about-heading">Empowering the Next Generation</h2>
                        </StaggerItem>
                        <StaggerItem>
                            <p className="about-text">
                                To become a <strong>trusted leader</strong> in sports infrastructure development, 
                                empowering educational institutions to nurture talent and promote a culture of 
                                sports and wellness across the nation.
                            </p>
                        </StaggerItem>
                        <StaggerItem>
                            <p className="about-text">
                                At Sun Pro Sports Academy, we believe that world-class facilities are the foundation 
                                of athletic excellence. Our mission is to elevate sports culture by providing 
                                state-of-the-art stadiums that inspire students and athletes to reach their peak potential.
                            </p>
                        </StaggerItem>
                        <StaggerItem>
                            <div className="founder-note">
                                <p className="founder-label">Core Mission</p>
                                <p className="founder-name">Precision, Innovation, Excellence</p>
                            </div>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </div>
        </section>
    )
}
