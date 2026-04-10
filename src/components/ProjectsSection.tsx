import { useLanguage } from "@/i18n/LanguageContext";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Dashboard",
    description: "A modern dashboard for managing online store products, orders, and analytics with real-time data.",
    techs: ["TypeScript", "Tailwind CSS", "React"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    demo: "#",
    github: "#",
  },
  {
    title: "Weather Application",
    description: "Beautiful weather app with location-based forecasts, animated weather icons, and 7-day predictions.",
    techs: ["JavaScript", "CSS", "API"],
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
    demo: "#",
    github: "#",
  },
  {
    title: "Task Management App",
    description: "A productivity tool with drag-and-drop kanban boards, due dates, and team collaboration features.",
    techs: ["TypeScript", "Tailwind CSS", "React"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    demo: "#",
    github: "#",
  },
];

const ProjectsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">{t.projects.title}</h2>
          <p className="text-muted-foreground">{t.projects.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <div key={project.title}
              className="glass rounded-2xl overflow-hidden group hover:glow-purple transition-all duration-500 hover:scale-[1.02]">
              <div className="relative overflow-hidden h-48">
                <img src={project.image} alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <span key={tech} className="px-2.5 py-0.5 text-xs rounded-full bg-muted text-primary font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <a href={project.demo}
                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-accent transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" /> {t.projects.liveDemo}
                  </a>
                  <a href={project.github}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="w-3.5 h-3.5" /> {t.projects.github}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
