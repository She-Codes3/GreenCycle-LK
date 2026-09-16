import React, { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { Button } from '@/components/ui/Button';

export const AdminSettingsPage: React.FC = () => {
  // Profile Form State
  const [fullName, setFullName] = useState('Eng. Anura Jayasinghe');
  const [email, setEmail] = useState('admin.anura@greencycle.lk');
  const [phone, setPhone] = useState('+94 11 255 8899');
  const [designation, setDesignation] = useState('Chief Systems Administrator');

  // Feedback Banner
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <AdminLayout activeItem="settings" pageTitle="Admin Settings">
      <div className="space-y-6 w-full">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">
              Admin Settings
            </h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Configure your administrator profile and account details.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            leftIcon={<Save className="w-4 h-4" />}
            className="rounded-xl text-xs font-bold shadow-sm"
          >
            Save All Changes
          </Button>
        </div>

        {/* Save Notice Banner */}
        {savedNotice && (
          <div className="p-3.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Administrator profile updated successfully!</span>
          </div>
        )}

        {/* Profile Card — spread full width across the screen */}
        <form
          onSubmit={handleSave}
          className="space-y-6 bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-card w-full"
        >
          {/* Identity Header */}
          <div className="flex items-center gap-4 pb-6 border-b border-border/80">
            <div className="w-16 h-16 rounded-2xl bg-primary text-white text-xl font-bold flex items-center justify-center shadow-sm shrink-0">
              AJ
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-content">{fullName}</h3>
              <span className="text-xs text-content-muted block mt-0.5">
                National Waste Management Infrastructure Authority
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full mt-1.5">
                Root System Administrator
              </span>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-content uppercase tracking-wider text-[11px] block">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-xs sm:text-sm text-content outline-none focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10 transition-all font-medium"
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
                className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-xs sm:text-sm text-content outline-none focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10 transition-all font-medium"
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
                className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-xs sm:text-sm text-content outline-none focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10 transition-all font-medium"
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
                className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-xs sm:text-sm text-content outline-none focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10 transition-all font-medium"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-5 border-t border-border flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="rounded-xl text-xs font-bold px-6 py-2.5 shadow-sm"
            >
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
