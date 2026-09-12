import { useState, useEffect } from 'react';
import greenCycleLogo from '@/assets/GreenCycle-logo.png';
import { Link } from 'react-router-dom';

// ─── Inline SVG Icons ──────────────────────────────────────────────────────────

function LogoIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <img
      src={greenCycleLogo}
      alt="GreenCycle LK logo"
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}

function MapPinIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowRightIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 5v4h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function LeafIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 20A7 7 0 0 1 4 13C4 9 8 4 12 2c4 2 8 7 8 11a7 7 0 0 1-9 7z" />
      <path d="M12 2v18" strokeDasharray="3 2" />
    </svg>
  );
}

function RecycleIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="1 4 1 10 7 10" />
      <polyline points="23 20 23 14 17 14" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
    </svg>
  );
}

function StarIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function MapIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  );
}

function ShieldIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function CheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
      <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
      <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-navigation transition-all duration-300 ${
        scrolled ? 'bg-surface/95 backdrop-blur border-b border-border shadow-card' : 'bg-transparent'
      }`}
    >
      <div className="ui-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" id="nav-logo">
            <LogoIcon />
            <span className="font-bold text-lg tracking-tight text-content group-hover:text-primary transition-colors">
              GreenCycle <span className="text-secondary">LK</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {['Features', 'How It Works', 'Waste Streams', 'About'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-3 py-2 rounded-lg text-sm font-medium text-content-secondary hover:text-primary hover:bg-primary-light transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-content-secondary hover:text-primary transition-colors" id="nav-sign-in">
              Sign in
            </Link>
            <Link to="/register" className="ui-button-primary text-sm gap-1.5" id="nav-get-started">
              Get Started <ArrowRightIcon />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            id="nav-mobile-menu-toggle"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-surface/98 backdrop-blur px-4 pb-5 pt-3 space-y-1">
          {['Features', 'How It Works', 'Waste Streams', 'About'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="block px-3 py-2.5 rounded-xl text-sm font-medium text-content-secondary hover:bg-primary-light hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link to="/login" className="ui-button-secondary text-sm justify-center" id="mobile-sign-in">
              Sign in
            </Link>
            <Link to="/register" className="ui-button-primary text-sm justify-center" id="mobile-get-started">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0d3527 0%, #134e39 40%, #1a6b4a 70%, #0f8c5a 100%)',
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #10b981, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -left-16 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #10b981, transparent 70%)' }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="ui-container relative pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
              <MapPinIcon />
              Built for Sri Lankan cities
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
                Smarter Waste.
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
                Greener Sri Lanka.
              </h1>
            </div>

            {/* Sub-copy */}
            <p className="text-lg text-white/75 leading-relaxed max-w-lg">
              One platform connecting citizens, collectors and communities —
              from your morning collection in Colombo&nbsp;05 to municipal
              operations across the island.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-primary font-semibold text-sm transition-all hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-elevated active:translate-y-0"
                id="hero-get-started"
              >
                Get Started <ArrowRightIcon />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 bg-white/10 text-white font-medium text-sm backdrop-blur-sm transition-all hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0"
                id="hero-sign-in"
              >
                I already have an account
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 pt-2">
              {[
                { value: '12+', label: 'Cities covered' },
                { value: '50k+', label: 'Active users' },
                { value: '98%', label: 'Collection accuracy' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-xs text-white/60 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live collection card */}
          <div className="flex justify-center lg:justify-end">
            <LiveCollectionCard />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#features"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors"
        aria-label="Scroll to features"
      >
        <span className="text-xs tracking-wider uppercase">Explore</span>
        <div className="animate-bounce">
          <ChevronDownIcon />
        </div>
      </a>
    </section>
  );
}

function LiveCollectionCard() {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setPulse((v) => !v), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="w-full max-w-sm rounded-3xl p-6 space-y-5"
      style={{
        background: 'rgba(255,255,255,0.12)',
        border: '1px solid rgba(255,255,255,0.18)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
      }}
    >
      {/* Logo large */}
      <div className="flex items-center justify-between">
        <LogoIcon className="w-14 h-14" />
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/30">
          <span
            className={`w-2 h-2 rounded-full bg-secondary transition-opacity duration-700 ${pulse ? 'opacity-100' : 'opacity-30'}`}
          />
          <span className="text-xs font-medium text-secondary">Live</span>
        </div>
      </div>

      {/* Next collection info */}
      <div className="space-y-1">
        <p className="text-sm text-white/60">Next collection · Colombo 05</p>
        <p className="text-2xl font-bold text-white">Organic Waste</p>
        <p className="text-sm text-white/70">Today · 6:00 AM – 8:00 AM</p>
      </div>

      {/* Truck alert */}
      <div
        className="flex items-start gap-3 rounded-xl p-4"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)' }}
      >
        <TruckIcon />
        <p className="text-sm text-white/85 leading-relaxed">
          🚛 Truck WP CA-1234 is 1.2 km away — arriving in ~8 minutes.
        </p>
      </div>

      {/* Schedule grid */}
      <div className="space-y-2.5">
        <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">This Week</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { day: 'Mon', type: 'Organic', color: '#15803d' },
            { day: 'Wed', type: 'Paper', color: '#0284c7' },
            { day: 'Fri', type: 'Plastic', color: '#ea580c' },
          ].map(({ day, type, color }) => (
            <div
              key={day}
              className="rounded-xl p-2.5 text-center"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="text-xs text-white/50">{day}</div>
              <div
                className="mt-1 w-2.5 h-2.5 rounded-full mx-auto"
                style={{ background: color }}
              />
              <div className="text-xs text-white/75 mt-1 font-medium">{type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Stats Strip ──────────────────────────────────────────────────────────────

function StatsSection() {
  const stats = [
    { value: '2.4M', suffix: 'kg', label: 'Waste collected monthly' },
    { value: '18', suffix: '+', label: 'Municipal authorities' },
    { value: '340', suffix: 'k', label: 'Tonnes recycled this year' },
    { value: '4.8', suffix: '★', label: 'Average app rating' },
  ];

  return (
    <section className="border-y border-border bg-surface">
      <div className="ui-container">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
          {stats.map(({ value, suffix, label }) => (
            <div key={label} className="px-6 py-10 text-center">
              <div className="text-4xl font-bold text-primary">
                {value}
                <span className="text-secondary text-2xl">{suffix}</span>
              </div>
              <div className="mt-2 text-sm text-content-secondary">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────

const features = [
  {
    id: 'real-time-tracking',
    icon: <TruckIcon />,
    color: 'bg-primary-light text-primary',
    title: 'Real-time Truck Tracking',
    desc: 'Know exactly when your collection truck arrives. Live GPS tracking with arrival estimates, push notifications, and route monitoring for every driver.',
  },
  {
    id: 'ai-scanner',
    icon: <LeafIcon />,
    color: 'bg-secondary-light text-secondary-dark',
    title: 'AI Waste Scanner',
    desc: "Can't figure out which bin? Point your camera — our AI instantly classifies waste into the correct stream and gives disposal instructions.",
  },
  {
    id: 'gamification',
    icon: <StarIcon />,
    color: 'bg-amber-50 text-amber-700',
    title: 'GreenPoints Rewards',
    desc: 'Earn points every time you recycle correctly, report illegal dumping, or complete weekly challenges. Redeem at partner stores.',
  },
  {
    id: 'disposal-map',
    icon: <MapIcon />,
    color: 'bg-sky-50 text-sky-700',
    title: 'Disposal Centre Map',
    desc: 'Find the nearest recycling centres, hazardous waste drop-offs, and special collection events on an interactive island-wide map.',
  },
  {
    id: 'smart-schedule',
    icon: <RecycleIcon />,
    color: 'bg-emerald-50 text-emerald-700',
    title: 'Smart Scheduling',
    desc: 'Never miss a collection again. Personalised calendars, customisable reminders, and on-demand pickup booking for bulky items.',
  },
  {
    id: 'impact-reports',
    icon: <ShieldIcon />,
    color: 'bg-violet-50 text-violet-700',
    title: 'Community Impact Reports',
    desc: 'See how your neighbourhood is performing. Monthly reports, leaderboards, and transparent data for municipal councils.',
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-canvas">
      <div className="ui-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-semibold">
            What we offer
          </span>
          <h2 className="ui-page-title">
            Everything your city needs for smarter waste management
          </h2>
          <p className="ui-body">
            Built with input from Colombo Municipal Council, local communities,
            and waste collection operators across Sri Lanka.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.id}
              id={`feature-${f.id}`}
              className="ui-card ui-card-interactive group flex flex-col gap-4"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${f.color}`}>
                {f.icon}
              </div>
              <div className="space-y-2">
                <h3 className="ui-section-title text-lg">{f.title}</h3>
                <p className="ui-caption text-sm leading-6">{f.desc}</p>
              </div>
              <div className="mt-auto">
                <span className="inline-flex items-center gap-1 text-sm font-medium text-secondary group-hover:gap-2 transition-all">
                  Learn more <ArrowRightIcon className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

