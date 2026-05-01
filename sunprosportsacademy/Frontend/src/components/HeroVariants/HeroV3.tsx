import { motion } from 'framer-motion'
import { ChevronRight, ArrowRight } from 'lucide-react'
import logo from '../../assets/Logo/Logo.png'
import stadiumBase from '../../assets/stadium-base.png'
import './HeroV3.css'

export default function HeroV3() {
    return (
        <section className="hero-v3" id="home">
            {/* Background Ambient Glows */}
            <div className="hero-ambient glow-1" />
            <div className="hero-ambient glow-2" />

            <div className="hero-v3-container container">

                {/* Left Content Area (Glassmorphic) */}
                <motion.div
                    className="hero-v3-content"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >

                    <h1 className="v3-title">
                        Engineered for <br />
                        <span className="text-gradient">Champions</span>
                    </h1>

                    <p className="v3-description">
                        We don't just build stadiums. We forge arenas where legends are born. Sun Pro Sports Academy delivers world-class, tech-integrated indoor sports facilities.
                    </p>

                    <div className="v3-actions">
                        <a href="#contact" className="btn btn-primary v3-btn-main">
                            Start Your Project <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                        </a>
                        <a href="#what-we-do" className="btn btn-ghost">
                            Explore Specs
                        </a>
                    </div>

                    <div className="v3-stats">
                        <div className="stat">
                            <span className="stat-number">24/7</span>
                            <span className="stat-label">Support</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Visual Area (Floating Stadium) */}
                <div className="hero-v3-visual">
                    <motion.div
                        className="v3-visual-badge-container"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="v3-badge">
                            <span className="pulse-dot"></span>
                            NEXT-GEN SPORTS INFRASTRUCTURE <span className="pulse-dot end-dot"></span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="stadium-float-container"
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    >
                        <motion.img
                            src={stadiumBase}
                            alt="Stadium Base"
                            className="v3-stadium-img"
                            initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                        />

                        <motion.img
                            src={logo}
                            alt="Sun Pro Logo"
                            className="v3-floating-logo"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                        />
                    </motion.div>
                </div>

            </div>
        </section>
    )
}
