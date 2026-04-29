import './Hero.css'

interface HeroProps {
    heroExit: number // 0→1 as user scrolls out of hero
}

export default function Hero({ heroExit }: HeroProps) {
    const isMobile = window.innerWidth < 768

    return (
        <section className="hero-section" style={{ opacity: 1 - heroExit }}>
            {/* Top Marquee: SUN PRO */}
            <div className="hero-marquee-container top">
                <div className="hero-marquee-track">
                    <span className="marquee-text">SUN PRO </span>
                    <span className="marquee-text">SUN PRO </span>
                    <span className="marquee-text">SUN PRO </span>
                    <span className="marquee-text">SUN PRO </span>
                </div>
            </div>

            {/* Bottom Marquee: SPORTS ACADEMY */}
            <div className="hero-marquee-container bottom">
                <div className="hero-marquee-track reverse">
                    <span className="marquee-text">SPORTS ACADEMY </span>
                    <span className="marquee-text">SPORTS ACADEMY </span>
                    <span className="marquee-text">SPORTS ACADEMY </span>
                    <span className="marquee-text">SPORTS ACADEMY </span>
                </div>
            </div>
        </section>
    )
}
