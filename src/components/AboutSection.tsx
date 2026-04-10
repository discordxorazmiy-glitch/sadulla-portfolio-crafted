import { useLanguage } from "@/i18n/LanguageContext";
import { MapPin, Calendar, Code2 } from "lucide-react";

const AboutSection = () => {
  const { t } = useLanguage();

  const info = [
    { icon: Calendar, label: t.about.age, value: "17" },
    { icon: MapPin, label: t.about.location, value: t.about.locationValue },
    { icon: Code2, label: t.about.focus, value: t.about.focusValue },
  ];

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">{t.about.title}</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {info.map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass rounded-xl p-6 text-center hover:glow-blue transition-all duration-300 hover:scale-105">
              <Icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">{label}</p>
              <p className="font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </div>
        <div className="max-w-2xl mx-auto space-y-4 text-muted-foreground leading-relaxed text-center">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
