import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ProjectSlider from './components/ProjectSlider'
import { SmoothScroll } from './components/SmoothScroll'
import { projects } from './data/projects'

function App() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)

  // Listen to GSAP ScrollTrigger events to update the footer timecode
  // This is a simplified version; in a real app, you might use a more robust state management
  useEffect(() => {
    const handleScroll = () => {
      // Find which project is currently most visible
      // This is handled by GSAP, but for the footer count/timecode we can sync it
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-charcoal selection:bg-cream selection:text-charcoal overflow-x-hidden">
        <Header />

        <main>
          <ProjectSlider />
        </main>

        <Footer timeCode={projects[0].timeCode} />

        {/* Global Film Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-30 mix-blend-overlay">
          <div className="absolute inset-0 bg-[#050505]/10 animate-pulse"></div>
        </div>
      </div>
    </SmoothScroll>
  )
}

export default App
