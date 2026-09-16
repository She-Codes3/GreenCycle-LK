import React, { useState } from 'react';
import {
  User,
  Bell,
  Palette,
  Shield,
  Save,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';

export const AdminSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'appearance' | 'system'>('profile');

  // Profile Form State
  const [fullName, setFullName] = useState('Eng. Anura Jayasinghe');
  const [email, setEmail] = useState('admin.anura@greencycle.lk');
  const [phone, setPhone] = useState('+94 11 255 8899');
  const [designation, setDesignation] = useState('Chief Systems Administrator');

  // Preferences State
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [systemNotifs, setSystemNotifs] = useState(true);
  const [urgentSms, setUrgentSms] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);

  // Appearance State
  const [theme, setTheme] = useState<'light' | 'system' | 'dark'>('light');
  const [language, setLanguage] = useState('en');

  // Feedback Banner
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <AdminLayout activeItem="settings" pageTitle="Admin Settings">
      <div className="space-y-6 max-w-4xl">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">
              Admin Settings
            </h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Configure your administrator profile, notification triggers, and system operational parameters.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            leftIcon={<Save className="w-4 h-4" />}
            className="rounded-xl text-xs font-bold"
          >
            Save All Changes
          </Button>
        </div>

        {/* Save Notice Banner */}
        {savedNotice && (
          <div className="p-3.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Administrator configuration and preferences saved successfully!</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-border/80">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-primary text-white shadow-sm'
                : 'text-content-secondary hover:bg-muted hover:text-content'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Account</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'notifications'
                ? 'bg-primary text-white shadow-sm'
                : 'text-content-secondary hover:bg-muted hover:text-content'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notifications & Alerts</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('appearance')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'appearance'
                ? 'bg-primary text-white shadow-sm'
                : 'text-content-secondary hover:bg-muted hover:text-content'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Appearance & Language</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('system')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'system'
                ? 'bg-primary text-white shadow-sm'
                : 'text-content-secondary hover:bg-muted hover:text-content'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Platform Maintenance</span>
          </button>
        </div>

        {/* Tab 1: Profile & Identity */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSave} className="space-y-5 bg-surface rounded-2xl border border-border p-6 shadow-card">
            <div className="flex items-center gap-4 pb-4 border-b border-border/80">
              <div className="w-16 h-16 rounded-2xl bg-primary text-white text-xl font-bold flex items-center justify-center shadow-sm">
                AJ
              </div>
              <div>
                <h3 className="font-extrabold text-base text-content">{fullName}</h3>
                <span className="text-xs text-content-muted block mt-0.5">
                  National Waste Management Infrastructure Authority
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full mt-1">
                  Root System Administrator
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-content uppercase tracking-wider text-[11px] block">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-muted/40 border border-border rounded-xl px-3.5 py-2.5 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface transition-all font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-content uppercase tracking-wider text-[11px] block">
                  Official Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-muted/40 border border-border rounded-xl px-3.5 py-2.5 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface transition-all font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-content uppercase tracking-wider text-[11px] block">
                  Telephone Contact
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-muted/40 border border-border rounded-xl px-3.5 py-2.5 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface transition-all font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-content uppercase tracking-wider text-[11px] block">
                  Designation / Role Title
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full bg-muted/40 border border-border rounded-xl px-3.5 py-2.5 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface transition-all font-medium"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <Button type="submit" variant="primary" size="sm" className="rounded-xl text-xs font-bold">
                Save Profile
              </Button>
            </div>
          </form>
        )}

        {/* Tab 2: Notifications */}
        {activeTab === 'notifications' && (
          <div className="space-y-4 bg-surface rounded-2xl border border-border p-6 shadow-card">
            <div>
              <h3 className="font-bold text-base text-content">Notification Preferences</h3>
              <p className="text-xs text-content-secondary mt-0.5">
                Manage automated alerts for urgent citizen complaints, telemetry limits, and council audits.
              </p>
            </div>

            <div className="divide-y divide-border/70 pt-2">
              <div className="py-3.5">
                <Switch
                  checked={emailNotifs}
                  onChange={setEmailNotifs}
                  label="Email Notifications"
                  description="Receive daily administrative summaries and new municipal council onboarding requests."
                />
              </div>

              <div className="py-3.5">
                <Switch
                  checked={systemNotifs}
                  onChange={setSystemNotifs}
                  label="System Notifications"
                  description="Display in-app browser popups and sound alerts for real-time telemetry spikes."
                />
              </div>

              <div className="py-3.5">
                <Switch
                  checked={urgentSms}
                  onChange={setUrgentSms}
                  label="Urgent Complaint SMS Alerts"
                  description="Send SMS to authorized officers when hazardous waste or illegal chemical dumping is reported."
                />
              </div>

              <div className="py-3.5">
                <Switch
                  checked={dailyDigest}
                  onChange={setDailyDigest}
                  label="Automated Executive Digest"
                  description="Generate a PDF digest of national waste metrics at 06:00 AM every Monday."
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <Button onClick={handleSave} variant="primary" size="sm" className="rounded-xl text-xs font-bold">
                Save Preferences
              </Button>
            </div>
          </div>
        )}

        {/* Tab 3: Appearance & Language */}
        {activeTab === 'appearance' && (
          <div className="space-y-5 bg-surface rounded-2xl border border-border p-6 shadow-card">
            <div>
              <h3 className="font-bold text-base text-content">Appearance & Regional Localization</h3>
              <p className="text-xs text-content-secondary mt-0.5">
                Tailor interface presentation, primary language, and timestamp standards.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Theme Selector */}
              <div>
                <label className="font-bold text-content uppercase tracking-wider text-[11px] block mb-2">
                  Display Theme
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'light', label: 'Light Theme', desc: 'Standard clean daylight interface' },
                    { id: 'system', label: 'System Match', desc: 'Sync with OS preference' },
                    { id: 'dark', label: 'Dark Mode', desc: 'Low-light administrative preview' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTheme(item.id as any)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        theme === item.id
                          ? 'border-primary bg-primary-light/20 ring-2 ring-primary/20'
                          : 'border-border bg-muted/30 hover:bg-surface'
                      }`}
                    >
                      <span className="font-bold text-content block">{item.label}</span>
                      <span className="text-[11px] text-content-muted mt-0.5 block">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Selector */}
              <div>
                <label className="font-bold text-content uppercase tracking-wider text-[11px] block mb-2">
                  Default Platform Language
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'en', label: 'English', sub: 'Default Administrative' },
                    { id: 'si', label: 'සිංහල (Sinhala)', sub: 'National Official' },
                    { id: 'ta', label: 'தமிழ் (Tamil)', sub: 'National Official' },
                  ].map((lang) => (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => setLanguage(lang.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        language === lang.id
                          ? 'border-primary bg-primary-light/20 ring-2 ring-primary/20'
                          : 'border-border bg-muted/30 hover:bg-surface'
                      }`}
                    >
                      <span className="font-bold text-content block">{lang.label}</span>
                      <span className="text-[10px] text-content-muted mt-0.5 block">{lang.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <Button onClick={handleSave} variant="primary" size="sm" className="rounded-xl text-xs font-bold">
                Save Localization
              </Button>
            </div>
          </div>
        )}

        {/* Tab 4: Platform Maintenance */}
        {activeTab === 'system' && (
          <div className="space-y-5 bg-surface rounded-2xl border border-border p-6 shadow-card">
            <div>
              <h3 className="font-bold text-base text-content">Platform Maintenance & Demo Reset</h3>
              <p className="text-xs text-content-secondary mt-0.5">
                Administrative tools for testing, sensor mock data re-seeding, and cache management.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-border bg-muted/30 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-content block">
                    Telemetry Mock Data Reset
                  </span>
                  <span className="text-[11px] text-content-muted block">
                    Restore all mock users, complaints, and center capacities to baseline factory demo state.
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    alert('Demo mock state has been re-indexed successfully.');
                  }}
                  leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                  className="rounded-xl text-xs font-semibold"
                >
                  Reset Demo Data
                </Button>
              </div>

              <div className="p-4 rounded-xl border border-border bg-muted/30 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-content block">
                    Emergency System Lockdown Mode
                  </span>
                  <span className="text-[11px] text-content-muted block">
                    Temporarily route citizen intake to municipal disaster control centers during monsoons.
                  </span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Normal Operations
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
