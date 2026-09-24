import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Trash2,
  CalendarOff,
  Wrench,
  Layers,
  MapPin,
  Camera,
  Send,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
  Info,
} from 'lucide-react';
import { submitNewComplaint } from '@/shared/data/complaintsStore';
import type { ComplaintCategory, ComplaintPriority } from '@/shared/types/complaint';
import { COMPLAINT_CATEGORIES } from '@/shared/types/complaint';
import { ResidentLayout } from '@/features/resident/components/ResidentLayout';

// ── Mock resident identity ────────────────────────────────────────────────────
const MOCK_RESIDENT = {
  name: 'Kasun Perera',
  email: 'kasun.perera@gmail.com',
  phone: '+94 77 123 4567',
  municipality: 'Colombo Municipal Council',
};

// ── Category config ───────────────────────────────────────────────────────────
const categoryConfig: Record<ComplaintCategory, { icon: React.ReactNode; color: string; bgColor: string; borderColor: string; description: string }> = {
  'Illegal Dumping': {
    icon: <AlertTriangle className="w-6 h-6" />,
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    description: 'Unauthorized waste disposal in public or private areas',
  },
  'Overflowing Bin': {
    icon: <Trash2 className="w-6 h-6" />,
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    description: 'Public bin is full and overflowing onto surrounding area',
  },
  'Missed Collection': {
    icon: <CalendarOff className="w-6 h-6" />,
    color: 'text-sky-700',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
    description: 'Scheduled waste collection was not completed',
  },
  'Damaged Bin': {
    icon: <Wrench className="w-6 h-6" />,
    color: 'text-violet-700',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    description: 'Bin is broken, damaged, or requires replacement',
  },
  'Waste Accumulation': {
    icon: <Layers className="w-6 h-6" />,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    description: 'Excessive waste build-up in a specific area',
  },
};

// ── Step definitions ──────────────────────────────────────────────────────────
const STEPS = ['Issue Type', 'Details', 'Evidence', 'Location', 'Review'];

