import { useEffect, useState, Suspense } from 'react'
import Hero from './components/Hero'
import Section01 from './components/Section01'
import Section02 from './components/Section02'
import Section03 from './components/Section03'
import Section04 from './components/Section04'
import Navbar from './components/Navbar'
import Logo3D from './components/Logo3D'
import Footer from './components/Footer'
import './app.css'

const LOGO_X = [-22, 22, -22, 0] // Centered for S04
const LOGO_TILT = [-0.25, 0.25, -0.25, 0] // No tilt for S04 center
const LOGO_Y = 12

const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v))

export default function App() {
    const [heroExit, setHeroExit] = useState(0)
    const [spinProgs, setSpinProgs] = useState([0, 0, 0, 0])
    const [visProgs, setVisProgs] = useState([0, 0, 0, 0])
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', onResize)

        const onScroll = () => {
            const y = window.scrollY
            const vh = window.innerHeight

            // Transition duration: 1vh for logo movement/spin
            const SPIN_DUR = 1.0 * vh

            // Spin starts: calculated to finish EXACTLY at the anchor points
            // Hero->S01 finishes at 100vh. S01->S02 finishes at 350vh. S02->S03 finishes at 600vh. S03->S04 finishes at 850vh.
            const spinStarts = [0, 2.5 * vh, 5.0 * vh, 7.5 * vh]
            setSpinProgs(spinStarts.map(start => clamp((y - start) / SPIN_DUR)))

            // Vis starts: should also finish by anchor points
            const visStarts = [0.1 * vh, 2.5 * vh, 5.0 * vh, 7.5 * vh]
            setVisProgs(visStarts.map(start => clamp((y - start) / (1.0 * vh))))

            setHeroExit(clamp(y / (vh * 0.6)))
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
        }
    }, [])

    // ── Mobile Overrides ─────────────────────────────────────────
    const MOBILE_LOGO_Y = -30
    // Force logo to opposite side of number on mobile
    const MOBILE_LOGO_X = [28, -28, 28, 0]
    const currentLOGO_X = isMobile ? MOBILE_LOGO_X : LOGO_X
    const currentLOGO_Y = isMobile ? MOBILE_LOGO_Y : LOGO_Y
    const currentLOGO_TILT = isMobile ? LOGO_TILT.map(t => t * 0.5) : LOGO_TILT

    // ── Logo Calculation ─────────────────────────────────────────
    const fromX = [isMobile ? -35 : 0, currentLOGO_X[0], currentLOGO_X[1], currentLOGO_X[2]]
    const toX = currentLOGO_X
    const fromTilt = [0, currentLOGO_TILT[0], currentLOGO_TILT[1], currentLOGO_TILT[2]]
    const toTilt = currentLOGO_TILT

    // Y logic: On mobile, always stay at top zone (-30vh) except Hero start
    const fromY = [isMobile ? -30 : -2, currentLOGO_Y, currentLOGO_Y, currentLOGO_Y]
    const toY = [currentLOGO_Y, currentLOGO_Y, currentLOGO_Y, isMobile ? -30 : 4]

    // Scale logic: on mobile start smaller
    const s01Prog = spinProgs[0]
    const s04Prog = spinProgs[3]
    const baseScale = isMobile ? 1.5 : 1.4
    const diff = isMobile ? 0.8 : 0.4
    // On mobile, shrink FURTHER in S04 to 0.5. On desktop, grow to 1.8.
    const s04ScaleAdjust = isMobile ? -0.2 : 0.4
    const currentScale = (baseScale - (s01Prog * diff)) + (s04Prog * s04ScaleAdjust)

    let logoX = 0, logoY = -2, activeSpinProgress = 0, currentTilt = 0
    const activeIdx = spinProgs.findIndex(p => p > 0 && p < 1)

    if (activeIdx >= 0) {
        const p = spinProgs[activeIdx]
        logoX = fromX[activeIdx] + (toX[activeIdx] - fromX[activeIdx]) * p
        logoY = fromY[activeIdx] + (toY[activeIdx] - fromY[activeIdx]) * p
        currentTilt = fromTilt[activeIdx] + (toTilt[activeIdx] - fromTilt[activeIdx]) * p
        activeSpinProgress = p
    } else {
        const lastDone = [...spinProgs].reverse().findIndex(p => p >= 1)
        const lastIdx = lastDone >= 0 ? spinProgs.length - 1 - lastDone : -1
        if (lastIdx >= 0) {
            logoX = toX[lastIdx]
            logoY = isMobile ? MOBILE_LOGO_Y : toY[lastIdx]
            currentTilt = toTilt[lastIdx]
        }
    }

    const visibilities = visProgs.map((p, i) => {
        const next = visProgs[i + 1] ?? 0
        let v = p * (1 - next)

        // Special case: fade out S04 as we reach the footer (approx 10.5vh+)
        if (i === 3) {
            const footerEntry = clamp((window.scrollY - 10 * window.innerHeight) / (0.5 * window.innerHeight))
            v *= (1 - footerEntry)
        }
        return v
    })

    // Also fade logo out at the very end
    const footerEntryForLogo = clamp((window.scrollY - 10.2 * window.innerHeight) / (0.3 * window.innerHeight))
    const logoOpacity = 1 - footerEntryForLogo

    return (
        <>
            <Navbar />

            {/* Centered Overlay Quote - In front of logo (Z-INDEX 20) */}
            <div className="sc-center-quote" style={{ opacity: visibilities[3] }}>
                "Precision, Innovation, Excellence"
            </div>

            {logoOpacity > 0 && (
                <div
                    className="global-logo-wrapper"
                    style={{
                        transform: `translate(calc(-50% + ${logoX}vw), calc(-50% + ${logoY}vh)) scale(${currentScale})`,
                        opacity: logoOpacity
                    }}
                >
                    <Suspense fallback={null}>
                        <Logo3D spinProgress={activeSpinProgress} tilt={currentTilt} />
                    </Suspense>
                </div>
            )}

            <Section01 opacity={visibilities[0]} />
            <Section02 opacity={visibilities[1]} />
            <Section03 opacity={visibilities[2]} />
            <Section04 opacity={visibilities[3]} />

            <main>
                <div id="home"><Hero heroExit={heroExit} /></div>
                <div id="about" style={{ height: '250vh', background: '#0095ffff' }} />
                <div id="expertise" style={{ height: '250vh', background: '#0095ffff' }} />
                <div id="services" style={{ height: '250vh', background: '#0095ffff' }} />
                <div id="contact" style={{ height: '250vh', background: '#0095ffff' }} />
                <Footer />
            </main>
        </>
    )
}
