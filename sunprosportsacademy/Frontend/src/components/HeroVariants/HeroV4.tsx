import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import logo from '../../assets/Logo/Logo.png'
import heroImg from '../../assets/strategic-partnership-1.png'
import './HeroV4.css'

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

        resize()
        draw()

        const obs = new ResizeObserver(resize)
        obs.observe(canvas)
        return () => { cancelAnimationFrame(animFrame); obs.disconnect() }
    }, [])

    return <canvas ref={canvasRef} className="v4-flag-canvas" />
}

export default function HeroV4() {
    return (
        <section className="hero-v4" id="home">
            <div className="v4-image-wrapper">
                <motion.img
                    src={heroImg}
                    className="v4-bg-image"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                />
                <div className="v4-overlay" />
            </div>

            <motion.div
                className="v4-content container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="v4-title-area">
                    <div className="v4-flag-container">
                        <RaceFlag />
                        <motion.div 
                            className="v4-flag-logo-container"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <img src={logo} alt="Sun Pro Logo" className="v4-flag-logo" />
                        </motion.div>
                    </div>

                    <h1 className="v4-title">
                        <span className="v4-title-line">Building The Future</span>
                        <span className="v4-title-line gold">Of Sports Infrastructure</span>
                    </h1>
                </div>

                <motion.p
                    className="v4-description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Sun Pro Sports Academy is dedicated to transforming university campuses into vibrant hubs of athletic excellence. We specialize in designing and developing world-class indoor stadiums.
                </motion.p>

                <motion.div
                    className="v4-actions"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <a href="#contact" className="btn btn-primary v4-btn">
                        Get Started <ChevronRight size={18} style={{ marginLeft: '8px' }} />
                    </a>
                    <a href="#what-we-do" className="btn btn-outline v4-btn-alt">
                        Our Vision
                    </a>
                </motion.div>
            </motion.div>
        </section>
    )
}
