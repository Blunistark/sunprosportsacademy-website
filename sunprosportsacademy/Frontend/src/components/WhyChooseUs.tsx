import { motion } from 'framer-motion'
import { ShieldCheck, Zap, TrendingUp, Users } from 'lucide-react'
import './WhyChooseUs.css'

const reasons = [
  {
    icon: <ShieldCheck />,
    title: "University Expertise",
    desc: "Deep expertise in developing high-performance sports infrastructure within university campuses."
  },
  {
    icon: <Zap />,
    title: "World-Class Quality",
    desc: "Unwavering commitment to international quality standards in every stadium we build."
  },
  {
    icon: <Users />,
    title: "Strong Ecosystem",
    desc: "A powerful network of strategic sports industry partners that amplify project value."
  },
  {
    icon: <TrendingUp />,
    title: "Functional Innovation",
    desc: "A core focus on sustainability, innovation, and long-term facility functionality."
  }
]

export default function WhyChooseUs() {
  return (
    <section className="why-choose-us section" id="why-choose-us">
      <div className="container">
        <div className="wcu-inner">
          <div className="wcu-content">
            <motion.span 
              className="section-label"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              The Sun Pro Advantage
            </motion.span>
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Why Choose <span className="text-gold">Sun Pro?</span>
            </motion.h2>
            <motion.p 
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              We don't just build stadiums; we build legacies. Our holistic approach to sports infrastructure combines engineering precision with a deep understanding of athletic requirements.
            </motion.p>
          </div>

          <div className="wcu-grid">
            {reasons.map((reason, index) => (
              <motion.div 
                key={index}
                className="wcu-item"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="wcu-icon-box">
                  {reason.icon}
                </div>
                <div className="wcu-text">
                  <h4>{reason.title}</h4>
                  <p>{reason.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
