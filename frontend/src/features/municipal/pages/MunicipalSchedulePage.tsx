import React, { useState, useMemo } from 'react';
import { CalendarDays, MapPin, Truck, Clock, User } from 'lucide-react';
import { MunicipalLayout } from '../components/MunicipalLayout';
import { useMunicipalData } from '../data/municipalStore';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const MunicipalSchedulePage: React.FC = () => {
  const { schedule } = useMunicipalData();
  const [selectedDay, setSelectedDay] = useState<string>('all');

  const filteredSchedule = useMemo(() => {
    if (selectedDay === 'all') return schedule;
    return schedule.filter((s) => s.day === selectedDay);
  }, [schedule, selectedDay]);

  const dayStats = useMemo(() => {
    return DAYS.map((day) => {
      const entries = schedule.filter((s) => s.day === day);
      return { day, count: entries.length };
    });
  }, [schedule]);

  const statusBadge = (status: string) => {
    const cls =
      status === 'Scheduled' ? 'bg-sky-50 text-sky-800 border-sky-200'
      : status === 'In Progress' ? 'bg-amber-50 text-amber-800 border-amber-200'
      : status === 'Completed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : 'bg-red-50 text-red-800 border-red-200';
    return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cls}`}>{status}</span>;
  };

  return (
    <MunicipalLayout activeItem="schedule" pageTitle="Collection Schedule">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">Collection Schedule</h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Weekly waste collection schedule for Kandy Municipal Council zones.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 bg-primary-light border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold self-start">
            <CalendarDays className="w-3.5 h-3.5" />
            {schedule.length} Entries
          </span>
        </div>

        {/* Day Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedDay('all')}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedDay === 'all'
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-muted/60 text-content-secondary border-border hover:border-primary/40'
            }`}
          >
            All Days ({schedule.length})
          </button>
          {dayStats.map(({ day, count }) => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                selectedDay === day
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-muted/60 text-content-secondary border-border hover:border-primary/40'
              }`}
            >
              {day.slice(0, 3)} ({count})
            </button>
          ))}
        </div>

        {/* Schedule Table */}
        <div className="ui-table-wrap">
          <table className="ui-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Zone</th>
                <th>Route</th>
                <th>Collector</th>
                <th>Waste Type</th>
                <th>Time Slot</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedule.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-content-muted text-xs">
                    No schedule entries for this day.
                  </td>
                </tr>
              ) : (
                filteredSchedule.map((entry) => (
                  <tr key={entry.id}>
                    <td>
                      <span className="font-semibold text-content">{entry.day}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-content-muted shrink-0" />
                        <span className="text-content-secondary">{entry.zone}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-content-secondary text-[11px] max-w-[220px] block truncate">
                        {entry.route}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3 h-3 text-content-muted shrink-0" />
                        <div>
                          <span className="font-medium text-content block text-[11px]">{entry.collectorName}</span>
                          <span className="text-[9px] text-content-muted">{entry.collectorId}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <Truck className="w-3 h-3 text-content-muted shrink-0" />
                        <span className="text-content-secondary text-[11px]">{entry.wasteType}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-content-muted shrink-0" />
                        <span className="text-content-muted text-[11px]">{entry.timeSlot}</span>
                      </div>
                    </td>
                    <td>{statusBadge(entry.status)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Schedule Legend */}
        <div className="bg-surface rounded-xl border border-border p-4 shadow-card">
          <p className="text-[10px] text-content-muted uppercase font-bold mb-2">Status Legend</p>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Scheduled', color: 'bg-sky-500' },
              { label: 'In Progress', color: 'bg-amber-500' },
              { label: 'Completed', color: 'bg-emerald-500' },
              { label: 'Cancelled', color: 'bg-red-500' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                <span className="text-[10px] text-content-secondary font-medium">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MunicipalLayout>
  );
};
