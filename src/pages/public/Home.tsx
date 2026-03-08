import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProjectSlider from '../../components/ProjectSlider'
import Archive from '../../components/Archive'
import Contact from '../../components/Contact'
import Gallery from '../../components/Gallery'
import ProjectView from '../../components/ProjectView'
import ImageView from '../../components/ImageView'
import { api } from '../../lib/api'
import type { Project } from '../../data/projects'

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [view, setView] = useState<'slider' | 'archive' | 'contact' | 'gallery'>('slider')
    const [activeProject, setActiveProject] = useState<Project | null>(null);

    // Load dynamic projects
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        setProjects(api.getProjects());
    }, []);

    const handleNextProject = () => {
        if (!activeProject || projects.length === 0) return;
        const baseId = activeProject.id.split('-')[0];
        const idx = projects.findIndex(p => p.id === baseId);
        setActiveProject(projects[idx === projects.length - 1 ? 0 : idx + 1]);
    };

    const handlePrevProject = () => {
        if (!activeProject || projects.length === 0) return;
        const baseId = activeProject.id.split('-')[0];
        const idx = projects.findIndex(p => p.id === baseId);
        setActiveProject(projects[idx === 0 ? projects.length - 1 : idx - 1]);
    };

    // If projects haven't loaded yet
    if (projects.length === 0) return <div className="min-h-screen bg-[#0a0a0a]"></div>;

    return (
        <div className="relative min-h-screen bg-[#0a0a0a] selection:bg-cream selection:text-charcoal overflow-x-hidden">
            {!activeProject && (
                <Header currentView={view} setView={setView} />
            )}

            <main className={activeProject ? 'hidden' : 'block'}>
                {view === 'slider' ? (
                    <ProjectSlider projects={projects} onProjectChange={setCurrentIndex} onProjectSelect={setActiveProject} />
                ) : view === 'archive' ? (
                    <Archive projects={projects} onProjectSelect={setActiveProject} />
                ) : view === 'gallery' ? (
                    <Gallery projects={projects} onProjectSelect={setActiveProject} />
                ) : (
                    <Contact />
                )}
            </main>

            {!activeProject && projects[currentIndex] && (
                <Footer
                    currentView={view}
                    setView={setView}
                    timeCode={projects[currentIndex].timeCode}
                    nextImageUrl={projects[(currentIndex + 1) % projects.length].imageUrl}
                    count={projects.length}
                />
            )}

            {/* Global Film Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-30 mix-blend-overlay border-none">
                <div className="absolute inset-0 bg-[#050505]/10 animate-pulse"></div>
            </div>

            {activeProject && view !== 'gallery' && (
                <ProjectView
                    project={activeProject}
                    onClose={() => setActiveProject(null)}
                    onNext={handleNextProject}
                    onPrev={handlePrevProject}
                    onNavigate={(newView: 'slider' | 'archive' | 'contact' | 'gallery') => {
                        setView(newView);
                        setActiveProject(null);
                    }}
                />
            )}

            {activeProject && view === 'gallery' && (
                <ImageView
                    project={activeProject}
                    onClose={() => setActiveProject(null)}
                    onNext={handleNextProject}
                    onPrev={handlePrevProject}
                    onNavigate={(newView: 'slider' | 'archive' | 'contact' | 'gallery') => {
                        setView(newView);
                        setActiveProject(null);
                    }}
                />
            )}
        </div>
    )
}

export default Home
