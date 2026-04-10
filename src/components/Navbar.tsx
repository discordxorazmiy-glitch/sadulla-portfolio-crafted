import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Language } from "@/i18n/translations";
import { Menu, X, Globe } from "lucide-react";

const langLabels: Record<Language, string> = { en: "EN", ru: "RU", uz: "UZ" };

const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
    { href: "#projects", label: t.nav.projects },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold gradient-text">SR</a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}

          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Globe className="w-4 h-4" />
              {langLabels[language]}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-8 glass rounded-lg p-1 min-w-[80px]">
                {(Object.keys(langLabels) as Language[]).map((l) => (
                  <button key={l} onClick={() => { setLanguage(l); setLangOpen(false); }}
                    className={`block w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${l === language ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                    {langLabels[l]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border/50 px-4 pb-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            {(Object.keys(langLabels) as Language[]).map((l) => (
              <button key={l} onClick={() => { setLanguage(l); setOpen(false); }}
                className={`px-3 py-1 text-xs rounded-md border transition-colors ${l === language ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>
                {langLabels[l]}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
