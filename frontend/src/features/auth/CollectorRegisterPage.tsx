import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers';
import greenCycleLogo from '@/assets/GreenCycle-logo.png';

// ─── Constants ────────────────────────────────────────────────────────────────

const SRI_LANKA_DISTRICTS = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle',
  'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle',
  'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala',
  'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura',
  'Trincomalee', 'Vavuniya',
];

const WASTE_CATEGORIES = [
  { id: 'E-Waste', label: 'E-Waste & Electronics', icon: '🔌', desc: 'Computers, appliances, circuit boards, batteries' },
  { id: 'Plastics', label: 'Plastics & Polythene', icon: '♻️', desc: 'PET bottles, HDPE containers, industrial plastic' },
  { id: 'Paper', label: 'Paper & Cardboard', icon: '📄', desc: 'Corrugated cartons, newspapers, office paper' },
  { id: 'Metals', label: 'Metal & Scrap Iron', icon: '🥫', desc: 'Aluminium cans, steel, copper, automotive scrap' },
  { id: 'Glass', label: 'Glass Bottles & Jars', icon: '🍾', desc: 'Beverage bottles, sheet glass, culinary glass' },
  { id: 'Organic', label: 'Organic & Food Scraps', icon: '🍃', desc: 'Compostable restaurant & commercial food waste' },
  { id: 'Hazardous', label: 'Hazardous & Chemicals', icon: '⚠️', desc: 'Solvents, medical, paints, industrial chemicals' },
  { id: 'Bulky', label: 'Bulky & Construction Waste', icon: '🛋️', desc: 'Furniture, demolition rubble, heavy debris' },
];

const SERVICE_MODES = [
  { id: 'Doorstep Pickup', label: 'Doorstep / On-site Pickup', desc: 'Fleet visits customer locations' },
  { id: 'Public Drop-off', label: 'Accepts Public Drop-offs', desc: 'Public brings waste to your facility' },
  { id: 'Buyback / Payment', label: 'Scrap Buyback / Payment', desc: 'We pay citizens or give GreenPoints' },
];

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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function BuildingIcon() {
  return (
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
  );
}

function IdCardIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <line x1="15" y1="8" x2="17" y2="8" />
      <line x1="15" y1="12" x2="17" y2="12" />
      <line x1="7" y1="16" x2="17" y2="16" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1-18 0z" />
      <circle cx="12" cy="10" r="3" />
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

function CameraIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function RecycleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16 3 3-3 3" />
      <path d="M8.293 13.596 5.5 9.5 9.4 2.768a1.84 1.84 0 0 1 1.565-.968h3.07a1.84 1.84 0 0 1 1.565.968L17.5 6.5" />
      <path d="m17 4-3-3 3-3" />
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
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
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

// ─── Input Base Classes ───────────────────────────────────────────────────────

const inputBase = 'w-full rounded-xl border text-sm text-content placeholder:text-content-muted focus:outline-none focus:ring-2 transition-all';
const inputNormal = `${inputBase} border-border bg-surface focus:border-secondary focus:ring-secondary/15`;
const inputError = `${inputBase} border-red-300 bg-red-50/40 focus:border-red-400 focus:ring-red-200`;

// ─── Form State Interfaces ───────────────────────────────────────────────────

interface CollectorFormData {
  // 1. Organization / Facility Information
  organizationName: string;
  collectorType: string;
  brNumber: string;
  facilityAddress: string;
  district: string;
  operatingArea: string;

  // 2. Waste Categories & Services
  acceptedWasteTypes: string[];
  serviceModes: string[];

  // 3. Representative Contact Information
  representativeName: string;
  email: string;
  phone: string;
  nic: string;
  profilePhoto: string | null;

  // 4. Login Information
  username: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
}

interface CollectorFormErrors {
  organizationName?: string;
  collectorType?: string;
  facilityAddress?: string;
  district?: string;
  operatingArea?: string;
  acceptedWasteTypes?: string;
  representativeName?: string;
  email?: string;
  phone?: string;
  nic?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  agreed?: string;
}

