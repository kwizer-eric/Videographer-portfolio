import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import type { Project } from '../../data/projects';
import { Film, FolderGit2 } from 'lucide-react';

const Dashboard = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        setProjects(api.getProjects());
    }, []);

    const categories = projects.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="space-y-8 animate-fade-in relative z-10">
            <header>
                <h2 className="text-3xl font-serif italic text-white tracking-tight">Overview</h2>
                <p className="text-[10px] text-[#d4cbb3]/50 uppercase tracking-[0.2em] mt-2">System Status & Metrics</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-black/40 border border-[#d4cbb3]/10 p-6 rounded-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Film className="mb-4 text-[#d4cbb3]/50" size={24} strokeWidth={1.5} />
                    <div className="text-4xl font-serif italic text-white">{projects.length}</div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-[#d4cbb3]/50 mt-2">Total Projects</div>
                </div>
                {Object.entries(categories).map(([cat, count]) => (
                    <div key={cat} className="bg-black/40 border border-[#d4cbb3]/10 p-6 rounded-sm relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <FolderGit2 className="mb-4 text-[#d4cbb3]/50" size={24} strokeWidth={1.5} />
                        <div className="text-4xl font-serif italic text-white">{count}</div>
                        <div className="text-[9px] uppercase tracking-[0.2em] text-[#d4cbb3]/50 mt-2">{cat}</div>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-black/40 border border-[#d4cbb3]/10 p-8 rounded-sm">
                <h3 className="text-xl font-serif italic mb-6">Recent Additions</h3>
                <div className="space-y-4">
                    {projects.slice(-5).reverse().map(p => (
                        <div key={p.id} className="flex items-center justify-between border-b border-[#d4cbb3]/5 pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-black overflow-hidden border border-white/10 flex-shrink-0">
                                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover opacity-80" />
                                </div>
                                <div>
                                    <h4 className="font-serif italic text-white text-lg">{p.title}</h4>
                                    <div className="text-[9px] font-mono text-[#d4cbb3]/50 uppercase tracking-[0.2em] mt-1">{p.category} / {p.client}</div>
                                </div>
                            </div>
                            <div className="text-[10px] font-mono tracking-widest">{p.projectNumber || p.id}</div>
                        </div>
                    ))}
                    {projects.length === 0 && <p className="text-[10px] text-white/40 tracking-widest uppercase py-4">No projects found.</p>}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
