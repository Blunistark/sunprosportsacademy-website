import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ArrowDown } from 'lucide-react'
import logo from '../../assets/Logo/Logo.png'
import heroArena from '../../assets/hero-arena.png'
import heroImg from '../../assets/strategic-partnership-1.png'
import './HeroV5.css'

/* ─── F1 Checkered Flag Component ──────────────────────────────────── */
function RaceFlag() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const COLS = 14
        const ROWS = 8
        let time = 0
        let animFrame: number

        const draw = () => {
            const W = canvas.width
            const H = canvas.height
            ctx.clearRect(0, 0, W, H)

            const cellW = W / COLS
            const cellH = H / ROWS

            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    const wave = Math.sin(c * 0.65 - time * 3.5) * (c / COLS) * 22
                    const waveZ = Math.sin(c * 0.65 - time * 3.5) * (c / COLS)
                    const brightness = 1 + waveZ * 0.28

                    const isBlack = (r + c) % 2 === 0
                    const baseColor = isBlack ? 18 : 248
                    const shaded = Math.min(255, Math.max(0, Math.round(baseColor * brightness)))

                    ctx.fillStyle = `rgb(${shaded},${shaded},${shaded})`
                    ctx.fillRect(c * cellW, r * cellH + wave, cellW + 1, cellH + 1)
                }
            }

            const grad = ctx.createLinearGradient(0, 0, W, 0)
            grad.addColorStop(0, 'rgba(0,0,0,0.3)')
            grad.addColorStop(0.15, 'rgba(0,0,0,0)')
            grad.addColorStop(0.85, 'rgba(0,0,0,0)')
            grad.addColorStop(1, 'rgba(0,0,0,0.2)')
            ctx.fillStyle = grad
            ctx.fillRect(0, 0, W, H)

            time += 0.016
            animFrame = requestAnimationFrame(draw)
        }

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }

        setTimeout(resize, 100);
        draw();

        const obs = new ResizeObserver(resize)
        obs.observe(canvas)
        return () => { cancelAnimationFrame(animFrame); obs.disconnect() }
    }, [])

    return <canvas ref={canvasRef} className="v5-flag-canvas" />
}

export default function HeroV5() {
    return (
        <div className="hero-v5-wrapper">
            {/* SECTION 1: FULL FLAG */}
            <section className="v5-section-flag">
                <div className="v5-flag-fullscreen">
                    <RaceFlag />
                    <motion.div 
                        className="v5-flag-logo-container"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <img src={logo} alt="Sun Pro" className="v5-logo" />
                    </motion.div>
                    
                    <motion.div 
                        className="v5-scroll-indicator"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <span>Scroll to Explore</span>
                        <ArrowDown size={20} />
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: CONTENT */}
            <section className="v5-section-content" id="home">
                <div className="v5-bg-wrapper">
                    <img src={heroImg} alt="Sports Infrastructure" className="v5-bg-img" />
                    <div className="v5-overlay" />
                </div>

                <motion.div 
                    className="v5-content-container container"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="v5-badge">
                        <span className="v5-dot" />
                        PREMIER INFRASTRUCTURE
                        <span className="v5-dot" />
                    </div>

                    <h1 className="v5-title">
                        Building The <span className="gold">Future</span> <br />
                        Of Sports <span className="gold">Infrastructure</span>
                    </h1>

                    <p className="v5-description">
                        We specialize in designing and developing world-class indoor stadiums that empower students, athletes, and institutions to perform at their highest potential.
                    </p>

                    <div className="v5-actions">
                        <a href="#contact" className="btn btn-primary v5-btn">
                            Get Consultation <ChevronRight size={18} style={{ marginLeft: '8px' }} />
                        </a>
                        <a href="#what-we-do" className="btn btn-outline v5-btn-alt">
                            Our Portfolio
                        </a>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}