// ─── CollectorRegisterPage Component ─────────────────────────────────────────

export function CollectorRegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<CollectorFormData>({
    organizationName: '',
    collectorType: 'Private Collection Service',
    brNumber: '',
    facilityAddress: '',
    district: '',
    operatingArea: '',
    acceptedWasteTypes: ['E-Waste', 'Plastics'],
    serviceModes: ['Doorstep Pickup', 'Public Drop-off'],
    representativeName: '',
    email: '',
    phone: '',
    nic: '',
    profilePhoto: null,
    username: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });

  const [errors, setErrors] = useState<CollectorFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const setField = <K extends keyof CollectorFormData>(key: K, value: CollectorFormData[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      // Auto-suggest username from email if username is empty
      if (key === 'email' && !prev.username) {
        next.username = String(value).split('@')[0] || '';
      }
      return next;
    });

    const errKey = key as keyof CollectorFormErrors;
    if (errors[errKey]) {
      setErrors((prev) => ({ ...prev, [errKey]: undefined }));
    }
  };

  const toggleWasteCategory = (id: string) => {
    setForm((prev) => {
      const exists = prev.acceptedWasteTypes.includes(id);
      const updated = exists
        ? prev.acceptedWasteTypes.filter((w) => w !== id)
        : [...prev.acceptedWasteTypes, id];
      return { ...prev, acceptedWasteTypes: updated };
    });
    if (errors.acceptedWasteTypes) {
      setErrors((prev) => ({ ...prev, acceptedWasteTypes: undefined }));
    }
  };

  const toggleServiceMode = (id: string) => {
    setForm((prev) => {
      const exists = prev.serviceModes.includes(id);
      const updated = exists
        ? prev.serviceModes.filter((m) => m !== id)
        : [...prev.serviceModes, id];
      return { ...prev, serviceModes: updated };
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, JPEG)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Photo must be smaller than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setField('profilePhoto', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setField('profilePhoto', null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validate = (): boolean => {
    const e: CollectorFormErrors = {};

    // 1. Organization / Facility Details
    if (!form.organizationName.trim()) {
      e.organizationName = 'Business or disposal center name is required.';
    } else if (form.organizationName.trim().length < 2) {
      e.organizationName = 'Name must be at least 2 characters.';
    }

    if (!form.facilityAddress.trim()) {
      e.facilityAddress = 'Depot or facility address is required.';
    }

    if (!form.district) {
      e.district = 'Please select the primary operational district.';
    }

    if (!form.operatingArea.trim()) {
      e.operatingArea = 'Operating coverage area is required (e.g. Colombo & Suburbs).';
    }

    // 2. Waste Categories
    if (form.acceptedWasteTypes.length === 0) {
      e.acceptedWasteTypes = 'Please select at least one waste stream you collect or accept.';
    }

    // 3. Representative Information
    if (!form.representativeName.trim()) {
      e.representativeName = 'Representative contact name is required.';
    } else if (form.representativeName.trim().length < 2) {
      e.representativeName = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      e.email = 'Official contact email is required.';
    } else if (!emailRegex.test(form.email.trim())) {
      e.email = 'Please enter a valid email address.';
    }

    const phoneClean = form.phone.replace(/[\s-]/g, '');
    const phoneRegex = /^(?:\+94|0)[0-9]{8,11}$/;
    if (!phoneClean) {
      e.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(phoneClean)) {
      e.phone = 'Enter a valid Sri Lankan telephone or mobile number.';
    }

    if (!form.nic.trim()) {
      e.nic = 'NIC or Identification number is required for verification.';
    }

    // 4. Login Information
    if (!form.username.trim()) {
      e.username = 'Username or login email is required.';
    } else if (form.username.trim().length < 3) {
      e.username = 'Username must be at least 3 characters.';
    }

    if (!form.password) {
      e.password = 'Password is required.';
    } else if (form.password.length < 8) {
      e.password = 'Password must be at least 8 characters.';
    }

    if (!form.confirmPassword) {
      e.confirmPassword = 'Please confirm your password.';
    } else if (form.password !== form.confirmPassword) {
      e.confirmPassword = 'Passwords do not match.';
    }

    if (!form.agreed) {
      e.agreed = 'You must agree to the Environmental Handling Guidelines and Terms.';
    }

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
          id: `col_${Date.now()}`,
          fullName: form.representativeName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          role: 'COLLECTOR',
          avatarUrl: form.profilePhoto || undefined,
          organizationName: form.organizationName.trim(),
          collectorType: form.collectorType,
          brNumber: form.brNumber.trim() || undefined,
          address: form.facilityAddress.trim(),
          district: form.district,
          operatingArea: form.operatingArea.trim(),
          acceptedWasteTypes: form.acceptedWasteTypes,
          serviceModes: form.serviceModes,
          nic: form.nic.trim(),
          username: form.username.trim(),
          createdAt: new Date().toISOString(),
        },
        `token_${Date.now()}`
      );

      setTimeout(() => navigate('/collector/dashboard', { replace: true }), 1600);
    }, 900);
  };

  // ── Success Splash Screen ───────────────────────────────────────────────────

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
          <h2 className="text-2xl font-bold text-content">Collector Registered!</h2>
          <p className="mt-2 text-sm text-content-secondary">
            Welcome, {form.organizationName}. Your waste collection &amp; disposal center profile is ready!
          </p>
          <div className="mt-6 h-1.5 w-full rounded-full bg-border overflow-hidden">
            <div className="h-full bg-secondary rounded-full transition-all duration-[1600ms] ease-linear w-full" />
          </div>
        </div>
      </div>
    );
  }

  // ── Main Layout ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden w-full flex flex-col lg:flex-row bg-surface font-sans">
      {/* ── LEFT: Brand Panel (Fixed / Stationary) ── */}
      <div className="relative hidden lg:flex lg:w-[40%] xl:w-[36%] lg:h-full shrink-0 bg-[#094833] text-white flex-col justify-between p-8 xl:p-12 2xl:p-14 overflow-hidden select-none">
        {/* Decorative background waves */}
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

        {/* Brand Body */}
        <div className="relative z-10 my-auto py-6">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-4">
            <span className="text-xs text-emerald-200 font-medium">♻️ Independent Collector &amp; Drop-off Network</span>
          </div>
          <h1 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white tracking-tight leading-[1.18]">
            Specialized Collection. Cleaner Island.
          </h1>
          <p className="mt-3 text-xs xl:text-sm text-emerald-100/80 leading-relaxed max-w-xs">
            Connect your specialized collection service or disposal depot with citizens and commercial entities seeking responsible waste disposal across Sri Lanka.
          </p>

          <div className="mt-6 space-y-3 xl:space-y-3.5">
            {[
              { emoji: '📦', text: 'Targeted pickup requests for your specific waste categories' },
              { emoji: '📍', text: 'Feature on GreenCycle’s island-wide public disposal map' },
              { emoji: '💵', text: 'Support recyclable scrap buyback & citizen reward points' },
              { emoji: '📊', text: 'Real-time tonnage tracking & transparent recycling records' },
            ].map(({ emoji, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-7 h-7 xl:w-8 xl:h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-xs xl:text-sm">
                  {emoji}
                </div>
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
            <span>Verified Waste Service Provider • Central Environmental Authority (CEA) Standards</span>
          </p>
        </div>
      </div>

      {/* ── RIGHT: Form Panel (Scrollable) ── */}
      <div className="w-full lg:flex-1 lg:h-full bg-canvas overflow-y-auto">
        <div className="min-h-full flex items-start justify-center">
          <div className="w-full max-w-xl px-6 sm:px-10 py-10 lg:py-12">
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 text-xs text-content-muted hover:text-content transition-colors font-medium"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to roles
              </Link>
              <span className="text-xs text-content-muted">
                Already registered?{' '}
                <Link to="/login" className="text-secondary font-semibold hover:underline">
                  Sign in
                </Link>
              </span>
            </div>

            {/* Title Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-primary-light text-primary text-xs font-semibold mb-2.5">
                <RecycleIcon />
                <span>Third-Party Collector &amp; Drop-off Center</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-content tracking-tight">
                Register as a Waste Collector
              </h2>
              <p className="text-content-muted text-sm mt-1.5 leading-relaxed">
                List your independent collection service or disposal hub to receive pickup bookings and accept drop-offs.
              </p>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* ════════ SECTION 1: Facility / Business Information ════════ */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-1 border-b border-border">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary/15 text-secondary text-xs font-bold">
                    1
                  </span>
                  <h3 className="text-sm font-semibold text-content uppercase tracking-wider">
                    Collector / Facility Information
                  </h3>
                </div>

                {/* Facility / Organization Name */}
                <Field
                  label="Organization / Facility Name"
                  htmlFor="col-org-name"
                  error={errors.organizationName}
                  required
                >
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><BuildingIcon /></span>
                    <input
                      id="col-org-name"
                      type="text"
                      value={form.organizationName}
                      onChange={(e) => setField('organizationName', e.target.value)}
                      placeholder="e.g. Lanka Green Scrap Recyclers"
                      className={`${errors.organizationName ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                    />
                  </div>
                </Field>

                {/* Business Registration (BR) Number */}
                <Field
                  label="Business Registration (BR) Number"
                  htmlFor="col-br"
                  hint="Optional for independent operators"
                >
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><HashIcon /></span>
                    <input
                      id="col-br"
                      type="text"
                      value={form.brNumber}
                      onChange={(e) => setField('brNumber', e.target.value)}
                      placeholder="e.g. PV-00234567 or W/12345"
                      className={`${inputNormal} pl-10 pr-4 py-2.5`}
                    />
                  </div>
                </Field>

                {/* Facility Address */}
                <Field
                  label="Depot / Facility Physical Address"
                  htmlFor="col-facility-address"
                  error={errors.facilityAddress}
                  required
                >
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><MapPinIcon /></span>
                    <input
                      id="col-facility-address"
                      type="text"
                      value={form.facilityAddress}
                      onChange={(e) => setField('facilityAddress', e.target.value)}
                      placeholder="e.g. 142/B Baseline Road, Dematagoda, Colombo 09"
                      className={`${errors.facilityAddress ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                    />
                  </div>
                </Field>

                {/* Primary District */}
                <Field
                  label="Primary Base District"
                  htmlFor="col-district"
                  error={errors.district}
                  required
                  hint="Main operating hub"
                >
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><MapPinIcon /></span>
                    <select
                      id="col-district"
                      value={form.district}
                      onChange={(e) => setField('district', e.target.value)}
                      className={`${errors.district ? inputError : inputNormal} pl-10 pr-9 py-2.5 appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>Select primary district</option>
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

                {/* Service Coverage Area - Full Width */}
                <Field
                  label="Service Coverage Area"
                  htmlFor="col-coverage"
                  error={errors.operatingArea}
                  required
                  hint="Cities, zones, or regions where you collect"
                >
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><MapPinIcon /></span>
                    <input
                      id="col-coverage"
                      type="text"
                      value={form.operatingArea}
                      onChange={(e) => setField('operatingArea', e.target.value)}
                      placeholder="e.g. Colombo 01-15, Dehiwala, Gampaha District, or Island-wide"
                      className={`${errors.operatingArea ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                    />
                  </div>
                </Field>
              </div>

              {/* ════════ SECTION 2: Accepted Waste Streams & Services ════════ */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 pb-1 border-b border-border">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary/15 text-secondary text-xs font-bold">
                    2
                  </span>
                  <h3 className="text-sm font-semibold text-content uppercase tracking-wider">
                    Accepted Waste Categories &amp; Services
                  </h3>
                </div>

                {/* Multi-select Waste Categories */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-content">
                      Waste Types You Collect or Accept <span className="text-red-500">*</span>
                    </label>
                    <span className="text-xs text-content-muted">Select all that apply</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {WASTE_CATEGORIES.map((cat) => {
                      const selected = form.acceptedWasteTypes.includes(cat.id);
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => toggleWasteCategory(cat.id)}
                          className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                            selected
                              ? 'border-secondary bg-secondary/5 ring-1 ring-secondary/30'
                              : 'border-border bg-surface hover:bg-muted'
                          }`}
                        >
                          <span className="text-2xl shrink-0 mt-0.5">{cat.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-semibold text-content">{cat.label}</p>
                              <span
                                className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ml-1.5 ${
                                  selected ? 'border-secondary bg-secondary text-white' : 'border-border'
                                }`}
                              >
                                {selected && (
                                  <svg className="w-3 h-3 stroke-current stroke-[3]" viewBox="0 0 24 24" fill="none">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                )}
                              </span>
                            </div>
                            <p className="text-[11px] text-content-muted leading-tight mt-0.5">{cat.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {errors.acceptedWasteTypes && (
                    <p className="text-xs text-red-600">{errors.acceptedWasteTypes}</p>
                  )}
                </div>

                {/* Service Modes Provided */}
                <div className="space-y-2 pt-1">
                  <label className="block text-sm font-medium text-content">
                    Services Provided to Citizens &amp; Businesses
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {SERVICE_MODES.map((mode) => {
                      const selected = form.serviceModes.includes(mode.id);
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => toggleServiceMode(mode.id)}
                          className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            selected
                              ? 'border-secondary bg-secondary/5 ring-1 ring-secondary/20'
                              : 'border-border bg-surface hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-1">
                            <span className="text-xs font-medium text-content">{mode.label}</span>
                            <span
                              className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                                selected ? 'border-secondary bg-secondary text-white' : 'border-border'
                              }`}
                            >
                              {selected && (
                                <svg className="w-2.5 h-2.5 stroke-current stroke-[3]" viewBox="0 0 24 24" fill="none">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </span>
                          </div>
                          <span className="text-[10px] text-content-muted">{mode.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ════════ SECTION 3: Authorized Representative ════════ */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 pb-1 border-b border-border">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary/15 text-secondary text-xs font-bold">
                    3
                  </span>
                  <h3 className="text-sm font-semibold text-content uppercase tracking-wider">
                    Authorized Representative
                  </h3>
                </div>

                {/* Profile / Facility Photo (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-content mb-1.5">
                    Facility / Representative Photo <span className="text-xs text-content-muted font-normal">(Optional)</span>
                  </label>
                  <div className="flex items-center gap-4 p-3 rounded-xl border border-dashed border-border bg-surface">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-muted flex items-center justify-center shrink-0 border border-border">
                      {form.profilePhoto ? (
                        <img src={form.profilePhoto} alt="Facility preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-content-muted"><UserIcon /></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-content bg-surface hover:bg-muted transition-colors inline-flex items-center gap-1.5"
                        >
                          <CameraIcon />
                          {form.profilePhoto ? 'Change photo' : 'Upload photo'}
                        </button>
                        {form.profilePhoto && (
                          <button
                            type="button"
                            onClick={removePhoto}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <p className="text-[11px] text-content-muted mt-1">Logo, facility yard, or contact photo (PNG, JPG up to 5MB)</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                </div>

                {/* Representative Full Name */}
                <Field label="Representative Full Name" htmlFor="col-rep-name" error={errors.representativeName} required>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><UserIcon /></span>
                    <input
                      id="col-rep-name"
                      type="text"
                      value={form.representativeName}
                      onChange={(e) => setField('representativeName', e.target.value)}
                      placeholder="e.g. Kasun Wickramasinghe"
                      autoComplete="name"
                      className={`${errors.representativeName ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                    />
                  </div>
                </Field>

                {/* Official Contact Email */}
                <Field label="Contact Email Address" htmlFor="col-email" error={errors.email} required>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><MailIcon /></span>
                    <input
                      id="col-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setField('email', e.target.value)}
                      placeholder="contact@ecorecycle.lk"
                      autoComplete="email"
                      className={`${errors.email ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                    />
                  </div>
                </Field>

                {/* Phone & NIC (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Field label="Contact Phone Number" htmlFor="col-phone" error={errors.phone} required>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><PhoneIcon /></span>
                      <input
                        id="col-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setField('phone', e.target.value)}
                        placeholder="077 123 4567 or 011 234 5678"
                        autoComplete="tel"
                        className={`${errors.phone ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                      />
                    </div>
                  </Field>

                  <Field label="Representative NIC / ID" htmlFor="col-nic" error={errors.nic} required hint="Sri Lankan NIC">
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><IdCardIcon /></span>
                      <input
                        id="col-nic"
                        type="text"
                        value={form.nic}
                        onChange={(e) => setField('nic', e.target.value)}
                        placeholder="e.g. 198812345678 or 881234567V"
                        className={`${errors.nic ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                      />
                    </div>
                  </Field>
                </div>
              </div>

              {/* ════════ SECTION 4: Login Information ════════ */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 pb-1 border-b border-border">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary/15 text-secondary text-xs font-bold">
                    4
                  </span>
                  <h3 className="text-sm font-semibold text-content uppercase tracking-wider">
                    Portal Login Credentials
                  </h3>
                </div>

                {/* Username or Email */}
                <Field label="Username or Login Email" htmlFor="col-username" error={errors.username} required>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10">
                      <span className="text-xs font-bold">@</span>
                    </span>
                    <input
                      id="col-username"
                      type="text"
                      value={form.username}
                      onChange={(e) => setField('username', e.target.value)}
                      placeholder="e.g. ecorecycle or email address"
                      autoComplete="username"
                      className={`${errors.username ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                    />
                  </div>
                </Field>

                {/* Password */}
                <Field label="Password" htmlFor="col-password" error={errors.password} required>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><LockIcon /></span>
                    <input
                      id="col-password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => setField('password', e.target.value)}
                      placeholder="Min. 8 characters"
                      autoComplete="new-password"
                      className={`${errors.password ? inputError : inputNormal} pl-10 pr-10 py-2.5`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 text-content-muted hover:text-content transition-colors p-1"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <EyeIcon visible={showPassword} />
                    </button>
                  </div>
                  <PasswordStrength password={form.password} />
                </Field>

                {/* Confirm Password */}
                <Field label="Confirm Password" htmlFor="col-confirm" error={errors.confirmPassword} required>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><LockIcon /></span>
                    <input
                      id="col-confirm"
                      type={showConfirm ? 'text' : 'password'}
                      value={form.confirmPassword}
                      onChange={(e) => setField('confirmPassword', e.target.value)}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      className={`${errors.confirmPassword ? inputError : inputNormal} pl-10 pr-10 py-2.5`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 text-content-muted hover:text-content transition-colors p-1"
                      aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    >
                      <EyeIcon visible={showConfirm} />
                    </button>
                  </div>
                </Field>
              </div>

              {/* ── Terms & Environmental Code Agreement Checkbox ── */}
              <div className="space-y-1 pt-1">
                <label className="flex items-start gap-3 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    checked={form.agreed}
                    onChange={(e) => setField('agreed', e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-border text-secondary accent-secondary focus:ring-secondary/20 cursor-pointer"
                  />
                  <span className="text-xs text-content-secondary leading-relaxed">
                    I agree to the{' '}
                    <a href="#terms" className="text-secondary font-medium hover:underline">Terms of Service</a>,{' '}
                    <a href="#environmental" className="text-secondary font-medium hover:underline">
                      Safe Environmental Waste Handling Protocols
                    </a>
                    , and verify that our collection facility operates in compliance with Central Environmental Authority standards.
                  </span>
                </label>
                {errors.agreed && (
                  <p className="text-xs text-red-600 pl-7">{errors.agreed}</p>
                )}
              </div>

              {/* ── Submit Button ── */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Registering collector &amp; disposal center profile…</span>
                  </>
                ) : (
                  <>
                    <span>Complete Collector Registration</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>

              {/* Security Footnote */}
              <p className="text-center text-[11px] text-content-muted flex items-center justify-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Encrypted transmission • Direct integration into GreenCycle LK recycling network</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
