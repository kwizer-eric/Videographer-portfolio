import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import Header from './Header';

interface ProjectViewProps {
    project: Project;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    onNavigate: (view: 'slider' | 'archive' | 'contact' | 'gallery') => void;
}

const ProjectView: React.FC<ProjectViewProps> = ({ project, onClose, onNext, onPrev, onNavigate }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isIdle, setIsIdle] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const baseId = project.id.split('-')[0];
    const projectIndex = projects.findIndex(p => p.id === baseId);
    const prevProject = projects[projectIndex === 0 ? projects.length - 1 : projectIndex - 1];
    const nextProject = projects[projectIndex === projects.length - 1 ? 0 : projectIndex + 1];

    // Handle mouse movement to toggle idle state
    const handleMouseMove = () => {
        setIsIdle(false);
        resetIdleTimer();
    };

    const resetIdleTimer = () => {
        if (idleTimer.current) clearTimeout(idleTimer.current);
        if (isPlaying) {
            idleTimer.current = setTimeout(() => {
                setIsIdle(true);
            }, 2000); // 2 second idle timeout
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (idleTimer.current) clearTimeout(idleTimer.current);
        };
    }, [isPlaying]);

    // Handle video time updates
    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
            // Auto play on load
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
            resetIdleTimer();
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
                setIsIdle(false); // Never idle while paused
                if (idleTimer.current) clearTimeout(idleTimer.current);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
                resetIdleTimer();
            }
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const formatTime = (timeInSeconds: number) => {
        if (isNaN(timeInSeconds)) return "00:00";
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black text-[#d4cbb3] font-mono select-none">
            {/* Video Element */}
            <video
                ref={videoRef}
                src={project.videoUrl}
                className="absolute inset-0 w-full h-full object-cover"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
                loop
                playsInline
                muted={isMuted}
            />

            {/* UI Overlay Container */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isIdle && isPlaying ? 'opacity-0 cursor-none' : 'opacity-100'}`}>
                {/* Top Nav */}
                <div className="absolute top-0 w-full z-50 pointer-events-auto">
                    <Header currentView="slider" setView={onNavigate} />
                </div>

                {/* Top Left Back Button */}
                <div className="absolute top-24 left-6 md:left-12 z-50 pointer-events-auto">
                    <button onClick={onClose} className="text-[10px] tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors py-2">
                        BACK
                    </button>
                </div>

                {/* Left Sidebar Actions (PREV) */}
                <div className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 flex flex-col z-50">
                    <div className="relative group">
                        <button onClick={onPrev} className="text-[10px] tracking-[0.3em] uppercase hover:text-white transition-colors py-4">
                            PREV
                        </button>
                        {/* Hover Thumbnail */}
                        <div className="absolute left-full ml-4 md:ml-8 top-1/2 -translate-y-1/2 w-32 md:w-48 aspect-video opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none border border-white/20 bg-black scale-95 group-hover:scale-100 overflow-hidden">
                            <img src={prevProject.imageUrl} alt={prevProject.title} className="w-full h-full object-cover opacity-80" />
                        </div>
                    </div>
                </div>

                {/* Right Sidebar Actions (NEXT) */}
                <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-end z-50">
                    <div className="relative group">
                        <button onClick={onNext} className="text-[10px] tracking-[0.3em] uppercase hover:text-white transition-colors py-4">
                            NEXT
                        </button>
                        {/* Hover Thumbnail */}
                        <div className="absolute right-full mr-4 md:mr-8 top-1/2 -translate-y-1/2 w-32 md:w-48 aspect-video opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none border border-white/20 bg-black scale-95 group-hover:scale-100 overflow-hidden">
                            <img src={nextProject.imageUrl} alt={nextProject.title} className="w-full h-full object-cover opacity-80" />
                        </div>
                    </div>
                </div>

                {/* Center Giant Play/Pause */}
                <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer mix-blend-difference pointer-events-none"
                >
                    <h1 className="text-6xl md:text-9xl font-serif italic text-[#d4cbb3] transition-all duration-500 hover:scale-110 pointer-events-auto" onClick={togglePlay}>
                        {isPlaying ? '' : 'Play'}
                    </h1>
                </div>

                {/* Bottom Overlay Section */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-32 pb-6 px-6 md:px-10 flex flex-col gap-6 z-50">
                    {/* Details Row */}
                    <div className="flex justify-between items-end">
                        <h2 className="text-3xl md:text-5xl font-serif italic text-[#d4cbb3]">{project.title}</h2>
                        <span className="text-[9px] tracking-[0.3em] uppercase opacity-70 hidden md:block">{project.category} / {project.subCategory}</span>
                    </div>

                    {/* Progress Bar Area */}
                    <div className="w-full relative group cursor-pointer h-2 flex items-center">
                        <div className="w-full h-[1px] bg-white/20 relative">
                            <div
                                className="absolute left-0 top-0 h-full bg-[#d4cbb3] transition-all duration-100"
                                style={{ width: `${(currentTime / duration) * 100}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Controls Row */}
                    <div className="flex justify-between items-center text-[9px] tracking-[0.3em] uppercase">
                        <button onClick={toggleMute} className="hover:text-white transition-colors w-20 text-left">
                            {isMuted ? 'UNMUTE' : 'MUTE'}
                        </button>

                        <div className="flex items-center gap-4 text-center">
                            <span className="opacity-70">{formatTime(currentTime)} • {formatTime(duration)}</span>
                        </div>

                        <button onClick={toggleFullscreen} className="hover:text-white transition-colors w-20 text-right">
                            FULLSCREEN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectView;