const steps = [
  {
    step: '01',
    title: 'Download & Register',
    desc: 'Create your free account in under 2 minutes. Select your municipality and set your household size.',
  },
  {
    step: '02',
    title: 'Set Up Your Schedule',
    desc: 'Your collection calendar is pre-loaded based on your address. Customise reminders and notification preferences.',
  },
  {
    step: '03',
    title: 'Sort & Scan',
    desc: 'Use the AI scanner to correctly sort your waste. Earn GreenPoints for every verified correct disposal.',
  },
  {
    step: '04',
    title: 'Track & Earn',
    desc: 'Watch your truck approach in real time. Accumulate points, climb the leaderboard, and redeem rewards.',
  },
];

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0d3527 0%, #134e39 50%, #1a6b4a 100%)',
      }}
    >
      {/* BG accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full"
          style={{ background: 'radial-gradient(circle, #10b981, transparent 70%)' }}
        />
      </div>

      <div className="ui-container relative">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-semibold">
            How it works
          </span>
          <h2 className="text-4xl font-bold text-white tracking-tight">
            Up and running in four simple steps
          </h2>
          <p className="text-white/65 leading-relaxed">
            Designed for everyone — from tech-savvy students in Colombo to
            community leaders in rural municipalities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ step, title, desc }, i) => (
            <div key={step} className="relative flex flex-col gap-4">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[calc(50%+2rem)] right-[-2rem] h-px bg-white/15" />
              )}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white border border-white/20"
                style={{ background: 'rgba(255,255,255,0.12)' }}
              >
                {step}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Waste Streams ────────────────────────────────────────────────────────────

const wasteStreams = [
  {
    id: 'organic',
    color: '#15803d',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    label: 'Organic',
    emoji: '🍃',
    desc: 'Food scraps, garden clippings, compostable material.',
    days: 'Mon & Thu',
  },
  {
    id: 'paper',
    color: '#0284c7',
    bg: '#f0f9ff',
    border: '#bae6fd',
    label: 'Paper & Cardboard',
    emoji: '📄',
    desc: 'Newspapers, cartons, office paper, packaging.',
    days: 'Wednesday',
  },
  {
    id: 'plastic',
    color: '#ea580c',
    bg: '#fff7ed',
    border: '#fed7aa',
    label: 'Plastic & Metal',
    emoji: '♻️',
    desc: 'Bottles, cans, containers — rinsed and clean.',
    days: 'Friday',
  },
  {
    id: 'hazardous',
    color: '#dc2626',
    bg: '#fef2f2',
    border: '#fecaca',
    label: 'Hazardous',
    emoji: '⚠️',
    desc: 'Batteries, chemicals, e-waste. Drop-off only.',
    days: 'Drop-off centre',
  },
];

function WasteStreamsSection() {
  return (
    <section id="waste-streams" className="py-24 bg-surface">
      <div className="ui-container">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-semibold">
            Waste categories
          </span>
          <h2 className="ui-page-title">Know exactly which bin to use</h2>
          <p className="ui-body">
            Our colour-coded system and AI scanner ensure waste always ends up
            in the right stream, maximising landfill diversion.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {wasteStreams.map(({ id, color, bg, border, label, emoji, desc, days }) => (
            <div
              key={id}
              id={`waste-${id}`}
              className="rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:shadow-elevated cursor-pointer group"
              style={{ background: bg, border: `1.5px solid ${border}` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{emoji}</span>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: color }}
                />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-content" style={{ color }}>
                  {label}
                </h3>
                <p className="text-sm text-content-secondary leading-relaxed">{desc}</p>
              </div>
              <div className="mt-auto pt-3 border-t" style={{ borderColor: border }}>
                <span className="text-xs font-medium text-content-muted">🗓 {days}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tips row */}
        <div className="mt-10 ui-card bg-primary-light border-primary/20">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
              <LeafIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-primary">Unsure? Use the AI Scanner</p>
              <p className="text-sm text-content-secondary mt-0.5">
                Take a photo of any item and our AI will classify it and tell you exactly how to dispose of it correctly.
              </p>
            </div>
            <Link
              to="/register"
              className="ui-button-primary text-sm flex-shrink-0"
              id="waste-try-scanner"
            >
              Try Scanner
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    id: 'testimonial-1',
    quote: "GreenCycle has completely transformed how our neighbourhood handles waste. The truck tracking feature alone saves us so much frustration.",
    name: 'Priya Ratnayake',
    role: 'Resident, Colombo 05',
    avatar: 'PR',
  },
  {
    id: 'testimonial-2',
    quote: "As a municipal officer, the analytics dashboard gives us real data to improve collection routes. Diversion rates have gone up 34% since we onboarded.",
    name: 'Rohan Senanayake',
    role: 'Municipal Officer, Kandy',
    avatar: 'RS',
  },
  {
    id: 'testimonial-3',
    quote: "My kids love scanning items with the AI camera and earning GreenPoints. It's made recycling a fun family activity.",
    name: 'Amali Fernando',
    role: 'Parent, Nugegoda',
    avatar: 'AF',
  },
];

