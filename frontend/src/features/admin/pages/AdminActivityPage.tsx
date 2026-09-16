import React, { useState, useMemo } from 'react';
import {
  Search,
  History,
  Download,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { Button } from '@/components/ui/Button';
import { MOCK_ADMIN_ACTIVITY_LOGS } from '../data/adminMockData';
import { AdminActivityLog } from '../types/admin';

export const AdminActivityPage: React.FC = () => {
  const [logs] = useState<AdminActivityLog[]>(MOCK_ADMIN_ACTIVITY_LOGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [exportNotice, setExportNotice] = useState(false);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = log.title.toLowerCase().includes(q);
        const matchesDesc = log.description.toLowerCase().includes(q);
        const matchesUser = log.performedBy.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesUser) return false;
      }

      if (selectedModule !== 'all' && log.module !== selectedModule) {
        return false;
      }

      if (selectedDay !== 'all' && log.dateGroup !== selectedDay) {
        return false;
      }

      return true;
    });
  }, [logs, searchTerm, selectedModule, selectedDay]);

  // Group filtered logs by dateGroup
  const groups: Array<{ groupName: string; items: AdminActivityLog[] }> = [
    { groupName: 'Today', items: filteredLogs.filter((l) => l.dateGroup === 'Today') },
    { groupName: 'Yesterday', items: filteredLogs.filter((l) => l.dateGroup === 'Yesterday') },
    { groupName: 'Earlier This Week', items: filteredLogs.filter((l) => l.dateGroup === 'Earlier') },
  ].filter((g) => g.items.length > 0);

  const handleExport = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <AdminLayout activeItem="activity" pageTitle="System Activity Logs">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">
              Activity Logs
            </h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Immutable audit trail recording administrative changes, citizen submissions, and system events.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              leftIcon={<Download className="w-4 h-4" />}
              className="rounded-xl text-xs font-semibold bg-surface hover:bg-muted"
            >
              Export Audit CSV
            </Button>
          </div>
        </div>

        {exportNotice && (
          <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-between animate-fade-in">
            <span>Audit log CSV generated for download (Mock demonstration export).</span>
            <span className="font-mono text-[11px]">greencycle-audit-2026.csv</span>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="bg-surface rounded-2xl border border-border p-4 shadow-card flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted"
              strokeWidth={1.8}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search event, user, IP..."
              className="w-full bg-muted/50 border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Module Filter */}
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs text-content font-medium outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="all">All Modules</option>
              <option value="User Management">User Management</option>
              <option value="Municipality Management">Municipality Management</option>
              <option value="Disposal Centers">Disposal Centers</option>
              <option value="Complaints">Complaints</option>
              <option value="Security">Security & Watchdog</option>
            </select>

            {/* Date Group Filter */}
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs text-content font-medium outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="all">All Timeline Dates</option>
              <option value="Today">Today Only</option>
              <option value="Yesterday">Yesterday Only</option>
              <option value="Earlier">Earlier Only</option>
            </select>

            {(searchTerm || selectedModule !== 'all' || selectedDay !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedModule('all');
                  setSelectedDay('all');
                }}
                className="text-xs text-content-muted hover:text-content"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Timeline Log View */}
        {groups.length === 0 ? (
          <div className="bg-surface rounded-2xl border border-border p-12 text-center shadow-card">
            <History className="w-10 h-10 text-content-muted mx-auto mb-2" />
            <h4 className="font-bold text-content text-sm">No activity logs matching criteria</h4>
            <p className="text-xs text-content-muted mt-1">Try relaxing your search or module filters.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {groups.map((group) => (
              <div key={group.groupName} className="space-y-3">
                {/* Day Divider Heading */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black uppercase tracking-wider text-content bg-muted px-3 py-1 rounded-lg border border-border">
                    {group.groupName}
                  </span>
                  <div className="h-px flex-1 bg-border/80" />
                </div>

                {/* Event Cards */}
                <div className="space-y-2.5">
                  {group.items.map((log) => (
                    <div
                      key={log.id}
                      className="bg-surface rounded-2xl border border-border p-4 shadow-card hover:border-primary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      {/* Left: Time & Icon & Details */}
                      <div className="flex items-start gap-3.5">
                        {/* Severity Icon */}
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            log.severity === 'success'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : log.severity === 'warning'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : log.severity === 'error'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {log.severity === 'success' && <CheckCircle2 className="w-4 h-4" />}
                          {log.severity === 'warning' && <AlertTriangle className="w-4 h-4" />}
                          {log.severity === 'error' && <AlertTriangle className="w-4 h-4" />}
                          {log.severity === 'info' && <Info className="w-4 h-4" />}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[11px] text-content-muted">
                              {log.time}
                            </span>
                            <span>•</span>
                            <span className="font-bold text-content text-sm">{log.title}</span>
                          </div>
                          <p className="text-content-secondary mt-0.5 leading-relaxed">
                            {log.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-muted text-content border border-border">
                              {log.module}
                            </span>
                            <span className="text-[10px] text-content-muted">
                              By: <strong className="text-content">{log.performedBy}</strong> ({log.performedByRole})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: IP & Integrity Tag */}
                      <div className="sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60">
                        <span className="font-mono text-[10px] text-content-muted block">
                          IP: {log.ipAddress}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 mt-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          SHA-256 Verified
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
