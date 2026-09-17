import React, { useState } from 'react';
import { MOCK_COMPLAINT_DISTRIBUTION } from '../../data/adminMockData';
import { ComplaintDistribution } from '../../types/admin';

export const ComplaintsDonutChart: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<ComplaintDistribution | null>(null);

  const data = MOCK_COMPLAINT_DISTRIBUTION;
  const total = data.reduce((acc, curr) => acc + curr.count, 0);

  // SVG Donut metrics
  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate cumulative offsets
  let accumulatedPercent = 0;
  const segments = data.map((item) => {
    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += item.percentage;

    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  const selected = activeSegment || {
    status: 'Total Complaints',
    count: total,
    percentage: 100,
    color: '#046a38',
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Visual Chart & Center Readout */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
        <div className="relative flex items-center justify-center">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="transform -rotate-90"
          >
            {/* Background track circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
            />

            {/* Segments */}
            {segments.map((seg) => {
              const isHovered = activeSegment?.status === seg.status;
              return (
                <circle
                  key={seg.status}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={seg.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={seg.strokeDasharray}
                  strokeDashoffset={seg.strokeDashoffset}
                  strokeLinecap="round"
                  className="cursor-pointer transition-all duration-300 ease-out"
                  onMouseEnter={() => setActiveSegment(seg)}
                  onMouseLeave={() => setActiveSegment(null)}
                />
              );
            })}
          </svg>

          {/* Center Callout Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-2xl font-black text-content tracking-tight">
              {selected.count}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-content-muted max-w-[85px] truncate">
              {selected.status}
            </span>
            {activeSegment && (
              <span className="text-[10px] font-bold text-emerald-700">
                {selected.percentage}%
              </span>
            )}
          </div>
        </div>

        {/* Breakdown summary cards next to donut */}
        <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-1 gap-2">
          {data.map((item) => {
            const isHovered = activeSegment?.status === item.status;
            return (
              <div
                key={item.status}
                onMouseEnter={() => setActiveSegment(item)}
                onMouseLeave={() => setActiveSegment(null)}
                className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer ${
                  isHovered
                    ? 'border-border-strong bg-muted/80 shadow-sm scale-[1.02]'
                    : 'border-border/60 bg-surface hover:bg-muted/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-semibold text-content">{item.status}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs font-black text-content">{item.count}</span>
                  <span className="text-[10px] text-content-muted">({item.percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] text-content-muted pt-2 border-t border-border/60 mt-2">
        <span>Active municipal triage SLA</span>
        <span className="font-semibold text-emerald-700">56% Resolution Rate</span>
      </div>
    </div>
  );
};
