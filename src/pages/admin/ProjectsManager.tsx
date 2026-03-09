import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import type { Project } from '../../data/projects';
import { Plus, Trash2, Edit2, X } from 'lucide-react';

const ProjectsManager = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Project>>({});

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = () => setProjects(api.getProjects());

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            api.deleteProject(id);
            loadProjects();
        }
    };

    const handleEdit = (project: Project) => {
        setFormData(project);
        setEditingId(project.id);
        setIsFormOpen(true);
    };

    const handleCreateNew = () => {
        setFormData({
            title: '', category: '', subCategory: '', client: '',
            imageUrl: '', videoUrl: '', timeCode: '00:00:00:00', projectNumber: '', metadata: ''
        });
        setEditingId(null);
        setIsFormOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            api.updateProject(editingId, formData);
        } else {
            api.createProject(formData as Omit<Project, 'id'>);
        }
        setIsFormOpen(false);
        loadProjects();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="space-y-8 animate-fade-in relative z-10 w-full max-w-[100vw] overflow-x-hidden">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-serif italic text-white tracking-tight">Projects</h2>
                    <p className="text-[10px] text-[#d4cbb3]/50 uppercase tracking-[0.2em] mt-2">Manage Portfolio Content</p>
                </div>
                <button
                    onClick={handleCreateNew}
                    className="flex items-center gap-2 bg-[#d4cbb3] text-[#0a0a0a] px-4 py-2 font-bold hover:bg-white transition-colors text-[10px] uppercase tracking-[0.2em]"
                >
                    <Plus size={14} strokeWidth={2.5} /> New Project
                </button>
            </header>

            {isFormOpen ? (
                <div className="bg-black/60 border border-[#d4cbb3]/10 p-8 rounded-sm animate-fade-in backdrop-blur-md">
                    <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <h3 className="text-xl font-serif italic text-white">{editingId ? 'Edit Project' : 'New Project'}</h3>
                        <button onClick={() => setIsFormOpen(false)} className="text-white/50 hover:text-white"><X size={20} /></button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { name: 'title', label: 'Title', type: 'text', placeholder: '[ Project Title ]' },
                                { name: 'client', label: 'Client', type: 'text', placeholder: 'Brand Name' },
                                { name: 'category', label: 'Category', type: 'text', placeholder: 'COMMERCIAL' },
                                { name: 'subCategory', label: 'Sub-Category', type: 'text', placeholder: 'AUTOMOTIVE' },
                                { name: 'imageUrl', label: 'Image URL', type: 'text', placeholder: 'https://...' },
                                { name: 'videoUrl', label: 'Video URL (MP4)', type: 'text', placeholder: 'https://...' },
                                { name: 'timeCode', label: 'Timecode', type: 'text', placeholder: '00:00:00:00' },
                                { name: 'projectNumber', label: 'Project Number', type: 'text', placeholder: '.01' },
                                { name: 'metadata', label: 'Metadata', type: 'text', placeholder: 'Arri Alexa Mini LF' },
                            ].map(field => (
                                <div key={field.name} className="flex flex-col gap-2">
                                    <label className="text-[9px] uppercase tracking-[0.2em] text-[#d4cbb3]/50">{field.label}</label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name as keyof typeof formData] || ''}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-black/40 border border-[#d4cbb3]/20 py-3 px-4 text-[#d4cbb3] text-sm focus:outline-none focus:border-[#d4cbb3] transition-colors"
                                        placeholder={field.placeholder}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                            <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 text-[10px] uppercase tracking-widest text-[#d4cbb3]/50 hover:text-white transition-colors">Cancel</button>
                            <button type="submit" className="bg-[#d4cbb3] text-[#0a0a0a] px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-colors">
                                {editingId ? 'Save Changes' : 'Create Project'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="bg-black/40 border border-[#d4cbb3]/10 rounded-sm overflow-hidden overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-[#d4cbb3]/10 bg-white/5">
                                <th className="p-4 text-[9px] uppercase tracking-[0.2em] text-[#d4cbb3]/50 font-normal">Media</th>
                                <th className="p-4 text-[9px] uppercase tracking-[0.2em] text-[#d4cbb3]/50 font-normal">Details</th>
                                <th className="p-4 text-[9px] uppercase tracking-[0.2em] text-[#d4cbb3]/50 font-normal hidden md:table-cell">Client</th>
                                <th className="p-4 text-[9px] uppercase tracking-[0.2em] text-[#d4cbb3]/50 font-normal ext-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((p) => (
                                <tr key={p.id} className="border-b border-[#d4cbb3]/5 hover:bg-white/5 transition-colors group">
                                    <td className="p-4 w-24">
                                        <div className="w-16 h-16 bg-black border border-white/10 overflow-hidden relative">
                                            <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-serif italic text-white text-lg">{p.title}</div>
                                        <div className="text-[10px] text-[#d4cbb3]/50 uppercase tracking-[0.2em] mt-1">{p.category} <span className="text-white/20 px-1">/</span> {p.subCategory}</div>
                                    </td>
                                    <td className="p-4 hidden md:table-cell">
                                        <div className="text-sm">{p.client}</div>
                                        <div className="text-[9px] text-[#d4cbb3]/30 uppercase tracking-[0.2em] mt-1">ID: {p.projectNumber || p.id}</div>
                                    </td>
                                    <td className="p-4 content-center">
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => handleEdit(p)} className="p-2 text-[#d4cbb3]/50 hover:text-white hover:bg-white/10 rounded transition-colors" title="Edit">
                                                <Edit2 size={16} strokeWidth={1.5} />
                                            </button>
                                            <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500/50 hover:text-red-400 hover:bg-white/10 rounded transition-colors" title="Delete">
                                                <Trash2 size={16} strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {projects.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-[10px] uppercase tracking-widest text-[#d4cbb3]/40">
                                        No projects available. Click "New Project" to start.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProjectsManager;
