import React from 'react';

interface HeaderProps {
    currentView: 'slider' | 'archive' | 'contact' | 'gallery';
    setView: (view: 'slider' | 'archive' | 'contact' | 'gallery') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-start p-4 md:p-10 mix-blend-difference">
            <div className="flex flex-col cursor-pointer z-50" onClick={() => setView('slider')}>
                <h1 className="text-2xl md:text-3xl font-serif italic tracking-tight text-[#d4cbb3] hover:opacity-80 transition-opacity">Jason Bergh</h1>
            </div>

            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 mt-1">
                <span className="text-[9px] tracking-[0.3em] font-mono opacity-40 text-white uppercase">Creative</span>
            </div>

            <nav className="flex flex-wrap gap-4 md:gap-16 text-[9px] tracking-[0.3em] font-mono text-white justify-end relative z-50">
                <div className="flex flex-col gap-1">
                    <div
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => setView('slider')}
                    >
                        <span className={`w-1 h-1 bg-[#d4cbb3] rounded-full transition-opacity ${currentView === 'slider' ? 'opacity-100' : 'opacity-0'}`}></span>
                        <span className={`transition-all duration-300 uppercase ${currentView === 'slider' ? 'text-[#d4cbb3] opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>Work</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => setView('gallery')}
                    >
                        <span className={`w-1 h-1 bg-[#d4cbb3] rounded-full transition-opacity ${currentView === 'gallery' ? 'opacity-100' : 'opacity-0'}`}></span>
                        <span className={`transition-all duration-300 uppercase ${currentView === 'gallery' ? 'text-[#d4cbb3] opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>Gallery</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => setView('archive')}
                    >
                        <span className={`w-1 h-1 bg-[#d4cbb3] rounded-full transition-opacity ${currentView === 'archive' ? 'opacity-100' : 'opacity-0'}`}></span>
                        <span className={`transition-all duration-300 uppercase ${currentView === 'archive' ? 'text-[#d4cbb3] opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>Archive</span>
                    </div>
                </div>

                <div
                    className="flex items-center gap-2 cursor-pointer group mt-[2px]"
                    onClick={() => setView('contact')}
                >
                    <span className={`w-1 h-1 bg-[#d4cbb3] rounded-full transition-opacity ${currentView === 'contact' ? 'opacity-100' : 'opacity-0'}`}></span>
                    <span className={`transition-all duration-300 uppercase ${currentView === 'contact' ? 'text-[#d4cbb3] opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>Contact</span>
                </div>
            </nav>
        </header>
    );
};

export default Header;
