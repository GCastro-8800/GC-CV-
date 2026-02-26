
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ArrowUpRight, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Clock, 
  MapPin, 
  CloudSun,
  Layout,
  Music,
  Camera,
  Layers,
  Search,
  CheckCircle2,
  Globe,
  Rocket,
  Zap,
  BarChart3,
  Baby,
  Droplets,
  Package,
  ShoppingCart,
  Instagram
} from 'lucide-react';
import { Experience, Testimonial, Venture } from './types';

// Components
const SectionHeader: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
  <div className="mb-8">
    <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">{title}</h2>
    {description && <p className="text-neutral-400 text-lg leading-relaxed">{description}</p>}
  </div>
);

/**
 * Bebloo Logo Component
 * High-fidelity SVG reconstruction of the provided branding.
 * Used for small icons and brand identity.
 */
const BeblooLogo: React.FC<{ className?: string; hideText?: boolean }> = ({ className = "w-12 h-12", hideText = false }) => (
  <div className={`flex flex-col items-center justify-center ${className}`}>
    <svg viewBox="0 0 100 120" className="w-full h-auto drop-shadow-sm">
      {/* The "Drop" shape */}
      <path 
        d="M50 5C25 45 10 65 10 85C10 105 28 120 50 120C72 120 90 105 90 85C90 65 75 45 50 5Z" 
        fill="#5BC0EB" 
      />
      {/* The Baby Face */}
      <circle cx="50" cy="85" r="28" fill="white" />
      {/* Hair Curl */}
      <path d="M50 57C53 57 55 60 53 63C51 65 47 64 47 61C47 59 48.5 57 50 57Z" fill="#5BC0EB" />
      {/* Eyes */}
      <circle cx="42" cy="82" r="3" fill="#5BC0EB" />
      <circle cx="58" cy="82" r="3" fill="#5BC0EB" />
      {/* Smile */}
      <path d="M43 90C43 90 46 95 50 95C54 95 57 90 57 90" stroke="#5BC0EB" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Ears */}
      <circle cx="22" cy="85" r="5" fill="white" />
      <circle cx="78" cy="85" r="5" fill="white" />
    </svg>
    {!hideText && (
      <span className="text-[#3a8ab1] font-bold text-2xl mt-2 tracking-tight">Bebloo</span>
    )}
  </div>
);

const ExperienceItem: React.FC<{ item: Experience & { location?: string; isBebloo?: boolean; logoClassName?: string } }> = ({ item }) => (
  <div className="group relative flex flex-col md:flex-row gap-4 md:gap-12 py-8 border-b border-neutral-800 last:border-0 hover:bg-neutral-900/30 transition-colors p-4 -mx-4 rounded-xl">
    <div className="w-32 flex-shrink-0">
      <span className="mono text-xs text-neutral-500">{item.period}</span>
      {item.location && <div className="text-[10px] text-neutral-600 mt-1 uppercase tracking-tighter">{item.location}</div>}
    </div>
    <div className="flex-grow">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-medium">
          {item.role} <span className="text-neutral-500">at</span> 
        </h3>
        <div className="flex items-center gap-2">
          {item.isBebloo ? (
            <div className="w-8 h-8 flex items-center justify-center">
               <BeblooLogo className="w-6 h-6" hideText={true} />
            </div>
          ) : item.logoUrl ? (
            <img 
              src={item.logoUrl} 
              alt={item.company} 
              className={`rounded object-contain ${item.logoClassName || "w-6 h-6 bg-white p-0.5"}`} 
            />
          ) : (
             <div className="w-6 h-6 rounded bg-neutral-700 flex items-center justify-center text-[8px] font-bold">
               {item.company.charAt(0)}
             </div>
          )}
          <span className="text-lg font-medium">{item.company}</span>
        </div>
      </div>
      <p className="text-neutral-400 leading-relaxed max-w-2xl text-sm md:text-base">{item.description}</p>
    </div>
  </div>
);

