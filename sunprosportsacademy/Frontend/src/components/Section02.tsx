import './SectionCard.css'

interface SectionProps {
    opacity: number
}

export default function Section02({ opacity }: SectionProps) {
    const translateX = (1 - opacity) * 100
    
    return (
        <div className="section-container" style={{ opacity, pointerEvents: opacity > 0.5 ? 'all' : 'none' }}>
            <div className="sc-number sc-number--right" style={{ transform: `translateY(-50%) translateX(${translateX}px)` }}>02</div>
            <div className="sc-glass-panel sc-glass-panel--right" style={{ transform: `translateY(-50%) translateX(${translateX}px)` }}>
                <h2 className="section-title">CORE EXPERTISE</h2>
                <div className="section-content">
                    <ul className="content-list">
                        <li><strong>Indoor Stadium Development:</strong> State-of-the-art, climate-controlled stadiums for campuses.</li>
                        <li><strong>Multi-Sport Facility Design:</strong> Versatile facilities meeting international standards.</li>
                        <li><strong>End-to-End Execution:</strong> From conceptual design to precision engineering.</li>
                        <li><strong>Strategic Consulting:</strong> Board-level advisory to drive institutional growth.</li>
                        <li><strong>Athletic Recovery:</strong> Specialized sports science centers for peak performance.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
