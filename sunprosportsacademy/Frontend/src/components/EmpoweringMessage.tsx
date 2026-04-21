import { motion } from 'framer-motion'
import { StaggerContainer, StaggerItem } from './Animations'
import './EmpoweringMessage.css'

export default function EmpoweringMessage() {
    return (
        <section className="empowering-section section" id="vision-message">
            <div className="container">
                <StaggerContainer className="empowering-inner">
                    <StaggerItem>
                        <div className="empowering-content">
                            <span className="section-label">Empowering Campuses Through Sports</span>
                            <h2 className="empowering-title">Our Commitment to Excellence</h2>
                            
                            <div className="empowering-body">
                                <p className="lead-text">
                                    We believe that <strong>great infrastructure creates great athletes.</strong>
                                </p>
                                <p>
                                    At Sun Pro Sports Academy, we are not just building stadiums — 
                                    we are building platforms for excellence, growth, and future champions.
                                </p>
                            </div>

                            <motion.div 
                                className="empowering-line"
                                initial={{ width: 0 }}
                                whileInView={{ width: '120px' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </div>
                    </StaggerItem>
                </StaggerContainer>
            </div>
        </section>
    )
}
