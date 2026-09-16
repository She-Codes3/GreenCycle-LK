import { Link, useNavigate } from 'react-router-dom';
import greenCycleLogo from '@/assets/GreenCycle-logo.png';

// ─── Icons ────────────────────────────────────────────────────────────────────

function MapPinIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
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

function RecycleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="1 4 1 10 7 10" />
      <polyline points="23 20 23 14 17 14" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function ArrowRightIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function HardHatIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
      <path d="M10 10V5a2 2 0 0 1 4 0v5" />
      <path d="M4 15V9a8 8 0 0 1 16 0v6" />
    </svg>
  );
}


// ─── Step data ────────────────────────────────────────────────────────────────

const steps = [
  {
    number: 1,
    icon: <MapPinIcon />,
    title: 'Set your area',
    description: (
      <>
        Pick your{' '}
        <span className="text-secondary font-medium">municipal council</span>{' '}
        and ward to get your local collection schedule.
      </>
    ),
  },
  {
    number: 2,
    icon: <TruckIcon />,
    title: 'Track collections',
    description: (
      <>
        See the truck approach your street in real time{' '}
        <span className="text-secondary font-medium">on collection day</span>.
      </>
    ),
  },
  {
    number: 3,
    icon: <RecycleIcon />,
    title: 'Recycle right',
    description: (
      <>
        Scan any item to learn{' '}
        <span className="text-secondary font-medium">exactly</span>{' '}
        how to dispose of it in Sri Lanka.
      </>
    ),
  },
  {
    number: 4,
    icon: <BellIcon />,
    title: 'Stay informed',
    description: (
      <>
        Reminders before every collection and alerts{' '}
        <span className="text-secondary font-medium">for schedule changes</span>.
      </>
    ),
  },
];

// ─── Role button data ─────────────────────────────────────────────────────────

const roles = [
  {
    id: 'resident',
    icon: <UserIcon />,
    label: 'Resident',
    desc: 'Schedule pickups, track trucks and earn GreenPoints.',
    route: '/register/resident',
    style: {
      card: 'bg-secondary-light hover:bg-secondary-dark border-primary',
      icon: 'bg-primary-light text-primary',
      label: 'text-content',
      desc: 'text-content-secondary',
      arrow: 'text-content-muted',
    },
    primary: true,
  },
  {
    id: 'collector',
    icon: <HardHatIcon />,
    label: 'Collector / Disposal Center',
    desc: 'Collect specialized waste streams, accept drop-offs, or run a recycling depot.',
    route: '/register/collector',
    style: {
      card: 'bg-secondary-light hover:bg-secondary-dark border-primary',
      icon: 'bg-primary-light text-primary',
      label: 'text-content',
      desc: 'text-content-secondary',
      arrow: 'text-content-muted',
    },
    primary: false,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

/** Onboarding introduction — two-column layout with steps on the left and role selection on the right. */
export function OnboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      {/* Minimal header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-border bg-surface">
        <Link to="/" className="flex items-center gap-2.5" id="onboard-logo">
          <img
            src={greenCycleLogo}
            alt="GreenCycle LK"
            className="w-8 h-8"
            style={{ objectFit: 'contain' }}
          />
          <span className="font-bold text-base tracking-tight text-content">
            GreenCycle <span className="text-secondary">LK</span>
          </span>
        </Link>
        <p className="text-sm text-content-muted hidden sm:block">
          Already registered?{' '}
          <Link
            to="/login"
            id="onboard-header-sign-in"
            className="font-medium bg-primary-light text-secondary rounded px-2 py-1 hover:bg-primary-dark hover:text-secondary-light transition-colors"
          >
            Sign in
          </Link>
        </p>
      </header>

      {/* Main two-column body */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-10 items-stretch">

          {/* ── LEFT: Logo + heading + 4 step cards ── */}
          <div className="flex flex-col gap-5">
            {/* Heading */}
            <div className="lg:h-[72px] flex flex-col justify-end">
              <h1 className="text-3xl font-bold text-content tracking-tight leading-tight">
                Welcome to GreenCycle LK
              </h1>
              <p className="mt-1 text-sm text-content-secondary">
                Smarter Waste. Greener Sri Lanka.
              </p>
            </div>

            {/* Step cards — stretch to fill height evenly */}
            <div className="flex flex-col gap-3 flex-1">
              {steps.map(({ number, icon, title, description }) => (
                <div
                  key={number}
                  id={`onboard-step-${number}`}
                  className="flex-1 flex items-center gap-4 rounded-2xl border border-border bg-surface px-4 py-3 transition-all duration-200 group hover:border-secondary hover:bg-secondary-light/60 hover:shadow-card cursor-default"
                >
                  {/* Icon bubble */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors bg-primary-light text-primary group-hover:bg-secondary group-hover:text-white">
                    {icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">
                      <span className="text-content-muted font-normal mr-1 group-hover:text-secondary transition-colors">{number}.</span>
                      <span className="text-content group-hover:text-secondary transition-colors">
                        {title}
                      </span>
                    </p>
                    <p className="mt-0.5 text-xs sm:text-sm text-content-secondary leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Role selection ── */}
          <div className="flex flex-col gap-5">
            <div className="lg:h-[72px] flex flex-col justify-end">
              <h2 className="text-xl font-bold text-content tracking-tight">Choose your role</h2>
              <p className="mt-1 text-sm text-content-secondary">
                Select how you'll be using GreenCycle LK.
              </p>
            </div>

            {/* Role buttons — stretch to fill height evenly */}
            <div className="flex flex-col gap-3 flex-1">
              {roles.map(({ id, icon, label, desc, route, style }) => (
                <button
                  key={id}
                  id={`onboard-role-${id}`}
                  onClick={() => navigate(route)}
                  className={`flex-1 flex items-center gap-5 rounded-2xl border px-6 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated active:translate-y-0 ${style.card}`}
                >
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${style.icon}`}
                  >
                    {icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-base font-bold ${style.label}`}>{label}</p>
                    <p className={`mt-0.5 text-sm leading-relaxed ${style.desc}`}>{desc}</p>
                  </div>

                  {/* Arrow */}
                  <div className={`flex-shrink-0 ${style.arrow}`}>
                    <ArrowRightIcon className="w-5 h-5" />
                  </div>
                </button>
              ))}
            </div>

            {/* Municipal notice */}
            <div className="rounded-2xl border border-border bg-surface p-4 flex items-start gap-3.5 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="9" y1="6" x2="9" y2="6.01" />
                  <line x1="15" y1="6" x2="15" y2="6.01" />
                  <line x1="9" y1="10" x2="9" y2="10.01" />
                  <line x1="15" y1="10" x2="15" y2="10.01" />
                  <line x1="9" y1="14" x2="9" y2="14.01" />
                  <line x1="15" y1="14" x2="15" y2="14.01" />
                  <path d="M10 22v-4h4v4" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-content">Municipal or Local Authority?</p>
                <p className="text-xs text-content-muted mt-0.5 leading-relaxed">
                  Council and municipal accounts are provisioned directly by the system administrator.{' '}
                  <Link to="/login" className="text-secondary font-medium hover:underline">
                    Sign in to your portal
                  </Link>.
                </p>
              </div>
            </div>

            {/* Sign in — mobile fallback */}
            <p className="text-sm text-content-muted text-center sm:hidden">
              Already registered?{' '}
              <Link
                to="/login"
                id="onboard-sign-in-mobile"
                className="font-medium text-secondary hover:text-secondary-dark transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
