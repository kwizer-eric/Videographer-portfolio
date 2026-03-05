import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/all';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger, Observer);

interface ProjectSliderProps {
    onProjectChange?: (index: number) => void;
}

const ProjectSlider: React.FC<ProjectSliderProps> = ({ onProjectChange }) => {
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
                            { y: '100vh', scale: 0.9 },
                            { y: '0vh', scale: 1, duration: 1 },
                            i - 1
                        )
                        .fromTo(titleLeft,
                            { y: '30vh', opacity: 0 },
                            { y: '0vh', opacity: 1, duration: 1 },
                            i - 1
                        )
                        .fromTo(titleRight,
                            { y: '40vh', opacity: 0 },
                            { y: '0vh', opacity: 1, duration: 1 },
                            i - 1
                        )
                        .fromTo(metadata,
                            { y: 30, opacity: 0 },
                            { y: 0, opacity: 1, duration: 1 },
                            i - 1
                        );
                }

                // LEAVING ANIMATION (Plays when tweening from i to i+1)
                if (i < slides.length - 1) {
                    masterTL.to(frame,
                        { y: '-100vh', scale: 0.9, duration: 1 },
                        i
                    )
                        .to(titleLeft,
                            { y: '-30vh', opacity: 0, duration: 1 },
                            i
                        )
                        .to(titleRight,
                            { y: '-40vh', opacity: 0, duration: 1 },
                            i
                        )
                        .to(metadata,
                            { y: -30, opacity: 0, duration: 1 },
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
                    duration: 1.4, // Slower, cinematic transition
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

                    <div className="relative w-full max-w-[95vw] flex flex-col items-center">
                        {/* Top Metadata */}
                        <div className="w-full flex justify-between items-center mb-8 px-4 md:px-12 font-mono text-[9px] tracking-[0.4em] text-cream/30 meta-item">
                            <span className="uppercase">{project.category}</span>
                            <div className="flex gap-4 opacity-40">
                                <span>ⓥ</span>
                                <span>Ⓝ</span>
                                <span>ⓥ</span>
                            </div>
                            <span className="uppercase">{project.subCategory}</span>
                        </div>

                        {/* Main Content Area */}
                        <div className="relative flex items-center justify-center w-full min-h-[50vh]">
                            {/* Left Title Part */}
                            <div className="title-left absolute left-0 w-[45%] text-right pr-4 md:pr-10 pointer-events-auto z-20">
                                <h2 className="text-2xl md:text-[4.5vw] font-serif italic leading-[0.8] text-cream text-shadow-glow uppercase tracking-tighter">
                                    {project.title.split(' ').slice(0, Math.ceil(project.title.split(' ').length / 2)).join(' ')}
                                </h2>
                            </div>

                            {/* Central Film Frame */}
                            <div className="film-frame relative w-full aspect-[4/5] md:aspect-[16/10] max-w-[42vw] md:max-w-[40vw] z-10">
                                {/* Film Frame Borders/Markings */}
                                <div className="absolute -inset-2 md:-inset-4 border-cream/20">
                                    <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-cream/40"></div>
                                    <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-cream/40"></div>
                                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-cream/40"></div>
                                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-cream/40"></div>
                                </div>

                                <div className="w-full h-full overflow-hidden bg-black relative rounded-[2px] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover opacity-80 scale-100 image-shimmer"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"></div>
                                    <div className="absolute inset-0 bg-cream/5 mix-blend-soft-light pointer-events-none"></div>
                                </div>

                                {/* Vertical frame numbers */}
                                <div className="absolute -left-6 md:-left-12 inset-y-0 flex flex-col justify-around py-4 md:py-8 font-mono text-[7px] opacity-20 text-cream">
                                    <span>{index + 1}70</span>
                                    <span>{index + 2}00</span>
                                    <span>{index + 3}10</span>
                                </div>
                            </div>

                            {/* Right Title Part */}
                            <div className="title-right absolute right-0 w-[45%] text-left pl-4 md:pl-10 pointer-events-auto z-20">
                                <h2 className="text-2xl md:text-[4.5vw] font-serif italic leading-[0.8] text-cream text-shadow-glow uppercase tracking-tighter">
                                    {project.title.split(' ').slice(Math.ceil(project.title.split(' ').length / 2)).join(' ')}
                                </h2>
                            </div>
                        </div>

                        {/* Bottom Metadata */}
                        <div className="w-full flex justify-between items-center mt-12 px-4 md:px-12 font-mono text-[9px] tracking-[0.4em] text-cream/50 meta-item">
                            <span className="opacity-40">{project.metadata}</span>
                            <span className="uppercase text-center max-w-[400px] border-b border-cream/10 pb-1">{project.client}</span>
                            <span className="opacity-40">{project.projectNumber}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectSlider;
