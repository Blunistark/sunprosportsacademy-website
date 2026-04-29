import './SectionCard.css'

interface SectionCardProps {
    num: string
    side: 'left' | 'right'
    opacity: number
}

export default function SectionCard({ num, side, opacity }: SectionCardProps) {
    // Slide up: starts 40px below, reaches 0 at full opacity
    const slideY = (1 - opacity) * 40

    return (
        <>
            {/* Number */}
            <div
                className={`sc-number sc-number--${side}`}
                style={{
                    opacity,
                    transform: `translateY(calc(-50% + ${slideY}px))`,
                }}
            >
                {num}
            </div>

            {/* Glass panel */}
            <div
                className={`sc-glass-panel sc-glass-panel--${side}`}
                style={{
                    opacity,
                    transform: `translateY(calc(-50% + ${slideY}px))`,
                }}
            >
                {/* Content added later */}
            </div>
        </>
    )
}
