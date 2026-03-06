import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

// Generate roughly 90 items for a massive gallery test
const massiveGallery = Array.from({ length: 90 }, (_, i) => ({
    ...projects[i % projects.length],
    id: `${projects[i % projects.length].id}-${i}`
}));

// Split into 3 rows for dense packing
const row1 = massiveGallery.slice(0, 30);
const row2 = massiveGallery.slice(30, 60);
const row3 = massiveGallery.slice(60, 90);

interface GalleryProps {
    onProjectSelect?: (project: Project) => void;
}

const Gallery: React.FC<GalleryProps> = ({ onProjectSelect }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const row1Ref = useRef<HTMLDivElement>(null);
    const row2Ref = useRef<HTMLDivElement>(null);
    const row3Ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            if (!containerRef.current || !row1Ref.current || !row2Ref.current || !row3Ref.current) return;

            // The main container pins to the screen for the duration of the scroll
            // The rows translate horizontally based on the scroll progress.

            const getScrollAmount = (el: HTMLElement) => -(el.scrollWidth - window.innerWidth);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=3000", // The amount of native vertical scrolling required to see all of it
                    pin: true,
                    scrub: 1, // Smooth scrubbing
                    invalidateOnRefresh: true
                }
            });

            // Row 1 goes Right to Left (fast)
            tl.to(row1Ref.current, {
                x: () => getScrollAmount(row1Ref.current!),
                ease: "none"
            }, 0);

            // Row 2 is offset to start and goes Left to Right (slightly slower)
            // To go Left to Right, we start it pushed far left (negative x) and animate it to 0
            gsap.set(row2Ref.current, { x: () => getScrollAmount(row2Ref.current!) });
            tl.to(row2Ref.current, {
                x: 0,
                ease: "none"
            }, 0);

            // Row 3 goes Right to Left (slowest/offset)
            tl.to(row3Ref.current, {
                x: () => getScrollAmount(row3Ref.current!) * 0.8, // Moves a bit slower
                ease: "none"
            }, 0);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const ProjectCard = ({ project }: { project: any }) => (
        <div
            className="relative flex-shrink-0 h-full aspect-[4/5] cursor-pointer group"
            onClick={() => onProjectSelect && onProjectSelect(project as Project)}
        >
            <div className="w-full h-full overflow-hidden bg-black relative border border-white/5 rounded-[2px] shadow-2xl">
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale-[0.6] group-hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                {/* Hover Metadata */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 pointer-events-none">
                    <div className="flex flex-col">
                        <span className="text-[7px] tracking-[0.3em] font-mono text-[#d4cbb3] uppercase mb-1">{project.category}</span>
                        <h3 className="text-xl md:text-2xl font-serif italic text-white leading-none whitespace-normal line-clamp-2">{project.title}</h3>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div ref={containerRef} className="relative bg-[#0a0a0a] h-screen overflow-hidden flex flex-col justify-center">

            {/* Introductory Overlay text that stays pinned on top */}
            <div className="absolute top-24 left-12 md:left-24 z-20 pointer-events-none">
                <h1 className="font-serif italic text-5xl md:text-7xl text-cream tracking-tight text-shadow-glow">
                    Photography
                </h1>
                <p className="font-mono text-[10px] tracking-[0.4em] text-cream/30 uppercase mt-4">
                    [ Scroll to Explore / {massiveGallery.length} Works ]
                </p>
            </div>

            {/* The 3 Parallax Rows */}
            <div className="relative z-10 w-full h-[65vh] flex flex-col justify-between gap-4 md:gap-6 mt-16 px-12 md:px-0">

                {/* Row 1 (Right to Left) */}
                <div ref={row1Ref} className="flex gap-4 md:gap-6 h-[30%] items-center flex-nowrap w-max">
                    {/* Spacer so it doesn't start directly flush against the left edge of the screen */}
                    <div className="w-[10vw] flex-shrink-0"></div>
                    {row1.map((p) => <ProjectCard key={p.id} project={p} />)}
                    {/* Padding block at the end */}
                    <div className="w-[10vw] flex-shrink-0"></div>
                </div>

                {/* Row 2 (Left to Right) */}
                <div ref={row2Ref} className="flex gap-4 md:gap-6 h-[34%] items-center flex-nowrap w-max">
                    <div className="w-[10vw] flex-shrink-0"></div>
                    {row2.map((p) => <ProjectCard key={p.id} project={p} />)}
                    <div className="w-[10vw] flex-shrink-0"></div>
                </div>

                {/* Row 3 (Right to Left) */}
                <div ref={row3Ref} className="flex gap-4 md:gap-6 h-[30%] items-center flex-nowrap w-max">
                    <div className="w-[20vw] flex-shrink-0"></div>
                    {row3.map((p) => <ProjectCard key={p.id} project={p} />)}
                    <div className="w-[20vw] flex-shrink-0"></div>
                </div>

            </div>

            {/* Background Vignette to soften edges */}
            <div className="absolute inset-x-0 w-[15vw] h-full left-0 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-x-0 w-[15vw] h-full right-0 ml-auto bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

            {/* Global background film marking layers */}
            <div className="fixed inset-0 flex justify-between px-10 md:px-20 opacity-[0.02] pointer-events-none z-0">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col justify-around h-full border-x border-[#d4cbb3]/20 px-2 font-mono text-[8px]">
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
