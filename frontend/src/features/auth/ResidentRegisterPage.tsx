import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers';
import greenCycleLogo from '@/assets/GreenCycle-logo.png';

import postalCodesData from '@/shared/data/postalCodes.json';

// ─── Sri Lankan Locations (Data-driven from postalCodes.json) ─────────────────

type PostalData = Record<string, Array<{ city: string; code: string }>>;
const postalData = postalCodesData as PostalData;

const SRI_LANKA_DISTRICTS = Object.keys(postalData).sort();

const SRI_LANKA_PROVINCES = [
  'Central', 'Eastern', 'North Central', 'Northern', 'North Western',
  'Sabaragamuwa', 'Southern', 'Uva', 'Western',
];

const DISTRICT_TO_PROVINCE: Record<string, string> = {
  Colombo: 'Western',
  Gampaha: 'Western',
  Kalutara: 'Western',
  Kandy: 'Central',
  Matale: 'Central',
  'Nuwara Eliya': 'Central',
  Galle: 'Southern',
  Matara: 'Southern',
  Hambantota: 'Southern',
  Jaffna: 'Northern',
  Kilinochchi: 'Northern',
  Mannar: 'Northern',
  Mullativu: 'Northern',
  Mullaitivu: 'Northern',
  Vavuniya: 'Northern',
  Ampara: 'Eastern',
  Batticaloa: 'Eastern',
  Trincomalee: 'Eastern',
  Kurunegala: 'North Western',
  Puttalam: 'North Western',
  Anuradhapura: 'North Central',
  Polonnaruwa: 'North Central',
  Badulla: 'Uva',
  Monaragala: 'Uva',
  Kegalle: 'Sabaragamuwa',
  Ratnapura: 'Sabaragamuwa',
};

// Flattened list of all cities across Sri Lanka
const ALL_CITIES = Object.entries(postalData).flatMap(([district, cities]) =>
  cities.map((item) => ({
    city: item.city,
    code: item.code === '*' ? '' : item.code,
    district,
    province: DISTRICT_TO_PROVINCE[district] || '',
  }))
);

// Map for instant O(1) city lookup
const CITY_LOOKUP = new Map<string, { code: string; district: string; province: string }>();
for (const item of ALL_CITIES) {
  if (!CITY_LOOKUP.has(item.city)) {
    CITY_LOOKUP.set(item.city, {
      code: item.code,
      district: item.district,
      province: item.province,
    });
  }
}

// ─── Icons ────────────────────────────────────────────────────────────────────

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

function UserIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6 6l1.27-.27a2 2 0 0 1 2.11.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  );
}

function HashIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="4" x2="20" y1="9" y2="9" />
      <line x1="4" x2="20" y1="15" y2="15" />
      <line x1="10" x2="8" y1="3" y2="21" />
      <line x1="16" x2="14" y1="3" y2="21" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// ─── Field Component ──────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

