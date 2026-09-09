import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Page } from '@/components/layout/Page';
import { Navbar } from '@/components/layout/Navbar';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MapContainer } from '@/components/maps/MapContainer';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

import { MOCK_DISPOSAL_CENTERS } from '@/features/disposal/data/disposalCenters.mock';
import { DisposalCenter } from '@/features/disposal/types/disposal';

// Create custom leaflet marker icon for the center location preview
const createCenterPinIcon = () => {
  return L.divIcon({
    className: 'details-location-pin',
    html: `
      <div style="
        background-color: #134e39;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid #ffffff;
        color: #ffffff;
        box-shadow: 0 0 0 4px #10b981, 0 8px 16px rgba(0,0,0,0.3);
      ">
        <span style="font-size: 18px;">♻️</span>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  });
};

export const DisposalCenterDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  // Lookup center by code (e.g. DC001) or id (e.g. colombo-recycling-center)
  const center: DisposalCenter = useMemo(() => {
    if (!id) return MOCK_DISPOSAL_CENTERS[0];
    const cleanId = id.trim().toLowerCase();

    // 1. Direct ID match
    const byId = MOCK_DISPOSAL_CENTERS.find(
      (c) => c.id.toLowerCase() === cleanId || c.code?.toLowerCase() === cleanId
    );
    if (byId) return byId;

    // 2. Numeric / code match e.g. "DC001" -> 1 -> index 0
    if (cleanId.startsWith('dc')) {
      const num = parseInt(cleanId.replace(/\D/g, ''), 10);
      if (!isNaN(num) && num >= 1 && num <= MOCK_DISPOSAL_CENTERS.length) {
        return MOCK_DISPOSAL_CENTERS[num - 1];
      }
    }

    // Fallback to first center if not found
    return MOCK_DISPOSAL_CENTERS[0];
  }, [id]);

  const handleBackToMap = () => {
    navigate('/disposal-centers');
  };

  const handleGetDirections = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${center.latitude},${center.longitude}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setShareFeedback('Link copied to clipboard!');
      setTimeout(() => setShareFeedback(null), 3000);
    } else {
      alert(`Center URL: ${url}`);
    }
  };

  const defaultStreams = [
    {
      id: 'paper',
      name: 'Paper & Cardboard',
      streamCode: 'PAPER STREAM',
      description: 'Clean corrugated boxes, flattened cartons, newspapers and shredded confidential sheets.',
      rule: 'No food grease, wax, or oil coating',
      points: '+10 pts/kg',
      icon: '📄',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
      ruleClass: 'text-red-700 bg-red-50 border-red-200',
    },
    {
      id: 'plastic',
      name: 'Rigid & Soft Plastics',
      streamCode: 'PLASTICS #1 - #5',
      description: 'PET water and soft drink bottles, HDPE milk containers, clean LDPE package wraps.',
      rule: 'Rinse clear from liquids / solids',
      points: '+15 pts/kg',
      icon: '🧴',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      ruleClass: 'text-emerald-800 bg-emerald-50 border-emerald-200',
    },
    {
      id: 'glass',
      name: 'Glass Bottles & Jars',
      streamCode: 'SHEET GLASS',
      description: 'Beverage bottles (amber, green, clear), rinsed condiment glass containers.',
      rule: 'Metal caps & corks removed',
      points: '+8 pts/kg',
      icon: '🍾',
      badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
      ruleClass: 'text-slate-700 bg-slate-100 border-slate-200',
    },
    {
      id: 'metal',
      name: 'Metal & Aluminium Cans',
      streamCode: 'FERROUS & NON-FERROUS',
      description: 'Aluminium beverage cans, cleaned food tins, small light metal domestic hardware.',
      rule: 'Crush flat if possible',
      points: '+12 pts/kg',
      icon: '🥫',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      ruleClass: 'text-slate-700 bg-slate-100 border-slate-200',
    },
    {
      id: 'ewaste',
      name: 'Electronic Waste (E-Waste)',
      streamCode: 'E-WASTE CERTIFIED',
      description: 'Obsolete devices, circuit components, chargers, laptops, mobile phones and small appliances.',
      rule: 'Secure lithium battery packs',
      points: '+20 pts/item',
      icon: '🔌',
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
      ruleClass: 'text-amber-800 bg-amber-50 border-amber-200',
    },
    {
      id: 'residual',
      name: 'Non-Recyclable Municipal Dry',
      streamCode: 'REGULATED DRY RESIDUAL',
      description: 'Contaminated packaging, composite laminates, sweepings, non-hazardous municipal dry refuse.',
      rule: 'Approved CMC dry bags only',
      points: 'Standard rate',
      icon: '🗑️',
      badgeClass: 'bg-gray-100 text-gray-700 border-gray-200',
      ruleClass: 'text-slate-700 bg-slate-100 border-slate-200',
    },
  ];

  const wasteStreams = center.detailedWasteStreams && center.detailedWasteStreams.length > 0
    ? center.detailedWasteStreams
    : defaultStreams;

  const defaultSchedule = [
    { day: 'Monday – Friday', hours: '8:00 AM – 5:00 PM', isOpen: true, isToday: true },
    { day: 'Saturday', hours: '8:00 AM – 4:00 PM', isOpen: true },
    { day: 'Sunday', hours: '9:00 AM – 2:00 PM', isOpen: true },
    { day: 'Public Holidays', hours: 'Special schedule (Poya & National Holidays require Hotline check)', isOpen: false },
  ];

  const schedule = center.schedule && center.schedule.length > 0 ? center.schedule : defaultSchedule;

  const amenities = center.amenities && center.amenities.length > 0
    ? center.amenities
    : [
        'Resident Parking: 8 dedicated car and light truck drop-off bays',
        'Digital Weighing Scales: Accurate MEE-certified digital scales (0.1 kg to 500 kg)',
        'Trained Municipal Staff: On-site unloading assistance for heavy parcels',
        'Wheelchair Accessible: Grade-level ramp entry across all 4 bays',
        'Liquid Spill Containment: Certified hazardous runoff isolation drain',
      ];

  return (
    <Page className="bg-[#f8faf8] min-h-screen flex flex-col font-sans text-content">
      {/* 1. Global Navigation Bar */}
      <Navbar
        brand={
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/disposal-centers')}>
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-lg text-white shadow-sm shrink-0">
              🌱
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-content tracking-tight">
                  GreenCycle LK
                </span>
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  CMC
                </span>
              </div>
              <span className="text-[11px] text-content-secondary block font-medium">
                Colombo Municipal Solid Waste Management Directive
              </span>
            </div>
          </div>
        }
        navigation={
          <div className="flex items-center gap-1.5 ml-4">
            <a
              href="#home"
              className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-content-secondary hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="/disposal-centers"
              className="px-4 py-1.5 rounded-full text-sm font-bold bg-primary text-white shadow-sm"
            >
              Map
            </a>
            <a
              href="#report"
              className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-content-secondary hover:text-primary transition-colors"
            >
              Report
            </a>
            <a
              href="#rewards"
              className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-content-secondary hover:text-primary transition-colors"
            >
              Rewards
            </a>
            <a
              href="#bulky"
              className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-content-secondary hover:text-primary transition-colors"
            >
              Bulky
            </a>
            <a
              href="#about"
              className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-content-secondary hover:text-primary transition-colors"
            >
              About
            </a>
          </div>
        }
        actions={
          <div className="flex items-center gap-3">
            {/* Quick Header Search */}
            <div className="relative w-64 hidden xl:block">
              <input
                type="text"
                placeholder="Search ward, zone, e-waste centers..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-muted/60 border border-border rounded-full text-content placeholder:text-content-muted focus:outline-none focus:ring-1 focus:ring-primary focus:bg-surface"
              />
              <svg
                className="w-4 h-4 text-content-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Hotline 1910 Pill */}
            <a
              href="tel:1910"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors shadow-sm"
              title="Colombo Municipal Solid Waste Hotline"
            >
              <span className="text-sm">📞</span>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[9px] uppercase font-bold tracking-wider text-red-600">
                  HOTLINE
                </span>
                <span className="text-xs font-black tracking-tight text-red-700">1910</span>
              </div>
            </a>

            {/* Resident Profile Badge */}
            <div className="hidden lg:flex items-center gap-2.5 pl-2 border-l border-border/70">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-xs font-bold text-primary">
                KP
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-xs font-bold text-content">Kasun Perera</span>
                <span className="text-[10px] text-content-secondary mt-0.5">
                  Havelock Town (CMC Ward 47)
                </span>
              </div>
            </div>
          </div>
        }
      />

      {/* 2. Top Navigation Sub-Bar (Back Button, Breadcrumbs, Telemetry Status) */}
      <div className="bg-surface/80 border-b border-border/80 sticky top-0 z-30 backdrop-blur-md">
        <Container size="full" className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToMap}
              leftIcon={
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              }
              className="bg-surface hover:bg-muted font-semibold text-xs border-border rounded-xl shadow-sm text-content"
            >
              Back to Map
            </Button>

            {/* Breadcrumb Path */}
            <Breadcrumbs
              homeHref="/disposal-centers"
              items={[
                { label: 'Disposal Centers', href: '/disposal-centers' },
                { label: center.wardZone || 'Colombo Coastal North' },
                { label: center.name },
              ]}
              className="hidden md:flex"
            />
          </div>

          {/* Right Live Telemetry Badge */}
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>
              Sensor Telemetry: {center.telemetryStatus || `Live intake Normal (${center.telemetryCapacityPct || 42}% Capacity)`}
            </span>
          </div>
        </Container>
      </div>

      {/* Main Details Body */}
      <Container size="full" className="max-w-6xl mx-auto px-6 py-6 flex-1 space-y-6">
        {/* 3. Facility Hero Section */}
        <div className="rounded-3xl overflow-hidden border border-border bg-surface shadow-card">
          {/* Hero Image with Status Overlays */}
          <div className="relative h-72 sm:h-80 md:h-96 w-full bg-slate-900 overflow-hidden">
            <img
              src={center.heroImageUrl || '/images/disposal/facility-colombo-recycling-center.jpg'}
              alt={center.name}
              className="w-full h-full object-cover brightness-[0.92] hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

            {/* Top-Left Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
              <span
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-md ${
                  center.isOpen
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-800 text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {center.isOpen ? 'OPEN NOW — CLOSES AT 4:30 PM' : 'FACILITY CLOSED'}
              </span>

              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 text-slate-800 backdrop-blur-md shadow-md border border-white/40">
                {center.hubBadge || 'Ward 3 Priority Drop-off Hub'}
              </span>
            </div>

            {/* Bottom-Left Overlays over Image */}
            <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/95 border-2 border-emerald-400 flex items-center justify-center text-white text-xl shadow-lg backdrop-blur-md">
                ♻️
              </div>
              <div className="text-white drop-shadow-md">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-300 block">
                  {center.facilityCodeTag || 'CMC FACILITY #RD-COL-03 — Zone North'}
                </span>
                <span className="text-lg md:text-xl font-black tracking-tight block">
                  {center.subHubTitle || 'Modara & Kollupitiya Coastal Recovery Hub'}
                </span>
              </div>
            </div>

            {/* Bottom-Right Solar Badge */}
            {center.solarPowered && (
              <div className="absolute bottom-5 right-5 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-slate-800 text-xs font-bold backdrop-blur-md shadow-md border border-white/40">
                <span>☀️</span>
                <span>100% Solar-Powered Operations Site</span>
              </div>
            )}
          </div>

          {/* Identity & Actions Bar */}
          <div className="p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">
                  {center.name}
                </h1>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black px-2.5 py-0.5 rounded-md uppercase tracking-wide">
                  {center.verifiedGrade || 'MUNICIPAL GRADE'}
                </span>
              </div>

              {/* Sub-meta 1: Distance & Address */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-content-secondary font-medium">
                <div className="flex items-center gap-1 text-content font-bold">
                  <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>{center.distanceKm.toFixed(1)} km away</span>
                </div>
                <span>•</span>
                <span className="text-content font-medium">{center.address}</span>
                <span>•</span>
                <span className="text-content-muted">{center.corridor || center.area}</span>
              </div>

              {/* Sub-meta 2: Rating & Verified Shield */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-content-secondary pt-0.5">
                <div className="flex items-center gap-1 text-amber-600 font-bold">
                  <span>★</span>
                  <span>{center.rating || 4.8}</span>
                  <span className="text-content-muted font-normal">
                    ({center.evaluationsCount || 142} urban drop-off evaluations)
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>CMC Verified Environmental Facility</span>
                </div>
              </div>
            </div>

            {/* Right Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* Primary Direction Action */}
              <Button
                variant="primary"
                size="md"
                onClick={handleGetDirections}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                }
                className="bg-[#134e39] hover:bg-[#0e3b2b] text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-emerald-900/10"
              >
                Get Directions
              </Button>

              {/* Secondary Bookmark */}
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsSaved(!isSaved)}
                leftIcon={
                  <svg
                    className={`w-4 h-4 ${isSaved ? 'text-amber-500 fill-amber-500' : 'text-content-secondary'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                }
                className={`border-border rounded-xl font-semibold text-xs ${
                  isSaved ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-surface text-content hover:bg-muted'
                }`}
              >
                {isSaved ? 'Saved' : 'Save Center'}
              </Button>

              {/* Secondary Share */}
              <Button
                variant="outline"
                size="md"
                onClick={handleShare}
                leftIcon={
                  <svg className="w-4 h-4 text-content-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                }
                className="border-border rounded-xl font-semibold text-xs bg-surface text-content hover:bg-muted"
              >
                Share
              </Button>

              {shareFeedback && (
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 animate-fade-in">
                  {shareFeedback}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 4. Accepted Waste Types & Protocols */}
        <div className="space-y-4">
          <div className="flex items-end justify-between border-b border-border/80 pb-3">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-secondary block">
                10 SPECIALIZED RECOVERY STREAMS • {wasteStreams.length} STREAMS
              </span>
              <h2 className="text-xl font-extrabold text-content tracking-tight mt-0.5">
                Accepted Waste Types & Protocols
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-content-secondary font-medium">
              <svg className="w-3.5 h-3.5 text-content-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Sorted by category</span>
            </div>
          </div>

          {/* Grid of Waste Streams */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wasteStreams.map((stream) => (
              <Card
                key={stream.id}
                className="p-5 rounded-2xl border border-border bg-surface shadow-card hover:border-border-strong transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                      {stream.icon}
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                        stream.badgeClass || 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {stream.streamCode}
                    </span>
                  </div>

                  <h3 className="font-black text-base text-content tracking-tight mb-1">
                    {stream.name}
                  </h3>
                  <p className="text-xs text-content-secondary leading-relaxed">
                    {stream.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-border/70 text-xs">
                  <span
                    className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border truncate ${
                      stream.ruleClass || 'text-slate-700 bg-slate-50 border-slate-200'
                    }`}
                  >
                    {stream.rule}
                  </span>
                  <span className="font-bold text-emerald-700 text-xs shrink-0">
                    {stream.points}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 5. On-Site Disposal Instructions (Official Protocol) */}
        <div className="rounded-3xl border border-emerald-900/10 bg-emerald-50/40 p-6 sm:p-7 space-y-6 shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white text-lg shadow-sm">
              🛡️
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary block">
                OFFICIAL PROTOCOL
              </span>
              <h2 className="text-xl font-black text-content tracking-tight">
                On-Site Disposal Instructions
              </h2>
            </div>
          </div>

          {/* 4-Step Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Step 1 */}
            <div className="bg-surface p-4 rounded-2xl border border-border flex items-start gap-3 shadow-sm">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                1
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-sm text-content">Pre-Sort at Residence</h4>
                <p className="text-xs text-content-secondary leading-relaxed">
                  Separate recyclable items into streams before arrival. Contaminated loads cannot be accepted for Green Points.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-surface p-4 rounded-2xl border border-border flex items-start gap-3 shadow-sm">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                2
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-sm text-content">Digital Weighbridge Check-In</h4>
                <p className="text-xs text-content-secondary leading-relaxed">
                  Drive onto scales / Scan your GreenCycle Citizen QR code to the technician. Auto-earns +15 to +35 Green Points.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-surface p-4 rounded-2xl border border-border flex items-start gap-3 shadow-sm">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                3
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-sm text-content">Hazardous Materials Vault</h4>
                <p className="text-xs text-content-secondary leading-relaxed">
                  Household chemicals, batteries, and fluorescent tubes must be handed to certified specialists at Bay 4.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-surface p-4 rounded-2xl border border-border flex items-start gap-3 shadow-sm">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                4
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-sm text-content">Commercial & Bulk Permits</h4>
                <p className="text-xs text-content-secondary leading-relaxed">
                  Loads exceeding 500 kg or industrial origin require prior CWD digital manifest clearance via the MEE environmental portal.
                </p>
              </div>
            </div>
          </div>

          {/* Workshop Banner */}
          <div className="bg-[#134e39] text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3 text-left">
              <span className="text-2xl">🗓️</span>
              <div>
                <span className="text-sm font-black block">
                  Join Colombo Community Segregation Workshop
                </span>
                <span className="text-xs text-emerald-200">
                  Saturday Morning Community Segregation Demo: 8:00 AM – 10:00 AM
                </span>
              </div>
            </div>
            <a
              href="#rewards"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border border-emerald-600 transition-colors shrink-0"
            >
              View Rewards Catalog →
            </a>
          </div>
        </div>

        {/* 6. Community Verification: Drop-Off Feedback & Live Log */}
        <div className="space-y-4">
          <div className="flex items-end justify-between border-b border-border/80 pb-3">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-secondary block">
                COMMUNITY VERIFICATION
              </span>
              <h2 className="text-xl font-extrabold text-content tracking-tight mt-0.5">
                Drop-Off Feedback & Live Log
              </h2>
            </div>
            <button
              type="button"
              onClick={() => alert('Opening Citizen Feedback submission for ' + center.name)}
              className="flex items-center gap-1.5 text-xs text-primary font-bold hover:underline cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span>Write a Review</span>
            </button>
          </div>

          {/* Resident Review Card */}
          <div className="bg-surface rounded-2xl border border-border p-5 space-y-3.5 shadow-card">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src="/images/disposal/reviewer-dilan.jpg"
                  alt="Dilan Ariyawansa"
                  className="w-10 h-10 rounded-full object-cover border border-border shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-content">Dilan Ariyawansa</span>
                    <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      Verified Drop-off
                    </span>
                  </div>
                  <span className="text-[11px] text-content-secondary">
                    Ward 03 Resident • 2 hours ago
                  </span>
                </div>
              </div>

              {/* 5 Stars */}
              <div className="flex items-center gap-1 text-emerald-600 text-sm">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-content leading-relaxed italic">
              &quot;Clean drop-off bays and seamless intake process. Weighing assistant Kasun was very helpful guiding my van to Bay 2. Received digital confirmation and earned 45 Green Points for sorted PET on my Colombo app in under three minutes.&quot;
            </p>

            {/* Badges for Review */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="bg-muted px-2.5 py-1 rounded-lg text-content-secondary font-semibold">
                Resource Intake: 4.2 kg PET Plastics
              </span>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg font-bold">
                Points Credited: +35 GP
              </span>
              <span className="bg-muted px-2.5 py-1 rounded-lg text-content-secondary font-medium">
                Bay #2 Fast Track
              </span>
            </div>
          </div>

          {/* Staff Supervisor Field Note & Activity Log */}
          <div className="space-y-2">
            <div className="bg-surface rounded-xl border border-border/80 p-3.5 flex items-start gap-3 text-xs shadow-sm">
              <span className="text-lg">👨‍💼</span>
              <div>
                <span className="font-bold text-content">Supervisor L. — Field Note</span>
                <p className="text-content-secondary mt-0.5">
                  Additional bin capacity arriving for clear glass bottles next Tuesday to ease weekend peak flow.
                </p>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border/80 p-3.5 flex items-start gap-3 text-xs shadow-sm">
              <span className="text-lg">📦</span>
              <div>
                <span className="font-bold text-content">Citizen Review — 2 days ago</span>
                <p className="text-content-secondary mt-0.5">
                  Remarkably well-organized cardboard baling system. Staff actively assisted unloading from the car trunk.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Operating Hours */}
        <div className="bg-surface rounded-2xl border border-border p-6 space-y-4 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🕒</span>
              <h3 className="font-extrabold text-base text-content">Operating Hours</h3>
            </div>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
              Active Today
            </span>
          </div>

          <div className="rounded-xl border border-border overflow-hidden divide-y divide-border text-xs">
            {schedule.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 flex items-center justify-between ${
                  item.isToday
                    ? 'bg-emerald-50/60 font-bold text-emerald-900 border-l-4 border-l-emerald-600'
                    : 'bg-surface text-content hover:bg-muted/40'
                }`}
              >
                <span>{item.day}</span>
                <span className={item.isOpen ? 'font-semibold' : 'text-content-muted font-medium'}>
                  {item.hours}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-muted/60 border border-border/80 rounded-xl p-3 flex items-center gap-2 text-xs text-content-secondary">
            <span>ℹ️</span>
            <span>Gates close to municipal resident queue at 4:30 PM.</span>
          </div>
        </div>

        {/* 8. Contact & Administration */}
        <div className="bg-surface rounded-2xl border border-border p-6 space-y-4 shadow-card">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🏢</span>
            <h3 className="font-extrabold text-base text-content">Contact & Administration</h3>
          </div>

          <div className="space-y-2.5">
            {/* Hotline Phone Row */}
            <a
              href={`tel:${center.phone || '+94112545678'}`}
              className="p-3.5 rounded-xl border border-border hover:border-primary bg-muted/30 hover:bg-muted flex items-center justify-between text-xs transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-base text-primary">📞</span>
                <div>
                  <span className="text-[10px] font-bold text-content-muted uppercase tracking-wider block">
                    CMC DIRECT HOTLINE
                  </span>
                  <span className="font-bold text-content group-hover:text-primary transition-colors text-sm">
                    {center.phone || '+94 11 254 5678'}
                  </span>
                </div>
              </div>
              <span className="text-content-muted group-hover:text-primary transition-colors text-base font-bold">
                →
              </span>
            </a>

            {/* Email Row */}
            <a
              href={`mailto:${center.email || 'info@greencycle.lk'}`}
              className="p-3.5 rounded-xl border border-border hover:border-primary bg-muted/30 hover:bg-muted flex items-center justify-between text-xs transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-base text-primary">✉️</span>
                <div>
                  <span className="text-[10px] font-bold text-content-muted uppercase tracking-wider block">
                    OFFICIAL CENTER EMAIL
                  </span>
                  <span className="font-bold text-content group-hover:text-primary transition-colors text-sm">
                    {center.email || 'info@greencycle.lk'}
                  </span>
                </div>
              </div>
              <span className="text-content-muted group-hover:text-primary transition-colors text-base font-bold">
                →
              </span>
            </a>

            {/* Designated Supervisor Profile */}
            <div className="p-3.5 rounded-xl border border-border bg-muted/30 flex items-center gap-3 text-xs">
              <img
                src={center.supervisor?.avatarUrl || '/images/disposal/supervisor-nimal.jpg'}
                alt={center.supervisor?.name || 'Eng. Nimal Senanayake'}
                className="w-12 h-12 rounded-xl object-cover border border-border shadow-sm shrink-0"
              />
              <div>
                <span className="text-[10px] font-bold text-content-muted uppercase tracking-wider block">
                  DESIGNATED CENTER SUPERVISOR
                </span>
                <span className="font-bold text-content text-sm block">
                  {center.supervisor?.name || 'Eng. Nimal Senanayake'}
                </span>
                <span className="text-content-secondary text-[11px]">
                  {center.supervisor?.division || 'CMC Environmental Engineering Div.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 9. On-Site Amenities */}
        <div className="bg-surface rounded-2xl border border-border p-6 space-y-4 shadow-card">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">✨</span>
            <h3 className="font-extrabold text-base text-content">On-Site Amenities</h3>
          </div>

          <div className="space-y-2.5">
            {amenities.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-content font-medium">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs shrink-0">
                  ✓
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 10. Location Preview with Interactive Map */}
        <div className="bg-surface rounded-2xl border border-border p-6 space-y-4 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🗺️</span>
              <h3 className="font-extrabold text-base text-content">Location Preview</h3>
            </div>
            <span className="text-xs font-semibold text-content-muted">{center.area || 'Colombo 03'}</span>
          </div>

          {/* Embedded Leaflet Map for this Center */}
          <div className="h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-border relative">
            <MapContainer
              center={[center.latitude, center.longitude]}
              zoom={14}
              zoomControl={true}
              height="100%"
              className="h-full w-full"
            >
              <Marker
                position={[center.latitude, center.longitude]}
                icon={createCenterPinIcon()}
              />
            </MapContainer>
          </div>

          <Button
            variant="outline"
            fullWidth
            onClick={handleGetDirections}
            leftIcon={<span>📍</span>}
            className="rounded-xl font-bold text-xs border-border bg-muted/40 hover:bg-muted py-2.5 text-content"
          >
            Get Directions in Google Maps
          </Button>
        </div>

        {/* 11. Civic Legal Disclaimer */}
        <div className="bg-surface/80 border border-border/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-content-secondary shadow-sm">
          <span className="text-base text-primary shrink-0">🛡️</span>
          <span className="leading-relaxed text-[11px]">
            Operated directly under the <strong>Colombo Municipal Council Solid Waste Directive Act No. 17 to 1201 F</strong>.
            All recycled plastics/metals/paper are transferred strictly to authorized and licensed recovery partners / recycling centers.
            Information is provided for demonstration civic planning in the GreenCycle LK framework.
          </span>
        </div>
      </Container>

      {/* 12. Civic Global Footer */}
      <footer className="border-t border-border/80 bg-surface/80 py-4 px-8 mt-10 text-xs text-content-secondary flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-content">GreenCycle LK</span>
          <span>•</span>
          <span>Colombo Municipal Solid Waste Portal</span>
        </div>
        <div>
          © 2026 Colombo Municipal Council (CMC). Environmental Services & Waste Management Division. All rights reserved.
        </div>
      </footer>
    </Page>
  );
};

export default DisposalCenterDetailsPage;
