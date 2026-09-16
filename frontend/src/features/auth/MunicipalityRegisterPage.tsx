import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers';
import greenCycleLogo from '@/assets/GreenCycle-logo.png';

// ─── Sri Lankan Geographic Constants ──────────────────────────────────────────

const SRI_LANKA_DISTRICTS = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle',
  'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle',
  'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala',
  'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura',
  'Trincomalee', 'Vavuniya',
];

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

const AUTHORITY_TYPES = [
  { id: 'Municipal Council', label: 'Municipal Council', desc: 'Major city administration (e.g. CMC, KMC)' },
  { id: 'Urban Council', label: 'Urban Council', desc: 'Township / suburban council' },
  { id: 'Pradeshiya Sabha', label: 'Pradeshiya Sabha', desc: 'Regional / rural division council' },
];

const DESIGNATION_SUGGESTIONS = [
  'Municipal Commissioner',
  'Director of Solid Waste Management',
  'Chief Medical Officer of Health (MOH)',
  'Superintending Engineer / Works Director',
  'Environmental Officer / Sanitation Head',
  'IT / Smart City Systems Administrator',
  'Council Secretary / Administrative Officer',
];

// ─── Inline Icons ─────────────────────────────────────────────────────────────

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

function BriefcaseIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
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

function FileTextIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
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

interface MunicipalityFormData {
  // 1. Municipality Information
  municipalityName: string;
  authorityType: string;
  district: string;
  province: string;
  officeAddress: string;
  postalCode: string;
  officialPhone: string;
  officialEmail: string;

  // 2. Authorized Administrator
  adminFullName: string;
  adminDesignation: string;
  adminContactNumber: string;
  adminEmail: string;
  adminNic: string;

  // 3. Account Information
  username: string;
  password: string;
  confirmPassword: string;

  // 4. Verification
  documentFile: File | null;
  documentFileName: string;
  termsAgreed: boolean;
  authorizationDeclared: boolean;
}

interface MunicipalityFormErrors {
  municipalityName?: string;
  authorityType?: string;
  district?: string;
  province?: string;
  officeAddress?: string;
  postalCode?: string;
  officialPhone?: string;
  officialEmail?: string;

  adminFullName?: string;
  adminDesignation?: string;
  adminContactNumber?: string;
  adminEmail?: string;
  adminNic?: string;

  username?: string;
  password?: string;
  confirmPassword?: string;

  documentFile?: string;
  termsAgreed?: string;
  authorizationDeclared?: string;
}

// ─── MunicipalityRegisterPage Component ──────────────────────────────────────

