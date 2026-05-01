import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import '../Hero.css'
import heroImg from '../../assets/strategic-partnership-1.png'

export default function HeroV6() {
    return (
        <section className="hero" id="home">
            <div className="hero-image-wrapper">
                <motion.img
                    src={heroImg}
                    className="hero-image"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                />
                <div className="hero-overlay" />
            </div>

            <motion.div
                className="hero-content container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="hero-badge"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <span className="dot" />
                    <span>Premier Sports Infrastructure</span>
                    <span className="dot" />
                </motion.div>

                <h1 className="hero-title-container no-logo">
                    <div className="v6-title-main">
                        Building The Future <br />
                        <span className="text-gold">Of Sports Infrastructure</span>
                    </div>
                </h1>

                <motion.p
                    className="hero-description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Sun Pro Sports Academy is dedicated to transforming university campuses into vibrant hubs of athletic excellence. We specialize in designing and developing world-class indoor stadiums.
                </motion.p>

                <motion.div
                    className="hero-actions"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <a href="#contact" className="btn btn-primary">
                        Request a Consultation <ChevronRight size={18} style={{ marginLeft: '8px' }} />
                    </a>
                    <a href="#what-we-do" className="btn btn-outline" style={{ marginLeft: '1rem' }}>
                        Our Services
                    </a>
                </motion.div>
            </motion.div>
        </section>
    )
}
