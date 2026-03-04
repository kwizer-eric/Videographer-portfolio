import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-start p-6 md:p-10 mix-blend-difference">
            <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl font-serif italic tracking-tight text-cream">Jason Bergh</h1>
            </div>

            <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
                <span className="text-[10px] tracking-[0.2em] font-mono opacity-60">CREATIVE</span>
            </div>

            <nav className="flex gap-12 text-[10px] tracking-[0.2em] font-mono">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-cream rounded-full"></span>
                        <a href="#" className="hover:opacity-60 transition-opacity">WORK</a>
                    </div>
                    <a href="#" className="pl-3 opacity-40 hover:opacity-100 transition-opacity">REPORTAGE</a>
                </div>

                <div className="flex flex-col gap-4">
                    <a href="#" className="hover:opacity-60 transition-opacity uppercase">Archive</a>
                    <a href="#" className="hover:opacity-60 transition-opacity uppercase">About</a>
                </div>

                <a href="#" className="hover:opacity-60 transition-opacity uppercase">Contact</a>
            </nav>
        </header>
    );
};

export default Header;
