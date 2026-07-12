import { useState, useEffect, useRef } from "react";
import {
  Monitor,
  Printer,
  Wrench,
  ShoppingBag,
  Award,
  BookOpen,
  BarChart2,
  Cpu,
  Menu,
  X,
  CheckCircle,
  ChevronRight,
  Layers,
  Zap,
  Shield,
  Users,
  Camera,
  Battery,
  Wifi,
  Cable,
  Headphones,
  Watch,
  Power,
  HardDrive,
  Lock,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import preciousPhoto from "@/imports/WhatsApp_Image_2026-06-16_at_14.23.30.jpeg";

/* ─── Floating Particles ─────────────────────────────────────── */
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  size: 2 + (i * 7 % 5),           // 2–6 px
  x: (i * 37 + 11) % 100,          // deterministic spread across 0–100%
  delay: (i * 0.47) % 9,           // 0–9 s stagger
  duration: 12 + (i * 3.1) % 14,   // 12–26 s float cycle
  opacity: 0.06 + (i % 5) * 0.03,  // 0.06–0.18
  drift: ((i % 3) - 1) * 28,       // horizontal drift: -28, 0, +28 px
}));

function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <style>{`
        @keyframes float-up {
          0%   { transform: translateY(0)   translateX(0)    scale(1);   opacity: var(--p-op); }
          40%  { transform: translateY(-40%) translateX(var(--p-drift)) scale(1.15); opacity: calc(var(--p-op) * 1.6); }
          100% { transform: translateY(-100vh) translateX(calc(var(--p-drift) * 1.5)) scale(0.8); opacity: 0; }
        }
      `}</style>
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 rounded-full bg-[#6A1B2A]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            "--p-op": p.opacity,
            "--p-drift": `${p.drift}px`,
            opacity: p.opacity,
            animation: `float-up ${p.duration}s ${p.delay}s ease-in-out infinite`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ─── Utility ────────────────────────────────────────────────── */
function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ─── Scroll-reveal hook ─────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={cn(className)} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.72s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.72s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Constants ──────────────────────────────────────────────── */
const NAV_LINKS = ["Home", "About", "Services", "Products", "Clients", "Contact"];

const QUALIFICATIONS = [
  { icon: Cpu, title: "Certificate in IT", subtitle: "Information Technology" },
  { icon: BarChart2, title: "Certificate in Accounting", subtitle: "QuickBooks" },
  { icon: BookOpen, title: "Certificate in Graphic Design", subtitle: "Visual Communication" },
];

const SKILLS = [
  { icon: Monitor, label: "Installation of machines and printers" },
  { icon: Wrench, label: "Service & maintenance of laptops" },
  { icon: Layers, label: "Software programming" },
  { icon: Monitor, label: "Microsoft Word" },
  { icon: BarChart2, label: "Microsoft Excel" },
  { icon: Monitor, label: "Microsoft PowerPoint" },
  { icon: Cpu, label: "Microsoft Access" },
];

const PRODUCT_CATEGORIES = [
  {
    icon: Monitor,
    title: "Computers",
    items: ["Laptops", "Desktop Computers"],
  },
  {
    icon: Printer,
    title: "Printing Solutions",
    items: ["Printers", "Toners", "Epson Inks", "Printer Cables"],
  },
  {
    icon: Camera,
    title: "Security Solutions",
    items: ["CCTV Cameras", "CCTV Installation"],
  },
  {
    icon: Power,
    title: "Power Solutions",
    items: ["UPS Backup Systems", "Power Banks"],
  },
  {
    icon: HardDrive,
    title: "Computer Components",
    items: ["Computer Monitors", "Laptop Batteries", "Laptop Chargers"],
  },
  {
    icon: Wifi,
    title: "Accessories & Connectivity",
    items: ["Keyboards", "Computer Mouse", "Mouse Pads", "Headphones", "Smart Watches", "HDMI Cables", "VGA Cables", "Patch Cables"],
  },
];

const CLIENTS = [
  { name: "Bahari Beach, Mombasa", category: "Hospitality" },
  { name: "Mombasa Sports Club", category: "Recreation" },
  { name: "James Finlays, Mombasa", category: "Corporate" },
  { name: "Angeli Tea Brokers, Mombasa", category: "Trade" },
  { name: "Galana Teachers College", category: "Education" },
  { name: "Technical University of Mombasa", category: "University" },
  { name: "Matt X Ray Hospital, Mombasa", category: "Healthcare" },
  { name: "Queenstar Technologies, Mombasa", category: "Technology" },
];

const WHY_POINTS = [
  { icon: Award, text: "Qualified in IT, Accounting (QuickBooks), and Graphic Design" },
  { icon: Zap, text: "Active Technician & Sales Representative at Josmer Computers" },
  { icon: Users, text: "Trusted by organizations across Mombasa — hospitality, education, healthcare" },
  { icon: ShoppingBag, text: "Full-service computer equipment and accessories supplier" },
  { icon: Wrench, text: "Professional installation and maintenance for all equipment" },
  { icon: Shield, text: "Reliable post-sale support and ongoing technical assistance" },
];

/* ─── Social icons (custom SVG paths) ───────────────────────── */
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.77a4.85 4.85 0 0 1-1-.08z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    <path d="M2 6l10 7 10-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Navigation ─────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
        scrolled ? "bg-white/97 backdrop-blur-md shadow-sm border-b border-[#efefef]" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[68px]">
          <button className="flex items-center gap-3" onClick={() => scrollTo("home")}>
            <div className="w-9 h-9 rounded-xl bg-[#6A1B2A] flex items-center justify-center shadow-md shadow-[#6A1B2A]/25">
              <span className="text-white font-black text-[13px] tracking-tight">PK</span>
            </div>
            <div className="text-left">
              <div className="text-[14px] font-bold text-[#1a1a1a] leading-tight tracking-[-0.01em]">Precious Koi</div>
              <div className="text-[10px] text-[#999999] leading-tight uppercase tracking-[0.1em]">IT Technician</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => scrollTo(link)}
                className="text-[13px] font-semibold text-[#555555] hover:text-[#6A1B2A] transition-colors duration-200 relative group tracking-[-0.01em]">
                {link}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#6A1B2A] group-hover:w-full transition-all duration-300 rounded-full" />
              </button>
            ))}
            <button onClick={() => scrollTo("contact")}
              className="ml-2 px-5 py-2.5 bg-[#6A1B2A] text-white text-[13px] font-bold rounded-xl hover:bg-[#521420] transition-all duration-200 shadow-md shadow-[#6A1B2A]/20 tracking-[-0.01em]">
              Get in Touch
            </button>
          </nav>

          <button className="md:hidden p-2 rounded-xl hover:bg-[#f5f5f5] transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} className="text-[#222222]" /> : <Menu size={22} className="text-[#222222]" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={cn("fixed inset-0 z-40 md:hidden transition-all duration-300", menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className={cn("absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-350", menuOpen ? "translate-x-0" : "translate-x-full")}
          style={{ transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)" }}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0f0f0]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#6A1B2A] flex items-center justify-center">
                <span className="text-white font-black text-[12px]">PK</span>
              </div>
              <span className="font-bold text-[#1a1a1a] text-[14px] tracking-tight">Precious Koi</span>
            </div>
            <button onClick={() => setMenuOpen(false)} className="p-1.5 rounded-xl hover:bg-[#f5f5f5]">
              <X size={20} className="text-[#666666]" />
            </button>
          </div>
          <nav className="flex flex-col gap-0.5 p-4 flex-1">
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => scrollTo(link)}
                className="text-left px-4 py-3 rounded-xl text-[#333333] font-semibold text-[14px] hover:bg-[#f7f2f3] hover:text-[#6A1B2A] transition-colors tracking-[-0.01em]">
                {link}
              </button>
            ))}
          </nav>
          <div className="p-6 border-t border-[#f0f0f0]">
            <button onClick={() => scrollTo("contact")}
              className="w-full py-3.5 bg-[#6A1B2A] text-white font-bold rounded-xl hover:bg-[#521420] transition-colors text-[14px]">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-white overflow-hidden">
      <FloatingParticles />
      {/* Decorative burgundy elements */}
      <div className="absolute right-0 top-0 pointer-events-none" style={{ width: "55vw", height: "100%", background: "radial-gradient(ellipse 65% 75% at 82% 38%, rgba(106,27,42,0.07) 0%, transparent 68%)" }} />
      <div className="absolute right-0 bottom-0 pointer-events-none" style={{ width: "40vw", height: "60%", background: "radial-gradient(ellipse 50% 60% at 90% 80%, rgba(139,35,50,0.055) 0%, transparent 65%)" }} />
      <svg className="absolute top-16 right-8 pointer-events-none opacity-20" width="280" height="280" viewBox="0 0 280 280" fill="none">
        <path d="M260 18 Q280 140 190 260" stroke="#6A1B2A" strokeWidth="1.5" fill="none" strokeDasharray="7 9" />
        <path d="M238 8 Q272 148 170 268" stroke="#6A1B2A" strokeWidth="0.8" fill="none" opacity="0.5" />
      </svg>
      <div className="absolute pointer-events-none" style={{ right: "calc(42% - 10px)", top: "22%", width: 10, height: 10, background: "#6A1B2A", opacity: 0.16, transform: "rotate(45deg)", borderRadius: 2 }} />
      <div className="absolute pointer-events-none" style={{ right: "13%", top: "13%", opacity: 0.11 }}>
        {[0, 1, 2].map(row => [0, 1, 2, 3].map(col => (
          <div key={`${row}-${col}`} style={{ position: "absolute", width: 3.5, height: 3.5, borderRadius: "50%", background: "#6A1B2A", top: row * 17, left: col * 17 }} />
        )))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-10">
        <div className="flex items-center min-h-screen">
          {/* Text */}
          <div className="w-full md:w-[54%] lg:w-[50%] py-32 lg:py-0 flex flex-col justify-center">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#f7f2f3] rounded-full text-[#6A1B2A] text-[11px] font-bold uppercase tracking-[0.08em] mb-8 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6A1B2A]" />
                IT Technician &amp; Sales Representative
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-[52px] sm:text-[60px] lg:text-[68px] font-extrabold text-[#111111] leading-[1.06] tracking-[-0.03em] mb-6">
                Hi, I&apos;m{" "}
                <span className="text-[#6A1B2A]">Precious</span>
                <br />Koi
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-[17px] text-[#5a5a5a] leading-[1.7] mb-4 max-w-[420px] font-normal tracking-[-0.01em]">
                Reliable technology solutions for businesses, schools, hospitals, and organizations across Mombasa.
              </p>
            </Reveal>
            <Reveal delay={195}>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-[3px] h-9 rounded-full bg-[#6A1B2A]" />
                <div>
                  <p className="text-[13px] font-bold text-[#1a1a1a] leading-tight tracking-[-0.01em]">Technician &amp; Sales Representative</p>
                  <p className="text-[12px] text-[#999999] leading-tight mt-0.5">Josmer Computers, Mombasa</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-7 py-3.5 bg-[#6A1B2A] text-white font-bold rounded-xl hover:bg-[#521420] transition-all duration-200 shadow-lg shadow-[#6A1B2A]/22 flex items-center gap-2 text-[14px] tracking-[-0.01em]">
                  Get in Touch <ChevronRight size={14} />
                </button>
                <button onClick={() => document.getElementById("clients")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-7 py-3.5 border-[1.5px] border-[#e4e4e4] text-[#333333] font-bold rounded-xl hover:border-[#6A1B2A] hover:text-[#6A1B2A] transition-all duration-200 text-[14px] tracking-[-0.01em]">
                  View Clients
                </button>
              </div>
            </Reveal>
          </div>

          {/* Portrait */}
          <div className="hidden md:block absolute right-0 top-0 bottom-0 pointer-events-none select-none" style={{ width: "47%", maxWidth: 560 }}>
            <div className="relative w-full h-full flex items-end justify-center">
              <ImageWithFallback
                src={preciousPhoto}
                alt="Precious Koi — IT Technician & Sales Representative"
                className="h-[92vh] max-h-[860px] w-auto object-cover object-top"
                style={{
                  maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 92%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 92%)",
                  filter: "drop-shadow(0 20px 40px rgba(106,27,42,0.06))",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── About ──────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="py-32 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          <Reveal>
            <div className="relative">
              <div className="aspect-[3/4] max-w-[380px] mx-auto rounded-[28px] overflow-hidden bg-[#f0e8ea] shadow-2xl shadow-[#6A1B2A]/18">
                <ImageWithFallback
                  src={preciousPhoto}
                  alt="Precious Koi — IT Technician & Sales Representative"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -top-5 -right-5 w-24 h-24 rounded-2xl bg-[#6A1B2A]/8 -z-10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-[#6A1B2A]/12 -z-10" />
            </div>
          </Reveal>

          <div>
            <Reveal delay={60}>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6A1B2A] mb-4">About Me</p>
              <h2 className="text-[40px] lg:text-[46px] font-extrabold text-[#111111] leading-[1.1] tracking-[-0.025em] mb-5">
                Precious Koi
              </h2>
              <p className="text-[16px] text-[#5a5a5a] leading-[1.75] mb-10 font-normal max-w-lg tracking-[-0.005em]">
                A multi-disciplinary IT professional with formal training in information technology, accounting, and graphic design — currently serving as Technician &amp; Sales Representative at Josmer Computers, Mombasa.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-3 mb-10">
                {[
                  { label: "Current Role", value: "Technician & Sales Representative — Josmer Computers" },
                  { label: "Certification", value: "Certificate in Information Technology" },
                  { label: "Certification", value: "Certificate in Accounting (QuickBooks)" },
                  { label: "Certification", value: "Certificate in Graphic Design" },
                  { label: "Location", value: "Mombasa, Kenya" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-[#f0f0f0] hover:border-[#6A1B2A]/18 transition-colors">
                    <CheckCircle size={17} className="text-[#6A1B2A] mt-[3px] shrink-0" />
                    <div>
                      <span className="text-[10px] font-black text-[#6A1B2A] uppercase tracking-[0.09em]">{item.label}</span>
                      <p className="text-[13.5px] text-[#1a1a1a] font-semibold mt-0.5 tracking-[-0.01em]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={190}>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3.5 bg-[#6A1B2A] text-white font-bold rounded-xl hover:bg-[#521420] transition-colors flex items-center gap-2 shadow-lg shadow-[#6A1B2A]/18 text-[14px] tracking-[-0.01em]">
                Start a Conversation <ChevronRight size={14} />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Qualifications ─────────────────────────────────────────── */
function Qualifications() {
  return (
    <section id="services" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-18">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6A1B2A] mb-4">Education</p>
          <h2 className="text-[40px] lg:text-[46px] font-extrabold text-[#111111] tracking-[-0.025em] leading-tight">My Qualifications</h2>
          <p className="text-[16px] text-[#777777] mt-5 max-w-md mx-auto font-normal leading-[1.7] tracking-[-0.005em]">Formally trained across three professional disciplines.</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {QUALIFICATIONS.map(({ icon: Icon, title, subtitle }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="group p-9 rounded-[24px] border border-[#f0f0f0] bg-white hover:border-[#6A1B2A]/25 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#6A1B2A]/8 transition-all duration-350 cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-[#6A1B2A]/7 flex items-center justify-center mb-7 group-hover:bg-[#6A1B2A] transition-colors duration-300">
                  <Icon size={23} className="text-[#6A1B2A] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-[18px] font-bold text-[#111111] mb-1.5 tracking-[-0.02em]">{title}</h3>
                <p className="text-[13px] text-[#888888] tracking-[-0.005em]">{subtitle}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Technical Skills ───────────────────────────────────────── */
function TechnicalSkills() {
  return (
    <section className="py-32 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6A1B2A] mb-4">Expertise</p>
          <h2 className="text-[40px] lg:text-[46px] font-extrabold text-[#111111] tracking-[-0.025em] leading-tight">My Technical Skills</h2>
          <p className="text-[16px] text-[#777777] mt-5 max-w-md mx-auto font-normal leading-[1.7] tracking-[-0.005em]">Hands-on expertise across hardware, software, and productivity tools.</p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SKILLS.map(({ icon: Icon, label }, i) => (
            <Reveal key={label} delay={i * 45}>
              <div className="group p-5 rounded-2xl border border-[#f0f0f0] bg-white hover:border-[#6A1B2A]/22 hover:shadow-lg hover:shadow-[#6A1B2A]/6 hover:-translate-y-0.5 transition-all duration-200 cursor-default flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#6A1B2A]/7 flex items-center justify-center shrink-0 group-hover:bg-[#6A1B2A]/14 transition-colors mt-0.5">
                  <Icon size={16} className="text-[#6A1B2A]" />
                </div>
                <span className="text-[13.5px] font-semibold text-[#2a2a2a] leading-snug tracking-[-0.01em] mt-1.5">{label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose Me ──────────────────────────────────────────── */
function WhyChooseMe() {
  return (
    <section className="py-32 bg-[#6A1B2A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      <FloatingParticles />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <Reveal className="text-center mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/45 mb-4">Why Partner With Me</p>
          <h2 className="text-[40px] lg:text-[46px] font-extrabold text-white tracking-[-0.025em] leading-tight">Why Choose Me</h2>
          <p className="text-[16px] text-white/55 mt-5 max-w-md mx-auto font-normal leading-[1.7] tracking-[-0.005em]">Every reason grounded in verified experience.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHY_POINTS.map(({ icon: Icon, text }, i) => (
            <Reveal key={i} delay={i * 55}>
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/7 border border-white/10 hover:bg-white/11 transition-colors duration-200">
                <div className="w-10 h-10 rounded-xl bg-white/14 flex items-center justify-center shrink-0">
                  <Icon size={17} className="text-white" />
                </div>
                <p className="text-white/82 text-[14px] leading-[1.65] font-medium pt-1.5 tracking-[-0.005em]">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Products & Solutions ───────────────────────────────────── */
function Products() {
  return (
    <section id="products" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6A1B2A] mb-4">What I Offer</p>
          <h2 className="text-[40px] lg:text-[46px] font-extrabold text-[#111111] tracking-[-0.025em] leading-tight">Products &amp; Solutions</h2>
          <p className="text-[16px] text-[#777777] mt-5 max-w-lg mx-auto font-normal leading-[1.7] tracking-[-0.005em]">
            Comprehensive technology solutions for organizations — from hardware supply to full installation and support.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCT_CATEGORIES.map(({ icon: Icon, title, items }, i) => (
            <Reveal key={title} delay={i * 65}>
              <div className="group h-full p-8 rounded-[24px] border border-[#f0f0f0] bg-white hover:border-[#6A1B2A]/25 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#6A1B2A]/8 transition-all duration-350 cursor-default flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#6A1B2A] flex items-center justify-center shrink-0 shadow-md shadow-[#6A1B2A]/25 group-hover:scale-105 transition-transform duration-300">
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-[17px] font-bold text-[#111111] tracking-[-0.02em] leading-tight">{title}</h3>
                </div>
                {/* Divider */}
                <div className="w-full h-px bg-[#f0f0f0] mb-5 group-hover:bg-[#6A1B2A]/12 transition-colors duration-300" />
                {/* Items */}
                <ul className="space-y-2.5 flex-1">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6A1B2A]/40 shrink-0 group-hover:bg-[#6A1B2A] transition-colors duration-300" />
                      <span className="text-[13.5px] text-[#555555] font-medium tracking-[-0.005em]">{item}</span>
                    </li>
                  ))}
                </ul>
                {/* Bottom accent line */}
                <div className="mt-6 w-0 h-[2px] rounded-full bg-[#6A1B2A] group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Clients ────────────────────────────────────────────────── */
function Clients() {
  const categoryColor: Record<string, string> = {
    Hospitality: "#8B2332", Recreation: "#6A1B2A", Corporate: "#7a1e28",
    Trade: "#8B2332", Education: "#6A1B2A", University: "#7a1e28",
    Healthcare: "#8B2332", Technology: "#6A1B2A",
  };

  return (
    <section id="clients" className="py-32 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6A1B2A] mb-4">Trusted Partners</p>
          <h2 className="text-[40px] lg:text-[46px] font-extrabold text-[#111111] tracking-[-0.025em] leading-tight">Organizations I&apos;ve Worked With</h2>
        </Reveal>
        <Reveal delay={60}>
          <p className="text-[16px] text-[#777777] text-center max-w-xl mx-auto mb-14 font-normal leading-[1.75] tracking-[-0.005em]">
            From five-star hotels and leading hospitals to universities and corporate offices — organizations across Mombasa trust my IT expertise.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {CLIENTS.map(({ name, category }, i) => (
            <Reveal key={name} delay={i * 50}>
              <div className="group rounded-[20px] overflow-hidden border border-[#f0f0f0] bg-white hover:border-[#6A1B2A]/22 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6A1B2A]/8 transition-all duration-300 cursor-default">
                <div className="aspect-video flex items-center justify-center" style={{ background: categoryColor[category] || "#6A1B2A" }}>
                  <div className="text-center px-4">
                    <div className="w-10 h-10 rounded-xl bg-white/18 flex items-center justify-center mx-auto mb-2 group-hover:bg-white/26 transition-colors">
                      <Users size={17} className="text-white" />
                    </div>
                    <span className="text-[10px] text-white/65 uppercase tracking-[0.09em] font-bold">{category}</span>
                  </div>
                </div>
                <div className="px-4 py-3.5">
                  <p className="text-[13px] font-semibold text-[#1a1a1a] leading-snug tracking-[-0.01em]">{name}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Connect With Me ────────────────────────────────────────── */
function Connect() {
  const socials = [
    {
      label: "Instagram",
      handle: "@precious.koi",
      icon: InstagramIcon,
      href: "#",
      color: "#E1306C",
    },
    {
      label: "TikTok",
      handle: "@precious.koi",
      icon: TikTokIcon,
      href: "#",
      color: "#010101",
    },
    {
      label: "LinkedIn",
      handle: "Precious Koi",
      icon: LinkedInIcon,
      href: "#",
      color: "#0A66C2",
    },
    {
      label: "Gmail",
      handle: "preciouskim@gmail.com",
      icon: GmailIcon,
      href: "#",
      color: "#EA4335",
    },
  ];

  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6A1B2A] mb-4">Reach Out</p>
          <h2 className="text-[40px] lg:text-[52px] font-extrabold text-[#111111] tracking-[-0.03em] leading-[1.08] mb-5">
            Connect With Me
          </h2>
          <p className="text-[17px] text-[#666666] leading-[1.75] max-w-xl mx-auto font-normal tracking-[-0.01em] mb-16">
            Whether you&apos;re a school, hospital, hotel, or corporate office — I&apos;d love to hear from you. Reach out on any of the platforms below.
          </p>
        </Reveal>

        {/* Social cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {socials.map(({ label, handle, icon: Icon, href, color }, i) => (
            <Reveal key={label} delay={i * 70}>
              <a href={href} target="_blank" rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 p-8 rounded-[24px] border border-[#f0f0f0] bg-white hover:border-[#6A1B2A]/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#6A1B2A]/8 transition-all duration-350 cursor-pointer">
                {/* Icon circle */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-[#f0f0f0] group-hover:border-[#6A1B2A]/20 bg-[#fafafa] group-hover:bg-[#6A1B2A] transition-all duration-300 shadow-sm"
                  style={{ "--hover-color": color } as React.CSSProperties}>
                  <span className="text-[#555555] group-hover:text-white transition-colors duration-300">
                    <Icon />
                  </span>
                </div>
                {/* Label */}
                <div>
                  <p className="text-[15px] font-bold text-[#111111] tracking-[-0.02em] mb-1">{label}</p>
                  <p className="text-[12px] text-[#999999] font-medium tracking-[-0.005em] truncate max-w-[140px]">{handle}</p>
                </div>
                {/* Underline accent */}
                <div className="w-0 h-[2px] rounded-full bg-[#6A1B2A] group-hover:w-8 transition-all duration-400" />
              </a>
            </Reveal>
          ))}
        </div>

        {/* Closing note */}
        <Reveal delay={320}>
          <p className="mt-14 text-[14px] text-[#aaaaaa] font-medium tracking-[-0.005em]">
            Based in Mombasa, Kenya &nbsp;·&nbsp; Available for organizations across the region
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  const scrollTo = (id: string) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-[#300b12] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/12 flex items-center justify-center">
                <span className="text-white font-black text-[13px] tracking-tight">PK</span>
              </div>
              <div>
                <div className="text-[14px] font-bold leading-tight tracking-[-0.01em]">Precious Koi</div>
                <div className="text-[10px] text-white/38 leading-tight uppercase tracking-[0.09em]">IT Technician</div>
              </div>
            </div>
            <p className="text-[13px] text-white/45 leading-[1.75] max-w-[220px] tracking-[-0.005em]">
              Professional IT technician and equipment supplier serving organizations across Mombasa, Kenya.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.1em] text-white/35 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <button onClick={() => scrollTo(link)} className="text-[13px] text-white/55 hover:text-white transition-colors tracking-[-0.005em]">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.1em] text-white/35 mb-5">Services</h4>
            <ul className="space-y-3">
              {["Machine Installation", "Laptop Maintenance", "Printer Setup", "CCTV Installation", "Equipment Supply"].map((s) => (
                <li key={s}><span className="text-[13px] text-white/55 tracking-[-0.005em]">{s}</span></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.1em] text-white/35 mb-5">Products</h4>
            <ul className="space-y-3">
              {["Laptops", "Printers", "CCTV Cameras", "UPS Systems", "Accessories"].map((label) => (
                <li key={label}><span className="text-[13px] text-white/55 tracking-[-0.005em]">{label}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/30 tracking-[-0.005em]">© {new Date().getFullYear()} Precious Koi. All rights reserved.</p>
          <p className="text-[12px] text-white/30 tracking-[-0.005em]">Mombasa, Kenya</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ────────────────────────────────────────────────────── */
export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-white antialiased" style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
      <Navbar />
      <Hero />
      <About />
      <Qualifications />
      <TechnicalSkills />
      <WhyChooseMe />
      <Products />
      <Clients />
      <Connect />
      <Footer />
    </div>
  );
}
