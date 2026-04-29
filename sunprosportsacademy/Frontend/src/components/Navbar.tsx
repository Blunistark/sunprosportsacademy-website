import { useState } from 'react'
import './Navbar.css'
import logo from '../assets/Logo/Logo.png'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)
    const closeDrawer = () => setIsDrawerOpen(false)

    return (
        <>
            <nav className="glass-navbar">

                {/* Desktop Links */}
                <div className="navbar-links desktop-only">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#expertise">Expertise</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
                </div>

                <a href="#contact" className="navbar-cta desktop-only">
                    <span>Explore Now</span>
                    <div className="cta-dot" />
                </a>

                {/* Mobile Hamburger Toggle */}
                <button className="mobile-menu-toggle" onClick={toggleDrawer} aria-label="Toggle Menu">
                    {isDrawerOpen ? <FaTimes /> : <FaBars />}
                </button>
            </nav>

            {/* Mobile Navigation Drawer */}
            <div className={`mobile-drawer ${isDrawerOpen ? 'open' : ''}`}>
                <div className="drawer-overlay" onClick={closeDrawer} />
                <div className="drawer-content">
                    <div className="drawer-links">
                        <a href="#home" onClick={closeDrawer}>Home</a>
                        <a href="#about" onClick={closeDrawer}>About</a>
                        <a href="#expertise" onClick={closeDrawer}>Expertise</a>
                        <a href="#services" onClick={closeDrawer}>Services</a>
                        <a href="#contact" onClick={closeDrawer}>Contact</a>
                    </div>
                    <a href="#contact" className="drawer-cta" onClick={closeDrawer}>
                        Explore Now
                    </a>
                </div>
            </div>
        </>
    )
}
