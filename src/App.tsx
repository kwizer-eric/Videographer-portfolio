import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ProjectSlider from './components/ProjectSlider'
import Archive from './components/Archive'
import Contact from './components/Contact'
import Gallery from './components/Gallery'
import { projects } from './data/projects'

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [view, setView] = useState<'slider' | 'archive' | 'contact' | 'gallery'>('slider')

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] selection:bg-cream selection:text-charcoal overflow-x-hidden">
      <Header currentView={view} setView={setView} />

      <main>
        {view === 'slider' ? (
          <ProjectSlider onProjectChange={setCurrentIndex} />
        ) : view === 'archive' ? (
          <Archive />
        ) : view === 'gallery' ? (
          <Gallery />
        ) : (
          <Contact />
        )}
      </main>

      <Footer
        currentView={view}
        setView={setView}
        timeCode={projects[currentIndex].timeCode}
        nextImageUrl={projects[(currentIndex + 1) % projects.length].imageUrl}
        count={projects.length}
      />

      {/* Global Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-30 mix-blend-overlay">
        <div className="absolute inset-0 bg-[#050505]/10 animate-pulse"></div>
      </div>
    </div>
  )
}

export default App
