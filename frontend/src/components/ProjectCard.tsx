import { ExternalLink, Heart, Tag, Cpu } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  likes: number;
  color: string;
  onLike?: () => void;
  onView?: () => void;
}

const ProjectCard = ({
  title,
  description,
  category,
  likes,
  color,
  onLike,
  onView,
}: ProjectCardProps) => {
  return (
    <div className="group bg-card overflow-hidden border-4 border-foreground shadow-[4px_4px_0_0_rgba(40,32,16,1)] hover:shadow-[8px_8px_0_0_rgba(40,32,16,1)] transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1">
      {/* Color overlay and decoration */}
      <div
        className="h-48 relative overflow-hidden border-b-4 border-foreground flex items-center justify-center relative"
        style={{ backgroundColor: color }}
      >
        <Cpu className="text-foreground/20 w-32 h-32 absolute -right-8 -bottom-8 transform rotate-12 group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAiLz4KPHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-50 pixelated"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent mix-blend-multiply" />
        <span className="absolute top-3 left-3 px-3 py-1.5 text-xs font-pixel uppercase bg-card text-foreground border-2 border-foreground flex items-center gap-2 shadow-[2px_2px_0_0_rgba(40,32,16,1)] z-10">
          <Tag size={12} strokeWidth={3} />
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (onView) onView();
          }}
          className="text-xl font-bold uppercase text-foreground hover:text-primary hover:underline transition-colors text-left"
        >
          {title}
        </button>
        <p className="mt-3 text-sm font-medium text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between mt-6 pt-5 border-t-4 border-foreground border-dashed text-foreground font-pixel text-xs">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (onLike) onLike();
            }}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group/like"
          >
            <Heart size={16} className="text-primary group-hover/like:scale-125 transition-transform" strokeWidth={3} fill={likes > 0 ? "currentColor" : "transparent"} />
            <span>{likes}</span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (onView) onView();
            }}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors uppercase"
          >
            View
            <ExternalLink size={16} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
