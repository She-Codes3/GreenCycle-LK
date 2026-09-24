import React, { useState } from 'react';
import { ResidentLayout } from '../components/ResidentLayout';
import {
  User,
  Home,
  Bell,
  Shield,
  Award,
  Save,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Building2,
  Smartphone,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';
import { RESIDENT_USER } from '../data/residentMockData';
import { useAuth } from '@/app/providers';

type SettingsTab = 'profile' | 'household' | 'notifications' | 'security' | 'impact';

const MUNICIPALITIES = [
  'Colombo Municipal Council (CMC)',
  'Dehiwala-Mount Lavinia Municipal Council (DMMC)',
  'Sri Jayawardenepura Kotte Municipal Council',
  'Moratuwa Municipal Council',
  'Kandy Municipal Council',
  'Galle Municipal Council',
  'Negombo Municipal Council',
];

const CMC_WARDS = [
  'Ward 07 - Cinnamon Gardens',
  'Ward 03 - Kollupitiya',
  'Ward 04 - Bambalapitiya',
  'Ward 05 - Havelock Town',
  'Ward 06 - Wellawatte North',
  'Ward 08 - Borella North',
  'Ward 09 - Dematagoda',
  'Ward 12 - Pettah',
];

export const ResidentSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [savedNotice, setSavedNotice] = useState(false);

  // Profile Information
  const [name, setName] = useState(() => {
    return localStorage.getItem('gc_resident_name') || user?.fullName || RESIDENT_USER.name;
  });
  const [email, setEmail] = useState(() => {
    return localStorage.getItem('gc_resident_email') || user?.email || RESIDENT_USER.email;
  });
  const [phone, setPhone] = useState(() => {
    return localStorage.getItem('gc_resident_phone') || RESIDENT_USER.phone;
  });
  const [nic, setNic] = useState(() => {
    return localStorage.getItem('gc_resident_nic') || '198421403219';
  });
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('gc_resident_lang') || 'English';
  });

  // Household & Waste Setup
  const [municipality, setMunicipality] = useState(() => {
    return localStorage.getItem('gc_resident_muni') || RESIDENT_USER.municipality;
  });
  const [zone, setZone] = useState(() => {
    return localStorage.getItem('gc_resident_zone') || RESIDENT_USER.zone;
  });
  const [address, setAddress] = useState(() => {
    return localStorage.getItem('gc_resident_addr') || RESIDENT_USER.address;
  });
  const [postalCode, setPostalCode] = useState(() => {
    return localStorage.getItem('gc_resident_postal') || '00300';
  });
  const [householdMembers, setHouseholdMembers] = useState(() => {
    return localStorage.getItem('gc_resident_members') || '4';
  });
  const [hasCompostBin, setHasCompostBin] = useState(() => {
    return localStorage.getItem('gc_resident_compost') === 'true';
  });
  const [segregatedWaste, setSegregatedWaste] = useState(() => {
    return localStorage.getItem('gc_resident_segregation') !== 'false';
  });

  // Notification Preferences
  const [smsTruckAlert, setSmsTruckAlert] = useState(true);
  const [pushTruckAlert, setPushTruckAlert] = useState(true);
  const [leadTimeMinutes, setLeadTimeMinutes] = useState('15');
  const [missedPickupAlert, setMissedPickupAlert] = useState(true);
  const [rewardsAlert, setRewardsAlert] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  // Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    localStorage.setItem('gc_resident_name', name);
    localStorage.setItem('gc_resident_email', email);
    localStorage.setItem('gc_resident_phone', phone);
    localStorage.setItem('gc_resident_nic', nic);
    localStorage.setItem('gc_resident_lang', language);
    localStorage.setItem('gc_resident_muni', municipality);
    localStorage.setItem('gc_resident_zone', zone);
    localStorage.setItem('gc_resident_addr', address);
    localStorage.setItem('gc_resident_postal', postalCode);
    localStorage.setItem('gc_resident_members', householdMembers);
    localStorage.setItem('gc_resident_compost', String(hasCompostBin));
    localStorage.setItem('gc_resident_segregation', String(segregatedWaste));

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3500);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (!currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordSuccess(true);
    setTimeout(() => setPasswordSuccess(false), 4000);
  };

  const tabs = [
    { id: 'profile' as SettingsTab, label: 'Citizen Profile', icon: <User className="w-4 h-4" /> },
    { id: 'household' as SettingsTab, label: 'Household & Waste', icon: <Home className="w-4 h-4" /> },
    { id: 'notifications' as SettingsTab, label: 'Alerts & Reminders', icon: <Bell className="w-4 h-4" /> },
    { id: 'security' as SettingsTab, label: 'Security & Access', icon: <Shield className="w-4 h-4" /> },
    { id: 'impact' as SettingsTab, label: 'Eco Identity', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <ResidentLayout
      activeItem="settings"
      pageTitle="Profile & Settings"
      pageSubtitle="Manage your household profile, collection reminders, and municipal waste preferences"
    >
      <div className="space-y-6 w-full max-w-5xl mx-auto">
        {/* Header bar with save button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/70">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-lg shadow-xs">
              {name.split(' ').filter(Boolean).map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || 'GC'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-content tracking-tight">
                  {name}
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified Resident
                </span>
              </div>
              <p className="text-xs text-content-secondary mt-0.5">
                {zone} • {municipality.split('(')[0].trim()}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleSaveAll()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all hover:shadow active:scale-[0.98]"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>

        {/* Saved Toast Banner */}
        {savedNotice && (
          <div className="p-3.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2.5 shadow-sm animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Household profile and preferences have been updated successfully!</span>
          </div>
        )}

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-border no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-content-secondary hover:text-content hover:bg-muted/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── TAB 1: CITIZEN PROFILE ── */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-card space-y-5">
                <div>
                  <h3 className="text-sm font-extrabold text-content uppercase tracking-wider text-primary">
                    Personal Details
                  </h3>
                  <p className="text-xs text-content-secondary mt-0.5">
                    Your citizen identification used for municipal notifications and pickup bookings.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-content flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-content-muted" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sunil Wickramasinghe"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas text-content text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-content flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-content-muted" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@greencycle.lk"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas text-content text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-content flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-content-muted" />
                      Mobile Phone (for SMS Alerts)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+94 77 123 4567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas text-content text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-content flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-content-muted" />
                      National Identity Card (NIC)
                    </label>
                    <input
                      type="text"
                      value={nic}
                      onChange={(e) => setNic(e.target.value)}
                      placeholder="e.g. 198421403219"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas text-content text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-content flex items-center gap-1.5">
                      Preferred Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas text-content text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    >
                      <option value="English">English</option>
                      <option value="Sinhala">සිංහල (Sinhala)</option>
                      <option value="Tamil">தமிழ் (Tamil)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleSaveAll()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Details
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Profile Summary Card */}
            <div className="space-y-6">
              <div className="bg-surface rounded-2xl border border-border p-5 shadow-card space-y-4">
                <h4 className="text-xs font-extrabold text-content uppercase tracking-wider">
                  Citizen Account Card
                </h4>
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#046a38] to-[#034d28] text-white space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300">
                      CMC Eco Passport
                    </span>
                    <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
                      ID: {RESIDENT_USER.id}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm">{name}</h3>
                    <p className="text-[11px] text-emerald-100">{email}</p>
                  </div>
                  <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-emerald-200 block">Green Points</span>
                      <span className="font-black text-amber-300">{RESIDENT_USER.greenPoints} GP</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-200 block">Eco Rank</span>
                      <span className="font-black">{RESIDENT_USER.rankTitle}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-content-secondary">
                  <div className="flex items-center justify-between py-1 border-b border-border/50">
                    <span>Registered Zone</span>
                    <span className="font-bold text-content">{zone.split('-')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-border/50">
                    <span>Status</span>
                    <span className="font-bold text-emerald-600">Active Resident</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>Eco Streak</span>
                    <span className="font-bold text-content">{RESIDENT_USER.streakDays} Consecutive Days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: HOUSEHOLD & WASTE SETUP ── */}
        {activeTab === 'household' && (
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-card space-y-6">
            <div>
              <h3 className="text-sm font-extrabold text-content uppercase tracking-wider text-primary">
                Household & Municipal Jurisdiction
              </h3>
              <p className="text-xs text-content-secondary mt-0.5">
                Set your municipal council and collection zone so trucks find your premises accurately.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-content flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-content-muted" />
                  Municipal Authority / Local Council
                </label>
                <select
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas text-content text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                >
                  {MUNICIPALITIES.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-content flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-content-muted" />
                  Collection Ward / Zone
                </label>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas text-content text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                >
                  {CMC_WARDS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-content flex items-center gap-1.5">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="e.g. 00300"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas text-content text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-content flex items-center gap-1.5">
                  Residential Premises Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. No. 42/3, Alfred Place, Colombo 03"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas text-content text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-content flex items-center gap-1.5">
                  Household Occupants Count
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={householdMembers}
                  onChange={(e) => setHouseholdMembers(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas text-content text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                />
                <span className="text-[10px] text-content-muted block">
                  Used by municipal planning to estimate collection volume.
                </span>
              </div>
            </div>

            {/* Waste Segregation Options */}
            <div className="pt-4 border-t border-border space-y-4">
              <h4 className="text-xs font-extrabold text-content uppercase tracking-wider">
                Waste Segregation & Composting Setup
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-border hover:border-primary/50 transition cursor-pointer bg-canvas">
                  <input
                    type="checkbox"
                    checked={segregatedWaste}
                    onChange={(e) => setSegregatedWaste(e.target.checked)}
                    className="mt-0.5 rounded text-primary focus:ring-primary h-4 w-4"
                  />
                  <div>
                    <span className="text-xs font-bold text-content block">
                      3-Bin Kerbside Segregation Active
                    </span>
                    <span className="text-[11px] text-content-secondary mt-0.5 block">
                      Household separates Organic, Recyclable, and Residual dry waste.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-border hover:border-primary/50 transition cursor-pointer bg-canvas">
                  <input
                    type="checkbox"
                    checked={hasCompostBin}
                    onChange={(e) => setHasCompostBin(e.target.checked)}
                    className="mt-0.5 rounded text-primary focus:ring-primary h-4 w-4"
                  />
                  <div>
                    <span className="text-xs font-bold text-content block">
                      Home Compost Bin Installed
                    </span>
                    <span className="text-[11px] text-content-secondary mt-0.5 block">
                      Qualifies for municipal green tax rebate and extra GreenPoints.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveAll()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition"
              >
                <Save className="w-3.5 h-3.5" />
                Save Household Details
              </button>
            </div>
          </div>
        )}

        {/* ── TAB 3: NOTIFICATIONS & ALERTS ── */}
        {activeTab === 'notifications' && (
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-card space-y-6">
            <div>
              <h3 className="text-sm font-extrabold text-content uppercase tracking-wider text-primary">
                Truck & Collection Reminders
              </h3>
              <p className="text-xs text-content-secondary mt-0.5">
                Control how and when GreenCycle LK alerts you about approaching collection vehicles.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-canvas">
                <div className="space-y-0.5 pr-4">
                  <span className="text-xs font-bold text-content flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-primary" />
                    SMS Truck Arrival Alert
                  </span>
                  <span className="text-[11px] text-content-secondary block">
                    Receive an SMS to {phone} before the truck enters your lane.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={smsTruckAlert}
                  onChange={(e) => setSmsTruckAlert(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-4 w-4 shrink-0"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-canvas">
                <div className="space-y-0.5 pr-4">
                  <span className="text-xs font-bold text-content flex items-center gap-2">
                    <Bell className="w-4 h-4 text-emerald-600" />
                    Push Notification Alerts
                  </span>
                  <span className="text-[11px] text-content-secondary block">
                    Browser & mobile push alert when vehicle is on live tracking radar.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={pushTruckAlert}
                  onChange={(e) => setPushTruckAlert(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-4 w-4 shrink-0"
                />
              </div>

              <div className="p-4 rounded-xl border border-border bg-canvas flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-content block">
                    Arrival Alert Lead Time
                  </span>
                  <span className="text-[11px] text-content-secondary block">
                    How many minutes before estimated arrival should you be notified?
                  </span>
                </div>
                <select
                  value={leadTimeMinutes}
                  onChange={(e) => setLeadTimeMinutes(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-border bg-surface text-content text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="5">5 minutes before</option>
                  <option value="10">10 minutes before</option>
                  <option value="15">15 minutes before (Recommended)</option>
                  <option value="30">30 minutes before</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-canvas">
                <div className="space-y-0.5 pr-4">
                  <span className="text-xs font-bold text-content block">
                    Missed Collection Notice
                  </span>
                  <span className="text-[11px] text-content-secondary block">
                    Instant alert if your street collection was delayed or rescheduled.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={missedPickupAlert}
                  onChange={(e) => setMissedPickupAlert(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-4 w-4 shrink-0"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-canvas">
                <div className="space-y-0.5 pr-4">
                  <span className="text-xs font-bold text-content block">
                    GreenPoints & Reward Milestones
                  </span>
                  <span className="text-[11px] text-content-secondary block">
                    Notify when points are awarded from recycling centres or vouchers are ready.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={rewardsAlert}
                  onChange={(e) => setRewardsAlert(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-4 w-4 shrink-0"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-canvas">
                <div className="space-y-0.5 pr-4">
                  <span className="text-xs font-bold text-content block">
                    Weekly Household Eco Summary
                  </span>
                  <span className="text-[11px] text-content-secondary block">
                    Email digest every Sunday with your weekly recycling kg and community rank.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={weeklyDigest}
                  onChange={(e) => setWeeklyDigest(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-4 w-4 shrink-0"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveAll()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition"
              >
                <Save className="w-3.5 h-3.5" />
                Save Alert Settings
              </button>
            </div>
          </div>
        )}

        {/* ── TAB 4: SECURITY & ACCESS ── */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <form
              onSubmit={handlePasswordChange}
              className="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-card space-y-5"
            >
              <div>
                <h3 className="text-sm font-extrabold text-content uppercase tracking-wider text-primary">
                  Change Password
                </h3>
                <p className="text-xs text-content-secondary mt-0.5">
                  Update your login credentials to secure your resident portal.
                </p>
              </div>

              {passwordSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Password updated successfully!</span>
                </div>
              )}

              {passwordError && (
                <div className="p-3 bg-rose-50 text-rose-800 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <div className="space-y-4 max-w-md">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-content">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas text-content text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-content">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas text-content text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-content">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas text-content text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  Update Password
                </button>
              </div>
            </form>

            {/* Two-Factor Authentication Card */}
            <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-content uppercase tracking-wider">
                    Two-Factor Authentication (SMS OTP)
                  </h4>
                  <p className="text-xs text-content-secondary mt-0.5">
                    Require a verification code sent to {phone} whenever you sign in.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                    twoFactorEnabled
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-muted text-content-secondary hover:bg-muted/80'
                  }`}
                >
                  {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 5: ECO IDENTITY & IMPACT ── */}
        {activeTab === 'impact' && (
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-card space-y-6">
            <div>
              <h3 className="text-sm font-extrabold text-content uppercase tracking-wider text-primary">
                Eco Passport & Community Credentials
              </h3>
              <p className="text-xs text-content-secondary mt-0.5">
                Your environmental track record authenticated by the Colombo Municipal Council.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">
                  Total GreenPoints
                </span>
                <div className="text-2xl font-black text-emerald-950">
                  {RESIDENT_USER.greenPoints} <span className="text-xs font-bold text-emerald-700">GP</span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  Redeemable for municipal tax discounts and electricity credits.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-800">
                  Monthly Diversion
                </span>
                <div className="text-2xl font-black text-blue-950">
                  {RESIDENT_USER.monthlyRecycledKg} <span className="text-xs font-bold text-blue-700">kg</span>
                </div>
                <p className="text-[11px] text-blue-800">
                  Recyclable and compostable dry stream diverted from Meethotamulla landfills.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">
                  Segregation Streak
                </span>
                <div className="text-2xl font-black text-amber-950">
                  {RESIDENT_USER.streakDays} <span className="text-xs font-bold text-amber-700">Days</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  14 consecutive collection cycles verified with zero contamination flags.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-canvas space-y-3">
              <h4 className="text-xs font-extrabold text-content uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                CMC Certified Green Household Badge
              </h4>
              <p className="text-xs text-content-secondary leading-relaxed">
                Your premises at <strong>{address}</strong> has achieved level 4 certification under the National Waste Minimisation Strategy. You qualify for scheduled priority bulky waste pickup and drop-off privileges at all Western Province transfer stations.
              </p>
            </div>
          </div>
        )}
      </div>
    </ResidentLayout>
  );
};
