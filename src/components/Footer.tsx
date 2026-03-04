import React from 'react';

interface FooterProps {
    timeCode: string;
}

const Footer: React.FC<FooterProps> = ({ timeCode }) => {
    return (
        <footer className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-end p-6 md:p-10 font-mono text-[10px] tracking-[0.2em] mix-blend-difference">
            <div className="flex flex-col gap-1">
                <span>© 2026</span>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 flex gap-4">
                <span className="text-cream">SLIDER</span>
                <span className="opacity-40">/</span>
                <span className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity">LIST</span>
            </div>

            <div className="flex gap-16 items-end">
                <div className="flex flex-col gap-1 text-right">
                    <div className="flex items-center gap-2 justify-end">
                        <span className="w-1 h-1 bg-cream rounded-full"></span>
                        <span>ALL (42)</span>
                    </div>
                    <span className="opacity-40">TV & FILM</span>
                    <span className="opacity-40">COMMERCIAL</span>
                    <span className="opacity-40">EDITORIAL</span>
                </div>

                <div className="flex flex-col gap-1 text-right">
                    <span className="tabular-nums">{timeCode}</span>
                    <span className="hover:opacity-60 cursor-pointer transition-opacity">CREDITS</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
