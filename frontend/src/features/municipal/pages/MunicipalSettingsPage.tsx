import React from 'react';
import { Building2, MapPin, Phone, Mail, Globe, User } from 'lucide-react';
import { MunicipalLayout } from '../components/MunicipalLayout';
import { MUNICIPAL_USER } from '../data/municipalMockData';

export const MunicipalSettingsPage: React.FC = () => {
  return (
    <MunicipalLayout activeItem="settings" pageTitle="Municipal Settings">
      <div className="space-y-6">
        {/* Header */}
        <div className="pb-2 border-b border-border/60">
          <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">Municipal Settings</h1>
          <p className="text-xs sm:text-sm text-content-secondary mt-1">
            Municipal profile and configuration for Kandy Municipal Council.
          </p>
        </div>

        {/* Municipal Profile */}
        <div className="bg-surface rounded-2xl border border-border shadow-card p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-content">{MUNICIPAL_USER.municipality}</h2>
              <p className="text-xs text-content-muted">{MUNICIPAL_USER.municipalityCode} • {MUNICIPAL_USER.district}, {MUNICIPAL_USER.province}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-content uppercase tracking-wider border-b border-border pb-2">
                Council Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-content-muted mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-content-muted uppercase font-bold">Municipality Name</p>
                    <p className="text-xs font-semibold text-content mt-0.5">{MUNICIPAL_USER.municipality}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-content-muted mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-content-muted uppercase font-bold">Code</p>
                    <p className="text-xs font-semibold text-content mt-0.5">{MUNICIPAL_USER.municipalityCode}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-content-muted mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-content-muted uppercase font-bold">District / Province</p>
                    <p className="text-xs font-semibold text-content mt-0.5">{MUNICIPAL_USER.district}, {MUNICIPAL_USER.province}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-content uppercase tracking-wider border-b border-border pb-2">
                Contact Officer
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-content-muted mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-content-muted uppercase font-bold">Officer Name</p>
                    <p className="text-xs font-semibold text-content mt-0.5">{MUNICIPAL_USER.name}</p>
                    <p className="text-[10px] text-content-muted">{MUNICIPAL_USER.role}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-content-muted mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-content-muted uppercase font-bold">Email</p>
                    <p className="text-xs font-semibold text-content mt-0.5">{MUNICIPAL_USER.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-content-muted mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-content-muted uppercase font-bold">Phone</p>
                    <p className="text-xs font-semibold text-content mt-0.5">{MUNICIPAL_USER.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Preferences (Toggle Switches) */}
        <div className="bg-surface rounded-2xl border border-border shadow-card p-6">
          <h3 className="text-sm font-bold text-content mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {[
              { label: 'New Collection Requests', description: 'Receive alerts when citizens submit new requests.', defaultChecked: true },
              { label: 'Complaint Updates', description: 'Get notified when complaints are filed or updated.', defaultChecked: true },
              { label: 'Capacity Warnings', description: 'Alert when disposal centers reach 80% capacity.', defaultChecked: true },
              { label: 'Collector Status Changes', description: 'Notify when collectors go on leave or become inactive.', defaultChecked: false },
              { label: 'Weekly Summary Report', description: 'Receive a weekly operations summary every Monday.', defaultChecked: false },
            ].map((pref) => (
              <div key={pref.label} className="flex items-start justify-between gap-4 py-2">
                <div>
                  <p className="text-xs font-semibold text-content">{pref.label}</p>
                  <p className="text-[10px] text-content-muted mt-0.5">{pref.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input type="checkbox" defaultChecked={pref.defaultChecked} className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-surface rounded-2xl border border-border shadow-card p-6">
          <h3 className="text-sm font-bold text-content mb-2">Data Management</h3>
          <p className="text-[10px] text-content-muted mb-4">
            This is a demo application. All data is stored locally in your browser.
          </p>
          <button
            type="button"
            onClick={() => {
              Object.keys(localStorage)
                .filter((k) => k.startsWith('gc_municipal_'))
                .forEach((k) => localStorage.removeItem(k));
              window.location.reload();
            }}
            className="h-9 px-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition-colors"
          >
            Reset All Municipal Data
          </button>
        </div>
      </div>
    </MunicipalLayout>
  );
};
