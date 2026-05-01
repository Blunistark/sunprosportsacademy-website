import { useState } from 'react'
import HeroOriginal from '../Hero'
import HeroV1 from './HeroV1'
import HeroV2 from './HeroV2'
import HeroV3 from './HeroV3'
import HeroV4 from './HeroV4'
import HeroV5 from './HeroV5'
import HeroV6 from './HeroV6'
import './HeroVariantSwitcher.css'

const variants = [
  { id: 'original', name: 'Original', component: HeroOriginal },
  { id: 'v1', name: 'Stadium Variant', component: HeroV1 },
  { id: 'v2', name: 'Minimalist', component: HeroV2 },
  { id: 'v3', name: 'Cinematic Glass', component: HeroV3 },
  { id: 'v4', name: 'Flag Animation', component: HeroV4 },
  { id: 'v5', name: 'Sequential Flag', component: HeroV5 },
  { id: 'v6', name: 'Clean Split', component: HeroV6 }
]

export default function HeroVariantSwitcher({ isAppLoading, isScrolled }: { isAppLoading: boolean, isScrolled: boolean }) {
  const [activeVariant, setActiveVariant] = useState('original')

  const ActiveHero = variants.find(v => v.id === activeVariant)?.component || HeroOriginal

  return (
    <div className="hero-variant-container">
      <div className="variant-nav">
        {variants.map(v => (
          <button 
            key={v.id} 
            className={`variant-btn ${activeVariant === v.id ? 'active' : ''}`}
            onClick={() => setActiveVariant(v.id)}
          >
            {v.name}
          </button>
        ))}
      </div>
      <ActiveHero isAppLoading={isAppLoading} isScrolled={isScrolled} />
    </div>
  )
}
