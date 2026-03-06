import React from 'react';

interface FooterProps {
    currentView: 'slider' | 'archive' | 'contact' | 'gallery';
    setView: (view: 'slider' | 'archive' | 'contact' | 'gallery') => void;
    timeCode: string;
    nextImageUrl?: string;
    count: number;
}

const Footer: React.FC<FooterProps> = ({ currentView, setView, timeCode, nextImageUrl, count }) => {
    return (
        <footer className="fixed bottom-0 left-0 w-full z-40 flex justify-between items-end p-4 md:p-10 font-mono text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] mix-blend-difference overflow-hidden text-white pointer-events-none">
            <div className="flex flex-col gap-4 md:gap-8 pointer-events-auto">
                <div className="flex flex-col gap-1">
                    <span>© 2026</span>
                </div>
                <div className="flex gap-4">
                    <span
                        className={`cursor-pointer transition-all duration-300 ${currentView === 'slider' ? 'text-[#d4cbb3] underline underline-offset-4 decoration-1 font-bold' : 'opacity-40 hover:opacity-100'}`}
                        onClick={() => setView('slider')}
                    >
                        SLIDER
                    </span>
                    <span className="opacity-40">/</span>
                    <span
                        className={`cursor-pointer transition-all duration-300 ${currentView === 'archive' ? 'text-[#d4cbb3] underline underline-offset-4 decoration-1 font-bold' : 'opacity-40 hover:opacity-100'}`}
                        onClick={() => setView('archive')}
                    >
                        LIST
                    </span>
                </div>
            </div>

            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 bottom-0 w-[120px] md:w-[180px] aspect-video mb-6 opacity-80 hover:opacity-100 transition-opacity cursor-pointer pointer-events-auto">
                {nextImageUrl && currentView === 'slider' && (
                    <div className="relative w-full h-full overflow-hidden border border-white/20 bg-black">
                        {/* Preview decorative vertical markings */}
                        <div className="absolute inset-y-0 -left-6 flex flex-col justify-around text-[6px] opacity-30">
                            <span>350</span>
                            <span>876</span>
                        </div>
                        <div className="absolute inset-y-0 -right-6 flex flex-col justify-around text-[6px] opacity-30">
                            <span>420</span>
                            <span>448</span>
                        </div>

                        <img src={nextImageUrl} className="w-full h-full object-cover opacity-60 hover:opacity-90 transition-opacity" alt="Next project preview" />
                    </div>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-16 items-end pointer-events-auto">
                <div className="flex flex-col gap-1 text-right">
                    <div className="flex items-center gap-2 justify-end">
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span className="italic font-serif">ALL ({count})</span>
                    </div>
                    <span className="opacity-40 hover:opacity-100 cursor-pointer">music videos </span>
                    <span className="opacity-40 hover:opacity-100 cursor-pointer">wildlife&nature</span>
                    <span className="opacity-40 hover:opacity-100 cursor-pointer">editorial</span>
                </div>

                <div className="flex flex-col gap-1 text-right">
                    <span className="tabular-nums tracking-normal text-[12px]">{timeCode}</span>
                    <span className="hover:opacity-60 cursor-pointer transition-opacity">CREDITS</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
