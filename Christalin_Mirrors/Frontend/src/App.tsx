import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import FoundersNote from './components/FoundersNote'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Gallery from './components/Gallery'
import Branches from './components/Branches'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'

export default function App() {
    const { theme, toggleTheme } = useTheme()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading assets
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <AnimatePresence>
                {isLoading && <LoadingScreen key="loader" />}
            </AnimatePresence>

            <Navbar theme={theme} toggleTheme={toggleTheme} isAppLoading={isLoading} />
            <main>
                <Hero />
                <About />
                <FoundersNote />
                <Services />
                <Testimonials />
                <Gallery />
                <Branches />
                <Contact />
            </main>
            <Footer />
        </>
    )
}
