import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import greenCycleLogo from '@/assets/GreenCycle-logo.png';
import type { AdminMunicipality } from '@/features/admin/types/admin';

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

// ─── Inline Icons ─────────────────────────────────────────────────────────────

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
        <label htmlFor={htmlFor} className="block text-xs sm:text-sm font-semibold text-content">
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

// ─── Input Base Classes ───────────────────────────────────────────────────────

const inputBase =
  'w-full rounded-xl border text-xs sm:text-sm text-content placeholder:text-content-muted focus:outline-none focus:ring-2 transition-all';
const inputNormal = `${inputBase} border-border bg-surface focus:border-primary/60 focus:ring-primary/10`;
const inputError = `${inputBase} border-red-300 bg-red-50/40 focus:border-red-400 focus:ring-red-200`;

// ─── Form State Interfaces ───────────────────────────────────────────────────

interface MunicipalityFormData {
  // 1. Municipality Information
  municipalityName: string;
  municipalityCode: string;
  district: string;
  province: string;
  officeAddress: string;
  officialPhone: string;
  officialEmail: string;

  // 2. Primary Municipal User
  primaryFullName: string;
  primaryEmail: string;
  primaryPhone: string;
  primaryNic: string;

  // 3. Verification
  documentFile: File | null;
  documentFileName: string;
  declarationAgreed: boolean;
  termsAgreed: boolean;
}

interface MunicipalityFormErrors {
  municipalityName?: string;
  municipalityCode?: string;
  district?: string;
  province?: string;
  officeAddress?: string;
  officialPhone?: string;
  officialEmail?: string;

  primaryFullName?: string;
  primaryEmail?: string;
  primaryPhone?: string;
  primaryNic?: string;

  documentFile?: string;
  declarationAgreed?: string;
  termsAgreed?: string;
}

// ─── MunicipalityRegisterPage Component ──────────────────────────────────────

