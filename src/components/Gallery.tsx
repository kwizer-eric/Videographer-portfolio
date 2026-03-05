import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const Gallery: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const stripRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            if (!stripRef.current || !containerRef.current) return;

            // Calculate the total horizontal width to move
            // Total width of content minus the viewport width
            const getScrollAmount = () => -(stripRef.current!.scrollWidth - window.innerWidth);

            const tween = gsap.to(stripRef.current, {
                x: getScrollAmount,
                ease: "none"
            });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${getScrollAmount() * -1}`, // Scroll distance equals horizontal movement
                pin: true,
                animation: tween,
                scrub: 1, // Smooth scrubbing
                invalidateOnRefresh: true
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative bg-[#0a0a0a] min-h-screen">
            <div className="h-screen flex items-center overflow-hidden pt-20">
                <div ref={stripRef} className="flex gap-12 md:gap-24 px-12 md:px-40 h-[50vh] md:h-[65vh] items-center">

                    {/* Introductory Label */}
                    <div className="flex-shrink-0 font-serif italic text-4xl md:text-6xl text-[#d4cbb3] mr-8 md:mr-20">
                        Selected<br />Works
                    </div>

                    {projects.map((project, idx) => (
                        <div key={idx} className="relative h-full flex-shrink-0 aspect-[4/5] md:aspect-[16/10] group cursor-pointer">
                            <div className="w-full h-full overflow-hidden bg-black relative border border-white/5 rounded-[2px] shadow-2xl">
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale-[0.6] group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                                {/* Hover Metadata */}
                                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 pointer-events-none">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] tracking-[0.3em] font-mono text-[#d4cbb3] uppercase mb-3">{project.category}</span>
                                        <h3 className="text-2xl md:text-4xl font-serif italic text-white leading-none">{project.title}</h3>
                                    </div>
                                    <span className="text-[9px] tracking-[0.3em] font-mono text-white/50">{project.projectNumber}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Padding block at the end so last item isn't flush against edge */}
                    <div className="w-[10vw] flex-shrink-0"></div>
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
