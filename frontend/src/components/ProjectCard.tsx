import { ExternalLink, Heart, Tag } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  likes: number;
  image: string;
  color: string;
}

const ProjectCard = ({
  title,
  description,
  category,
  likes,
  image,
  color,
}: ProjectCardProps) => {
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
      {/* Image with color overlay */}
      <div
        className="h-40 relative overflow-hidden"
        style={{ backgroundColor: color }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-card/90 text-foreground rounded-full flex items-center gap-1.5">
          <Tag size={12} />
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Heart size={16} className="text-primary/70" />
            <span className="text-sm">{likes}</span>
          </div>
          <button className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            View Project
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
