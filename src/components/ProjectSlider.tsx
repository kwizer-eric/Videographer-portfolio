import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/all';
import type { Project } from '../data/projects';

gsap.registerPlugin(ScrollTrigger, Observer);

interface ProjectSliderProps {
    projects: Project[];
    onProjectChange?: (index: number) => void;
    onProjectSelect?: (project: Project) => void;
}

const ProjectSlider: React.FC<ProjectSliderProps> = ({ projects, onProjectChange, onProjectSelect }) => {
    const component = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const slides = gsap.utils.toArray<HTMLElement>('.project-slide');
            if (!slides.length) return;

            // Master Timeline for all slide transitions
            const masterTL = gsap.timeline({
                paused: true,
                defaults: { ease: "none" }
            });

            // Initial state for all but first slide
            gsap.set(slides.slice(1), { autoAlpha: 0 });
            gsap.set(slides[0], { autoAlpha: 1 });

            slides.forEach((slide, i) => {
                const titleLeft = slide.querySelector('.title-left');
                const titleRight = slide.querySelector('.title-right');
                const frame = slide.querySelector('.film-frame');
                const metadata = slide.querySelectorAll('.meta-item');

                const label = `slide-${i}`;
                masterTL.addLabel(label, i);

                // ENTERING ANIMATION (Plays when tweening from i-1 to i)
                if (i > 0) {
                    masterTL.fromTo(slide, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, i - 1)
                        .fromTo(frame,
                            { scale: 0.8, filter: 'blur(10px)', opacity: 0 },
                            { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1 },
                            i - 1
                        )
                        .fromTo(titleLeft,
                            { x: '-20vw', opacity: 0 },
                            { x: '0vw', opacity: 1, duration: 1 },
                            i - 1
                        )
                        .fromTo(titleRight,
                            { x: '20vw', opacity: 0 },
                            { x: '0vw', opacity: 1, duration: 1 },
                            i - 1
                        )
                        .fromTo(metadata,
                            { y: 20, opacity: 0 },
                            { y: 0, opacity: 1, duration: 1 },
                            i - 1
                        );
                }

                // LEAVING ANIMATION (Plays when tweening from i to i+1)
                if (i < slides.length - 1) {
                    masterTL.to(frame,
                        { scale: 1.3, filter: 'blur(15px)', opacity: 0, duration: 1 },
                        i
                    )
                        .to(titleLeft,
                            { x: '-20vw', opacity: 0, duration: 1 },
                            i
                        )
                        .to(titleRight,
                            { x: '20vw', opacity: 0, duration: 1 },
                            i
                        )
                        .to(metadata,
                            { y: -20, opacity: 0, duration: 1 },
                            i
                        )
                        .set(slide, { autoAlpha: 0 }, i + 1);
                }
            });

            let currentIndexLocal = 0;
            let isAnimating = false;

            const gotoSlide = (index: number) => {
                if (isAnimating || index < 0 || index >= slides.length) return;

                isAnimating = true;
                currentIndexLocal = index;
                if (onProjectChange) onProjectChange(index);

                masterTL.tweenTo(`slide-${index}`, {
                    duration: 1.4, // Cinematic crossfade duration
                    ease: "power3.inOut",
                    onComplete: () => { isAnimating = false; }
                });
            };

            // Create Observer to catch scroll intent
            Observer.create({
                type: "wheel,touch,pointer",
                wheelSpeed: -1,
                onDown: () => gotoSlide(currentIndexLocal + 1),
                onUp: () => gotoSlide(currentIndexLocal - 1),
                tolerance: 10,
                preventDefault: true
            });

        }, component);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={component} className="relative h-screen bg-[#0a0a0a] overflow-hidden film-grain">
            {projects.map((project, index) => (
                <div
                    key={project.id}
                    className="project-slide absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ zIndex: projects.length - index }}
                >
                    {/* Background vertical film markings */}
                    <div className="absolute inset-0 flex justify-between px-20 md:px-40 opacity-[0.03] pointer-events-none">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex flex-col justify-around h-full border-x border-cream/20 px-4 font-mono text-[8px]">
                                <span>077</span>
                                <span>450</span>
                                <span>910</span>
                            </div>
                        ))}
                    </div>

                    <div className="relative w-full flex flex-col items-center justify-center h-full">
                        {/* Top Metadata */}
                        <div className="w-[55vw] md:w-[40vw] flex justify-between items-center mb-1 font-mono text-[9px] tracking-[0.4em] text-cream/50 meta-item z-20">
                            <span className="uppercase">{project.category}</span>
                            <div className="flex gap-4 opacity-40">
                                <span>ⓥ</span>
                                <span>Ⓝ</span>
                                <span>ⓥ</span>
                            </div>
                            <span className="uppercase whitespace-nowrap">{project.subCategory}</span>
                        </div>

                        {/* Main Content Area (Image with split titles) */}
                        <div className="relative flex items-center justify-center w-full">
                            {/* Wrapper exactly the size of the image */}
                            <div className="relative w-[55vw] md:w-[40vw] aspect-[4/5] md:aspect-[16/10] flex items-center justify-center">

                                {/* Left Title Part */}
                                <div className="title-left absolute right-[100%] pr-2 md:pr-4 text-right pointer-events-auto z-20 w-[40vw] md:w-[25vw] max-w-[400px]">
                                    <h2 className="text-3xl md:text-[3.75vw] lg:text-[5.25vw] font-serif italic leading-[0.8] text-cream text-shadow-glow uppercase tracking-tighter text-balance break-words">
                                        {project.title.split(' ').slice(0, Math.ceil(project.title.split(' ').length / 2)).join(' ')}
                                    </h2>
                                </div>

                                {/* Central Film Frame */}
                                <div
                                    className="film-frame absolute inset-0 z-10 cursor-pointer pointer-events-auto transition-transform hover:scale-[1.01] duration-500"
                                    onClick={() => onProjectSelect && onProjectSelect(project)}
                                >
                                    {/* Film Frame Borders/Markings */}
                                    <div className="absolute -inset-2 md:-inset-4 border-cream/20">
                                        <div className="absolute top-0 left-0 w-4 md:w-6 h-4 md:h-6 border-t border-l border-cream/40"></div>
                                        <div className="absolute top-0 right-0 w-4 md:w-6 h-4 md:h-6 border-t border-r border-cream/40"></div>
                                        <div className="absolute bottom-0 left-0 w-4 md:w-6 h-4 md:h-6 border-b border-l border-cream/40"></div>
                                        <div className="absolute bottom-0 right-0 w-4 md:w-6 h-4 md:h-6 border-b border-r border-cream/40"></div>
                                    </div>

                                    <div className="w-full h-full overflow-hidden bg-black relative rounded-[2px] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                                        <video
                                            src={project.videoUrl}
                                            className="w-full h-full object-cover opacity-80 scale-100"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"></div>
                                        <div className="absolute inset-0 bg-cream/5 mix-blend-soft-light pointer-events-none"></div>
                                    </div>

                                    {/* Vertical frame numbers */}
                                    <div className="absolute -left-5 md:-left-12 inset-y-0 flex flex-col justify-around py-4 md:py-8 font-mono text-[7px] opacity-20 text-cream hidden md:flex">
                                        <span>{index + 1}70</span>
                                        <span>{index + 2}00</span>
                                        <span>{index + 3}10</span>
                                    </div>
                                </div>

                                {/* Right Title Part */}
                                <div className="title-right absolute left-[100%] pl-2 md:pl-4 text-left pointer-events-auto z-20 w-[40vw] md:w-[25vw] max-w-[400px]">
                                    <h2 className="text-3xl md:text-[3.75vw] lg:text-[5.25vw] font-serif italic leading-[0.8] text-cream text-shadow-glow uppercase tracking-tighter text-balance break-words">
                                        {project.title.split(' ').slice(Math.ceil(project.title.split(' ').length / 2)).join(' ')}
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Metadata */}
                        <div className="w-[55vw] md:w-[40vw] flex justify-between items-center mt-2 font-mono text-[9px] tracking-[0.4em] text-cream/50 meta-item z-20">
                            <span className="opacity-40">{project.metadata}</span>
                            <span className="uppercase text-center max-w-[300px] border-b border-cream/10 pb-1 mx-2 truncate">{project.client}</span>
                            <span className="opacity-40">{project.projectNumber}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectSlider;
