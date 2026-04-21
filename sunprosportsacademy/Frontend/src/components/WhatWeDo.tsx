import { motion } from 'framer-motion'
import { Building2, Layout, Sliders, BarChart3, Activity } from 'lucide-react'
import './WhatWeDo.css'

const services = [
  {
    icon: <Building2 />,
    title: "Indoor Stadium Development",
    desc: "Development of state-of-the-art climate-controlled stadiums within university campuses."
  },
  {
    icon: <Layout />,
    title: "Multi-Sport Facility Design",
    desc: "Creation of versatile multi-sport facilities that meet international standards for performance."
  },
  {
    icon: <Sliders />,
    title: "End-to-End Execution",
    desc: "Complete project management from conceptual design to precision engineering and execution."
  },
  {
    icon: <BarChart3 />,
    title: "Strategic Consulting",
    desc: "Expert sports infrastructure consulting and board-level advisory for institutional growth."
  },
  {
    icon: <Activity />,
    title: "Athletic Recovery & Prehab",
    desc: "Development of specialized sports science centers focused on injury prevention and peak performance."
  }
]

export default function WhatWeDo() {
  return (
    <section className="what-we-do section" id="what-we-do">
      <div className="container">
        <header className="wwd-header">
          <motion.span 
            className="section-label"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Core Expertise
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            What We Do
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            At Sun Pro Sports Academy, we bring vision, innovation, and precision to sports infrastructure. Our core focus is:
          </motion.p>
        </header>

        <div className="wwd-grid">
          {services.map((item, index) => (
            <motion.div 
              key={index}
              className="card-premium"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="wwd-icon">
                {item.icon}
              </div>
              <h3 className="wwd-card-title">{item.title}</h3>
              <p className="wwd-card-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
