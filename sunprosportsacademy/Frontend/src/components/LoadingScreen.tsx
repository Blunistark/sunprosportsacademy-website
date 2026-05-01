import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/Logo/Logo.png'
import './LoadingScreen.css'

/* ─── F1 Checkered Flag Canvas ──────────────────────────────────── */
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

            // Edge vignette to soften borders
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

    return <canvas ref={canvasRef} className="flag-canvas" />
}

/* ─── Loading Screen ────────────────────────────────────────────── */
export default function LoadingScreen() {
    return (
        <motion.div
            className="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
            <div className="loading-bg" />

            {/* Glow rings */}
            <div className="glow-ring glow-ring-1" />
            <div className="glow-ring glow-ring-2" />

            {/* Flag + Logo */}
            <div className="flag-wrapper">
                {/* Checkered canvas */}
                <div className="flag-3d-inner">
                    <RaceFlag />
                </div>

                {/* Logo — absolutely centered over the flag */}
                <motion.div
                    className="flag-logo-container"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                >
                    <img src={logo} alt="Sun Pro Sports Academy" className="flag-logo-img" />
                </motion.div>
            </div>
        </motion.div>
    )
}