function Field({ label, htmlFor, error, required, hint, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={htmlFor} className="block text-sm font-medium text-content">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {hint && <span className="text-xs text-content-muted">{hint}</span>}
      </div>
      {children}
      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Password Strength Indicator ──────────────────────────────────────────────

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const passed = Object.values(checks).filter(Boolean).length;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const barColors = ['', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-secondary'];
  const textColors = ['', 'text-red-500', 'text-orange-500', 'text-yellow-600', 'text-secondary'];

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= passed ? barColors[passed] : 'bg-border'
            }`}
          />
        ))}
      </div>
      {passed > 0 && (
        <p className={`text-xs font-medium ${textColors[passed]}`}>
          {labels[passed]} password
          {passed < 4 && (
            <span className="text-content-muted font-normal ml-1">
              — try adding {!checks.uppercase && 'uppercase, '}{!checks.number && 'numbers, '}{!checks.special && 'symbols'}
            </span>
          )}
        </p>
      )}
    </div>
  );
}

// ─── Input base classes ───────────────────────────────────────────────────────

const inputBase = 'w-full rounded-xl border text-sm text-content placeholder:text-content-muted focus:outline-none focus:ring-2 transition-all';
const inputNormal = `${inputBase} border-border bg-surface focus:border-secondary focus:ring-secondary/15`;
const inputError  = `${inputBase} border-red-300 bg-red-50/40 focus:border-red-400 focus:ring-red-200`;

// ─── ResidentRegisterPage ─────────────────────────────────────────────────────

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  district: string;
  province: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  district?: string;
  province?: string;
  password?: string;
  confirmPassword?: string;
  agreed?: string;
}

export function ResidentRegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    district: '',
    province: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleCityChange = (cityName: string) => {
    const match = CITY_LOOKUP.get(cityName);
    setForm((prev) => ({
      ...prev,
      city: cityName,
      postalCode: match?.code || prev.postalCode,
      district: match?.district || prev.district,
      province: match?.province || prev.province,
    }));

    setErrors((prev) => ({
      ...prev,
      city: undefined,
      postalCode: undefined,
      ...(match ? { district: undefined, province: undefined } : {}),
    }));
  };

  const handleDistrictChange = (district: string) => {
    const province = DISTRICT_TO_PROVINCE[district] || '';
    const districtCities = postalData[district] || [];
    const cityStillValid = districtCities.some((c) => c.city === form.city);

    setForm((prev) => ({
      ...prev,
      district,
      province: province || prev.province,
      city: cityStillValid ? prev.city : '',
      postalCode: cityStillValid ? prev.postalCode : '',
    }));

    setErrors((prev) => ({
      ...prev,
      district: undefined,
      ...(province ? { province: undefined } : {}),
      ...(cityStillValid ? {} : { city: undefined, postalCode: undefined }),
    }));
  };

  // Filter cities by selected district or show all
  const availableCities = form.district && postalData[form.district]
    ? postalData[form.district].map((c) => ({
        city: c.city,
        code: c.code === '*' ? '' : c.code,
      }))
    : ALL_CITIES;

  const validate = (): boolean => {
    const e: FormErrors = {};

    if (!form.fullName.trim()) e.fullName = 'Full name is required.';
    else if (form.fullName.trim().length < 2) e.fullName = 'Name must be at least 2 characters.';

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email.trim() && !emailRe.test(form.email.trim())) {
      e.email = 'Enter a valid email address.';
    }

    const phoneClean = form.phone.replace(/[\s\-()]/g, '');
    const phoneRe = /^(\+94|0)?7[0-9]{8}$/;
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    else if (!phoneRe.test(phoneClean)) e.phone = 'Enter a valid Sri Lankan number (e.g., 0771234567).';

    if (!form.address.trim()) e.address = 'Residential address is required.';
    else if (form.address.trim().length < 10) e.address = 'Please enter a more complete address.';

    if (!form.city) e.city = 'Please select your city.';
    if (!form.district) e.district = 'Please select your district.';
    if (!form.province) e.province = 'Please select your province.';

    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters.';

    if (!form.confirmPassword) e.confirmPassword = 'Please confirm your password.';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match.';

    if (!form.agreed) e.agreed = 'You must agree to the Terms and Conditions.';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      login(
        {
          id: `res_${Date.now()}`,
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          city: form.city,
          postalCode: form.postalCode.trim(),
          district: form.district,
          province: form.province,
          role: 'RESIDENT',
          createdAt: new Date().toISOString(),
        },
        `token_${Date.now()}`
      );
      setTimeout(() => navigate('/', { replace: true }), 1600);
    }, 900);
  };

  // ── Success splash ────────────────────────────────────────────────────────

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas font-sans">
        <div className="text-center max-w-sm px-6 py-12 animate-[fadeIn_.4s_ease]">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-content">Account created!</h2>
          <p className="mt-2 text-sm text-content-secondary">
            Welcome to GreenCycle LK, {form.fullName.split(' ')[0]}. Redirecting you now…
          </p>
          <div className="mt-6 h-1.5 w-full rounded-full bg-border overflow-hidden">
            <div className="h-full bg-secondary rounded-full transition-all duration-[1600ms] ease-linear w-full" />
          </div>
        </div>
      </div>
    );
  }

  // ── Main layout ───────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden w-full flex flex-col lg:flex-row bg-surface font-sans">

      {/* ── LEFT: Brand Panel (Fixed / Stationary) ── */}
      <div className="relative hidden lg:flex lg:w-[40%] xl:w-[36%] lg:h-full shrink-0 bg-[#094833] text-white flex-col justify-between p-8 xl:p-12 2xl:p-14 overflow-hidden select-none">
        {/* decorative waves */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 800 800">
          <path d="M-100 200 C 150 100, 300 400, 900 200 M-100 350 C 200 250, 400 550, 900 350 M-100 500 C 250 400, 500 700, 900 500 M-100 650 C 300 550, 600 850, 900 650" fill="none" stroke="white" strokeWidth="3" />
        </svg>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#04281c] rounded-full blur-2xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 shrink-0">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <img src={greenCycleLogo} alt="GreenCycle LK" className="w-9 h-9 object-contain brightness-0 invert" />
            <div>
              <span className="text-lg font-bold tracking-tight text-white block leading-tight">GreenCycle LK</span>
              <span className="text-xs text-emerald-200/70">Smarter Waste. Greener Sri Lanka.</span>
            </div>
          </Link>
        </div>

        {/* Body */}
        <div className="relative z-10 my-auto py-6">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-4">
            <span className="text-xs text-emerald-200 font-medium">🌱 Join 48,000+ residents</span>
          </div>
          <h1 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white tracking-tight leading-[1.18]">
            Join the green movement today.
          </h1>
          <p className="mt-3 text-xs xl:text-sm text-emerald-100/80 leading-relaxed max-w-xs">
            Create your free account and start scheduling pickups, earning GreenPoints, and contributing to a cleaner Sri Lanka.
          </p>

          <div className="mt-6 space-y-3 xl:space-y-3.5">
            {[
              { emoji: '📅', text: 'Schedule waste pickups at your convenience' },
              { emoji: '🚚', text: 'Track collection trucks in real time' },
              { emoji: '🏅', text: 'Earn GreenPoints and redeem rewards' },
              { emoji: '♻️', text: 'Smart recycling guides for every item' },
            ].map(({ emoji, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-7 h-7 xl:w-8 xl:h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-xs xl:text-sm">{emoji}</div>
                <span className="text-xs xl:text-sm text-emerald-50 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-4 border-t border-white/10 shrink-0">
          <p className="text-xs text-emerald-200/60 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            Colombo · Kandy · Galle · Jaffna — expanding island wide
          </p>
        </div>
      </div>

      {/* ── RIGHT: Form Panel (Scrollable) ── */}
      <div className="w-full lg:flex-1 lg:h-full bg-canvas overflow-y-auto">
        <div className="min-h-full flex items-start justify-center">
          <div className="w-full max-w-lg px-6 sm:px-10 py-10 lg:py-12">

            {/* Mobile logo */}
            <div className="flex lg:hidden items-center gap-2.5 mb-6">
              <img src={greenCycleLogo} alt="GreenCycle LK" className="w-8 h-8 object-contain" />
              <span className="font-bold text-base tracking-tight text-content">
                GreenCycle <span className="text-secondary">LK</span>
              </span>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <h2 className="text-2xl sm:text-3xl font-bold text-content tracking-tight">
                Create your account
              </h2>
              <p className="mt-1.5 text-sm text-content-secondary">
                Create your account and go green 🌱
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">

              {/* Full Name */}
              <Field label="Full Name" htmlFor="reg-fullname" error={errors.fullName} required>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-content-muted pointer-events-none"><UserIcon /></span>
                  <input
                    id="reg-fullname"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setField('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className={`${errors.fullName ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                  />
                </div>
              </Field>

              {/* Email (Optional) */}
              <Field label="Email Address" htmlFor="reg-email" error={errors.email} hint="Optional">
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-content-muted pointer-events-none"><MailIcon /></span>
                  <input
                    id="reg-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setField('email', e.target.value)}
                    placeholder="you@example.lk (optional)"
                    autoComplete="email"
                    className={`${errors.email ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                  />
                </div>
              </Field>

              {/* Phone */}
              <Field label="Phone Number" htmlFor="reg-phone" error={errors.phone} required>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-content-muted pointer-events-none"><PhoneIcon /></span>
                  <span className="absolute left-10 pl-1 text-sm text-content-secondary font-medium pointer-events-none select-none">+94</span>
                  <input
                    id="reg-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                    placeholder="7X XXX XXXX"
                    autoComplete="tel"
                    className={`${errors.phone ? inputError : inputNormal} pl-[4.25rem] pr-4 py-2.5`}
                  />
                </div>
              </Field>

              {/* Address */}
              <Field label="Residential Address" htmlFor="reg-address" error={errors.address} required>
                <div className="relative flex items-start">
                  <span className="absolute left-3.5 top-3 text-content-muted pointer-events-none"><HomeIcon /></span>
                  <textarea
                    id="reg-address"
                    value={form.address}
                    onChange={(e) => setField('address', e.target.value)}
                    placeholder="No. 12, Flower Road, Colombo 03"
                    rows={2}
                    autoComplete="street-address"
                    className={`${errors.address ? inputError : inputNormal} pl-10 pr-4 py-2.5 resize-none`}
                  />
                </div>
              </Field>

              {/* City & Postal Code */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="sm:col-span-2">
                  <Field label="City" htmlFor="reg-city" error={errors.city} required>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><MapPinIcon /></span>
                      <select
                        id="reg-city"
                        value={form.city}
                        onChange={(e) => handleCityChange(e.target.value)}
                        className={`${errors.city ? inputError : inputNormal} pl-10 pr-9 py-2.5 appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>
                          {form.district ? `Select city in ${form.district}` : 'Select your city'}
                        </option>
                        {availableCities.map((c) => (
                          <option key={`${c.city}-${c.code}`} value={c.city}>
                            {c.city} {c.code ? `(${c.code})` : ''}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-3.5 pointer-events-none text-content-muted">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </div>
                  </Field>
                </div>

                <div className="sm:col-span-1">
                  <Field label="Postal Code" htmlFor="reg-postalcode" error={errors.postalCode}>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><HashIcon /></span>
                      <input
                        id="reg-postalcode"
                        type="text"
                        value={form.postalCode}
                        onChange={(e) => setField('postalCode', e.target.value)}
                        placeholder="Postal code"
                        maxLength={10}
                        className={`${errors.postalCode ? inputError : inputNormal} pl-10 pr-3 py-2.5`}
                      />
                    </div>
                  </Field>
                </div>
              </div>

              {/* District & Province */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* District */}
                <Field label="District" htmlFor="reg-district" error={errors.district} required>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><CompassIcon /></span>
                    <select
                      id="reg-district"
                      value={form.district}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      className={`${errors.district ? inputError : inputNormal} pl-10 pr-9 py-2.5 appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>Select district</option>
                      {SRI_LANKA_DISTRICTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <span className="absolute right-3.5 pointer-events-none text-content-muted">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </div>
                </Field>

                {/* Province */}
                <Field label="Province" htmlFor="reg-province" error={errors.province} required>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><MapIcon /></span>
                    <select
                      id="reg-province"
                      value={form.province}
                      onChange={(e) => setField('province', e.target.value)}
                      className={`${errors.province ? inputError : inputNormal} pl-10 pr-9 py-2.5 appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>Select province</option>
                      {SRI_LANKA_PROVINCES.map((p) => (
                        <option key={p} value={p}>{p} Province</option>
                      ))}
                    </select>
                    <span className="absolute right-3.5 pointer-events-none text-content-muted">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </div>
                </Field>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-content-muted px-1">Security</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Password */}
              <Field label="Password" htmlFor="reg-password" error={errors.password} required>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-content-muted pointer-events-none"><LockIcon /></span>
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setField('password', e.target.value)}
                    placeholder="Enter password"
                    autoComplete="new-password"
                    className={`${errors.password ? inputError : inputNormal} pl-10 pr-11 py-2.5`}
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password visibility"
                    className="absolute right-3 p-1 text-content-muted hover:text-content transition-colors">
                    <EyeIcon visible={showPassword} />
                  </button>
                </div>
                <PasswordStrength password={form.password} />
              </Field>

              {/* Confirm Password */}
              <Field label="Confirm Password" htmlFor="reg-confirm" error={errors.confirmPassword} required>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-content-muted pointer-events-none"><LockIcon /></span>
                  <input
                    id="reg-confirm"
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={(e) => setField('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className={`${errors.confirmPassword ? inputError : inputNormal} pl-10 pr-11 py-2.5`}
                  />
                  <button type="button" onClick={() => setShowConfirm((v) => !v)} aria-label="Toggle confirm visibility"
                    className="absolute right-3 p-1 text-content-muted hover:text-content transition-colors">
                    <EyeIcon visible={showConfirm} />
                  </button>
                </div>
                {form.confirmPassword && form.password && (
                  <p className={`text-xs flex items-center gap-1 mt-1.5 font-medium ${
                    form.password === form.confirmPassword ? 'text-secondary' : 'text-red-500'
                  }`}>
                    {form.password === form.confirmPassword ? (
                      <>
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        Passwords match
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        Passwords do not match
                      </>
                    )}
                  </p>
                )}
              </Field>

              {/* Terms */}
              <div className="pt-1">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      id="reg-terms"
                      checked={form.agreed}
                      onChange={(e) => setField('agreed', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 transition-all flex items-center justify-center ${
                      form.agreed
                        ? 'bg-secondary border-secondary'
                        : errors.agreed
                        ? 'border-red-400 bg-red-50'
                        : 'border-border-strong bg-surface group-hover:border-secondary/60'
                    }`}>
                      {form.agreed && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-content-secondary leading-snug">
                    I agree to the{' '}
                    <button type="button" className="text-secondary hover:text-secondary-dark hover:underline font-medium transition-colors">
                      Terms and Conditions
                    </button>
                    {' '}and{' '}
                    <button type="button" className="text-secondary hover:text-secondary-dark hover:underline font-medium transition-colors">
                      Privacy Policy
                    </button>
                  </span>
                </label>
                {errors.agreed && (
                  <p className="mt-1.5 text-xs text-red-600 ml-7">{errors.agreed}</p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="reg-submit-button"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-secondary hover:bg-secondary-dark text-white font-semibold text-sm transition-all duration-150 shadow-sm hover:shadow active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>Creating account…</span>
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>
              </div>

              {/* Login link */}
              <p className="text-center text-sm text-content-secondary">
                Already have an account?{' '}
                <Link to="/login" id="reg-login-link"
                  className="font-semibold text-secondary hover:text-secondary-dark hover:underline transition-colors">
                  Sign in
                </Link>
              </p>

            </form>
          </div>
        </div>
      </div>

    </div>
  );
}
