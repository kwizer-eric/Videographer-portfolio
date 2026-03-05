import React from 'react';

const Contact: React.FC = () => {
    return (
        <div className="relative w-screen min-h-[100dvh] py-32 lg:py-0 bg-[#10100e] text-[#d4cbb3] flex items-center justify-center overflow-y-auto overflow-x-hidden">

            {/* Background alignment lines */}
            <div className="absolute inset-0 flex justify-between px-[12.5%] opacity-20 pointer-events-none z-0">
                <div className="w-px h-full bg-white/10 relative">
                    <div className="absolute top-1/4 -left-3 text-[6px] font-mono rotate-90 whitespace-nowrap opacity-40">510</div>
                    <div className="absolute top-1/2 -left-3 text-[6px] font-mono rotate-90 whitespace-nowrap opacity-40">540</div>
                    <div className="absolute bottom-1/4 -left-3 text-[6px] font-mono rotate-90 whitespace-nowrap opacity-40">560</div>
                </div>
                <div className="w-px h-full bg-white/10 relative">
                    <div className="absolute top-1/4 -left-3 text-[6px] font-mono rotate-90 whitespace-nowrap opacity-40">610</div>
                    <div className="absolute top-1/2 -left-3 text-[6px] font-mono rotate-90 whitespace-nowrap opacity-40">620</div>
                    <div className="absolute bottom-1/4 -left-3 text-[6px] font-mono rotate-90 whitespace-nowrap opacity-40">640</div>
                </div>
                <div className="w-px h-full bg-white/10 hidden md:block relative">
                    <div className="absolute top-1/4 -left-3 text-[6px] font-mono rotate-90 whitespace-nowrap opacity-40">590</div>
                    <div className="absolute top-1/2 -left-3 text-[6px] font-mono rotate-90 whitespace-nowrap opacity-40">600</div>
                    <div className="absolute bottom-1/4 -left-3 text-[6px] font-mono rotate-90 whitespace-nowrap opacity-40">520</div>
                </div>
            </div>

            {/* 4-Column Grid */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12 lg:gap-8 mt-12 md:mt-0">

                {/* Column 1: TV & Film */}
                <div className="flex flex-col items-center text-center group">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif italic mb-8 hover:opacity-80 transition-opacity">TV & Film</h2>
                    <div className="flex flex-col space-y-1 font-mono text-[9px] md:text-[10px] tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                        <span className="font-bold mb-1">UTA</span>
                        <span>Travis Tammero</span>
                        <a href="mailto:travis.tammero@uta.com" className="hover:text-white transition-colors">travis.tammero@uta.com</a>
                        <span>(310) 424-258-2425</span>
                    </div>
                </div>

                {/* Column 2: Commercial */}
                <div className="flex flex-col items-center text-center group">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif italic mb-8 hover:opacity-80 transition-opacity">Commercial</h2>
                    <div className="flex flex-col space-y-1 font-mono text-[9px] md:text-[10px] tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                        <span className="font-bold mb-1">Early Morning Riot</span>
                        <span>Jennifer Rovero</span>
                        <a href="mailto:jennifer@earlymorningriot.com" className="hover:text-white transition-colors">jennifer@earlymorningriot.com</a>
                    </div>
                </div>

                {/* Column 3: Social */}
                <div className="flex flex-col items-center text-center group">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif italic mb-8 hover:opacity-80 transition-opacity">Social</h2>
                    <div className="flex flex-col space-y-1 font-mono text-[9px] md:text-[10px] tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                        <span><strong className="font-bold">Instagram:</strong> <a href="#" className="hover:text-white transition-colors">@JasonBergh</a></span>
                        <span><strong className="font-bold">LinkedIn:</strong> <a href="#" className="hover:text-white transition-colors">@JasonBergh</a></span>
                        <span><strong className="font-bold">IMDB:</strong> <a href="#" className="hover:text-white transition-colors">Jason B. Bergh</a></span>
                    </div>
                </div>

                {/* Column 4: Direct */}
                <div className="flex flex-col items-center text-center group">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif italic mb-8 hover:opacity-80 transition-opacity">Direct</h2>
                    <div className="flex flex-col space-y-1 font-mono text-[9px] md:text-[10px] tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                        <a href="mailto:studio@jasonbergh.com" className="hover:text-white transition-colors">studio@jasonbergh.com</a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;