const RevealOnScroll: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const { current } = domRef;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95 blur-sm'
      }`}
    >
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }));

  const copyEmail = useCallback(() => {
    const email = "gabrielalejandrocastromejia@gmail.com";
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'c' && !e.metaKey && !e.ctrlKey) {
        copyEmail();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [copyEmail]);

  const experiences: (Experience & { location: string; isBebloo?: boolean; logoClassName?: string })[] = [
    {
      period: "SEP 2025 — PRESENT",
      role: "Co-Founder",
      company: "Bebloo - IE Business School",
      location: "Madrid, Spain",
      logoUrl: "/bebloo.png",
      logoClassName: "w-10 h-10",
      description: "Co-founding a circular economy startup for the baby products market. Leading product development, user-centric validation, and operational strategy within the IE Venture Lab framework."
    },
    {
      period: "FEB 2024 — JAN 2026",
      role: "Assistant Manager",
      company: "Zelkro S.A.",
      location: "Guayaquil, Ecuador",
      logoUrl: "/zelkro.png",
      description: "Led digital transformation in pharmaceutical supply chains, increasing supplier engagement through targeted multi-channel digital campaigns and automated sales tracking."
    },
    {
      period: "OCT 2024 — OCT 2025",
      role: "Founder",
      company: "MeddiConnect",
      location: "Guayaquil, Ecuador",
      logoUrl: "/meddiconnect.png",
      logoClassName: "w-6 h-6",
      description: "Successfully built and validated a telehealth SaaS platform, managing the full product lifecycle from market research to MVP launch and healthcare provider pilot testing."
    },
    {
      period: "MAR 2024 — AUG 2024",
      role: "E-Commerce Consultant",
      company: "Loly's Brazilian Shoes",
      location: "Guayaquil, Ecuador",
      logoUrl: "/lolys.png",
      description: "Engineered a rapid Shopify deployment and customer acquisition strategy, resulting in a 30% increase in monthly online sales via optimized ad spend and CRM automation."
    },
    {
      period: "AUG 2022 — DEC 2022",
      role: "Sales Representative – Public Sector Contracts",
      company: "LUBRICANTES INTERNACIONALES S.A.",
      location: "Duran, Ecuador",
      logoUrl: "/lubrisa.png",
      description: "Closed $45K in B2B contracts with public and private institutions within four months. Analyzed competitor pricing analysis to inform bidding strategies and improve tender success rates. Standardized procurement communication channels, improving response time to client requests."
    }
  ];

  const ventures: Venture[] = [
    { title: "Bebloo", subtitle: "Circular Economy for Parents", icon: <Package className="w-5 h-5" />, link: "#" },
    { title: "MeddiConnect", subtitle: "Telehealth SaaS Platform", icon: <Rocket className="w-5 h-5" />, link: "#" },
    { title: "Digital Strategy", subtitle: "B2B Transformation", icon: <Zap className="w-5 h-5" />, link: "#" },
  ];



  return (
    <div className="max-w-4xl mx-auto px-6 py-20 selection:bg-neutral-800 selection:text-white">
      {/* Header Info Bar */}
      <div className="flex justify-between items-center mb-16 text-neutral-500 text-xs mono uppercase tracking-widest">
        <div>MASTER IN DIGITAL BUSINESS</div>
        <div className="flex items-center gap-2">
           <Clock className="w-3 h-3" />
           <span>{currentTime} MADRID (GMT+1)</span>
        </div>
      </div>

      {/* Hero Section */}
      <header className="mb-24">
        <div className="relative inline-block mb-8">
          <img 
            src="/foto cv.png" 
            alt="Gabriel Castro" 
            className="w-24 h-24 rounded-3xl object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#0a0a0a]" />
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-4xl font-bold tracking-tight">Gabriel Castro</h1>
          <CheckCircle2 className="w-6 h-6 text-blue-500 fill-current" />
        </div>
        
        <div className="space-y-6 max-w-2xl">
          <p className="text-xl text-neutral-300 leading-relaxed">
            Currently completing my <span className="text-white font-medium">Master in Digital Business & Innovation</span> at IE Business School while building <span className="text-white font-medium text-[#5BC0EB]">Bebloo</span> as Co-Founder through the IE Venture Lab program.
          </p>
          <p className="text-neutral-400 leading-relaxed">
            Specializing in circular economy for family products and telehealth innovation. I focus on bridging the gap between digital strategy and operational excellence.
          </p>
          <p className="text-neutral-200 font-medium flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            Seeking operations and growth opportunities in Singapore's dynamic startup ecosystem.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <button 
            onClick={copyEmail}
            className="group relative flex items-center gap-3 px-5 py-3 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-neutral-700 transition-all overflow-hidden"
          >
            <Mail className="w-4 h-4 text-neutral-400" />
            <span className="relative text-neutral-400 text-sm mono">
              Copy email <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded text-white ml-2">C</kbd>
            </span>
            {copied && (
              <span className="absolute inset-0 bg-green-500 text-black text-xs mono font-bold flex items-center justify-center animate-in fade-in duration-300">COPIED!</span>
            )}
          </button>
          
          <a href="#" className="flex items-center gap-2 px-5 py-3 bg-white text-black text-sm font-bold rounded-xl hover:bg-neutral-200 transition-all">
            Download CV
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Work / Projects Section */}
      <section className="mb-48 relative">
        {/* Dot Pattern Background */}
        <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '24px 24px', maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}></div>
        
        <SectionHeader title="Work" description="Below are some select projects, full walkthroughs on request" />
        
        <div className="relative w-full flex flex-col md:block gap-8 md:h-[700px] mt-12 perspective-1000">
          
          {/* Card 1: Bebloo (Left) - Dark UI */}
          <div className="w-full md:absolute md:left-0 md:top-20 md:w-[55%] aspect-[16/10] bg-neutral-900 rounded-2xl border-[4px] border-neutral-800 md:border-white/5 shadow-2xl md:transform md:rotate-y-12 md:rotate-z-2 z-10 hover:z-50 hover:scale-105 transition-all duration-500 overflow-hidden group">
             <img src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" alt="Bebloo" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-8 h-8 rounded-lg bg-[#5BC0EB] flex items-center justify-center text-white font-bold text-xs">B</div>
                   <h3 className="text-2xl font-bold text-white">Bebloo</h3>
                </div>
                <p className="text-neutral-400 text-sm">Circular Economy Platform for Parents</p>
             </div>
          </div>

          {/* Card 2: MeddiConnect (Center/Back) - Light UI */}
          <div className="w-full md:absolute md:left-[25%] md:top-0 md:w-[50%] aspect-[16/10] bg-white rounded-2xl border-[4px] border-neutral-200 shadow-2xl md:transform md:-rotate-y-6 md:-rotate-z-2 z-20 hover:z-50 hover:scale-105 transition-all duration-500 overflow-hidden group text-black">
             <div className="absolute inset-0 bg-neutral-50 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-8 opacity-40">
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   </div>
                   <div className="text-[10px] font-mono uppercase">MeddiConnect Dashboard</div>
                </div>
                <div className="flex-grow flex flex-col justify-center items-center text-center space-y-4">
                   <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                      <Rocket className="w-8 h-8" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-bold text-neutral-900">MeddiConnect</h3>
                      <p className="text-neutral-500 text-sm mt-1">Telehealth SaaS Platform</p>
                   </div>
                   <div className="flex gap-2 mt-4">
                      <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-600">React</span>
                      <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-600">Node</span>
                      <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-600">HIPAA</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 3: Zelkro (Right) - Dark UI */}
          <div className="w-full md:absolute md:right-0 md:top-32 md:w-[55%] aspect-[16/10] bg-neutral-800 rounded-2xl border-[4px] border-neutral-700 md:border-white/5 shadow-2xl md:transform md:-rotate-y-12 md:rotate-z-3 z-30 hover:z-50 hover:scale-105 transition-all duration-500 overflow-hidden group">
             <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity" alt="Analytics" />
             <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex justify-end">
                   <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full uppercase tracking-wider">Active</div>
                </div>
                <div>
                   <h3 className="text-2xl font-bold text-white mb-1">Zelkro S.A.</h3>
                   <p className="text-neutral-400 text-sm">Digital Transformation & Analytics</p>
                </div>
             </div>
          </div>
        </div>

        {/* Dock (Visual Only - Desktop) */}
        <div className="hidden md:flex justify-center mt-[-60px] relative z-40 pointer-events-none">
           <div className="bg-neutral-900/90 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-6 shadow-2xl pointer-events-auto">
              <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-white/5 flex items-center justify-center hover:scale-125 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                 <Layout className="w-5 h-5 text-neutral-400 group-hover:text-white" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-white/5 flex items-center justify-center hover:scale-125 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                 <Globe className="w-5 h-5 text-neutral-400 group-hover:text-white" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-white/5 flex items-center justify-center hover:scale-125 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                 <Package className="w-5 h-5 text-neutral-400 group-hover:text-white" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-white/5 flex items-center justify-center hover:scale-125 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                 <Zap className="w-5 h-5 text-neutral-400 group-hover:text-white" />
              </div>
           </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-32">
        <SectionHeader title="Professional Experience" description="A career built on digital innovation, international operations, and startup building." />
        <div className="mt-12">
          {experiences.map((exp, idx) => (
            <ExperienceItem key={idx} item={exp} />
          ))}
        </div>
      </section>

      {/* Stack & Ventures */}
      <section className="mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {/* Stack */}
          <div>
            <SectionHeader title="Stack" />
            <div className="flex flex-wrap gap-4">
               {/* Grok */}
               <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300 group cursor-default overflow-hidden" title="Grok">
                  <img src="/grok.png" alt="Grok" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
               </div>
               {/* GitHub */}
               <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300 group cursor-default overflow-hidden" title="GitHub">
                  <img src="/github.png" alt="GitHub" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
               </div>
               {/* Notion */}
               <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300 group cursor-default overflow-hidden" title="Notion">
                  <img src="/notion.png" alt="Notion" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
               </div>
               {/* Perplexity */}
               <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300 group cursor-default overflow-hidden" title="Perplexity">
                  <img src="/perplexity.avif" alt="Perplexity" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
               </div>
               {/* Cursor */}
               <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300 group cursor-default overflow-hidden" title="Cursor">
                  <img src="/cursor.png" alt="Cursor" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
               </div>
               {/* Shopify */}
               <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300 group cursor-default overflow-hidden" title="Shopify">
                  <img src="/shopify.webp" alt="Shopify" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
               </div>
               {/* Make */}
               <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300 group cursor-default overflow-hidden" title="Make">
                  <img src="/make.jpg" alt="Make" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
               </div>
               {/* Claude Code */}
               <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300 group cursor-default" title="Claude Code">
                  <img src="/claude.svg" alt="Claude Code" className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
               </div>
               {/* Gemini */}
               <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300 group cursor-default overflow-hidden" title="Gemini">
                  <img src="/gemini.png" alt="Gemini" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
               </div>
               {/* Supabase */}
               <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300 group cursor-default" title="Supabase">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current group-hover:text-[#3ECF8E] transition-colors"><path d="M12.5 2L3 13h8v9l9.5-11h-8L12.5 2z" /></svg>
               </div>
               {/* NotebookLM */}
               <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300 group cursor-default overflow-hidden" title="NotebookLM">
                  <img src="/notebooklm.jpg" alt="NotebookLM" className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
               </div>
               {/* Lovable */}
               <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300 group cursor-default overflow-hidden" title="Lovable">
                  <img src="/lovable.jpg" alt="Lovable" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
               </div>
            </div>
          </div>

          {/* Ventures */}
          <div>
            <SectionHeader title="Ventures" />
            <div className="flex flex-col gap-3">
              {ventures.map((v, idx) => (
                <a key={idx} href={v.link} className="flex items-center justify-between p-3 -mx-3 rounded-2xl hover:bg-neutral-900/50 transition-all group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700/50 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-neutral-600 transition-all duration-300">
                      {v.icon}
                    </div>
                    <div>
                      <div className="font-medium text-white group-hover:text-blue-400 transition-colors">{v.title}</div>
                      <div className="text-sm text-neutral-500">{v.subtitle}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-neutral-700 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Curated / Perplexity Pages */}
      <section className="mb-32">
        <SectionHeader title="Curated" description="Interesting pages and discoveries from around the web, powered by Perplexity." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {[
            { title: "The Future of Generative AI", source: "perplexity.ai", date: "Feb 24", url: "#" },
            { title: "Sustainable Energy Breakthroughs", source: "perplexity.ai", date: "Feb 20", url: "#" },
            { title: "Modern Stoicism Guide", source: "perplexity.ai", date: "Feb 18", url: "#" },
            { title: "SpaceX Starship Updates", source: "perplexity.ai", date: "Feb 15", url: "#" }
          ].map((item, idx) => (
            <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-900/30 border border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700 transition-all group">
               <div className="w-10 h-10 rounded-full bg-neutral-800 flex-shrink-0 overflow-hidden border border-neutral-700">
                  <img src="/perplexity.avif" alt="Perplexity" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
               </div>
               <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between mb-1">
                     <span className="text-[10px] mono uppercase text-neutral-500">{item.source}</span>
                     <span className="text-[10px] mono text-neutral-600">{item.date}</span>
                  </div>
                  <div className="font-medium text-neutral-200 group-hover:text-white transition-colors line-clamp-2">{item.title}</div>
               </div>
               <ArrowUpRight className="w-4 h-4 text-neutral-700 group-hover:text-white transition-all flex-shrink-0" />
            </a>
          ))}
        </div>
      </section>

      {/* Personal Interests Section */}
      <section className="mb-32">
        <SectionHeader title="Personal" description="In my spare time, I enjoy exercising, practicing martial arts, and reading" />
        
        <div className="mt-12">
          {/* YouTube Card */}
          <a href="https://youtu.be/P6zaCV4niKk?si=Wzs8riarxwHPP3Ja" target="_blank" rel="noopener noreferrer" className="bg-[#18181b] p-4 rounded-2xl flex items-center gap-4 max-w-md mx-auto hover:bg-[#27272a] transition-colors cursor-pointer group border border-neutral-800 mb-16">
             <div className="w-16 h-16 bg-neutral-700 rounded-lg overflow-hidden flex-shrink-0 relative">
                <img src="/cat-stevens.jpg" alt="Album Art" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white ml-0.5">
                         <path d="M8 5v14l11-7z" />
                      </svg>
                   </div>
                </div>
             </div>
             <div className="flex-grow min-w-0">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium mb-0.5">Music</div>
                <div className="font-medium text-white truncate">One of my favorite songs</div>
                <div className="text-sm text-neutral-400 truncate">Watch on YouTube</div>
             </div>
             <div className="flex-shrink-0 text-[#FF0000]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                   <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
             </div>
          </a>

          {/* Photo Gallery */}
          <div className="relative h-48 md:h-96 w-full max-w-3xl mx-auto mb-12">
             {/* Photo 1 */}
             <div className="absolute left-0 md:left-[5%] top-6 md:top-10 w-28 md:w-56 aspect-[3/4] bg-white p-1.5 md:p-2 pb-6 md:pb-8 shadow-2xl transform -rotate-6 hover:rotate-0 hover:scale-110 hover:z-50 transition-all duration-500 ease-out z-10 rounded-sm">
                <img src="/personal-1.jpg" className="w-full h-full object-cover bg-neutral-100" alt="Personal Photo 1" />
             </div>
             
             {/* Photo 2 */}
             <div className="absolute left-[30%] md:left-[35%] top-0 w-28 md:w-56 aspect-[3/4] bg-white p-1.5 md:p-2 pb-6 md:pb-8 shadow-2xl transform rotate-2 hover:rotate-0 hover:scale-110 hover:z-50 transition-all duration-500 ease-out z-20 rounded-sm">
                <img src="/personal-2.jpg" className="w-full h-full object-cover bg-neutral-100" alt="Personal Photo 2" />
             </div>

             {/* Photo 3 */}
             <div className="absolute left-[60%] md:left-[65%] top-4 md:top-8 w-28 md:w-56 aspect-[3/4] bg-white p-1.5 md:p-2 pb-6 md:pb-8 shadow-2xl transform -rotate-3 hover:rotate-0 hover:scale-110 hover:z-50 transition-all duration-500 ease-out z-30 rounded-sm">
                <img src="/personal-3.jpeg" className="w-full h-full object-cover bg-neutral-100" alt="Personal Photo 3" />
             </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-32">
        <SectionHeader title="Contact" description="I'm always open to discussing new ventures, digital strategy, or growth opportunities." />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <a href="mailto:gabrielalejandrocastromejia@gmail.com" className="flex items-center justify-between p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl group hover:border-neutral-600 transition-all">
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-neutral-500" />
                <div className="min-w-0">
                  <div className="text-sm text-neutral-500">Email</div>
                  <div className="font-medium break-all">gabrielalejandrocastromejia@gmail.com</div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="https://linkedin.com/in/gabrielcastro" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl group hover:border-neutral-600 transition-all">
              <div className="flex items-center gap-4">
                <Linkedin className="w-6 h-6 text-neutral-500" />
                <div>
                  <div className="text-sm text-neutral-500">LinkedIn</div>
                  <div className="font-medium">/in/gabrielcastro</div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-6 py-4 focus:outline-none focus:border-neutral-500 transition-all text-white placeholder:text-neutral-600"
            />
            <textarea 
              rows={4} 
              placeholder="How can I help you?" 
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-6 py-4 focus:outline-none focus:border-neutral-500 transition-all text-white placeholder:text-neutral-600"
            />
            <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all active:scale-95">
              Send Inquiry
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 border-t border-neutral-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="font-mono text-2xl italic tracking-tighter opacity-80">Gabriel Castro</div>
          <div className="flex items-center gap-8 text-xs text-neutral-500 mono uppercase">
             <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>MADRID, SPAIN</span>
             </div>
             <div className="flex items-center gap-2">
                <CloudSun className="w-3 h-3" />
                <span>IE UNIVERSITY</span>
             </div>
          </div>
        </div>

        <div className="text-[10px] text-neutral-700 mono flex flex-wrap gap-x-8 gap-y-2 uppercase tracking-widest">
          <span>© 2025 GABRIEL CASTRO</span>
          <span>•</span>
          <span>BUILT WITH REACT & TAILWIND</span>
          <span>•</span>
          <span>INSPIRED BY CRAFT</span>
          <span className="ml-auto text-[#5BC0EB]">SINGAPORE 🇸🇬 READY</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
