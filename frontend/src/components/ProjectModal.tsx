import { X, Heart, ExternalLink, Cpu, Tag } from "lucide-react";
import { useEffect, useState } from "react";

export interface ProjectData {
    title: string;
    description: string;
    category: string;
    likes: number;
    color: string;
    link?: string;
}

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: ProjectData | null;
    onLike?: () => void;
}

const ProjectModal = ({ isOpen, onClose, project, onLike }: ProjectModalProps) => {
    const [isRendered, setIsRendered] = useState(isOpen);
    const [isVisible, setIsVisible] = useState(isOpen);
    const [localProject, setLocalProject] = useState(project);

    useEffect(() => {
        if (project) {
            setLocalProject(project);
        }
    }, [project]);

    useEffect(() => {
        if (isOpen) {
            setIsRendered(true);
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
            const timer = setTimeout(() => setIsRendered(false), 300); // Wait for the 300ms tailwind animation to finish
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isRendered || !localProject) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex justify-end transition-all duration-300 ${isVisible ? "bg-background/80 backdrop-blur-sm opacity-100" : "bg-transparent opacity-0 pointer-events-none"}`}>
            {/* Click outside to close */}
            <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

            {/* Slide-in panel */}
            <div
                className={`relative w-full max-w-2xl h-full bg-card border-l-4 border-foreground shadow-[-8px_0_0_0_rgba(40,32,16,1)] overflow-y-auto flex flex-col pointer-events-auto ${isVisible ? "animate-slide-in-right" : "animate-slide-out-right"
                    }`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 bg-background border-4 border-foreground p-2 text-foreground hover:text-primary hover:-translate-y-1 transition-all shadow-[4px_4px_0_0_rgba(40,32,16,1)]"
                >
                    <X size={24} strokeWidth={3} />
                </button>

                {/* Header Graphic */}
                <div
                    className="h-64 relative overflow-hidden border-b-4 border-foreground flex-shrink-0"
                    style={{ backgroundColor: localProject.color }}
                >
                    <Cpu className="text-foreground/20 w-48 h-48 absolute -right-10 -bottom-10 transform rotate-12" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAiLz4KPHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-50 pixelated"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/50 to-transparent mix-blend-multiply" />

                    <span className="absolute top-6 left-6 px-4 py-2 text-sm font-pixel uppercase bg-card text-foreground border-4 border-foreground shadow-[4px_4px_0_0_rgba(40,32,16,1)] flex items-center gap-2 z-10">
                        <Tag size={16} strokeWidth={3} />
                        {localProject.category}
                    </span>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex-grow flex flex-col gap-8">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-pixel uppercase text-foreground leading-tight mb-6">
                            {localProject.title}
                        </h1>
                        <p className="text-lg md:text-xl font-medium text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {localProject.description}
                        </p>
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex flex-wrap items-center gap-6 pt-8 border-t-4 border-foreground border-dashed mt-auto">
                        <button
                            onClick={onLike}
                            className="flex-1 min-w-[140px] h-16 flex items-center justify-center gap-3 bg-card px-6 border-4 border-foreground shadow-[4px_4px_0_0_rgba(40,32,16,1)] hover:shadow-[6px_6px_0_0_rgba(40,32,16,1)] hover:-translate-y-1 transition-all text-foreground font-pixel uppercase group"
                        >
                            <Heart size={20} className="text-primary group-hover:scale-125 transition-transform" strokeWidth={3} fill={localProject.likes > 0 ? "currentColor" : "transparent"} />
                            <span>{localProject.likes} Likes</span>
                        </button>

                        {(localProject.link && localProject.link !== "#") ? (
                            <a
                                href={localProject.link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 min-w-[140px] h-16 flex items-center justify-center gap-3 bg-primary text-foreground px-6 border-4 border-foreground shadow-[4px_4px_0_0_rgba(40,32,16,1)] hover:shadow-[6px_6px_0_0_rgba(40,32,16,1)] hover:-translate-y-1 transition-all font-pixel uppercase"
                            >
                                <ExternalLink size={20} strokeWidth={3} />
                                View Project
                            </a>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
