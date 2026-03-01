import { Project } from "@/data/projects";

// Mapping from keywords to categories
const keywordToCategoryMap: Record<string, string> = {
  "arduino": "Arduino",
  "3d-printing": "3D Printing",
  "robotics": "Robotics",
  "robots": "Robotics",
  "iot": "IoT",
  "electronics": "Electronics",
  "open-source-hardware": "Electronics",
  "raspberry-pi": "IoT",
  "esp32": "IoT",
  "esp8266": "IoT",
  "tools": "Tools",
  "cnc": "Tools",
  "soldering": "Tools",
};

// Color palette for categories
const categoryColors: Record<string, string> = {
  "Electronics": "hsl(200 85% 55%)",
  "3D Printing": "hsl(0 90% 45%)",
  "Robotics": "hsl(25 95% 55%)",
  "IoT": "hsl(5 80% 60%)",
  "Arduino": "hsl(180 85% 45%)",
  "Tools": "hsl(40 95% 50%)",
};

interface RawProject {
  title: string;
  summary: string;
  keywords: string[];
  difficulty: string | null;
  link: string;
  source: string;
}

function inferCategory(keywords: string[]): string {
  // Check keywords against our mapping
  for (const keyword of keywords) {
    const normalized = keyword.toLowerCase();
    if (keywordToCategoryMap[normalized]) {
      return keywordToCategoryMap[normalized];
    }
  }
  
  // Default fallback
  return "Electronics";
}

function getColorForCategory(category: string): string {
  return categoryColors[category] || "hsl(280 70% 60%)";
}

export async function loadProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/projects.json');
    if (!response.ok) {
      throw new Error(`Failed to load projects: ${response.statusText}`);
    }
    
    const rawProjects: RawProject[] = await response.json();
    
    // Transform raw projects to frontend format
    const projects: Project[] = rawProjects.map((raw) => {
      const category = inferCategory(raw.keywords);
      return {
        title: raw.title,
        description: raw.summary || "No description available",
        category,
        likes: 0,
        color: getColorForCategory(category),
        link: raw.link,
      };
    });
    
    return projects;
  } catch (error) {
    console.error("Error loading projects:", error);
    throw error;
  }
}

// Cache the loaded projects in memory
let cachedProjects: Project[] | null = null;

export async function getCachedProjects(): Promise<Project[]> {
  if (cachedProjects) {
    return cachedProjects;
  }
  
  cachedProjects = await loadProjects();
  return cachedProjects;
}
