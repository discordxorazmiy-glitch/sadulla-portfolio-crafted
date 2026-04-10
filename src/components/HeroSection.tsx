import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowDown, Code2, Terminal } from "lucide-react";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6" style={{ animation: "slide-up 0.8s ease-out forwards" }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for freelance
            </div>
            <div>
              <p className="text-muted-foreground text-lg mb-2">{t.hero.greeting}</p>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="gradient-text">{t.hero.name}</span>
              </h1>
              <p className="text-xl md:text-2xl text-primary font-mono mt-2">&lt; {t.hero.role} /&gt;</p>
            </div>
            <p className="text-muted-foreground max-w-lg leading-relaxed">{t.hero.description}</p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105"
                style={{ background: "var(--gradient-primary)", color: "hsl(var(--primary-foreground))" }}>
                {t.hero.viewProjects}
              </a>
              <a href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm border border-border text-foreground hover:border-primary/50 transition-all duration-300 hover:scale-105">
                {t.hero.contactMe}
              </a>
            </div>
          </div>

          {/* Code visual */}
          <div className="hidden lg:block" style={{ animation: "slide-up 1s ease-out forwards" }}>
            <div className="glass rounded-2xl p-6 animate-float glow-blue">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">portfolio.tsx</span>
              </div>
              <pre className="text-sm font-mono leading-relaxed">
                <code>
                  <span className="text-secondary">const</span>{" "}
                  <span className="text-accent">developer</span>{" "}
                  <span className="text-muted-foreground">=</span> {"{"}
                  {"\n"}  <span className="text-primary">name</span>: <span className="text-green-400">"Sadulla"</span>,
                  {"\n"}  <span className="text-primary">age</span>: <span className="text-accent">17</span>,
                  {"\n"}  <span className="text-primary">role</span>: <span className="text-green-400">"Frontend Dev"</span>,
                  {"\n"}  <span className="text-primary">passion</span>: <span className="text-green-400">"∞"</span>,
                  {"\n"}{"}"};
                </code>
              </pre>
              <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                <Terminal className="w-3.5 h-3.5" />
                <span className="font-mono">ready to build amazing things...</span>
                <span className="animate-pulse">▊</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
