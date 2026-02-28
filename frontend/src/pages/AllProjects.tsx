import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal, { ProjectData } from "@/components/ProjectModal";
import FloatingShapes from "@/components/FloatingShapes";
import { initialFeaturedProjects } from "@/data/projects";

const AllProjects = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

    // Pagination states
    const [page, setPage] = useState(1);
    const PROJECTS_PER_PAGE = 30;

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                // Simulate network delay for effect
                await new Promise(resolve => setTimeout(resolve, 500));

                // Use local mock data instead of backend fetch
                setProjects(initialFeaturedProjects);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Could not load projects.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Calculate displayed projects based on pagination
    const displayedProjects = projects.slice(0, page * PROJECTS_PER_PAGE);
    const hasMore = displayedProjects.length < projects.length;

    const handleLike = (title: string) => {
        // In a real app this would call the API
        setProjects((prev) =>
            prev.map((project) =>
                project.title === title
                    ? { ...project, likes: project.likes + 1 }
                    : project
            )
        );
    };

    return (
        <div className="min-h-screen relative bg-background flex flex-col">
            <FloatingShapes />

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b-8 border-foreground">
                <div className="container mx-auto px-4 h-24 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="p-2 border-4 border-foreground bg-primary group-hover:-translate-x-1 group-hover:shadow-[4px_4px_0_0_rgba(40,32,16,1)] transition-all shadow-soft">
                            <ArrowLeft size={24} className="text-foreground" strokeWidth={3} />
                        </div>
                        <span className="font-pixel text-xl hidden sm:inline-block">Back to Search</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary flex items-center justify-center border-4 border-foreground shadow-[4px_4px_0_0_rgba(40,32,16,1)] transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                            <Lightbulb className="text-primary-foreground animate-pulse" size={24} />
                        </div>
                        <span className="font-pixel text-foreground tracking-tight text-3xl hidden md:inline-block">
                            Nodaro<span className="text-primary">Search</span>
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow pt-32 pb-24 relative z-10 px-4">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-pixel uppercase text-foreground mb-4">
                            All Projects Archive
                        </h1>
                        <p className="text-xl text-muted-foreground font-medium">
                            Browsing the complete collection of {projects.length || "..."} hardware projects.
                        </p>
                    </motion.div>

                    {error ? (
                        <div className="bg-destructive/10 border-4 border-destructive p-8 text-center text-destructive font-pixel">
                            {error}
                        </div>
                    ) : loading ? (
                        <div className="flex justify-center items-center py-32">
                            <Loader2 className="w-16 h-16 text-primary animate-spin" />
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {displayedProjects.map((project, idx) => (
                                    <ProjectCard
                                        key={`${project.title}-${idx}`}
                                        {...project}
                                        onLike={() => handleLike(project.title)}
                                        onView={() => setSelectedProject(project as ProjectData)}
                                    />
                                ))}
                            </div>

                            {hasMore && (
                                <div className="mt-16 text-center">
                                    <button
                                        onClick={() => setPage(p => p + 1)}
                                        className="px-8 py-4 bg-secondary text-foreground font-pixel text-lg uppercase border-4 border-foreground shadow-[4px_4px_0_0_rgba(40,32,16,1)] hover:shadow-[8px_8px_0_0_rgba(40,32,16,1)] hover:-translate-y-1 transition-all"
                                    >
                                        Load More Projects
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-10 border-t-8 border-foreground bg-card relative z-10 mt-auto">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary flex items-center justify-center border-2 border-foreground">
                                <Lightbulb className="text-primary-foreground" size={20} />
                            </div>
                            <span className="font-pixel text-foreground tracking-tight text-xl">
                                Nodaro<span className="text-primary">Search</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-8 font-medium text-foreground">
                            <a href="https://www.instagram.com/nodaro_/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm font-pixel uppercase bg-card text-foreground border-2 border-foreground shadow-[2px_2px_0_0_rgba(40,32,16,1)] hover:bg-primary hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgba(40,32,16,1)] transition-all duration-200">
                                Instagram
                            </a>
                        </div>
                        <p className="font-medium text-muted-foreground">
                            © 2026 NodaroSearch
                        </p>
                    </div>
                </div>
            </footer>

            <ProjectModal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                project={selectedProject}
                onLike={() => {
                    if (selectedProject) {
                        handleLike(selectedProject.title);
                        setSelectedProject({
                            ...selectedProject,
                            likes: selectedProject.likes + 1
                        });
                    }
                }}
            />
        </div>
    );
};

export default AllProjects;
