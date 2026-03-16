import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
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

// Admin
import { initializeStore } from './admin/data/store'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/pages/Dashboard'
import Appointments from './admin/pages/Appointments'
import Clients from './admin/pages/Clients'
import ClientDetail from './admin/pages/ClientDetail'
import AdminServices from './admin/pages/Services'
import Staff from './admin/pages/Staff'
import Settings from './admin/pages/Settings'
import { InvoiceList, InvoiceDetail } from './admin/pages/Invoices'
import Inventory from './admin/pages/Inventory'
import Calendar from './admin/pages/Calendar'

// Initialize admin store with mock data on first load
initializeStore()

function LandingPage() {
    const { theme, toggleTheme } = useTheme()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
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

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="clients" element={<Clients />} />
                <Route path="clients/:clientId" element={<ClientDetail />} />
                <Route path="invoices" element={<InvoiceList />} />
                <Route path="invoices/:invoiceId" element={<InvoiceDetail />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="staff" element={<Staff />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    )
}
