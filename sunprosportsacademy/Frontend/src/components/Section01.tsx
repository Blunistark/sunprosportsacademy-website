import heritageImg from '../assets/partnership-concept.png'
import './SectionCard.css'

interface SectionProps {
    opacity: number
}

export default function Section01({ opacity }: SectionProps) {
    const translateX = (1 - opacity) * -100

    return (
        <div className="section-container" style={{ opacity, pointerEvents: opacity > 0.5 ? 'all' : 'none' }}>
            <div className="sc-number sc-number--left" style={{ transform: `translateY(-50%) translateX(${translateX}px)` }}>01</div>
            <div className="sc-glass-panel sc-glass-panel--left" style={{ transform: `translateY(-50%) translateX(${translateX}px)` }}>
                <h2 className="section-title">OUR HERITAGE</h2>
                <div className="section-content">
                    <img src={heritageImg} alt="Partnership Concept" className="content-image" />
                    <div className="content-highlight">
                        <h3>OUR VISION</h3>
                        <p>To become a trusted global leader in sports infrastructure development, empowering educational institutions to nurture elite talent.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
