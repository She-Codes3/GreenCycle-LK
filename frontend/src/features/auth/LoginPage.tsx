import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/providers';
import greenCycleLogo from '@/assets/GreenCycle-logo.png';
import type { Role } from '@/shared/types/user';

// ─── Icons ────────────────────────────────────────────────────────────────────

function TruckIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 5v4h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function RecycleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="1 4 1 10 7 10" />
      <polyline points="23 20 23 14 17 14" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
    </svg>
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

function ShieldCheckIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function MailOrPhoneIcon() {
  return (
    <svg className="w-4 h-4 text-content-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function EyeIcon({ visible }: { visible: boolean }) {
  if (visible) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

// ─── LoginPage Component ──────────────────────────────────────────────────────

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate email or Sri Lankan phone number
  const validateIdentifier = (value: string): boolean => {
    const trimmed = value.trim();
    if (!trimmed) return false;
    // Email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone regex (e.g., 0712345678, +94712345678, or 9-10 digits)
    const phoneRegex = /^(\+94|0)?7[0-9]{8}$/;
    return emailRegex.test(trimmed) || phoneRegex.test(trimmed.replace(/\s+/g, ''));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedIdentifier = identifier.trim();
    if (!trimmedIdentifier) {
      setError('Please enter your email address or phone number.');
      return;
    }

    if (!validateIdentifier(trimmedIdentifier)) {
      setError('Please enter a valid email address or Sri Lankan phone number (e.g., 07X XXX XXXX).');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    // Simulate login authentication
    setTimeout(() => {
      setLoading(false);
      const isCollector =
        trimmedIdentifier.toLowerCase().includes('collector') ||
        trimmedIdentifier.includes('71') ||
        trimmedIdentifier.includes('col');
      const isMunicipal = trimmedIdentifier.toLowerCase().includes('municipal');
      const isAdmin = trimmedIdentifier.toLowerCase().includes('admin') || trimmedIdentifier.toLowerCase().includes('council');

      const role: Role = isCollector ? 'COLLECTOR' : isMunicipal ? 'MUNICIPAL' : isAdmin ? 'ADMIN' : 'RESIDENT';

      login(
        {
          id: `usr_${Date.now()}`,
          fullName: isCollector ? 'Saman Kumara' : isMunicipal ? 'Eng. Sunil Jayatissa' : isAdmin ? 'Municipal User' : 'Kasun Perera',
          email: trimmedIdentifier.includes('@') ? trimmedIdentifier : `${trimmedIdentifier}@greencycle.lk`,
          phone: trimmedIdentifier.includes('@') ? '0771234567' : trimmedIdentifier,
          role,
          ...(isMunicipal && { municipality: 'Kandy Municipal Council' }),
          createdAt: new Date().toISOString(),
        },
        `token_${Date.now()}`
      );

      // Redirect appropriately based on state or role
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      } else if (role === 'COLLECTOR') {
        navigate('/collector/dashboard', { replace: true });
      } else if (role === 'MUNICIPAL') {
        navigate('/municipal/dashboard', { replace: true });
      } else if (role === 'ADMIN') {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-surface font-sans">
      {/* ── LEFT HALF: Green Brand Side ── */}
      <div className="relative w-full lg:w-1/2 bg-[#094833] text-white p-8 lg:p-14 flex flex-col justify-between overflow-hidden">
        {/* Subtle decorative topographic background waves */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 800 800"
        >
          <path
            d="M-100 200 C 150 100, 300 400, 900 200 M-100 350 C 200 250, 400 550, 900 350 M-100 500 C 250 400, 500 700, 900 500 M-100 650 C 300 550, 600 850, 900 650"
            fill="none"
            stroke="white"
            strokeWidth="3"
          />
        </svg>

        {/* Ambient radial glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#04281c] rounded-full blur-2xl pointer-events-none" />

        {/* Top Header / Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <img
              src={greenCycleLogo}
              alt="GreenCycle LK"
              className="w-9 h-9 object-contain brightness-0 invert"
            />
            <div>
              <span className="text-lg font-bold tracking-tight text-white block leading-tight">
                GreenCycle LK
              </span>
              <span className="text-xs text-emerald-200/70 font-normal">
                Smarter Waste. Greener Sri Lanka.
              </span>
            </div>
          </Link>
        </div>

        {/* Center Content */}
        <div className="relative z-10 py-10 lg:py-16 max-w-xl">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-[1.18]">
            A cleaner Sri Lanka starts at your doorstep.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-emerald-100/80 leading-relaxed max-w-lg">
            Join 48,000+ residents, collectors, and municipal teams working together to keep our cities clean — one collection at a time.
          </p>

          {/* Key Value Propositions */}
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-emerald-300">
                <TruckIcon />
              </div>
              <span className="text-sm font-medium text-emerald-50">
                Live truck tracking on collection day
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-emerald-300">
                <RecycleIcon />
              </div>
              <span className="text-sm font-medium text-emerald-50">
                Recycling guides for every waste type
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-emerald-300">
                <MapPinIcon />
              </div>
              <span className="text-sm font-medium text-emerald-50">
                126 disposal centers across the island
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-emerald-300">
                <ShieldCheckIcon />
              </div>
              <span className="text-sm font-medium text-emerald-50">
                Trusted by municipal councils
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Island Footnote */}
        <div className="relative z-10 pt-4 border-t border-white/10">
          <p className="text-xs text-emerald-200/60 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-secondary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            <span>Colombo · Kandy · Galle · Jaffna — expanding island wide</span>
          </p>
        </div>
      </div>

      {/* ── RIGHT HALF: Login Form Side ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-surface">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-7">
            <h2 className="text-2xl sm:text-3xl font-bold text-content tracking-tight">
              Welcome back
            </h2>
            <p className="mt-1.5 text-sm text-content-secondary">
              Sign in to manage collections, reports, and your Green Points.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" x2="12" y1="8" y2="12" />
                  <line x1="12" x2="12.01" y1="16" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Input 1: Email or Phone Number */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-identifier"
                className="block text-sm font-medium text-content"
              >
                Email or Phone number
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 pointer-events-none">
                  <MailOrPhoneIcon />
                </span>
                <input
                  id="login-identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="you@example.lk or 07X XXX XXXX"
                  className="w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-2.5 text-sm text-content placeholder:text-content-muted focus:border-secondary focus:ring-2 focus:ring-secondary/15 focus:outline-none transition-all"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Input 2: Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-content"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link will be sent to your registered email or phone.')}
                  className="text-xs sm:text-sm font-medium text-secondary hover:text-secondary-dark transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative flex items-center">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-border bg-surface pl-4 pr-11 py-2.5 text-sm text-content placeholder:text-content-muted focus:border-secondary focus:ring-2 focus:ring-secondary/15 focus:outline-none transition-all"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 p-1 text-content-muted hover:text-content transition-colors"
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </div>
            </div>

            {/* Keep me signed in */}
            <div className="pt-0.5">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="h-4 w-4 rounded border-border-strong text-secondary focus:ring-secondary/30 accent-secondary cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-content-secondary">
                  Keep me signed in
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="login-submit-button"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-secondary hover:bg-secondary-dark active:bg-secondary-dark text-white font-semibold text-sm transition-all duration-150 shadow-sm hover:shadow active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>

            {/* Register Link */}
            <div className="pt-2 text-center text-sm text-content-secondary">
              New to GreenCycle LK?{' '}
              <Link
                to="/register"
                id="login-create-account-link"
                className="font-semibold text-secondary hover:text-secondary-dark hover:underline transition-colors"
              >
                Create an account
              </Link>
            </div>

            {/* Notice for Collectors and Municipal Users */}
            <div className="mt-6 p-4 rounded-xl bg-[#f0f9f4] border border-secondary/20 text-center">
              <p className="text-xs text-content-secondary leading-relaxed">
                Collector or municipal user?{' '}
                <span className="font-semibold text-content block sm:inline">
                  Use the credentials issued by your council.
                </span>
              </p>
            </div>

            {/* Terms and Privacy Footer */}
            <p className="pt-4 text-center text-[11px] leading-relaxed text-content-muted">
              By signing in you agree to the GreenCycle LK Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
