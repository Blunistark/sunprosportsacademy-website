import { motion } from 'framer-motion'
import './Partnerships.css'

// Import Logos
import karnatakaNewsLogo from '../assets/collab-logos/Karnataka-news-beat.png'
import playvueLogo from '../assets/collab-logos/playvue.png'
import bridgeportLogo from '../assets/collab-logos/bridgeport-labs.png'
import athletiqLogo from '../assets/collab-logos/athletiq.png'
import aquateinLogo from '../assets/collab-logos/aquatein.png'
import jindalLogo from '../assets/collab-logos/jindal.png'

const partners = [
  { 
    name: "Karnataka News Beat", 
    logo: karnatakaNewsLogo,
    category: "PAN INDIA Media Partner",
    header: "Visibility & Goodwill",
    points: [
      "Extensive media coverage for all tournaments and events",
      "Enhanced brand visibility for Presidency Group across INDIA",
      "Strategic marketing support and promotional campaigns",
      "Extensive PR and community goodwill building"
    ]
  },
  { 
    name: "PlayVue", 
    logo: playvueLogo,
    category: "Core Partner",
    header: "Leadership & Vision",
    points: [
      "Strong leadership driven, vision & strategic growth",
      "High-Quality execution with premium workmanship standrads",
      "Powerful network leverage across Brands, Coaches & Events",
      "Community - First approach building engagement & repeat usage"
    ]
  },
  { 
    name: "Bridgeport Labs - USA", 
    logo: bridgeportLogo,
    category: "Technology Partner",
    header: "Funding & Development",
    points: [
      "Provides training and job placement assistance to individuals",
      "Advocates for funding and prepare curriculum",
      "Promotes economic development activites that spark innovation",
      "Collaborates with corporate and private entities on projects"
    ]
  },
  { 
    name: "Athletiq", 
    logo: athletiqLogo,
    category: "Statistics Partner",
    header: "Visibility & Goodwill",
    points: [
      "Data-backed performance tracking for athletes",
      "Smart insights enabling better coaching and decision-making",
      "Real-time stats and dashboards for actionable insights",
      "Automated systems for seamless data capture and operations"
    ]
  },
  { 
    name: "Aquatein by Suniel Shetty", 
    logo: aquateinLogo,
    category: "Wellness Partner",
    header: "Student Welfare",
    points: [
      "Pioneering healthy hydration solutions for students",
      "Promoting student wellness and fitness initiatives",
      "Celebrity association enhancing brand credibility",
      "Nutrition awareness and healthy lifestyle programs"
    ]
  },
  { 
    name: "Jindal Sports", 
    logo: jindalLogo,
    category: "Sports Partner",
    header: "Excellence & Development",
    points: [
      "Nationwide network and sports infrastructure expertise",
      "Access to key sports personalities and champions",
      "Professional coaching academies and training programs",
      "Talent development platforms and career pathways"
    ]
  }
]

export default function Partnerships() {
  return (
    <section className="partnerships section" id="partnerships">
      <div className="container">
        <header className="wwd-header" style={{ textAlign: 'center', margin: '0 auto 80px' }}>
          <motion.span 
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            05 / The Sun Pro Sports Academy Advantage
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Strategic Partnerships That Amplify Value
          </motion.h2>
        </header>

        <div className="partners-grid">
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              className="partner-card-detailed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="partner-card-top">
                <div className="partner-logo-mini">
                  <img src={partner.logo} alt={partner.name} className="partner-logo-img-real" />
                </div>
                <h4 className="partner-title">{partner.name}</h4>
                <p className="partner-type-header">{partner.category}</p>
              </div>

              <div className="partner-card-body">
                <span className="partner-badge-type">{partner.category}</span>
                <h5 className="partner-content-header">{partner.header}</h5>
                <ul className="partner-points">
                  {partner.points.map((point, i) => (
                    <li key={i}>
                      <span className="check-icon">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="partner-card-footer">
                <div className="footer-label">
                  <span className="label-top">Combined Partnership Value</span>
                  <span className="label-bottom">Media Exposure + Wellness Programs + Sports Excellence</span>
                </div>
                <div className="footer-reach">
                   <p className="reach-label">Network Reach</p>
                   <p className="reach-value">Nationwide</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