export const ReportIssuePage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState('');

  // Form state
  const [category, setCategory] = useState<ComplaintCategory | null>(null);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<ComplaintPriority>('Medium');
  const [evidenceUrls, setEvidenceUrls] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [municipality, setMunicipality] = useState(MOCK_RESIDENT.municipality);

  // Contact info (pre-filled)
  const [name] = useState(MOCK_RESIDENT.name);
  const [email] = useState(MOCK_RESIDENT.email);
  const [phone] = useState(MOCK_RESIDENT.phone);

  const canProceed = useCallback((): boolean => {
    switch (step) {
      case 0: return category !== null;
      case 1: return description.trim().length >= 10;
      case 2: return true; // evidence is optional
      case 3: return location.trim().length >= 3;
      case 4: return true;
      default: return false;
    }
  }, [step, category, description, location]);

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setEvidenceUrls((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset file input
    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    setEvidenceUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!category) return;

    const result = submitNewComplaint({
      category,
      description,
      location,
      municipality,
      evidenceUrls,
      submittedBy: name,
      citizenEmail: email,
      citizenPhone: phone,
      priority,
    });

    setSubmittedTicket(result.ticketNumber);
    setSubmitted(true);
  };

  // ── Success View ────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <ResidentLayout activeItem="reports">
        <div className="flex items-center justify-center py-12">
          <div className="w-full max-w-md bg-surface rounded-3xl border border-border shadow-elevated p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-content">Report Submitted!</h2>
              <p className="text-sm text-content-secondary leading-relaxed">
                Your complaint has been registered successfully. Track its progress using your ticket number.
              </p>
            </div>
            <div className="bg-primary-light rounded-2xl p-4 border border-primary/20">
              <p className="text-xs font-bold text-content-muted uppercase tracking-wider mb-1">Ticket Number</p>
              <p className="text-2xl font-black text-primary font-mono">{submittedTicket}</p>
            </div>
            <div className="flex flex-col gap-2.5">
              <Link
                to="/my-reports"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-semibold text-sm transition-all hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0"
              >
                View My Reports
              </Link>
              <Link
                to="/report-issue"
                onClick={() => {
                  setSubmitted(false);
                  setStep(0);
                  setCategory(null);
                  setDescription('');
                  setPriority('Medium');
                  setEvidenceUrls([]);
                  setLocation('');
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border text-content-secondary font-medium text-sm transition-colors hover:bg-muted"
              >
                Submit Another Report
              </Link>
            </div>
          </div>
        </div>
      </ResidentLayout>
    );
  }

  // ── Main Form ───────────────────────────────────────────────────────────────
  return (
    <ResidentLayout activeItem="reports">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">Report an Issue</h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Submit waste management complaints directly to your local council.
            </p>
          </div>
          <Link
            to="/my-reports"
            className="text-xs font-semibold text-primary hover:underline shrink-0"
          >
            My Reports &rarr;
          </Link>
        </div>
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => { if (i < step) setStep(i); }}
                className={`text-[11px] font-bold transition-colors ${
                  i === step
                    ? 'text-primary'
                    : i < step
                    ? 'text-content-secondary hover:text-primary cursor-pointer'
                    : 'text-content-muted'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-surface rounded-2xl border border-border shadow-card p-6 sm:p-8 min-h-[400px] flex flex-col">
          {/* Step 0: Issue Type */}
          {step === 0 && (
            <div className="space-y-5 flex-1">
              <div>
                <h2 className="text-xl font-bold text-content">What type of issue are you reporting?</h2>
                <p className="text-sm text-content-secondary mt-1">
                  Select the category that best describes the problem.
                </p>
              </div>
              <div className="grid gap-3">
                {COMPLAINT_CATEGORIES.map((cat) => {
                  const cfg = categoryConfig[cat];
                  const isSelected = category === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? `${cfg.borderColor} ${cfg.bgColor} shadow-sm scale-[1.01]`
                          : 'border-border bg-surface hover:border-primary/30 hover:bg-muted/30'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cfg.bgColor} ${cfg.color} shrink-0`}>
                        {cfg.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm ${isSelected ? cfg.color : 'text-content'}`}>{cat}</p>
                        <p className="text-xs text-content-secondary mt-0.5">{cfg.description}</p>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className={`w-5 h-5 shrink-0 ${cfg.color}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 1: Details */}
          {step === 1 && (
            <div className="space-y-5 flex-1">
              <div>
                <h2 className="text-xl font-bold text-content">Describe the issue</h2>
                <p className="text-sm text-content-secondary mt-1">
                  Provide as much detail as possible to help the response team.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-content-muted uppercase tracking-wider block mb-2">
                    Description *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What did you observe? When did it start? How severe is the issue?..."
                    rows={5}
                    className="w-full rounded-xl border border-border bg-muted/40 py-3 px-4 text-sm text-content outline-none placeholder:text-content-muted focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10 resize-none transition-all"
                  />
                  <p className="text-[10px] text-content-muted mt-1">
                    {description.length} / 10 characters minimum
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-content-muted uppercase tracking-wider block mb-2">
                    Priority Level
                  </label>
                  <div className="flex gap-2">
                    {(['Low', 'Medium', 'High'] as ComplaintPriority[]).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition-all ${
                          priority === p
                            ? p === 'High'
                              ? 'bg-red-50 text-red-700 border-red-300'
                              : p === 'Medium'
                              ? 'bg-amber-50 text-amber-700 border-amber-300'
                              : 'bg-slate-100 text-slate-700 border-slate-300'
                            : 'bg-surface border-border text-content-secondary hover:border-primary/30'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Evidence */}
          {step === 2 && (
            <div className="space-y-5 flex-1">
              <div>
                <h2 className="text-xl font-bold text-content">Add photo evidence</h2>
                <p className="text-sm text-content-secondary mt-1">
                  Photos help the team assess the situation faster. This step is optional.
                </p>
              </div>

              <div className="space-y-4">
                {/* Upload Zone */}
                <label className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed border-border bg-muted/30 cursor-pointer hover:border-primary/40 hover:bg-primary-light/30 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center">
                    <Camera className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-content">Click to upload photos</p>
                    <p className="text-xs text-content-muted mt-0.5">JPG, PNG up to 5MB each</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>

                {/* Preview Grid */}
                {evidenceUrls.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {evidenceUrls.map((url, i) => (
                      <div key={i} className="relative group rounded-xl overflow-hidden border border-border aspect-square">
                        <img src={url} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div className="space-y-5 flex-1">
              <div>
                <h2 className="text-xl font-bold text-content">Issue location</h2>
                <p className="text-sm text-content-secondary mt-1">
                  Provide the address or describe where the issue is located.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-content-muted uppercase tracking-wider block mb-2">
                    Address / Location Description *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-content-muted" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. 42 Duplication Road, Kollupitiya, Colombo"
                      className="w-full rounded-xl border border-border bg-muted/40 py-3 pl-10 pr-4 text-sm text-content outline-none placeholder:text-content-muted focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-content-muted uppercase tracking-wider block mb-2">
                    Municipality
                  </label>
                  <select
                    value={municipality}
                    onChange={(e) => setMunicipality(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/40 py-3 px-4 text-sm text-content outline-none focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10 transition-all appearance-none"
                  >
                    <option value="Colombo Municipal Council">Colombo Municipal Council</option>
                    <option value="Kandy Municipal Council">Kandy Municipal Council</option>
                    <option value="Galle Municipal Council">Galle Municipal Council</option>
                    <option value="Jaffna Municipal Council">Jaffna Municipal Council</option>
                    <option value="Negombo Municipal Council">Negombo Municipal Council</option>
                    <option value="Kurunegala Municipal Council">Kurunegala Municipal Council</option>
                  </select>
                </div>

                {/* Map placeholder */}
                <div className="rounded-2xl border border-border bg-muted/30 h-48 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="w-8 h-8 text-content-muted mx-auto" />
                    <p className="text-xs text-content-muted font-medium">
                      Interactive map will be available with backend integration
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-5 flex-1">
              <div>
                <h2 className="text-xl font-bold text-content">Review your report</h2>
                <p className="text-sm text-content-secondary mt-1">
                  Please confirm the details below before submitting.
                </p>
              </div>

              <div className="space-y-4">
                {/* Summary Card */}
                <div className="rounded-2xl border border-border bg-muted/30 divide-y divide-border">
                  {/* Issue Type */}
                  <div className="p-4 flex items-center gap-3">
                    {category && (
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${categoryConfig[category].bgColor} ${categoryConfig[category].color} shrink-0`}>
                        {categoryConfig[category].icon}
                      </div>
                    )}
                    <div>
                      <p className="text-[10px] font-bold text-content-muted uppercase tracking-wider">Issue Type</p>
                      <p className="text-sm font-bold text-content">{category}</p>
                    </div>
                    <div className="ml-auto">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        priority === 'High'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : priority === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {priority} Priority
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-4">
                    <p className="text-[10px] font-bold text-content-muted uppercase tracking-wider mb-1">Description</p>
                    <p className="text-sm text-content leading-relaxed break-words break-all">{description}</p>
                  </div>

                  {/* Location */}
                  <div className="p-4">
                    <p className="text-[10px] font-bold text-content-muted uppercase tracking-wider mb-1">Location</p>
                    <div className="flex items-center gap-2 text-sm text-content">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{location}</span>
                    </div>
                    <p className="text-xs text-content-muted mt-0.5">{municipality}</p>
                  </div>

                  {/* Evidence */}
                  {evidenceUrls.length > 0 && (
                    <div className="p-4">
                      <p className="text-[10px] font-bold text-content-muted uppercase tracking-wider mb-2">
                        Evidence ({evidenceUrls.length} photo{evidenceUrls.length > 1 ? 's' : ''})
                      </p>
                      <div className="flex gap-2 overflow-x-auto">
                        {evidenceUrls.map((url, i) => (
                          <img
                            key={i}
                            src={url}
                            alt={`Evidence ${i + 1}`}
                            className="w-16 h-16 rounded-lg object-cover border border-border shrink-0"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reporter */}
                  <div className="p-4">
                    <p className="text-[10px] font-bold text-content-muted uppercase tracking-wider mb-1">Reporter</p>
                    <p className="text-sm font-semibold text-content">{name}</p>
                    <p className="text-xs text-content-muted">{email} • {phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 rounded-xl bg-sky-50 border border-sky-200">
                  <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-sky-800 leading-relaxed">
                    Once submitted, your report will be reviewed by the municipal authority. You can track its progress from <strong>My Reports</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Footer */}
          <div className="flex items-center justify-between pt-6 mt-auto border-t border-border">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                step === 0
                  ? 'text-content-muted cursor-not-allowed'
                  : 'text-content-secondary hover:bg-muted hover:text-content'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  canProceed()
                    ? 'bg-primary text-white hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0'
                    : 'bg-muted text-content-muted cursor-not-allowed'
                }`}
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold transition-all hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-elevated active:translate-y-0"
              >
                <Send className="w-4 h-4" />
                Submit Report
              </button>
            )}
          </div>
        </div>
      </div>
    </ResidentLayout>
  );
};
