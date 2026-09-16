import React, { useState } from 'react';
import { MOCK_USER_GROWTH } from '../../data/adminMockData';

export const UserGrowthChart: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(MOCK_USER_GROWTH.length - 1);
  const [timeframe, setTimeframe] = useState<'monthly' | 'quarterly'>('monthly');

  const data = MOCK_USER_GROWTH;

  // Chart dimensions
  const width = 600;
  const height = 220;
  const padding = { top: 20, right: 25, bottom: 35, left: 45 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxUsers = 1400;
  const minUsers = 0;

  // Calculate points
  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((d.users - minUsers) / (maxUsers - minUsers)) * chartHeight;
    return { ...d, x, y };
  });

  // SVG Area & Line Path
  const linePath = points.reduce((acc, curr, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${curr.x} ${curr.y}`;
  }, '');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

  // Horizontal grid lines
  const yTicks = [0, 350, 700, 1050, 1400];

  const activePoint = activeIdx !== null ? points[activeIdx] : points[points.length - 1];

  return (
    <div className="flex flex-col h-full">
      {/* Header with period toggle & active readout */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-border/80">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-content">
              {activePoint ? activePoint.users.toLocaleString() : '1,240'}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              {activePoint?.growthPct ? `+${activePoint.growthPct}%` : 'Baseline'}
            </span>
          </div>
          <span className="text-xs text-content-muted">
            {activePoint ? `${activePoint.month} 2026 registered users` : 'Registered Platform Users'}
          </span>
        </div>

        <div className="inline-flex rounded-xl bg-muted p-1 border border-border">
          <button
            type="button"
            onClick={() => setTimeframe('monthly')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              timeframe === 'monthly'
                ? 'bg-surface text-primary shadow-sm'
                : 'text-content-secondary hover:text-content'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('quarterly')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              timeframe === 'quarterly'
                ? 'bg-surface text-primary shadow-sm'
                : 'text-content-secondary hover:text-content'
            }`}
          >
            Quarterly
          </button>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative flex-1 w-full min-h-[190px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="userGrowthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
              <stop offset="70%" stopColor="#10b981" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Grid lines & Y-axis labels */}
          {yTicks.map((tick) => {
            const y = padding.top + chartHeight - ((tick - minUsers) / (maxUsers - minUsers)) * chartHeight;
            return (
              <g key={tick} className="text-content-muted text-[10px]">
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity="0.12"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="currentColor"
                  className="font-mono text-[9px]"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Gradient area under the line */}
          <path d={areaPath} fill="url(#userGrowthGradient)" />

          {/* Trend line */}
          <path
            d={linePath}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive vertical guide when hovering */}
          {activePoint && (
            <line
              x1={activePoint.x}
              y1={padding.top}
              x2={activePoint.x}
              y2={padding.top + chartHeight}
              stroke="#046a38"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.6"
            />
          )}

          {/* Interactive points */}
          {points.map((p, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <g
                key={p.month}
                className="cursor-pointer"
                onMouseEnter={() => setActiveIdx(idx)}
              >
                {/* Hit area */}
                <circle cx={p.x} cy={p.y} r={14} fill="transparent" />

                {/* Point circle */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isSelected ? 6 : 4}
                  fill={isSelected ? '#046a38' : '#ffffff'}
                  stroke="#10b981"
                  strokeWidth={isSelected ? 3 : 2}
                  className="transition-all duration-200"
                />

                {/* X-axis Month Label */}
                <text
                  x={p.x}
                  y={height - 10}
                  textAnchor="middle"
                  fill={isSelected ? '#046a38' : '#64748b'}
                  className={`text-[10px] transition-colors ${
                    isSelected ? 'font-bold' : 'font-medium'
                  }`}
                >
                  {p.month.slice(0, 3)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Footer notes */}
      <div className="flex items-center justify-between text-[11px] text-content-muted pt-2 border-t border-border/60">
        <span>Source: GreenCycle LK Platform Auth Registry</span>
        <span className="font-semibold text-emerald-700">Steady upward onboarding rate</span>
      </div>
    </div>
  );
};
