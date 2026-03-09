import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Film, LogOut } from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();

    const NavLink = ({ to, icon: Icon, label, exact = false }: { to: string, icon: any, label: string, exact?: boolean }) => {
        const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);
        return (
            <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300 ${isActive ? 'bg-[#d4cbb3] text-[#0a0a0a] font-bold' : 'text-[#d4cbb3]/70 hover:bg-white/5 hover:text-[#d4cbb3]'}`}>
                <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="text-[11px] uppercase tracking-[0.2em]">{label}</span>
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#d4cbb3] flex font-mono selection:bg-[#d4cbb3] selection:text-[#0a0a0a]">
            {/* Sidebar */}
            <aside className="w-64 border-r border-[#d4cbb3]/10 flex-col hidden md:flex bg-black/40 backdrop-blur-md relative z-20">
                <div className="p-8 border-b border-[#d4cbb3]/10 flex flex-col">
                    <h1 className="text-2xl font-serif italic text-white tracking-tight drop-shadow-md">ADMIN</h1>
                    <p className="text-[9px] text-[#d4cbb3]/40 tracking-[0.3em] mt-2 uppercase">PORTFOLIO MANAGER</p>
                </div>

                <nav className="flex-1 p-6 space-y-4">
                    <NavLink exact to="/admin" icon={LayoutDashboard} label="Dashboard" />
                    <NavLink to="/admin/projects" icon={Film} label="Projects" />
                </nav>

                <div className="p-6 border-t border-[#d4cbb3]/10">
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#d4cbb3]/50 hover:bg-white/5 hover:text-white transition-colors duration-300 group">
                        <LogOut size={18} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] uppercase tracking-[0.2em]">Exit to Site</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Mobile Header */}
                <header className="h-16 border-b border-[#d4cbb3]/10 flex items-center px-6 justify-between md:hidden bg-black/60 backdrop-blur-md relative z-20">
                    <h1 className="font-serif italic text-xl text-white">ADMIN</h1>
                    <div className="flex gap-4 items-center">
                        <Link to="/admin" className="text-[9px] uppercase tracking-widest text-[#d4cbb3]/70 py-2">Dash</Link>
                        <Link to="/admin/projects" className="text-[9px] uppercase tracking-widest text-[#d4cbb3]/70 py-2">Projects</Link>
                        <Link to="/" className="text-[9px] uppercase tracking-widest text-white/50 py-2">Exit</Link>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 md:p-12 relative z-10">
                    {/* Fake film grain overlay inside main content */}
                    <div className="fixed inset-0 pointer-events-none z-[100] opacity-20 mix-blend-overlay border-none">
                        <div className="absolute inset-0 bg-[#050505]/10 animate-pulse"></div>
                    </div>

                    <div className="max-w-6xl mx-auto relative z-10">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
