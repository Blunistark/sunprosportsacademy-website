import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import logo from '../../assets/Logo/Logo.png'
import './HeroV2.css'

export default function Hero({ isAppLoading, isScrolled }: { isAppLoading?: boolean, isScrolled?: boolean }) {
    return (
        <section className="hero-v2" id="home">
            <div className="hero-v2-bg" />
            
            <motion.div
                className="hero-v2-content container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <img src={logo} alt="Sun Pro" className="hero-v2-logo" />
                
                <h1 className="hero-v2-title">
                    Elevating <span className="text-gold">Sports</span> Excellence
                </h1>
                
                <p className="hero-v2-description">
                    Designing and developing world-class sports infrastructure for the next generation of champions.
                </p>

                <div className="hero-v2-actions">
                    <a href="#contact" className="btn btn-primary">Get Started</a>
                    <a href="#about" className="btn btn-outline">Learn More</a>
                </div>
            </motion.div>
        </section>
    )
}
