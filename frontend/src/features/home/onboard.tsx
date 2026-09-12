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

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Step card data ───────────────────────────────────────────────────────────

const steps = [
  {
    number: 1,
    icon: <MapPinIcon />,
    title: 'Set your area',
    description: (
      <>
        Pick your{' '}
        <span className="text-secondary font-medium">municipal council</span> and ward
        to get your local collection schedule.
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
        <span className="text-secondary font-medium">exactly</span> how to dispose
        of it in Sri Lanka.
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

// ─── Page ─────────────────────────────────────────────────────────────────────

/** Multi-step onboarding introduction shown to new users after registration. */
export function OnboardPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-4">
      <div className="w-full max-w-lg">

        {/* Logo + heading */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={greenCycleLogo}
            alt="GreenCycle LK"
            className="w-16 h-16 mb-5"
            style={{ objectFit: 'contain' }}
          />
          <h1 className="text-2xl font-bold text-content tracking-tight">
            Welcome to GreenCycle LK
          </h1>
          <p className="mt-1.5 text-sm text-content-secondary">
            Smarter Waste. Greener Sri Lanka.
          </p>
        </div>

        {/* Step cards */}
        <div className="flex flex-col gap-3 mb-6">
          {steps.map(({ number, icon, title, description }) => (
            <button
              key={number}
              id={`onboard-step-${number}`}
              onClick={() => setActiveStep(activeStep === number ? null : number)}
              className={`w-full text-left rounded-2xl border p-4 flex items-start gap-4 transition-all duration-200 ${
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
                    : 'bg-primary-light text-primary'
                }`}
              >
                {icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm font-semibold text-content">
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

        {/* Primary CTA */}
        <button
          id="onboard-explore-resident"
          onClick={() => navigate('/register/resident')}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-white font-semibold text-sm transition-all hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-elevated active:translate-y-0"
        >
          Explore as a Resident <ArrowRightIcon />
        </button>

        {/* Collector / municipality options */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            id="onboard-explore-collector"
            onClick={() => navigate('/collector/dashboard')}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface py-3 text-sm font-medium text-content-secondary hover:border-secondary hover:text-primary hover:bg-secondary-light transition-all"
          >
            🚛 Collector
          </button>
          <button
            id="onboard-explore-municipality"
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface py-3 text-sm font-medium text-content-secondary hover:border-secondary hover:text-primary hover:bg-secondary-light transition-all"
          >
            🏛️ Municipality
          </button>
        </div>

        {/* Sign in link */}
        <p className="mt-6 text-center text-sm text-content-muted">
          Already registered?{' '}
          <Link
            to="/login"
            id="onboard-sign-in"
            className="font-medium text-secondary hover:text-secondary-dark transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