export function MunicipalityRegisterPage() {
  const navigate = useNavigate();
  const docInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<MunicipalityFormData>({
    municipalityName: '',
    municipalityCode: '',
    district: '',
    province: '',
    officeAddress: '',
    officialPhone: '',
    officialEmail: '',

    primaryFullName: '',
    primaryEmail: '',
    primaryPhone: '',
    primaryNic: '',

    documentFile: null,
    documentFileName: '',
    declarationAgreed: false,
    termsAgreed: false,
  });

  const [errors, setErrors] = useState<MunicipalityFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const setField = <K extends keyof MunicipalityFormData>(
    key: K,
    value: MunicipalityFormData[K]
  ) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };

      // Auto-suggest municipality code if name changes and code is empty or short
      if (key === 'municipalityName') {
        const words = String(value).trim().split(/\s+/);
        if (words.length > 0 && words[0]) {
          const autoCode = words
            .map((w) => w[0])
            .join('')
            .toUpperCase()
            .slice(0, 5);
          if (!prev.municipalityCode || prev.municipalityCode.length <= 4) {
            next.municipalityCode = autoCode;
          }
        }
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
      e.municipalityName = 'Municipality Name is required.';
    }

    if (!form.municipalityCode.trim()) {
      e.municipalityCode = 'Municipality Code is required (e.g. CMC).';
    }

    if (!form.district) {
      e.district = 'District is required.';
    }

    if (!form.province) {
      e.province = 'Province is required.';
    }

    if (!form.officeAddress.trim()) {
      e.officeAddress = 'Municipality Address is required.';
    }

    const phoneRegex = /^(?:\+94|0)[0-9\s-]{8,12}$/;
    if (!form.officialPhone.trim()) {
      e.officialPhone = 'Official phone number is required.';
    } else if (!phoneRegex.test(form.officialPhone.trim())) {
      e.officialPhone = 'Enter a valid phone number (e.g. 011 269 5121).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.officialEmail.trim()) {
      e.officialEmail = 'Official council email is required.';
    } else if (!emailRegex.test(form.officialEmail.trim())) {
      e.officialEmail = 'Please enter a valid official council email.';
    }

    // 2. Primary Municipal User
    if (!form.primaryFullName.trim()) {
      e.primaryFullName = "Municipal User's full name is required.";
    } else if (form.primaryFullName.trim().length < 2) {
      e.primaryFullName = 'Full name must be at least 2 characters.';
    }

    if (!form.primaryEmail.trim()) {
      e.primaryEmail = 'Official Municipal User email is required.';
    } else if (!emailRegex.test(form.primaryEmail.trim())) {
      e.primaryEmail = 'Please enter a valid email address.';
    }

    if (!form.primaryPhone.trim()) {
      e.primaryPhone = 'Phone number is required.';
    } else if (!phoneRegex.test(form.primaryPhone.trim())) {
      e.primaryPhone = 'Enter a valid mobile number (e.g. 077 987 6543).';
    }

    if (!form.primaryNic.trim()) {
      e.primaryNic = 'NIC or Municipal Employee ID is required.';
    }

    // 3. Verification
    if (!form.declarationAgreed) {
      e.declarationAgreed = 'You must declare authorization to register this municipality.';
    }

    if (!form.termsAgreed) {
      e.termsAgreed = 'You must agree to the GreenCycle Terms & Conditions.';
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

      const newMuni: AdminMunicipality = {
        id: `MUN-${String(Date.now()).slice(-4)}`,
        name: form.municipalityName.trim(),
        code: form.municipalityCode.trim().toUpperCase() || 'MUNI',
        province: form.province.includes('Province') ? form.province : `${form.province} Province`,
        district: form.district,
        contactOfficer: form.primaryFullName.trim(),
        phone: form.primaryPhone.trim(),
        email: form.primaryEmail.trim(),
        usersCount: 0,
        centersCount: 0,
        complaintsCount: 0,
        status: 'Active',
        joinedDate: new Date().toISOString().split('T')[0],
        description: `Official municipal authority jurisdiction in ${form.district} district. Primary Municipal User: ${form.primaryFullName.trim()} (${form.primaryEmail.trim()}).`,
      };

      try {
        const stored = localStorage.getItem('greencycle_admin_municipalities');
        const list = stored ? JSON.parse(stored) : [];
        localStorage.setItem(
          'greencycle_admin_municipalities',
          JSON.stringify([newMuni, ...list])
        );
      } catch {
        // ignore
      }

      // Auto-redirect to /admin/municipalities after 2.8 seconds
      setTimeout(() => navigate('/admin/municipalities', { replace: true }), 2800);
    }, 800);
  };

  // ── Success Splash Screen ───────────────────────────────────────────────────

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas font-sans p-6">
        <div className="bg-surface border border-border rounded-3xl p-8 sm:p-10 max-w-lg w-full text-center shadow-elevated animate-[fadeIn_.3s_ease]">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-600/25">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            Municipality Registered Successfully
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-content tracking-tight">
            {form.municipalityName}
          </h2>
          <p className="text-xs sm:text-sm text-content-secondary mt-1">
            has been added to GreenCycle LK.
          </p>

          <div className="my-6 p-4 rounded-2xl bg-muted/40 border border-border text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-content uppercase tracking-wider">
                Primary Municipal User
              </span>
              <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                Municipal User
              </span>
            </div>

            <div>
              <p className="text-xs text-content-muted">Full Name:</p>
              <p className="text-xs font-bold text-content">{form.primaryFullName}</p>
            </div>

            <div className="pt-2 border-t border-border/60">
              <p className="text-xs text-content-secondary mb-1">
                A Municipal User account has been prepared for:
              </p>
              <p className="font-mono font-bold text-primary text-xs sm:text-sm bg-surface px-3 py-2 rounded-xl border border-border break-all">
                {form.primaryEmail}
              </p>
            </div>

            <div className="flex items-start gap-2 pt-1 text-[11px] text-content-muted leading-relaxed">
              <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>
                Login credentials will be sent to the registered official email.
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => navigate('/admin/municipalities', { replace: true })}
              className="w-full py-2.5 px-4 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
            >
              Go to Municipalities List
            </button>
            <p className="text-[11px] text-content-muted">
              Auto-redirecting back to Admin Municipalities…
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Layout ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden w-full flex flex-col lg:flex-row bg-surface font-sans">
      {/* ── LEFT: Brand Panel (Fixed / Stationary) ── */}
      <div className="relative hidden lg:flex lg:w-[38%] xl:w-[35%] lg:h-full shrink-0 bg-[#094833] text-white flex-col justify-between p-8 xl:p-12 overflow-hidden select-none">
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
          <Link to="/admin/municipalities" className="inline-flex items-center gap-3 group">
            <img src={greenCycleLogo} alt="GreenCycle LK" className="w-9 h-9 object-contain brightness-0 invert" />
            <div>
              <span className="text-lg font-bold tracking-tight text-white block leading-tight">GreenCycle LK</span>
              <span className="text-xs text-emerald-200/70">Admin • Local Authority Management</span>
            </div>
          </Link>
        </div>

        {/* Brand Body */}
        <div className="relative z-10 my-auto py-6">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-4">
            <span className="text-xs text-emerald-200 font-medium">🏛️ Municipality Onboarding</span>
          </div>
          <h1 className="text-2xl xl:text-3xl font-bold text-white tracking-tight leading-[1.2]">
            Registering Local Authorities for Sustainable Waste Governance.
          </h1>
          <p className="mt-3 text-xs xl:text-sm text-emerald-100/80 leading-relaxed max-w-sm">
            Onboard new municipal councils, urban councils, and pradeshiya sabhas. The designated Primary Municipal User will manage collection teams and dispatch operations.
          </p>

          <div className="mt-6 space-y-3">
            {[
              { emoji: '🏛️', text: 'Official local government jurisdiction record creation' },
              { emoji: '👤', text: 'Primary Municipal User account preparation' },
              { emoji: '🔐', text: 'Secure login credentials dispatched to official email' },
              { emoji: '🚛', text: 'Authority to add and manage certified waste collectors' },
            ].map(({ emoji, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-xs">
                  {emoji}
                </div>
                <span className="text-xs text-emerald-50 font-medium">{text}</span>
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
            <span>GreenCycle LK • Ministry of Local Government &amp; Provincial Councils</span>
          </p>
        </div>
      </div>

      {/* ── RIGHT: Form Panel (Scrollable) ── */}
      <div className="w-full lg:flex-1 lg:h-full bg-canvas overflow-y-auto">
        <div className="min-h-full flex items-start justify-center">
          <div className="w-full max-w-2xl px-6 sm:px-10 py-10 lg:py-12">
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/admin/municipalities"
                className="inline-flex items-center gap-1.5 text-xs text-content-muted hover:text-content transition-colors font-medium"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Municipalities
              </Link>

              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-2.5 py-1 rounded-lg">
                Admin Onboarding Form
              </span>
            </div>

            {/* Title Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-primary-light text-primary text-xs font-semibold mb-2.5">
                <BuildingIcon />
                <span>Admin Portal • Municipality Registration</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-content tracking-tight">
                Register Municipality
              </h2>
              <p className="text-content-muted text-xs sm:text-sm mt-1.5 leading-relaxed">
                Register a new municipal authority into GreenCycle LK and designate its Primary Municipal User.
              </p>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* ════════ 1. MUNICIPALITY INFORMATION ════════ */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-1 border-b border-border">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    1
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-content uppercase tracking-wider">
                    Municipality Information
                  </h3>
                </div>

                {/* Municipality Name & Code (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="sm:col-span-2">
                    <Field
                      label="Municipality Name"
                      htmlFor="muni-name"
                      error={errors.municipalityName}
                      required
                      hint="e.g. Colombo Municipal Council"
                    >
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-content-muted pointer-events-none z-10">
                          <BuildingIcon />
                        </span>
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
                  </div>

                  <div className="sm:col-span-1">
                    <Field
                      label="Municipality Code"
                      htmlFor="muni-code"
                      error={errors.municipalityCode}
                      required
                      hint="e.g. CMC, KMC"
                    >
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-content-muted pointer-events-none z-10">
                          <HashIcon />
                        </span>
                        <input
                          id="muni-code"
                          type="text"
                          value={form.municipalityCode}
                          onChange={(e) => setField('municipalityCode', e.target.value.toUpperCase())}
                          placeholder="CMC"
                          maxLength={6}
                          className={`${errors.municipalityCode ? inputError : inputNormal} pl-10 pr-4 py-2.5 font-mono uppercase font-bold`}
                        />
                      </div>
                    </Field>
                  </div>
                </div>

                {/* District & Province (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* District */}
                  <Field label="District" htmlFor="muni-district" error={errors.district} required>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-content-muted pointer-events-none z-10">
                        <MapPinIcon />
                      </span>
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
                      <span className="absolute left-3.5 text-content-muted pointer-events-none z-10">
                        <MapPinIcon />
                      </span>
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

                {/* Municipality Office Address */}
                <Field
                  label="Municipality Address"
                  htmlFor="muni-address"
                  error={errors.officeAddress}
                  required
                  hint="Official administrative office"
                >
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10">
                      <MapPinIcon />
                    </span>
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

                {/* Official Council Phone & Official Council Email (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Field label="Official Phone Number" htmlFor="muni-phone" error={errors.officialPhone} required>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-content-muted pointer-events-none z-10">
                        <PhoneIcon />
                      </span>
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

                  <Field label="Official Council Email" htmlFor="muni-email" error={errors.officialEmail} required>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-content-muted pointer-events-none z-10">
                        <MailIcon />
                      </span>
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

              {/* ════════ 2. PRIMARY MUNICIPAL USER ════════ */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between pb-1 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                      2
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-content uppercase tracking-wider">
                      Primary Municipal User
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    Municipal User Role
                  </span>
                </div>
                <p className="text-xs text-content-muted -mt-1">
                  Designate the Primary Municipal User for this authority. Login credentials will be generated and dispatched to the official email below.
                </p>

                {/* Primary User Full Name */}
                <Field
                  label="Full Name"
                  htmlFor="primary-name"
                  error={errors.primaryFullName}
                  required
                  hint="Municipal User"
                >
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-content-muted pointer-events-none z-10">
                      <UserIcon />
                    </span>
                    <input
                      id="primary-name"
                      type="text"
                      value={form.primaryFullName}
                      onChange={(e) => setField('primaryFullName', e.target.value)}
                      placeholder="e.g. Priyantha De Silva"
                      autoComplete="name"
                      className={`${errors.primaryFullName ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                    />
                  </div>
                </Field>

                {/* Official Email with explicit credential notice */}
                <div>
                  <Field
                    label="Official Email"
                    htmlFor="primary-email"
                    error={errors.primaryEmail}
                    required
                  >
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-content-muted pointer-events-none z-10">
                        <MailIcon />
                      </span>
                      <input
                        id="primary-email"
                        type="email"
                        value={form.primaryEmail}
                        onChange={(e) => setField('primaryEmail', e.target.value)}
                        placeholder="priyantha.d@colombo.mc.gov.lk"
                        autoComplete="email"
                        className={`${errors.primaryEmail ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                      />
                    </div>
                  </Field>
                  <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1.5 font-medium">
                    <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <span>Login credentials will be sent to this official municipal email.</span>
                  </div>
                </div>

                {/* Phone & NIC/Employee ID (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Field label="Phone Number" htmlFor="primary-phone" error={errors.primaryPhone} required>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-content-muted pointer-events-none z-10">
                        <PhoneIcon />
                      </span>
                      <input
                        id="primary-phone"
                        type="tel"
                        value={form.primaryPhone}
                        onChange={(e) => setField('primaryPhone', e.target.value)}
                        placeholder="077 987 6543"
                        autoComplete="tel"
                        className={`${errors.primaryPhone ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                      />
                    </div>
                  </Field>

                  <Field
                    label="NIC / Employee ID"
                    htmlFor="primary-nic"
                    error={errors.primaryNic}
                    required
                    hint="Official ID"
                  >
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-content-muted pointer-events-none z-10">
                        <IdCardIcon />
                      </span>
                      <input
                        id="primary-nic"
                        type="text"
                        value={form.primaryNic}
                        onChange={(e) => setField('primaryNic', e.target.value)}
                        placeholder="198012345678 / CMC-EMP-1042"
                        className={`${errors.primaryNic ? inputError : inputNormal} pl-10 pr-4 py-2.5`}
                      />
                    </div>
                  </Field>
                </div>
              </div>

              {/* ════════ 3. VERIFICATION ════════ */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 pb-1 border-b border-border">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    3
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-content uppercase tracking-wider">
                    Verification
                  </h3>
                </div>

                {/* Official Document Upload */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-content mb-1">
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
                        className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-content bg-surface hover:bg-muted transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <UploadIcon />
                        {form.documentFileName ? 'Change file' : 'Browse document'}
                      </button>
                      {form.documentFileName && (
                        <button
                          type="button"
                          onClick={removeDocument}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
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
                        checked={form.declarationAgreed}
                        onChange={(e) => setField('declarationAgreed', e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-border text-primary accent-primary focus:ring-primary/20 cursor-pointer"
                      />
                      <span className="text-xs text-content-secondary leading-relaxed font-medium">
                        I hereby declare that this municipality information is accurate and authorized for registration on GreenCycle LK. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.declarationAgreed && (
                      <p className="text-xs text-red-600 pl-7 mt-1">{errors.declarationAgreed}</p>
                    )}
                  </div>

                  {/* Terms and Conditions */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer select-none group">
                      <input
                        type="checkbox"
                        checked={form.termsAgreed}
                        onChange={(e) => setField('termsAgreed', e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-border text-primary accent-primary focus:ring-primary/20 cursor-pointer"
                      />
                      <span className="text-xs text-content-secondary leading-relaxed">
                        I agree to the{' '}
                        <span className="text-primary font-medium hover:underline">
                          Terms &amp; Conditions
                        </span>
                        ,{' '}
                        <span className="text-primary font-medium hover:underline">
                          Municipal Data Sharing Protocol
                        </span>
                        , and environmental governance policies. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.termsAgreed && (
                      <p className="text-xs text-red-600 pl-7 mt-1">{errors.termsAgreed}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* ════════ 4. SUBMISSION ════════ */}
              <div className="pt-4 border-t border-border flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/admin/municipalities')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-border text-xs font-bold text-content-secondary hover:bg-muted transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 active:scale-[0.99] text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>Registering Municipality…</span>
                    </>
                  ) : (
                    <>
                      <span>Register Municipality</span>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Security Footnote */}
              <p className="text-center text-[11px] text-content-muted flex items-center justify-center gap-1.5 pt-2">
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
