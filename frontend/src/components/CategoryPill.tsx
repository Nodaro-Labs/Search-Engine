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
      className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-200 ${
        isActive
          ? "bg-primary text-primary-foreground shadow-soft"
          : "bg-secondary text-secondary-foreground hover:bg-accent"
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
      <span
        className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
          isActive
            ? "bg-primary-foreground/20 text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {count}
      </span>
    </button>
  );
};

export default CategoryPill;
