import React, { useState, useRef, useCallback } from 'react';
import { ResidentLayout } from '../components/ResidentLayout';
import {
  ScanLine,
  Camera,
  Upload,
  Sparkles,
  Recycle,
  Trash2,
  AlertTriangle,
  Leaf,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Info,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface WasteResult {
  item: string;
  category: string;
  bin: string;
  binColor: string;
  binBg: string;
  binRing: string;
  binEmoji: string;
  disposal: string;
  tips: string[];
  recyclable: boolean;
  hazardous: boolean;
  ecoPoints: number;
}

// ─── Waste database ───────────────────────────────────────────────────────────

const DB: WasteResult[] = [
  {
    item: 'Plastic Bottle (PET)',
    category: 'Recyclable Plastic',
    bin: 'Blue Bin',
    binColor: 'text-blue-600',
    binBg: 'bg-blue-50',
    binRing: 'ring-blue-200',
    binEmoji: '🟦',
    disposal: 'Rinse the bottle, remove the cap, and flatten before placing in the blue recycling bin.',
    tips: ['Remove labels if possible', 'Caps go in a separate plastic bag', 'No need to sort by colour'],
    recyclable: true,
    hazardous: false,
    ecoPoints: 15,
  },
  {
    item: 'Glass Jar',
    category: 'Glass',
    bin: 'Green Bin',
    binColor: 'text-emerald-600',
    binBg: 'bg-emerald-50',
    binRing: 'ring-emerald-200',
    binEmoji: '🟩',
    disposal: 'Rinse clean and place in the green glass bin. Wrap broken glass in newspaper.',
    tips: ['Never put broken glass in loose', 'Remove metal lids before disposal', 'Perfume bottles go to hazardous waste'],
    recyclable: true,
    hazardous: false,
    ecoPoints: 10,
  },
  {
    item: 'Banana Peel / Food Scraps',
    category: 'Organic Waste',
    bin: 'Brown Bin',
    binColor: 'text-amber-700',
    binBg: 'bg-amber-50',
    binRing: 'ring-amber-200',
    binEmoji: '🟫',
    disposal: 'Place directly in the brown organic/composting bin. Use compostable bags only.',
    tips: ['Great for home composting', 'No cooked meat or dairy in compost', 'Collected every Monday and Thursday'],
    recyclable: false,
    hazardous: false,
    ecoPoints: 5,
  },
  {
    item: 'Old Mobile Phone',
    category: 'E-Waste',
    bin: 'E-Waste Drop-Off',
    binColor: 'text-violet-600',
    binBg: 'bg-violet-50',
    binRing: 'ring-violet-200',
    binEmoji: '⚡',
    disposal: 'Do NOT place in any household bin. Drop off at designated e-waste centres or book a bulky pickup.',
    tips: ['Factory reset and remove personal data first', 'Remove battery if possible', 'Check nearest e-waste drop-off on the map'],
    recyclable: true,
    hazardous: true,
    ecoPoints: 30,
  },
  {
    item: 'Medicine / Expired Pills',
    category: 'Hazardous Waste',
    bin: 'Hazardous Bin (Red)',
    binColor: 'text-red-600',
    binBg: 'bg-red-50',
    binRing: 'ring-red-200',
    binEmoji: '🔴',
    disposal: 'Return to pharmacy take-back programs or hazardous collection days. Never flush medicines down the drain.',
    tips: ['Keep medicines in their original container', 'Never put in regular rubbish', 'Check CMC hazardous collection schedule'],
    recyclable: false,
    hazardous: true,
    ecoPoints: 20,
  },
  {
    item: 'Cardboard Box',
    category: 'Paper and Cardboard',
    bin: 'Yellow Bin',
    binColor: 'text-yellow-600',
    binBg: 'bg-yellow-50',
    binRing: 'ring-yellow-200',
    binEmoji: '🟨',
    disposal: 'Flatten the box, remove plastic tape or foam inserts, then place in the yellow recycling bin.',
    tips: ['Remove all polystyrene inserts', 'Wet or greasy cardboard goes in organic bin', 'Flatten boxes to save space'],
    recyclable: true,
    hazardous: false,
    ecoPoints: 8,
  },
  {
    item: 'Styrofoam / Polystyrene',
    category: 'General Waste',
    bin: 'Black Bin',
    binColor: 'text-gray-700',
    binBg: 'bg-gray-50',
    binRing: 'ring-gray-200',
    binEmoji: '⬛',
    disposal: 'Unfortunately Styrofoam cannot be recycled via kerbside. Place in the black general waste bin.',
    tips: ['Reduce use by choosing sustainable packaging', 'Some supermarkets accept Styrofoam drop-offs', 'Never burn polystyrene'],
    recyclable: false,
    hazardous: false,
    ecoPoints: 0,
  },
];

// ─── Quick example items ──────────────────────────────────────────────────────

const EXAMPLES = [
  { label: 'Plastic Bottle', emoji: '🍶' },
  { label: 'Glass Jar', emoji: '🫙' },
  { label: 'Food Scraps', emoji: '🍌' },
  { label: 'Old Phone', emoji: '📱' },
  { label: 'Medicine', emoji: '💊' },
  { label: 'Cardboard', emoji: '📦' },
];

// ─── Main Page Component ──────────────────────────────────────────────────────

export const ResidentScannerPage: React.FC = () => {
  const [stage, setStage] = useState<'idle' | 'scanning' | 'result'>('idle');
  const [result, setResult] = useState<WasteResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const runScan = useCallback((url?: string) => {
    setPreviewUrl(url ?? null);
    setStage('scanning');
    setTimeout(() => {
      setResult(DB[Math.floor(Math.random() * DB.length)]);
      setStage('result');
    }, 2200);
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => runScan(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setStage('idle');
    setResult(null);
    setPreviewUrl(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <ResidentLayout activeItem="scanner" pageTitle="AI Waste Identifier" pageSubtitle="Instant AI-powered waste classification and recycling guidance">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* ── Page Header ── */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 shadow-xs shrink-0">
            <ScanLine className="w-7 h-7" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3" />
              AI Powered
            </div>
            <h1 className="text-2xl font-black text-content tracking-tight">AI Waste Identifier</h1>
            <p className="text-sm text-content-secondary mt-0.5">
              Scan or upload a photo to get instant bin guidance and disposal tips.
            </p>
          </div>
        </div>

        {/* ── Idle Stage ── */}
        {stage === 'idle' && (
          <div className="space-y-5">
            {/* Drop / click zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const f = e.dataTransfer.files?.[0];
                if (f) handleFile(f);
              }}
              onClick={() => fileRef.current?.click()}
              className={`relative rounded-3xl border-2 border-dashed transition-all duration-200 cursor-pointer group ${
                dragOver
                  ? 'border-primary bg-primary/5 scale-[1.01]'
                  : 'border-border hover:border-primary/60 hover:bg-emerald-50/30'
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
              <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5 group-hover:scale-110 transition-transform duration-200">
                  <Camera className="w-10 h-10" />
                </div>
                <p className="text-base font-bold text-content mb-1">Take or upload a photo</p>
                <p className="text-sm text-content-secondary mb-5">
                  Point your camera at any waste item to identify the correct bin
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    <Camera className="w-4 h-4" /> Use Camera
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border text-sm font-semibold text-content-secondary hover:bg-muted transition-colors"
                  >
                    <Upload className="w-4 h-4" /> Upload Image
                  </button>
                </div>
              </div>
            </div>

            {/* Quick examples */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-content-muted mb-3">
                Or try a quick example
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex.label}
                    type="button"
                    onClick={() => runScan()}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-border bg-surface hover:border-primary/50 hover:bg-emerald-50/40 hover:scale-105 transition-all duration-150 text-center"
                  >
                    <span className="text-2xl">{ex.emoji}</span>
                    <span className="text-[11px] font-medium text-content-secondary leading-tight">{ex.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Info banner */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50/60 border border-blue-200/60">
              <Info className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" />
              <p className="text-xs leading-relaxed text-blue-800">
                <span className="font-bold">AI Demo Mode:</span>{' '}
                Results are simulated for demonstration purposes. Full ML model integration is planned for production.
              </p>
            </div>
          </div>
        )}

        {/* ── Scanning Stage ── */}
        {stage === 'scanning' && (
          <div className="rounded-3xl border border-border bg-white p-10 flex flex-col items-center justify-center gap-5 text-center shadow-sm">
            {previewUrl ? (
              <div className="relative w-40 h-40 rounded-2xl overflow-hidden ring-2 ring-primary/20 shadow-md mb-2">
                <img src={previewUrl} alt="Scanning" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-primary/10 animate-pulse" />
              </div>
            ) : (
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <ScanLine className="w-10 h-10 text-primary" />
              </div>
            )}
            <div>
              <p className="text-base font-bold text-content">Analysing waste item...</p>
              <p className="text-sm text-content-secondary mt-1">
                Our AI is classifying the waste and checking Sri Lanka disposal guidelines.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {['Detecting material', 'Checking CMC guidelines', 'Generating tips'].map((s, i) => (
                <React.Fragment key={s}>
                  <span className="text-[11px] text-content-muted">{s}</span>
                  {i < 2 && <ChevronRight className="w-3 h-3 text-border" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* ── Result Stage ── */}
        {stage === 'result' && result && (
          <div className="space-y-4">
            {/* Result card */}
            <div className={`rounded-3xl border ${result.binRing} ${result.binBg} p-6 shadow-sm`}>
              {/* Item header */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ${result.binRing} text-2xl`}>
                    {result.binEmoji}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-content-muted mb-0.5">{result.category}</p>
                    <h2 className="text-lg font-black text-content leading-tight">{result.item}</h2>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  {result.recyclable && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      <Recycle className="w-3 h-3" /> Recyclable
                    </span>
                  )}
                  {result.hazardous && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-bold">
                      <AlertTriangle className="w-3 h-3" /> Hazardous
                    </span>
                  )}
                  {!result.recyclable && !result.hazardous && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-bold">
                      <Trash2 className="w-3 h-3" /> General Waste
                    </span>
                  )}
                </div>
              </div>

              {/* Bin indicator */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/80 border border-white shadow-xs mb-4">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-xl ring-2 ${result.binRing} bg-white`}>
                  🗑️
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-content-muted">Place in</p>
                  <p className={`text-base font-black ${result.binColor}`}>{result.bin}</p>
                </div>
                {result.ecoPoints > 0 && (
                  <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 text-white">
                    <Leaf className="w-3.5 h-3.5" />
                    <span className="text-xs font-extrabold">+{result.ecoPoints} GP</span>
                  </div>
                )}
              </div>

              {/* Disposal instruction */}
              <p className="text-sm text-content-secondary leading-relaxed mb-4">{result.disposal}</p>

              {/* Tips */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-content-muted">Quick Tips</p>
                {result.tips.map((tip) => (
                  <div key={tip} className="flex items-start gap-2">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${result.binColor}`} />
                    <p className="text-sm text-content-secondary">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo preview */}
            {previewUrl && (
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
                <img src={previewUrl} alt="Scanned item" className="w-full h-48 object-cover" />
              </div>
            )}

            {/* Scan again button */}
            <button
              type="button"
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-primary/50 text-primary font-bold text-sm hover:bg-primary/5 hover:border-primary transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Scan Another Item
            </button>
          </div>
        )}
      </div>
    </ResidentLayout>
  );
};
