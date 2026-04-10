import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Send } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const { t } = useLanguage();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent successfully!");
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">{t.contact.title}</h2>
          <p className="text-muted-foreground">{t.contact.subtitle}</p>
        </div>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
          <input required type="text" placeholder={t.contact.name}
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
          <input required type="email" placeholder={t.contact.email}
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
          <textarea required rows={5} placeholder={t.contact.message}
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
          <button type="submit" disabled={sending}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
            style={{ background: "var(--gradient-primary)", color: "hsl(var(--primary-foreground))" }}>
            <Send className="w-4 h-4" />
            {sending ? t.contact.sending : t.contact.send}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
