import { useState } from 'react';
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

function BuildingIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
      <rect x="13" y="13" width="3" height="3" />
      <rect x="13" y="17" width="3" height="3" rx="0" />
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
      card: 'bg-primary hover:bg-primary-dark border-primary',
      icon: 'bg-white/15 text-white',
      label: 'text-white',
      desc: 'text-white/70',
      arrow: 'text-white/60',
    },
    primary: true,
  },
  {
    id: 'collector',
    icon: <HardHatIcon />,
    label: 'Collector',
    desc: 'Manage your route, update collection status in real time.',
    route: '/collector/dashboard',
    style: {
      card: 'bg-surface hover:bg-secondary-light border-border hover:border-secondary',
      icon: 'bg-primary-light text-primary',
      label: 'text-content',
      desc: 'text-content-secondary',
      arrow: 'text-content-muted',
    },
    primary: false,
  },
  {
    id: 'municipality',
    icon: <BuildingIcon />,
    label: 'Municipality',
    desc: 'Oversee operations, analytics and community impact data.',
    route: '/dashboard',
    style: {
      card: 'bg-surface hover:bg-secondary-light border-border hover:border-secondary',
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
  const [activeStep, setActiveStep] = useState<number | null>(null);
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
            className="font-medium text-secondary hover:text-secondary-dark transition-colors"
          >
            Sign in
          </Link>
        </p>
      </header>

      {/* Main two-column body */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-10 items-stretch">

          {/* ── LEFT: Logo + heading + 4 step cards ── */}
          <div className="flex flex-col gap-6">
            {/* Heading */}
            <div>
              <h1 className="text-3xl font-bold text-content tracking-tight leading-tight">
                Welcome to GreenCycle LK
              </h1>
              <p className="mt-1.5 text-sm text-content-secondary">
                Smarter Waste. Greener Sri Lanka.
              </p>
            </div>

            {/* Step cards */}
            <div className="flex flex-col gap-3">
              {steps.map(({ number, icon, title, description }) => (
                <button
                  key={number}
                  id={`onboard-step-${number}`}
                  onClick={() => setActiveStep(activeStep === number ? null : number)}
                  className={`w-full text-left rounded-2xl border p-4 flex items-start gap-4 transition-all duration-200 group ${
                    activeStep === number
                      ? 'border-secondary bg-secondary-light shadow-card'
                      : 'border-border bg-surface hover:border-secondary/50 hover:shadow-card'
                  }`}
                >
                  {/* Icon bubble */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      activeStep === number
                        ? 'bg-secondary text-white'
                        : 'bg-primary-light text-primary group-hover:bg-secondary/10 group-hover:text-secondary'
                    }`}
                  >
                    {icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-sm font-semibold">
                      <span className="text-content-muted font-normal mr-1">{number}.</span>
                      <span className={activeStep === number ? 'text-secondary' : 'text-content'}>
                        {title}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-content-secondary leading-relaxed">
                      {description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Role selection ── */}
          <div className="flex flex-col gap-4">
            <div>
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
                  className={`flex-1 flex items-center gap-5 rounded-2xl border px-6 py-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated active:translate-y-0 ${style.card}`}
                >
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${style.icon}`}
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
