import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

interface ArchiveProps {
    onProjectSelect?: (project: Project) => void;
}

const Archive: React.FC<ArchiveProps> = ({ onProjectSelect }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);
    const [hoveredProject, setHoveredProject] = useState<typeof projects[0] | null>(null);

    const leftTween = useRef<gsap.core.Tween | null>(null);
    const rightTween = useRef<gsap.core.Tween | null>(null);

    // Split projects for two columns
    const leftProjects = projects.filter((_, i) => i % 2 === 0);
    const rightProjects = projects.filter((_, i) => i % 2 !== 0);

    // Duplicate arrays for infinite GSAP loop (yPercent: -50 means we need 2 identical sets)
    const loopedLeft = [...leftProjects, ...leftProjects];
    const loopedRight = [...rightProjects, ...rightProjects];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            if (leftColRef.current && rightColRef.current) {
                // Left Column moves UP (0% to -50%)
                leftTween.current = gsap.to(leftColRef.current, {
                    yPercent: -50,
                    repeat: -1,
                    duration: 30, // Slow, cinematic pace
                    ease: "none"
                });

                // Right Column moves DOWN (-50% to 0%)
                gsap.set(rightColRef.current, { yPercent: -50 });
                rightTween.current = gsap.to(rightColRef.current, {
                    yPercent: 0,
                    repeat: -1,
                    duration: 30, // Slow, cinematic pace
                    ease: "none"
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (project: typeof projects[0]) => {
        setHoveredProject(project);
        // Completely stop the animation on hover
        if (leftTween.current) leftTween.current.pause();
        if (rightTween.current) rightTween.current.pause();
    };

    const handleMouseLeave = () => {
        setHoveredProject(null);
        // Resume the animation when hover ends
        if (leftTween.current) leftTween.current.play();
        if (rightTween.current) rightTween.current.play();
    };

    const lastTouchY = useRef<number>(0);

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (!leftTween.current || !rightTween.current) return;

        // e.deltaY is positive when scrolling down.
        const scrollAmount = e.deltaY * 0.0004;

        // Add to current progress, wrap between 0 and 1 for infinite seamless looping
        const newLeftProgress = gsap.utils.wrap(0, 1, leftTween.current.progress() + scrollAmount);
        const newRightProgress = gsap.utils.wrap(0, 1, rightTween.current.progress() + scrollAmount);

        leftTween.current.progress(newLeftProgress);
        rightTween.current.progress(newRightProgress);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        lastTouchY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!leftTween.current || !rightTween.current) return;

        const currentY = e.touches[0].clientY;
        const deltaY = lastTouchY.current - currentY; // positive if sliding finger up (scrolling down page)
        lastTouchY.current = currentY;

        const scrollAmount = deltaY * 0.0015;

        const newLeftProgress = gsap.utils.wrap(0, 1, leftTween.current.progress() + scrollAmount);
        const newRightProgress = gsap.utils.wrap(0, 1, rightTween.current.progress() + scrollAmount);

        leftTween.current.progress(newLeftProgress);
        rightTween.current.progress(newRightProgress);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-screen h-screen bg-[#0a0a0a] overflow-hidden"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            {/* Hover Metadata Overlay (Left side) */}
            <div className="absolute left-0 top-0 w-[80%] md:w-[40%] h-full flex flex-col justify-center pl-6 md:pl-20 pointer-events-none z-20">
                <div className={`transition-opacity duration-700 ${hoveredProject ? 'opacity-100' : 'opacity-0'} w-full h-full flex flex-col justify-center bg-gradient-to-r from-black/80 via-black/40 to-transparent md:bg-none`}>
                    <div className="pl-6 md:pl-0">
                        {hoveredProject && (
                            <div className="flex flex-col text-[#d4cbb3]">
                                <div className="flex items-center gap-2 mb-4 text-[10px] tracking-[0.2em] font-mono">
                                    <span>{hoveredProject.projectNumber}</span>
                                    <span className="opacity-40">/</span>
                                    <span className="uppercase">{hoveredProject.category}</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl lg:text-[4vw] font-serif italic leading-[0.9] tracking-tighter mb-6 text-shadow-glow">
                                    {hoveredProject.title}
                                </h2>
                                <div className="text-[10px] tracking-[0.2em] font-mono uppercase bg-[#d4cbb3] text-charcoal px-4 py-2 self-start mix-blend-screen font-bold">
                                    {hoveredProject.client}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Centered Dual-Column Scrolling Grid */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[90vw] md:w-[35vw] h-full flex z-10 pt-32 md:pt-0">

                {/* UP-scrolling Left Column */}
                <div className="flex-1 overflow-visible relative h-full pt-20 md:pt-40">
                    <div ref={leftColRef} className="flex flex-col absolute w-full top-0 left-0">
                        {loopedLeft.map((project, idx) => (
                            <div
                                key={`left-${project.id}-${idx}`}
                                className="group cursor-pointer pb-12 md:pb-24"
                                onMouseEnter={() => handleMouseEnter(project)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => onProjectSelect && onProjectSelect(project)}
                            >
                                <div className="relative aspect-[4/5] overflow-hidden bg-black border border-white/5 rounded-[2px] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] pointer-events-auto">
                                    <img
                                        src={project.imageUrl}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 grayscale-[0.8] group-hover:grayscale-0"
                                        alt={project.title}
                                    />
                                    {/* Film markings on images */}
                                    <div className="absolute inset-x-0 top-2 flex justify-between px-4 text-[6px] font-mono text-white/30 hidden md:flex">
                                        <span>410</span><span>450</span><span>490</span>
                                    </div>
                                    <div className="absolute inset-x-0 bottom-2 flex justify-between px-4 text-[6px] font-mono text-white/30 rotate-180 hidden md:flex">
                                        <span>410</span><span>450</span><span>490</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DOWN-scrolling Right Column */}
                <div className="flex-1 overflow-visible relative h-full pt-20 md:pt-40">
                    <div ref={rightColRef} className="flex flex-col absolute w-full top-0 left-0">
                        {loopedRight.map((project, idx) => (
                            <div
                                key={`right-${project.id}-${idx}`}
                                className="group cursor-pointer pb-12 md:pb-24"
                                onMouseEnter={() => handleMouseEnter(project)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => onProjectSelect && onProjectSelect(project)}
                            >
                                <div className="relative aspect-[4/5] overflow-hidden bg-black border border-white/5 rounded-[2px] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] pointer-events-auto">
                                    <img
                                        src={project.imageUrl}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 grayscale-[0.8] group-hover:grayscale-0"
                                        alt={project.title}
                                    />
                                    {/* Film markings on images */}
                                    <div className="absolute inset-x-0 top-2 flex justify-between px-4 text-[6px] font-mono text-white/30 hidden md:flex">
                                        <span>410</span><span>450</span><span>490</span>
                                    </div>
                                    <div className="absolute inset-x-0 bottom-2 flex justify-between px-4 text-[6px] font-mono text-white/30 rotate-180 hidden md:flex">
                                        <span>410</span><span>450</span><span>490</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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

export default Archive;

