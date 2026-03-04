export interface Project {
    id: string;
    title: string;
    category: string;
    subCategory: string;
    client: string;
    imageUrl: string;
    timeCode: string;
    projectNumber: string;
    metadata: string;
}

export const projects: Project[] = [
    {
        id: "01",
        title: "The Greatest Love Story Never Told",
        category: "FEATURE DOCUMENTARY",
        subCategory: "TV & FILM",
        client: "AMAZON ORIGINALS & ARTISTS EQUITY",
        imageUrl: "https://images.unsplash.com/photo-1485081666476-039302dcd5f1?q=80&w=2070&auto=format&fit=crop",
        timeCode: "00:08:38",
        projectNumber: ".42",
        metadata: "01."
    },
    {
        id: "02",
        title: "Modern Masters Architecture & Design",
        category: "COMMERCIAL",
        subCategory: "EDITORIAL",
        client: "NETFLIX & CREATIVE LABS",
        imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
        timeCode: "00:12:15",
        projectNumber: ".18",
        metadata: "02."
    },
    {
        id: "03",
        title: "Archival Footage Echoes of Silence",
        category: "REPORTAGE",
        subCategory: "FEATURE DOCUMENTARY",
        client: "APPLE TV+ & STUDIO ARCHIVE",
        imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
        timeCode: "00:45:00",
        projectNumber: ".89",
        metadata: "03."
    }
];
