import './SectionCard.css'

interface SectionProps {
    opacity: number
}

export default function Section03({ opacity }: SectionProps) {
    const translateX = (1 - opacity) * -100
    
    return (
        <div className="section-container" style={{ opacity, pointerEvents: opacity > 0.5 ? 'all' : 'none' }}>
            <div className="sc-number sc-number--left" style={{ transform: `translateY(-50%) translateX(${translateX}px)` }}>03</div>
            <div className="sc-glass-panel sc-glass-panel--left" style={{ transform: `translateY(-50%) translateX(${translateX}px)` }}>
                <h2 className="section-title">THE ADVANTAGE</h2>
                <div className="section-content">
                    <ul className="content-list">
                        <li><strong>University Expertise:</strong> Specialized in developing high-performance infrastructure within education.</li>
                        <li><strong>World-Class Quality:</strong> Unwavering commitment to international standards and premium workmanship.</li>
                        <li><strong>Strong Ecosystem:</strong> Access to a powerful nationwide network of strategic partners.</li>
                        <li><strong>Functional Innovation:</strong> Sustainable designs that spark economic and athletic growth.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
