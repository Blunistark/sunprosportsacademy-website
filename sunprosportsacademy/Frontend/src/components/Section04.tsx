import './SectionCard.css'

interface SectionProps {
    opacity: number
}

export default function Section04({ opacity }: SectionProps) {
    const isMobile = window.innerWidth < 768
    const leftX = (1 - opacity) * -100
    const rightX = (1 - opacity) * 100

    // Mobile combined content
    if (isMobile) {
        return (
            <div className="section-container" style={{ opacity, pointerEvents: opacity > 0.5 ? 'all' : 'none' }}>
                <div className="sc-glass-panel sc-glass-panel--center section-04-mobile-card" style={{ transform: `translateY(-50%)` }}>
                    <h2 className="section-title">STRATEGIC PARTNERS</h2>
                    <div className="partner-list">
                        <div className="partner-item"><span>Karnataka News Beat</span> • Media</div>
                        <div className="partner-item"><span>PlayVue</span> • Core Growth</div>
                        <div className="partner-item"><span>Bridgeport Labs</span> • Technology</div>
                        <div className="partner-item"><span>Athletiq</span> • Statistics</div>
                        <div className="partner-item"><span>Aquatein</span> • Wellness</div>
                        <div className="partner-item"><span>Jindal Sports</span> • Excellence</div>
                    </div>
                </div>
                <div className="sc-number sc-number--center" style={{ opacity }}>04</div>
            </div>
        )
    }

    return (
        <div className="section-container section-container--split" style={{ opacity, pointerEvents: opacity > 0.5 ? 'all' : 'none' }}>
            {/* Left Partners */}
            <div className="sc-glass-panel sc-glass-panel--split-left" style={{ transform: `translateY(-50%) translateX(${leftX}px)` }}>
                <h2 className="section-title">STRATEGIC</h2>
                <div className="partner-list">
                    <div className="partner-item"><span>Karnataka News Beat</span> • Media</div>
                    <div className="partner-item"><span>PlayVue</span> • Core Growth</div>
                    <div className="partner-item"><span>Bridgeport Labs</span> • Technology</div>
                </div>
            </div>

            {/* Right Partners */}
            <div className="sc-glass-panel sc-glass-panel--split-right" style={{ transform: `translateY(-50%) translateX(${rightX}px)` }}>
                <h2 className="section-title">PARTNERS</h2>
                <div className="partner-list">
                    <div className="partner-item"><span>Athletiq</span> • Statistics</div>
                    <div className="partner-item"><span>Aquatein</span> • Wellness</div>
                    <div className="partner-item"><span>Jindal Sports</span> • Excellence</div>
                </div>
            </div>

            {/* The centered "04" number in the background */}
            <div className="sc-number sc-number--center" style={{ opacity }}>04</div>
        </div>
    )
}
