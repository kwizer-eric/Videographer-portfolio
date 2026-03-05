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
    },
    {
        id: "04",
        title: "Modern Architect Stories",
        category: "Documentary",
        subCategory: "Architecture",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        client: "Luxe Living",
        projectNumber: "921.4",
        metadata: "4K / 60FPS",
        timeCode: "00:04:12:08"
    },
    {
        id: "05",
        title: "The Silence of Neon",
        category: "Editorial",
        subCategory: "Vogue",
        client: "Vogue Magazine",
        imageUrl: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2070&auto=format&fit=crop",
        timeCode: "00:08:45:15",
        projectNumber: "841.9",
        metadata: "35MM FILM"
    },
    {
        id: "06",
        title: "Into the Void",
        category: "Film",
        subCategory: "Cinematic",
        client: "A24",
        imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983&auto=format&fit=crop",
        timeCode: "01:22:15:00",
        projectNumber: "102.3",
        metadata: "70MM / IMAX"
    },
    {
        id: "08",
        title: "Echoes of Silence",
        category: "Art Film",
        subCategory: "Experimental",
        client: "MoMA",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1968&auto=format&fit=crop",
        timeCode: "00:15:00:00",
        projectNumber: "009.7",
        metadata: "DV CAM"
    },
    {
        id: "09",
        title: "The Last Frontier",
        category: "Documentary",
        subCategory: "Nature",
        client: "National Geographic",
        imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
        timeCode: "00:52:10:00",
        projectNumber: "441.2",
        metadata: "RED HELIUM"
    }
];