function TestimonialsSection() {
  return (
    <section id="about" className="py-24 bg-canvas">
      <div className="ui-container">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-semibold">
            Community voices
          </span>
          <h2 className="ui-page-title">Trusted across Sri Lanka</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ id, quote, name, role, avatar }) => (
            <div key={id} id={id} className="ui-card flex flex-col gap-5">
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-content-secondary leading-relaxed text-sm flex-1">
                "{quote}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-content">{name}</p>
                  <p className="text-xs text-content-muted">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function CtaSection() {
  const benefits = [
    'Free for all citizens',
    'Works in 12+ cities',
    'iOS & Android apps',
    'No contract, cancel anytime',
  ];

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #134e39 0%, #0f8c5a 100%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #10b981, transparent 70%)' }}
        />
      </div>

      <div className="ui-container relative text-center space-y-8 max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Ready to make Sri Lanka greener?
        </h2>
        <p className="text-lg text-white/75 leading-relaxed">
          Join 50,000+ households already using GreenCycle LK. Sign up in
          seconds — no credit card required.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-primary font-bold text-base transition-all hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-elevated active:translate-y-0"
            id="cta-register"
          >
            Get Started for Free <ArrowRightIcon />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/30 bg-white/10 text-white font-medium text-base backdrop-blur-sm transition-all hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0"
            id="cta-login"
          >
            Sign in
          </Link>
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {benefits.map((b) => (
            <span key={b} className="flex items-center gap-1.5 text-sm text-white/70">
              <CheckIcon className="w-4 h-4 text-secondary" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const links = {
    Product: ['Features', 'How it Works', 'Pricing', 'Changelog'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Support: ['Help Centre', 'Community', 'Status', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Cookie Policy', 'Accessibility'],
  };

  return (
    <footer className="bg-surface border-t border-border">
      <div className="ui-container py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <LogoIcon />
              <span className="font-bold text-content">
                GreenCycle <span className="text-secondary">LK</span>
              </span>
            </div>
            <p className="text-sm text-content-secondary leading-relaxed">
              Sri Lanka's national waste management platform, connecting citizens and municipalities.
            </p>
            <div className="flex gap-3">
              {['🌐', '📱', '🐦'].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-xl bg-muted hover:bg-primary-light hover:text-primary transition-colors flex items-center justify-center text-sm"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-content-secondary hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-content-muted">
            © {new Date().getFullYear()} GreenCycle LK. All rights reserved.
          </p>
          <p className="text-sm text-content-muted flex items-center gap-1">
            Made with <span className="text-secondary">♥</span> for a greener Sri Lanka 🌿
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function HomePage() {
  // Smooth scroll for hash links
  useEffect(() => {
    document.title = 'GreenCycle LK — Smarter Waste. Greener Sri Lanka.';
  }, []);

  return (
    <div className="ui-page">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <WasteStreamsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
