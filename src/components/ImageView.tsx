import React from 'react';
import type { Project } from '../data/projects';
import Header from './Header';

interface ImageViewProps {
    project: Project;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

const ImageView: React.FC<ImageViewProps> = ({ project, onClose, onNext, onPrev }) => {
    return (
        <div className="fixed inset-0 z-[100] bg-[#0a0a0a] text-[#d4cbb3] font-mono select-none flex items-center justify-center overflow-hidden">

            {/* Background ambient glow effect from the image */}
            <div
                className="absolute inset-0 opacity-30 blur-3xl scale-110 pointer-events-none transform-gpu"
                style={{
                    backgroundImage: `url(${project.imageUrl})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            ></div>

            {/* The Main Image */}
            <div className="relative z-10 w-full h-[85vh] md:h-[90vh] flex items-center justify-center p-8 md:p-16">
                <img
                    key={project.id} // Forces re-render/animation on project change
                    src={project.imageUrl}
                    alt={project.title}
                    className="max-w-full max-h-full object-contain shadow-2xl animate-fade-in-slow border border-white/5"
                />
            </div>

            {/* UI Overlay Container */}
            <div className="absolute inset-0 z-50 pointer-events-none">

                {/* Top Nav */}
                <div className="absolute top-0 w-full pointer-events-auto">
                    <Header currentView="gallery" setView={() => { }} />
                </div>

                {/* Top Left Back Button */}
                <div className="absolute top-24 left-6 md:left-12 z-50 pointer-events-auto">
                    <button onClick={onClose} className="text-[10px] tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors py-2">
                        BACK
                    </button>
                </div>

                {/* Left Sidebar Actions (PREV) */}
                <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col pointer-events-auto">
                    <button onClick={onPrev} className="text-[10px] tracking-[0.3em] uppercase hover:text-white transition-colors py-4">
                        PREV
                    </button>
                </div>

                {/* Right Sidebar Actions (NEXT) */}
                <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-end pointer-events-auto">
                    <button onClick={onNext} className="text-[10px] tracking-[0.3em] uppercase hover:text-white transition-colors py-4">
                        NEXT
                    </button>
                </div>

                {/* Bottom Overlay Section */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pt-32 pb-8 px-8 md:px-12 flex flex-col gap-6 pointer-events-none">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase opacity-50 mb-2">PHOTOGRAPHY / {project.category}</span>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-white drop-shadow-md">{project.title}</h2>
                        </div>
                        {/* Fake film grain / metadata for aesthetics */}
                        <div className="hidden md:flex flex-col text-right font-mono text-[9px] tracking-[0.2em] opacity-40">
                            <span>ISO 400</span>
                            <span>f/2.8 1/125</span>
                            <span>{project.projectNumber || '35MM'}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ImageView;
