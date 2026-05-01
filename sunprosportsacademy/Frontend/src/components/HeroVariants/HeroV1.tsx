import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import logo from '../../assets/Logo/Logo.png'
import './HeroV1.css'

import stadiumBase from '../../assets/stadium-base.png'

export default function Hero({ isAppLoading, isScrolled }: { isAppLoading?: boolean, isScrolled?: boolean }) {
    return (
        <section className="hero" id="home">
            <div className="hero-overlay" />

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

                {/* Central Visual */}
                <div className="stadium-logo-composite">
                    <motion.img
                        src={stadiumBase}
                        className="stadium-base-img"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                    <motion.div 
                        className="central-logo-wrapper"
                        initial={{ opacity: 0, scale: 0.5, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                    >
                        <img src={logo} alt="Sun Pro Trophy" className="trophy-logo" />
                    </motion.div>
                </div>

                <h1 className="hero-title-container">
                    <div className="hero-title-stacked">
                        <span>Building The Future</span>
                        <span className="text-gold">Of Sports Infrastructure</span>
                    </div>
                </h1>

                <motion.p
                    className="hero-description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Sun Pro Sports Academy is dedicated to transforming university campuses into vibrant hubs of athletic excellence. We specialize in designing and developing world-class indoor stadiums that empower students, athletes, and institutions to perform at their highest potential.
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
