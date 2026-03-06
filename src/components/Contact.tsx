import React, { useState } from 'react';

const CONTACT_LINKS = [
    { name: 'Instagram', detail: '[@YOUR_HANDLE]', href: '#', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop' },
    { name: 'LinkedIn', detail: '[YOUR NAME]', href: '#', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop' },
    { name: 'WhatsApp', detail: '[YOUR NUMBER]', href: '#', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Email', detail: '[YOUR EMAIL]', href: '#', image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Phone', detail: '[YOUR NUMBER]', href: '#', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983&auto=format&fit=crop' },
];

const Contact: React.FC = () => {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    return (
        <div className="relative w-screen min-h-[100dvh] bg-[#0a0a0a] text-[#d4cbb3] flex flex-col justify-center overflow-x-hidden">

            {/* Background Images Overlay */}
            {CONTACT_LINKS.map((link, idx) => (
                <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-out z-0 pointer-events-none ${hoveredIdx === idx ? 'opacity-30' : 'opacity-0'}`}
                >
                    <img src={link.image} alt={link.name} className="w-full h-full object-cover grayscale-[0.5]" />
                </div>
            ))}

            {/* Background alignment lines (Global Grid) */}
            <div className="fixed inset-0 flex justify-between px-[12.5%] opacity-[0.03] pointer-events-none z-0">
                <div className="w-px h-full bg-white relative"></div>
                <div className="w-px h-full bg-white relative"></div>
                <div className="w-px h-full bg-white hidden md:block relative"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col pt-32 md:pt-40 pb-20">

                {/* Header Strip */}
                <div className="mb-10 md:mb-16 flex justify-between items-end border-b border-[#d4cbb3]/20 pb-6 w-full">
                    <h2 className="text-xs md:text-sm font-mono tracking-[0.4em] uppercase text-white/50">
                        Get In Touch
                    </h2>
                    <span className="text-[9px] md:text-[10px] font-mono tracking-[0.2em] uppercase text-[#d4cbb3]/40">
                        Available for Commission
                    </span>
                </div>

                {/* Interactive Contact List */}
                <div className="flex flex-col w-full" onMouseLeave={() => setHoveredIdx(null)}>
                    {CONTACT_LINKS.map((link, idx) => (
                        <a
                            key={idx}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-[#d4cbb3]/10 transition-all duration-500 cursor-pointer 
                                ${hoveredIdx !== null && hoveredIdx !== idx ? 'opacity-30' : 'opacity-100 hover:border-[#d4cbb3]/50'}`}
                            onMouseEnter={() => setHoveredIdx(idx)}
                        >
                            {/* Number & Name */}
                            <div className="flex items-center gap-6 md:gap-12 mb-6 md:mb-0">
                                <span className="font-mono text-sm md:text-base tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                                    0{idx + 1}
                                </span>
                                <h3 className="text-5xl md:text-7xl lg:text-[7rem] font-serif italic text-white group-hover:scale-105 md:group-hover:translate-x-8 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] origin-left leading-none">
                                    {link.name}
                                </h3>
                            </div>

                            {/* Value / Detail & Arrow */}
                            <div className="flex items-center gap-6 md:gap-8 self-start md:self-auto pl-12 md:pl-0">
                                <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#d4cbb3] opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                    {link.detail}
                                </span>
                                {/* Arrow custom icon */}
                                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-[#d4cbb3]/30 flex items-center justify-center group-hover:bg-[#d4cbb3] group-hover:text-[#0a0a0a] transition-all duration-500 transform group-hover:-rotate-45">
                                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5">
                                        <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Contact;
