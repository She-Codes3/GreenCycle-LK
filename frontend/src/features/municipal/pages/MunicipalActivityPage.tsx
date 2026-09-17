import React, { useState, useMemo } from 'react';
import { Search, Filter, History, CheckCircle2, AlertTriangle, Clock, Info } from 'lucide-react';
import { MunicipalLayout } from '../components/MunicipalLayout';
import { useMunicipalData } from '../data/municipalStore';

export const MunicipalActivityPage: React.FC = () => {
  const { activityLogs } = useMunicipalData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const modules = useMemo(() => Array.from(new Set(activityLogs.map((l) => l.module))), [activityLogs]);

  const filteredLogs = useMemo(() => {
    return activityLogs.filter((l) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        if (
          !l.title.toLowerCase().includes(q) &&
          !l.description.toLowerCase().includes(q) &&
          !l.performedBy.toLowerCase().includes(q)
        ) return false;
      }
      if (selectedModule !== 'all' && l.module !== selectedModule) return false;
      if (selectedSeverity !== 'all' && l.severity !== selectedSeverity) return false;
      return true;
    });
  }, [activityLogs, searchTerm, selectedModule, selectedSeverity]);

  // Group by dateGroup
  const grouped = useMemo(() => {
    const groups: Record<string, typeof filteredLogs> = {};
    for (const log of filteredLogs) {
      if (!groups[log.dateGroup]) groups[log.dateGroup] = [];
      groups[log.dateGroup].push(log);
    }
    return groups;
  }, [filteredLogs]);

  const groupOrder = ['Today', 'Yesterday', 'Earlier'];

  const severityIcon = (severity: string) => {
    switch (severity) {
      case 'success': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'warning': return <AlertTriangle className="w-3.5 h-3.5" />;
      case 'error': return <AlertTriangle className="w-3.5 h-3.5" />;
      default: return <Info className="w-3.5 h-3.5" />;
    }
  };

  const severityColor = (severity: string) => {
    switch (severity) {
      case 'success': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'warning': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'error': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-sky-50 text-sky-600 border-sky-200';
    }
  };

  return (
    <MunicipalLayout activeItem="activity" pageTitle="Activity Logs">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">Activity Logs</h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Municipal operations audit trail for Kandy Municipal Council.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 bg-muted border border-border text-content-secondary px-3 py-1 rounded-full text-xs font-bold self-start">
            <History className="w-3.5 h-3.5" />
            {activityLogs.length} Total Entries
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" strokeWidth={1.8} />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search activity logs..."
              className="w-full rounded-xl border border-border bg-muted/60 py-2.5 pl-9 pr-4 text-xs text-content outline-none placeholder:text-content-muted focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-content-muted" />
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="rounded-xl border border-border bg-muted/60 py-2.5 pl-8 pr-8 text-xs text-content outline-none appearance-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
              >
                <option value="all">All Modules</option>
                {modules.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="rounded-xl border border-border bg-muted/60 py-2.5 px-4 text-xs text-content outline-none appearance-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
            >
              <option value="all">All Severity</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>

        {/* Grouped Activity Logs */}
        <div className="space-y-6">
          {groupOrder.map((group) => {
            const logs = grouped[group];
            if (!logs || logs.length === 0) return null;
            return (
              <div key={group}>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xs font-bold text-content uppercase tracking-wider">{group}</h3>
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[10px] text-content-muted font-semibold">{logs.length} entries</span>
                </div>

                <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden divide-y divide-border/60">
                  {logs.map((log) => (
                    <div key={log.id} className="p-4 flex items-start gap-3 hover:bg-muted/30 transition-colors">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${severityColor(log.severity)}`}>
                        {severityIcon(log.severity)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-content leading-tight">{log.title}</p>
                            <p className="text-[10px] text-content-muted mt-0.5 line-clamp-2">{log.description}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-[10px] text-content-muted block font-medium">{log.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-muted text-content-muted border border-border/60">
                            {log.module}
                          </span>
                          <span className="text-[10px] text-content-muted">
                            by <span className="font-medium text-content-secondary">{log.performedBy}</span>
                            <span className="text-content-muted"> ({log.performedByRole})</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredLogs.length === 0 && (
            <div className="ui-empty-state">
              <Clock className="w-8 h-8 text-content-muted mb-2" />
              <p className="text-xs text-content-muted">No activity logs match your filters.</p>
            </div>
          )}
        </div>
      </div>
    </MunicipalLayout>
  );
};