export function MunicipalityRegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const docInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<MunicipalityFormData>({
    municipalityName: '',
    authorityType: 'Municipal Council',
    district: '',
    province: '',
    officeAddress: '',
    postalCode: '',
    officialPhone: '',
    officialEmail: '',

    adminFullName: '',
    adminDesignation: '',
    adminContactNumber: '',
    adminEmail: '',
    adminNic: '',

    username: '',
    password: '',
    confirmPassword: '',

    documentFile: null,
    documentFileName: '',
    termsAgreed: false,
    authorizationDeclared: false,
  });

  const [errors, setErrors] = useState<MunicipalityFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const setField = <K extends keyof MunicipalityFormData>(key: K, value: MunicipalityFormData[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };

      // Auto-suggest username if adminEmail changes and username is empty
      if (key === 'adminEmail' && !prev.username) {
        next.username = String(value).split('@')[0] || '';
      }

      // Auto-fill province when district is changed
      if (key === 'district') {
        const prov = DISTRICT_TO_PROVINCE[String(value)];
        if (prov) next.province = prov;
      }

      return next;
    });

    const errKey = key as keyof MunicipalityFormErrors;
    if (errors[errKey]) {
      setErrors((prev) => ({ ...prev, [errKey]: undefined }));
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Document size must be under 10MB.');
      return;
    }

    setForm((prev) => ({
      ...prev,
      documentFile: file,
      documentFileName: file.name,
    }));

    if (errors.documentFile) {
      setErrors((prev) => ({ ...prev, documentFile: undefined }));
    }
  };

  const removeDocument = () => {
    setForm((prev) => ({
      ...prev,
      documentFile: null,
      documentFileName: '',
    }));
    if (docInputRef.current) docInputRef.current.value = '';
  };

  const validate = (): boolean => {
    const e: MunicipalityFormErrors = {};

    // 1. Municipality Information
    if (!form.municipalityName.trim()) {
      e.municipalityName = 'Municipality / Local Authority name is required.';
    }

    if (!form.authorityType) {
      e.authorityType = 'Please select a local authority type.';
    }

    if (!form.district) {
      e.district = 'District is required.';
    }

    if (!form.province) {
      e.province = 'Province is required.';
    }

    if (!form.officeAddress.trim()) {
      e.officeAddress = 'Official office address is required.';
    }

    if (!form.postalCode.trim()) {
      e.postalCode = 'Postal code is required.';
    }

    const phoneRegex = /^(?:\+94|0)[0-9\s-]{8,12}$/;
    if (!form.officialPhone.trim()) {
      e.officialPhone = 'Official phone number is required.';
    } else if (!phoneRegex.test(form.officialPhone.trim())) {
      e.officialPhone = 'Enter a valid phone number (e.g. 011 269 5121).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.officialEmail.trim()) {
      e.officialEmail = 'Official email address is required.';
    } else if (!emailRegex.test(form.officialEmail.trim())) {
      e.officialEmail = 'Please enter a valid official email.';
    }

    // 2. Authorized Administrator
    if (!form.adminFullName.trim()) {
      e.adminFullName = 'Administrator full name is required.';
    } else if (form.adminFullName.trim().length < 2) {
      e.adminFullName = 'Name must be at least 2 characters.';
    }

    if (!form.adminDesignation.trim()) {
      e.adminDesignation = 'Designation or position is required.';
    }

    if (!form.adminContactNumber.trim()) {
      e.adminContactNumber = 'Administrator contact number is required.';
    } else if (!phoneRegex.test(form.adminContactNumber.trim())) {
      e.adminContactNumber = 'Enter a valid Sri Lankan mobile number (e.g. 077 123 4567).';
    }

    if (!form.adminEmail.trim()) {
      e.adminEmail = 'Administrator email address is required.';
    } else if (!emailRegex.test(form.adminEmail.trim())) {
      e.adminEmail = 'Please enter a valid email.';
    }

    if (!form.adminNic.trim()) {
      e.adminNic = 'NIC or Municipal Employee ID is required for verification.';
    }

    // 3. Account Information
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

    // 4. Verification
    if (!form.termsAgreed) {
      e.termsAgreed = 'You must agree to the GreenCycle Terms & Conditions.';
    }

    if (!form.authorizationDeclared) {
      e.authorizationDeclared = 'You must declare that you are legally authorized to register this municipality.';
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
          id: `muni_${Date.now()}`,
          fullName: form.adminFullName.trim(),
          email: form.adminEmail.trim(),
          phone: form.adminContactNumber.trim(),
          role: 'ADMIN',
          municipality: form.municipalityName.trim(),
          district: form.district,
          province: form.province,
          address: form.officeAddress.trim(),
          postalCode: form.postalCode.trim(),
          nic: form.adminNic.trim(),
          designation: form.adminDesignation.trim(),
          username: form.username.trim(),
          createdAt: new Date().toISOString(),
        },
        `token_${Date.now()}`
      );

      setTimeout(() => navigate('/dashboard', { replace: true }), 1600);
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
          <h2 className="text-2xl font-bold text-content">Municipality Registered!</h2>
          <p className="mt-2 text-sm text-content-secondary">
            Welcome, {form.municipalityName}. Redirecting to your municipal administrative overview…
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
            <span className="text-xs text-emerald-200 font-medium">🏛️ Municipal Authority Portal</span>
          </div>
          <h1 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white tracking-tight leading-[1.18]">
            Empowering Municipalities Across Sri Lanka.
          </h1>
          <p className="mt-3 text-xs xl:text-sm text-emerald-100/80 leading-relaxed max-w-xs">
            Unify your council’s waste operations. Dispatch collection fleets, track ward diversion rates, and manage smart recycling infrastructure.
          </p>

          <div className="mt-6 space-y-3 xl:space-y-3.5">
            {[
              { emoji: '📊', text: 'City-wide waste stream analytics & diversion KPIs' },
              { emoji: '🚛', text: 'Real-time fleet dispatch & collector route oversight' },
              { emoji: '📍', text: 'Ward & zone-based collection schedules & citizen alerts' },
              { emoji: '📑', text: 'Transparent municipal reporting & complaint resolution' },
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
            <span>Sri Lanka Local Government &amp; Environmental Authority Integration</span>
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
                <BuildingIcon />
                <span>Municipal &amp; Local Authority Portal</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-content tracking-tight">
                Register your Municipality
              </h2>
              <p className="text-content-muted text-sm mt-1.5 leading-relaxed">
                Connect your municipal council, urban council, or pradeshiya sabha to start coordinating city-wide waste collection.
              </p>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* ════════ SECTION 1: Municipality Information ════════ */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-1 border-b border-border">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary/15 text-secondary text-xs font-bold">
                    1
                  </span>
                  <h3 className="text-sm font-semibold text-content uppercase tracking-wider">
                    Municipality Information
                  </h3>
                </div>

                {/* Local Authority Type Selection */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-content">
                    Local Authority Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {AUTHORITY_TYPES.map((type) => {
                      const selected = form.authorityType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setField('authorityType', type.id)}
                          className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            selected
                              ? 'border-secondary bg-secondary/5 ring-2 ring-secondary/20'
                              : 'border-border bg-surface hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-1">
                            <span className="text-xs font-semibold text-content">{type.label}</span>
                            <span
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                selected ? 'border-secondary bg-secondary' : 'border-border'
                              }`}
                            >
                              {selected && <span className="w-1.5 h-1.5 rounded-full bg-white block" />}
                            </span>
                          </div>
                          <span className="text-[11px] text-content-muted line-clamp-1">{type.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.authorityType && <p className="text-xs text-red-600">{errors.authorityType}</p>}
                </div>

                {/* Municipality / Local Authority Name */}
                <Field
                  label="Municipality / Local Authority Name"
                  htmlFor="muni-name"
                  error={errors.municipalityName}
                  required
                  hint="e.g. Colombo Municipal Council"
                >
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><BuildingIcon /></span>
                    <input
                      id="muni-name"
                      type="text"
                      value={form.municipalityName}
                      onChange={(e) => setField('municipalityName', e.target.value)}
                      placeholder="e.g. Colombo Municipal Council"
                      className={`${errors.municipalityName ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                    />
                  </div>
                </Field>

                {/* District & Province (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* District */}
                  <Field label="District" htmlFor="muni-district" error={errors.district} required>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><MapPinIcon /></span>
                      <select
                        id="muni-district"
                        value={form.district}
                        onChange={(e) => setField('district', e.target.value)}
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
                  <Field label="Province" htmlFor="muni-province" error={errors.province} required>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><MapPinIcon /></span>
                      <select
                        id="muni-province"
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

                {/* Office Address & Postal Code (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="sm:col-span-2">
                    <Field label="Municipality Office Address" htmlFor="muni-address" error={errors.officeAddress} required>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><MapPinIcon /></span>
                        <input
                          id="muni-address"
                          type="text"
                          value={form.officeAddress}
                          onChange={(e) => setField('officeAddress', e.target.value)}
                          placeholder="e.g. Town Hall, Colombo 07"
                          className={`${errors.officeAddress ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                        />
                      </div>
                    </Field>
                  </div>

                  <div className="sm:col-span-1">
                    <Field label="Postal Code" htmlFor="muni-postal" error={errors.postalCode} required>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><HashIcon /></span>
                        <input
                          id="muni-postal"
                          type="text"
                          value={form.postalCode}
                          onChange={(e) => setField('postalCode', e.target.value)}
                          placeholder="00700"
                          maxLength={10}
                          className={`${errors.postalCode ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                        />
                      </div>
                    </Field>
                  </div>
                </div>

                {/* Official Contact Phone & Email (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Field label="Official Phone Number" htmlFor="muni-phone" error={errors.officialPhone} required>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><PhoneIcon /></span>
                      <input
                        id="muni-phone"
                        type="tel"
                        value={form.officialPhone}
                        onChange={(e) => setField('officialPhone', e.target.value)}
                        placeholder="011 269 5121"
                        className={`${errors.officialPhone ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                      />
                    </div>
                  </Field>

                  <Field label="Official Email Address" htmlFor="muni-email" error={errors.officialEmail} required>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><MailIcon /></span>
                      <input
                        id="muni-email"
                        type="email"
                        value={form.officialEmail}
                        onChange={(e) => setField('officialEmail', e.target.value)}
                        placeholder="info@colombo.mc.gov.lk"
                        className={`${errors.officialEmail ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                      />
                    </div>
                  </Field>
                </div>
              </div>

              {/* ════════ SECTION 2: Authorized Administrator ════════ */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between pb-1 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary/15 text-secondary text-xs font-bold">
                      2
                    </span>
                    <h3 className="text-sm font-semibold text-content uppercase tracking-wider">
                      Authorized Administrator
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-content-muted -mt-1">
                  This person will manage the municipality&apos;s GreenCycle-LK account and fleet operations.
                </p>

                {/* Administrator Full Name */}
                <Field label="Administrator Full Name" htmlFor="muni-admin-name" error={errors.adminFullName} required>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><UserIcon /></span>
                    <input
                      id="muni-admin-name"
                      type="text"
                      value={form.adminFullName}
                      onChange={(e) => setField('adminFullName', e.target.value)}
                      placeholder="e.g. Eng. Priyantha Dissanayake"
                      autoComplete="name"
                      className={`${errors.adminFullName ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                    />
                  </div>
                </Field>

                {/* Designation / Position */}
                <Field
                  label="Designation / Position"
                  htmlFor="muni-admin-desig"
                  error={errors.adminDesignation}
                  required
                  hint="Official title"
                >
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><BriefcaseIcon /></span>
                    <input
                      id="muni-admin-desig"
                      type="text"
                      list="designation-suggestions"
                      value={form.adminDesignation}
                      onChange={(e) => setField('adminDesignation', e.target.value)}
                      placeholder="e.g. Director of Solid Waste Management"
                      className={`${errors.adminDesignation ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                    />
                    <datalist id="designation-suggestions">
                      {DESIGNATION_SUGGESTIONS.map((s) => (
                        <option key={s} value={s} />
                      ))}
                    </datalist>
                  </div>
                </Field>

                {/* Administrator Phone & Email (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Field label="Contact Number" htmlFor="muni-admin-phone" error={errors.adminContactNumber} required>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><PhoneIcon /></span>
                      <input
                        id="muni-admin-phone"
                        type="tel"
                        value={form.adminContactNumber}
                        onChange={(e) => setField('adminContactNumber', e.target.value)}
                        placeholder="077 987 6543"
                        autoComplete="tel"
                        className={`${errors.adminContactNumber ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                      />
                    </div>
                  </Field>

                  <Field label="Administrator Email" htmlFor="muni-admin-email" error={errors.adminEmail} required>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><MailIcon /></span>
                      <input
                        id="muni-admin-email"
                        type="email"
                        value={form.adminEmail}
                        onChange={(e) => setField('adminEmail', e.target.value)}
                        placeholder="priyantha.d@colombo.mc.gov.lk"
                        autoComplete="email"
                        className={`${errors.adminEmail ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                      />
                    </div>
                  </Field>
                </div>

                {/* NIC / Employee ID */}
                <Field
                  label="NIC / Employee ID"
                  htmlFor="muni-admin-nic"
                  error={errors.adminNic}
                  required
                  hint="Official verification"
                >
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><IdCardIcon /></span>
                    <input
                      id="muni-admin-nic"
                      type="text"
                      value={form.adminNic}
                      onChange={(e) => setField('adminNic', e.target.value)}
                      placeholder="e.g. 198012345678 or CMC-EMP-1042"
                      className={`${errors.adminNic ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                    />
                  </div>
                </Field>
              </div>

              {/* ════════ SECTION 3: Account Information ════════ */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 pb-1 border-b border-border">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary/15 text-secondary text-xs font-bold">
                    3
                  </span>
                  <h3 className="text-sm font-semibold text-content uppercase tracking-wider">
                    Account Information
                  </h3>
                </div>

                {/* Username / Official Email */}
                <Field label="Username / Official Email" htmlFor="muni-username" error={errors.username} required>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10">
                      <span className="text-xs font-bold">@</span>
                    </span>
                    <input
                      id="muni-username"
                      type="text"
                      value={form.username}
                      onChange={(e) => setField('username', e.target.value)}
                      placeholder="e.g. cmc.admin or official email"
                      autoComplete="username"
                      className={`${errors.username ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                    />
                  </div>
                </Field>

                {/* Password */}
                <Field label="Password" htmlFor="muni-password" error={errors.password} required>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><LockIcon /></span>
                    <input
                      id="muni-password"
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
                <Field label="Confirm Password" htmlFor="muni-confirm" error={errors.confirmPassword} required>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10"><LockIcon /></span>
                    <input
                      id="muni-confirm"
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

              {/* ════════ SECTION 4: Verification ════════ */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 pb-1 border-b border-border">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary/15 text-secondary text-xs font-bold">
                    4
                  </span>
                  <h3 className="text-sm font-semibold text-content uppercase tracking-wider">
                    Verification
                  </h3>
                </div>

                {/* Official Authorization / Registration Document Upload */}
                <div>
                  <label className="block text-sm font-medium text-content mb-1">
                    Official Authorization / Registration Document{' '}
                    <span className="text-xs text-content-muted font-normal">(Optional upload)</span>
                  </label>
                  <p className="text-xs text-content-muted mb-2">
                    Upload official municipal gazette, council letterhead authorization, or certificate.
                  </p>

                  <div className="p-4 rounded-xl border border-dashed border-border bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0">
                        <FileTextIcon />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-content truncate">
                          {form.documentFileName || 'No document selected'}
                        </p>
                        <p className="text-[11px] text-content-muted">
                          {form.documentFileName ? 'Ready for verification' : 'PDF, PNG, JPG or DOCX up to 10MB'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => docInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-content bg-surface hover:bg-muted transition-colors inline-flex items-center gap-1.5"
                      >
                        <UploadIcon />
                        {form.documentFileName ? 'Change file' : 'Browse document'}
                      </button>
                      {form.documentFileName && (
                        <button
                          type="button"
                          onClick={removeDocument}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <input
                      ref={docInputRef}
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                      className="hidden"
                      onChange={handleDocumentChange}
                    />
                  </div>
                </div>

                {/* Declarations & Terms Checkboxes */}
                <div className="space-y-3 pt-1">
                  {/* Authorization Declaration */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer select-none group">
                      <input
                        type="checkbox"
                        checked={form.authorizationDeclared}
                        onChange={(e) => setField('authorizationDeclared', e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-border text-secondary accent-secondary focus:ring-secondary/20 cursor-pointer"
                      />
                      <span className="text-xs text-content-secondary leading-relaxed font-medium">
                        I hereby declare that I am an authorized official legally empowered to register this municipal authority on the GreenCycle LK platform. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.authorizationDeclared && (
                      <p className="text-xs text-red-600 pl-7 mt-1">{errors.authorizationDeclared}</p>
                    )}
                  </div>

                  {/* Terms and Conditions */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer select-none group">
                      <input
                        type="checkbox"
                        checked={form.termsAgreed}
                        onChange={(e) => setField('termsAgreed', e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-border text-secondary accent-secondary focus:ring-secondary/20 cursor-pointer"
                      />
                      <span className="text-xs text-content-secondary leading-relaxed">
                        I agree to the{' '}
                        <a href="#terms" className="text-secondary font-medium hover:underline">
                          Terms &amp; Conditions
                        </a>
                        ,{' '}
                        <a href="#privacy" className="text-secondary font-medium hover:underline">
                          Municipal Data Sharing Protocol
                        </a>
                        , and environmental governance policies. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.termsAgreed && (
                      <p className="text-xs text-red-600 pl-7 mt-1">{errors.termsAgreed}</p>
                    )}
                  </div>
                </div>
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
                    <span>Submitting municipal verification…</span>
                  </>
                ) : (
                  <>
                    <span>Submit Municipal Registration</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>

              {/* Security Footnote */}
              <p className="text-center text-[11px] text-content-muted flex items-center justify-center gap-1.5">
                <ShieldCheckIcon />
                <span>SSL Encrypted • Direct Ministry &amp; Local Government Authorization</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
