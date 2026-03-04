import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectSlider: React.FC = () => {
    const component = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const slides = gsap.utils.toArray<HTMLElement>('.project-slide');

            gsap.to(slides, {
                scrollTrigger: {
                    trigger: component.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (slides.length - 1),
                    end: () => `+=${slides.length * 100}%`,
                },
            });

            slides.forEach((slide, i) => {
                if (i === 0) return;

                gsap.fromTo(
                    slide,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        scrollTrigger: {
                            trigger: slide,
                            start: () => `${(i - 0.5) * window.innerHeight * 1.5}px`,
                            end: () => `${(i + 0.5) * window.innerHeight * 1.5}px`,
                            scrub: true,
                        },
                    }
                );
            });
        }, component);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={component} className="relative h-screen bg-charcoal overflow-hidden film-grain">
            {projects.map((project, index) => (
                <div
                    key={project.id}
                    className={`project-slide absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-700 ${index === 0 ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{ zIndex: projects.length - index }}
                >
                    {/* Background vertical film markings */}
                    <div className="absolute inset-0 flex justify-between px-20 md:px-40 opacity-10 pointer-events-none">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex flex-col justify-around h-full border-x border-cream/20 px-4 font-mono text-[8px]">
                                <span>077</span>
                                <span>450</span>
                                <span>910</span>
                            </div>
                        ))}
                    </div>

                    <div className="relative w-full max-w-[90vw] flex flex-col items-center">
                        {/* Top Metadata */}
                        <div className="w-full flex justify-between items-center mb-4 px-4 md:px-20 font-mono text-[10px] tracking-widest text-cream/60">
                            <span className="uppercase">{project.category}</span>
                            <div className="flex gap-4">
                                <span>ⓥ</span>
                                <span>Ⓝ</span>
                                <span>ⓥ</span>
                            </div>
                            <span className="uppercase">{project.subCategory}</span>
                        </div>

                        {/* Main Content Area */}
                        <div className="relative flex items-center justify-center w-full gap-8 md:gap-12">
                            {/* Left Title Part */}
                            <div className="absolute left-0 w-[40%] text-right pr-4 md:pr-12 pointer-events-auto">
                                <h2 className="text-4xl md:text-8xl font-serif italic leading-none text-cream text-shadow-glow">
                                    {project.title.split(' ').slice(0, 2).join(' ')}
                                </h2>
                            </div>

                            {/* Central Film Frame */}
                            <div className="relative w-full aspect-[4/5] md:aspect-[16/10] max-w-[600px] z-10">
                                {/* Film Frame Borders/Markings */}
                                <div className="absolute -inset-4 border-cream/20">
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-cream/40"></div>
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cream/40"></div>
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-cream/40"></div>
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-cream/40"></div>
                                </div>

                                {/* Vertical frame numbers */}
                                <div className="absolute -left-10 inset-y-0 flex flex-col justify-around py-8 font-mono text-[8px] opacity-40">
                                    <span>{index + 1}70</span>
                                    <span>{index + 2}00</span>
                                    <span>{index + 3}10</span>
                                </div>

                                <div className="w-full h-full overflow-hidden bg-black/40 relative">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover mix-blend-screen opacity-90 scale-105"
                                    />
                                    {/* Internal scanline/shutter effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Right Title Part */}
                            <div className="absolute right-0 w-[40%] text-left pl-4 md:pl-12 pointer-events-auto">
                                <h2 className="text-4xl md:text-8xl font-serif italic leading-none text-cream text-shadow-glow">
                                    {project.title.split(' ').slice(2).join(' ')}
                                </h2>
                            </div>
                        </div>

                        {/* Bottom Metadata */}
                        <div className="w-full flex justify-between items-center mt-8 px-4 md:px-20 font-mono text-[10px] tracking-widest text-cream/80">
                            <span className="opacity-60">{project.metadata}</span>
                            <span className="uppercase text-center max-w-[300px]">{project.client}</span>
                            <span className="opacity-60">{project.projectNumber}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectSlider;
