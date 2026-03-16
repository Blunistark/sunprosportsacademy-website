import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import heroImg from '../assets/hero.png'
import cmLogo from '../assets/cm-logo-white.png'
import './Hero.css'

export default function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="hero-image-wrapper">
                <motion.img
                    src={heroImg}
                    alt="Christalin Mirrors — Refined Unisex Salon"
                    className="hero-image"
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="hero-overlay" />
            </div>

            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <img src={cmLogo} alt="CM" className="hero-monogram-img" />
                <span className="hero-unisex-badge">Unisex Salon</span>
                <h1 className="hero-brand-name">Christalin Mirrors</h1>
                <p className="hero-tagline">
                    Refine &bull; Reflect &bull; Radiate
                </p>
                <div className="hero-cta-row">
                    <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
                        Book Appointment
                    </a>
                    <a href="#services" className="btn btn-outline" style={{ borderColor: 'rgba(250,250,250,0.3)', color: '#FAFAFA' }} onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }) }}>
                        Explore Services
                    </a>
                </div>
            </motion.div>

            <div className="hero-scroll-indicator">
                <span>Scroll</span>
                <div className="scroll-line" />
                <ArrowDown size={14} />
            </div>
        </section>
    )
}
