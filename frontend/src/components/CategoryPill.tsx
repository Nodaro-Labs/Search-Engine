import { LucideIcon } from "lucide-react";

interface CategoryPillProps {
  icon: LucideIcon;
  label: string;
  count: number;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryPill = ({
  icon: Icon,
  label,
  count,
  isActive = false,
  onClick,
}: CategoryPillProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-6 py-3 border-2 border-foreground transition-all duration-200 ${isActive
          ? "bg-primary text-foreground shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.2)] translate-y-1"
          : "bg-card text-foreground shadow-[2px_4px_0_0_rgba(40,32,16,1)] hover:-translate-y-1 hover:shadow-[4px_6px_0_0_rgba(40,32,16,1)]"
        }`}
    >
      <Icon size={20} strokeWidth={3} className={isActive ? "text-foreground" : "text-primary"} />
      <span className="font-pixel text-xs uppercase tracking-wide">{label}</span>
      <span
        className={`ml-2 px-2 py-1 text-xs font-bold border-2 border-foreground ${isActive
            ? "bg-foreground text-primary"
            : "bg-secondary text-foreground"
          }`}
      >
        {count}
      </span>
    </button>
  );
};

export default CategoryPill;
