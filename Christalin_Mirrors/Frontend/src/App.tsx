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

export default function App() {
    const { theme, toggleTheme } = useTheme()

    return (
        <>
            <Navbar theme={theme} toggleTheme={toggleTheme} />
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
