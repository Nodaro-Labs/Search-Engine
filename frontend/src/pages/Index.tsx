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
} from "lucide-react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CategoryPill from "@/components/CategoryPill";
import ProjectCard from "@/components/ProjectCard";
import FloatingShapes from "@/components/FloatingShapes";

const categories = [
  { icon: Cpu, label: "Electronics", count: 2847 },
  { icon: Printer, label: "3D Printing", count: 1523 },
  { icon: Bot, label: "Robotics", count: 892 },
  { icon: Wifi, label: "IoT", count: 1234 },
  { icon: Lightbulb, label: "LED Projects", count: 567 },
  { icon: Wrench, label: "Tools", count: 743 },
];

const featuredProjects = [
  {
    title: "Smart Home Weather Station",
    description:
      "Build your own IoT weather station with ESP32, featuring real-time monitoring and beautiful dashboard.",
    category: "IoT",
    likes: 342,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    color: "hsl(200 85% 55%)",
  },
  {
    title: "Mini CNC Plotter Machine",
    description:
      "A compact CNC plotter built from scratch using stepper motors and Arduino for precise drawings.",
    category: "Robotics",
    likes: 287,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    color: "hsl(25 95% 55%)",
  },
  {
    title: "Mechanical Keyboard Build",
    description:
      "Custom 65% mechanical keyboard with hot-swappable switches and RGB underglow lighting.",
    category: "Electronics",
    likes: 521,
    image:
      "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=400&h=300&fit=crop",
    color: "hsl(280 70% 60%)",
  },
  {
    title: "3D Printed Drone Frame",
    description:
      "Lightweight racing drone frame designed for FPV enthusiasts, optimized for strength and durability.",
    category: "3D Printing",
    likes: 198,
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop",
    color: "hsl(140 70% 45%)",
  },
  {
    title: "Voice Controlled LED Matrix",
    description:
      "Interactive LED display that responds to voice commands using Raspberry Pi and Google Assistant.",
    category: "LED Projects",
    likes: 156,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
    color: "hsl(45 95% 55%)",
  },
  {
    title: "Open Source Oscilloscope",
    description:
      "Build a fully functional digital oscilloscope with STM32 microcontroller and TFT display.",
    category: "Tools",
    likes: 423,
    image:
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
    color: "hsl(0 85% 60%)",
  },
];

const stats = [
  { icon: FolderOpen, value: "12,000+", label: "Projects" },
  { icon: Users, value: "45,000+", label: "Makers" },
  { icon: Zap, value: "500+", label: "Daily Searches" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <FloatingShapes />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          {/* Rainbow accent bar */}
          <div className="w-24 h-1 mx-auto mb-8 rounded-full rainbow-border" />

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-foreground max-w-4xl mx-auto leading-tight">
            Discover Your Next
            <span className="block mt-2">
              <span className="rainbow-text">Hardware</span> Project
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Search through thousands of open-source hardware projects,
            components, and tutorials from makers around the world.
          </p>

          {/* Search Bar */}
          <div className="mt-10 md:mt-12">
            <SearchBar />
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 md:mt-16">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <stat.icon size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            Browse by Category
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, index) => (
              <CategoryPill
                key={cat.label}
                icon={cat.icon}
                label={cat.label}
                count={cat.count}
                isActive={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-12 md:py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Featured Projects
              </h2>
              <p className="mt-2 text-muted-foreground">
                Handpicked projects from the community
              </p>
            </div>
            <button className="text-primary font-medium hover:underline hidden md:block">
              View all projects →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <button className="text-primary font-medium hover:underline">
              View all projects →
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl p-[2px] rainbow-border">
            <div className="bg-card rounded-[14px] p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground">
                Have a project to share?
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Join our community of makers and share your hardware projects
                with thousands of enthusiasts worldwide.
              </p>
              <button className="mt-8 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-soft hover:shadow-elevated transition-all duration-200 hover:-translate-y-0.5">
                Submit Your Project
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Cpu className="text-primary-foreground" size={16} />
              </div>
              <span className="font-bold text-foreground">
                Hard<span className="text-primary">Search</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 HardSearch. Made with ♥
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
