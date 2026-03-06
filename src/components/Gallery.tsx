import React, { useState } from 'react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

interface GalleryProps {
    onProjectSelect?: (project: Project) => void;
}

const Gallery: React.FC<GalleryProps> = ({ onProjectSelect }) => {
    const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

    return (
        <div className="relative bg-[#0a0a0a] min-h-screen pt-24 md:pt-32 pb-20">
            {/* Dynamic Background Image */}
            <div className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ease-in-out">
                {projects.map((project) => (
                    <img
                        key={`bg-${project.id}`}
                        src={project.imageUrl}
                        alt=""
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${hoveredProject?.id === project.id ? 'opacity-40' : 'opacity-0'}`}
                    />
                ))}
                {/* Fallback dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col">
                {/* Header */}
                <div className="mb-16 md:mb-32">
                    <h1 className="font-serif italic text-4xl md:text-6xl text-[#d4cbb3]">
                        Selected Works
                    </h1>
                </div>

                {/* Project List */}
                <div className="flex flex-col gap-6 md:gap-8 max-w-5xl mx-auto w-full">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative flex flex-col md:flex-row md:items-baseline justify-between py-6 border-b border-white/5 cursor-pointer pointer-events-auto transition-colors hover:border-[#d4cbb3]/40"
                            onMouseEnter={() => setHoveredProject(project)}
                            onMouseLeave={() => setHoveredProject(null)}
                            onClick={() => onProjectSelect && onProjectSelect(project)}
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                                <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 group-hover:text-[#d4cbb3] transition-colors mb-2 md:mb-0 w-12">
                                    {project.projectNumber}
                                </span>
                                <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-white/50 group-hover:text-cream transition-colors duration-500">
                                    {project.title}
                                </h2>
                            </div>

                            <div className="flex items-center gap-6 mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#d4cbb3]">
                                    {project.category}
                                </span>
                                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/50 hidden md:block">
                                    {project.client}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Global background film marking layers */}
            <div className="fixed inset-0 flex justify-between px-20 md:px-40 opacity-[0.02] pointer-events-none z-0">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col justify-around h-full border-x border-[#d4cbb3]/20 px-4 font-mono text-[8px]">
                        <span>077</span>
                        <span>450</span>
                        <span>910</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
