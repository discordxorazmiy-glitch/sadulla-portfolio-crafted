import { useLanguage } from "@/i18n/LanguageContext";

const skills = [
  { name: "HTML", level: 95, color: "hsl(12, 77%, 52%)" },
  { name: "CSS", level: 90, color: "hsl(210, 77%, 52%)" },
  { name: "JavaScript", level: 85, color: "hsl(50, 90%, 50%)" },
  { name: "TypeScript", level: 75, color: "hsl(211, 60%, 48%)" },
  { name: "Tailwind CSS", level: 90, color: "hsl(198, 93%, 60%)" },
  { name: "Bootstrap", level: 80, color: "hsl(261, 51%, 51%)" },
  { name: "Git", level: 80, color: "hsl(10, 69%, 46%)" },
  { name: "GitHub", level: 85, color: "hsl(0, 0%, 60%)" },
];

const SkillsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">{t.skills.title}</h2>
          <p className="text-muted-foreground">{t.skills.subtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {skills.map((skill, i) => (
            <div key={skill.name}
              className="glass rounded-xl p-5 hover:scale-105 transition-all duration-300 group"
              style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-foreground text-sm">{skill.name}</span>
                <span className="text-xs text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out group-hover:shadow-[0_0_8px_var(--glow)]"
                  style={{
                    width: `${skill.level}%`,
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
                    ["--glow" as string]: skill.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
