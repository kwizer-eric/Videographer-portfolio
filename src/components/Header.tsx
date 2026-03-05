import React, { useState, useEffect } from 'react';

interface HeaderProps {
    currentView: 'slider' | 'archive' | 'contact' | 'gallery';
    setView: (view: 'slider' | 'archive' | 'contact' | 'gallery') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    const handleNavClick = (view: 'slider' | 'archive' | 'contact' | 'gallery') => {
        setView(view);
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-50 flex justify-between items-start p-4 md:p-10 ${isMenuOpen ? 'mix-blend-normal' : 'mix-blend-difference'}`}>
                <div className="flex flex-col cursor-pointer z-50" onClick={() => handleNavClick('slider')}>
                    <h1 className="text-2xl md:text-3xl font-serif italic tracking-tight text-[#d4cbb3] hover:opacity-80 transition-opacity">Jason Bergh</h1>
                </div>

                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 mt-1">
                    <span className="text-[9px] tracking-[0.3em] font-mono opacity-40 text-white uppercase">Creative</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex flex-wrap gap-4 md:gap-16 text-[9px] tracking-[0.3em] font-mono text-white justify-end relative z-50">
                    <div className="flex flex-col gap-1">
                        <div
                            className="flex items-center gap-2 cursor-pointer group"
                            onClick={() => handleNavClick('slider')}
                        >
                            <span className={`w-1 h-1 bg-[#d4cbb3] rounded-full transition-opacity ${currentView === 'slider' ? 'opacity-100' : 'opacity-0'}`}></span>
                            <span className={`transition-all duration-300 uppercase ${currentView === 'slider' ? 'text-[#d4cbb3] opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>Work</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div
                            className="flex items-center gap-2 cursor-pointer group"
                            onClick={() => handleNavClick('gallery')}
                        >
                            <span className={`w-1 h-1 bg-[#d4cbb3] rounded-full transition-opacity ${currentView === 'gallery' ? 'opacity-100' : 'opacity-0'}`}></span>
                            <span className={`transition-all duration-300 uppercase ${currentView === 'gallery' ? 'text-[#d4cbb3] opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>Gallery</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div
                            className="flex items-center gap-2 cursor-pointer group"
                            onClick={() => handleNavClick('archive')}
                        >
                            <span className={`w-1 h-1 bg-[#d4cbb3] rounded-full transition-opacity ${currentView === 'archive' ? 'opacity-100' : 'opacity-0'}`}></span>
                            <span className={`transition-all duration-300 uppercase ${currentView === 'archive' ? 'text-[#d4cbb3] opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>Archive</span>
                        </div>
                    </div>

                    <div
                        className="flex items-center gap-2 cursor-pointer group mt-[2px]"
                        onClick={() => handleNavClick('contact')}
                    >
                        <span className={`w-1 h-1 bg-[#d4cbb3] rounded-full transition-opacity ${currentView === 'contact' ? 'opacity-100' : 'opacity-0'}`}></span>
                        <span className={`transition-all duration-300 uppercase ${currentView === 'contact' ? 'text-[#d4cbb3] opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>Contact</span>
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-50 text-[10px] tracking-[0.3em] font-mono text-[#d4cbb3] uppercase focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? 'Close' : 'Menu'}
                </button>
            </header>

            {/* Mobile Full-Screen Overlay Nav */}
            <div className={`fixed inset-0 bg-[#0a0a0a] z-40 transition-transform duration-700 ease-in-out md:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>

                {/* Background film markings */}
                <div className="absolute inset-0 flex justify-between px-10 opacity-[0.02] pointer-events-none z-0">
                    <div className="w-px h-full bg-white relative"></div>
                    <div className="w-px h-full bg-white relative"></div>
                </div>

                <div className="flex flex-col h-full items-center justify-center gap-12 text-[#d4cbb3] z-10 relative">
                    <div
                        className="flex items-center justify-center gap-4 cursor-pointer group w-full px-12"
                        onClick={() => handleNavClick('slider')}
                    >
                        <span className={`w-2 h-2 bg-[#d4cbb3] rounded-full transition-opacity ${currentView === 'slider' ? 'opacity-100' : 'opacity-0'}`}></span>
                        <h2 className={`text-4xl font-serif italic transition-all duration-300 ${currentView === 'slider' ? 'text-[#d4cbb3]' : 'opacity-60 group-hover:opacity-100'}`}>Work</h2>
                    </div>

                    <div
                        className="flex items-center justify-center gap-4 cursor-pointer group w-full px-12"
                        onClick={() => handleNavClick('gallery')}
                    >
                        <span className={`w-2 h-2 bg-[#d4cbb3] rounded-full transition-opacity ${currentView === 'gallery' ? 'opacity-100' : 'opacity-0'}`}></span>
                        <h2 className={`text-4xl font-serif italic transition-all duration-300 ${currentView === 'gallery' ? 'text-[#d4cbb3]' : 'opacity-60 group-hover:opacity-100'}`}>Gallery</h2>
                    </div>

                    <div
                        className="flex items-center justify-center gap-4 cursor-pointer group w-full px-12"
                        onClick={() => handleNavClick('archive')}
                    >
                        <span className={`w-2 h-2 bg-[#d4cbb3] rounded-full transition-opacity ${currentView === 'archive' ? 'opacity-100' : 'opacity-0'}`}></span>
                        <h2 className={`text-4xl font-serif italic transition-all duration-300 ${currentView === 'archive' ? 'text-[#d4cbb3]' : 'opacity-60 group-hover:opacity-100'}`}>Archive</h2>
                    </div>

                    <div
                        className="flex items-center justify-center gap-4 cursor-pointer group w-full px-12"
                        onClick={() => handleNavClick('contact')}
                    >
                        <span className={`w-2 h-2 bg-[#d4cbb3] rounded-full transition-opacity ${currentView === 'contact' ? 'opacity-100' : 'opacity-0'}`}></span>
                        <h2 className={`text-4xl font-serif italic transition-all duration-300 ${currentView === 'contact' ? 'text-[#d4cbb3]' : 'opacity-60 group-hover:opacity-100'}`}>Contact</h2>
                    </div>
                </div>

                {/* Footer element in mobile menu */}
                <div className="absolute bottom-12 w-full text-center text-[9px] tracking-[0.3em] font-mono opacity-40 text-white uppercase pointer-events-none">
                    Creative
                </div>
            </div>
        </>
    );
};

export default Header;
