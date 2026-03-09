import type { Project } from '../data/projects';
import { projects as initialProjects } from '../data/projects';

const STORAGE_KEY = 'videographer_projects';

export const api = {
    // Initialize storage if empty
    init: () => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProjects));
        }
    },

    // Get all projects
    getProjects: (): Project[] => {
        api.init();
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    // Get a single project
    getProject: (id: string): Project | undefined => {
        const projects = api.getProjects();
        return projects.find(p => p.id === id);
    },

    // Create a new project
    createProject: (project: Omit<Project, 'id'>): Project => {
        const projects = api.getProjects();
        // Generate an ID (e.g. 09, 10, etc. or a random string)
        const newId = String(Date.now()); // Simple unique ID
        const newProject = { ...project, id: newId };
        projects.push(newProject);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
        return newProject;
    },

    // Update a project
    updateProject: (id: string, updates: Partial<Project>): void => {
        const projects = api.getProjects();
        const index = projects.findIndex(p => p.id === id);
        if (index !== -1) {
            projects[index] = { ...projects[index], ...updates };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
        }
    },

    // Delete a project
    deleteProject: (id: string): void => {
        const projects = api.getProjects();
        const filtered = projects.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
};
