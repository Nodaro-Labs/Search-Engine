import {
  Cpu,
  Wrench,
  Lightbulb,
  Printer,
  Bot,
  Wifi,
  Zap,
  Users,
  FolderOpen,
  Loader2
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CategoryPill from "@/components/CategoryPill";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal, { ProjectData } from "@/components/ProjectModal";
import FloatingShapes from "@/components/FloatingShapes";
import { getAuthToken, getAuthHeaders, getUsername } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";
import { initialFeaturedProjects } from "@/data/projects";

const categories = [
  { icon: Cpu, label: "Electronics", count: initialFeaturedProjects.filter(p => p.category === "Electronics").length },
  { icon: Printer, label: "3D Printing", count: initialFeaturedProjects.filter(p => p.category === "3D Printing").length },
  { icon: Bot, label: "Robotics", count: initialFeaturedProjects.filter(p => p.category === "Robotics").length },
  { icon: Wifi, label: "IoT", count: initialFeaturedProjects.filter(p => p.category === "IoT").length },
  { icon: Lightbulb, label: "Arduino", count: initialFeaturedProjects.filter(p => p.category === "Arduino").length },
  { icon: Wrench, label: "Tools", count: initialFeaturedProjects.filter(p => p.category === "Tools").length },
];


const stats = [
  { icon: Users, value: "Become a", label: "Maker" },
  { icon: FolderOpen, value: `${initialFeaturedProjects.length}+`, label: "Projects" },
  { icon: Zap, value: "Made by", label: "Engineering Students" },
];

const Index = () => {
  const [featuredProjects, setFeaturedProjects] = useState(initialFeaturedProjects);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const [showFlash, setShowFlash] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);

  const handleSearch = async (query: string, skipAnimation = false) => {
    if (!query) {
      setFeaturedProjects(initialFeaturedProjects);
      setSearchError("");
      setActiveCategory(null);
      return;
    }

    const performSearch = async () => {
      setIsSearching(true);
      setSearchError("");
      try {
        // Local filtering instead of backend fetch
        const queryLower = query.toLowerCase();

        // Let's filter by title, description, or exact category match
        const filtered = initialFeaturedProjects.filter(p =>
          p.title.toLowerCase().includes(queryLower) ||
          p.description.toLowerCase().includes(queryLower) ||
          p.category.toLowerCase() === queryLower
        );

        setFeaturedProjects(filtered);
      } catch (err) {
        console.error("Search error:", err);
        setSearchError("Could not search local projects.");
        setFeaturedProjects(initialFeaturedProjects);
      } finally {
        setIsSearching(false);
        if (!skipAnimation) {
          // Turn off terminal after search resolves (with slight delay for effect)
          setTimeout(() => {
            setShowFlash(false);
            // Scroll to results after short delay to let DOM settle
            setTimeout(() => {
              if (resultsRef.current) {
                resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 100);
          }, 200); // Decreased from 400ms
        } else {
          // Just scroll since there was no animation
          setTimeout(() => {
            if (resultsRef.current) {
              resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
      }
    };

    if (skipAnimation) {
      performSearch();
    } else {
      setShowFlash(true);
      // Give it more time for the fake terminal text to be readable
      setTimeout(performSearch, 400); // Decreased from 800ms
    }
  };

  const handleCategoryClick = (categoryLabel: string) => {
    if (activeCategory === categoryLabel) {
      // Toggle off
      handleSearch("", true);
    } else {
      setActiveCategory(categoryLabel);
      handleSearch(categoryLabel, true);
    }
  };

  const clearSearch = () => {
    handleSearch("");
  };

  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setUser(getUsername());
  }, []);

  const handleLike = async (title: string) => {

    try {
      const response = await fetch("http://localhost:8000/api/projects/like", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ project_title: title })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Failed to like project");

      // We don't have global state for which projects the user has liked yet,
      // so we'll just optimistically increment/decrement the master like counter
      // based on whether the backend says we liked or unliked it.
      setFeaturedProjects((prev) =>
        prev.map((project) =>
          project.title === title
            ? { ...project, likes: data.liked ? project.likes + 1 : Math.max(0, project.likes - 1) }
            : project
        )
      );
    } catch (err) {
      console.error(err);
      alert("Something went wrong liking the project.");
    }
  };

  return (
    <div className="min-h-screen relative bg-background">
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center font-pixel p-8"
          >
            <div className="w-full max-w-2xl text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-primary text-xl md:text-2xl mb-4"
              >
                &gt; INITIATING QUERY...
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-primary text-xl md:text-2xl mb-4"
              >
                &gt; SCANNING HARDWARE REPOSITORIES...
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-primary text-xl md:text-2xl flex items-center"
              >
                &gt; EXTRACTING SCHEMATICS
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="ml-2 inline-block w-4 h-6 bg-primary"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <FloatingShapes />
      <Header />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative pt-32 pb-16 md:pt-40 md:pb-24"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-pixel uppercase text-center text-foreground max-w-5xl mx-auto leading-tight md:leading-tight lg:leading-tight">
            Discover Your Next
            <span className="block mt-4 flex justify-center gap-4">
              <span className="orange-text tracking-widest drop-shadow-[4px_4px_0_rgba(40,32,16,1)] animate-glitch inline-block">Hardware</span>
              <span className="inline-block tracking-widest drop-shadow-[4px_4px_0_rgba(40,32,16,1)]">Project</span>
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto font-medium">
            Search through thousands of open-source hardware projects,
            components, and tutorials from makers around the world.
          </p>

          {/* Search Bar */}
          <div className="mt-12 md:mt-16">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 md:mt-20">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 bg-card px-6 py-4 border-4 border-foreground shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-primary flex items-center justify-center border-2 border-foreground">
                  <stat.icon size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <div className="text-2xl font-pixel text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="py-16 md:py-20 relative z-10 bg-secondary border-y-4 border-foreground"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-pixel uppercase text-foreground text-center mb-10 leading-relaxed max-w-[80%] mx-auto">
            Browse by Category
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <CategoryPill
                key={cat.label}
                icon={cat.icon}
                label={cat.label}
                count={cat.count}
                isActive={activeCategory === cat.label}
                onClick={() => handleCategoryClick(cat.label)}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Projects Section */}
      <motion.section
        ref={resultsRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="py-16 md:py-24 relative z-10 scroll-mt-24"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-pixel uppercase text-foreground leading-relaxed">
                {isSearching ? "Searching..." : searchError ? "Featured Projects" : "Results & Featured Projects"}
              </h2>
              <p className="mt-3 text-muted-foreground font-medium text-lg">
                {searchError ? (
                  <span className="text-destructive font-bold">{searchError}</span>
                ) : (
                  "Handpicked projects from the community"
                )}
              </p>
            </div>
            <Link
              to="/all-projects"
              className="text-foreground font-pixel text-sm hover:underline hidden md:block uppercase bg-primary px-6 py-3 border-4 border-foreground shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all"
            >
              View All
            </Link>
          </div>

          {isSearching ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, idx) => (
                <ProjectCard
                  key={`${project.title}-${idx}`}
                  {...project}
                  onLike={() => handleLike(project.title)}
                  onView={() => setSelectedProject(project as ProjectData)}
                />
              ))}
              {featuredProjects.length === 0 && (
                <div className="col-span-full text-center py-20 font-pixel text-muted-foreground">
                  No projects found matching that query.
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-12 md:hidden">
            <Link
              to="/all-projects"
              className="text-foreground font-pixel text-sm hover:underline uppercase bg-primary px-6 py-3 border-4 border-foreground shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all inline-block"
            >
              View All
            </Link>
          </div>
        </div>
      </motion.section>



      {/* Footer */}
      <footer className="py-10 border-t-8 border-foreground bg-card relative z-10">
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
            // Optimistically update the local modal state too
            setSelectedProject({
              ...selectedProject,
              likes: selectedProject.likes + 1 // Real fix is complex without matching exactly if they already liked it, but this adds feel
            });
          }
        }}
      />
    </div>
  );
};

export default Index;
