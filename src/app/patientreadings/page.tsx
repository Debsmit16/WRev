'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { GoogleMap, HeatmapLayer, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useSearchParams } from 'next/navigation';

type RangeKey = '24h' | '7d' | '30d' | '90d';

type ReadingPoint = {
  label: string;
  spo2: number;
  hr: number;
  fev1: number;
  pm25: number;
};

type MovementPoint = {
  lat: number;
  lng: number;
  weight: number;
  aqiZone: 'good' | 'moderate' | 'unhealthy';
};

const RANGE_META: { key: RangeKey; label: string }[] = [
  { key: '24h', label: 'Last 24 hrs' },
  { key: '7d', label: '7 days' },
  { key: '30d', label: '30 days' },
  { key: '90d', label: '90 days' },
];

const MOVEMENT_POINTS: MovementPoint[] = [
  { lat: 40.7423, lng: -73.9857, weight: 2, aqiZone: 'moderate' },
  { lat: 40.7484, lng: -73.9851, weight: 1, aqiZone: 'good' },
  { lat: 40.7527, lng: -73.9772, weight: 3, aqiZone: 'unhealthy' },
  { lat: 40.7412, lng: -73.9719, weight: 2, aqiZone: 'moderate' },
  { lat: 40.7358, lng: -73.9904, weight: 1, aqiZone: 'good' },
  { lat: 40.7306, lng: -73.9866, weight: 2, aqiZone: 'moderate' },
  { lat: 40.758, lng: -73.9855, weight: 3, aqiZone: 'unhealthy' },
  { lat: 40.7618, lng: -73.9732, weight: 2, aqiZone: 'moderate' },
  { lat: 40.7692, lng: -73.9817, weight: 1, aqiZone: 'good' },
  { lat: 40.7549, lng: -73.984, weight: 2, aqiZone: 'moderate' },
];

function generateReadings(range: RangeKey): ReadingPoint[] {
  const count = range === '24h' ? 24 : range === '7d' ? 14 : range === '30d' ? 15 : 18;

  return Array.from({ length: count }, (_, i) => {
    const t = i / Math.max(1, count - 1);
    const pollutionWave = Math.sin(t * 7.5) * 7 + Math.cos(t * 3.2) * 3;
    const pm25 = Math.max(16, Math.round(30 + pollutionWave + (range === '90d' ? 6 : 0)));

    const fevDropPenalty = pm25 > 38 ? 0.35 : pm25 > 33 ? 0.2 : 0;
    const fev1 = Number((3.45 - fevDropPenalty - Math.sin(t * 8.8) * 0.16).toFixed(2));

    const spo2 = Math.max(93, Math.min(99, Math.round(97.8 - fevDropPenalty * 4 - Math.cos(t * 7) * 1.1)));
    const hr = Math.round(72 + Math.sin(t * 9.5) * 6 + (pm25 > 35 ? 4 : 0));

    const label =
      range === '24h'
        ? `${i}h`
        : range === '7d'
          ? `D${Math.ceil((i + 1) / 2)}`
          : range === '30d'
            ? `W${i + 1}`
            : `P${i + 1}`;

    return {
      label,
      spo2,
      hr,
      fev1,
      pm25,
    };
  });
}

export default function PatientReadingsPage() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === '1';

  if (isDemo) {
    return <ReadingsContent isDemo />;
  }

  return (
    <ProtectedRoute>
      <ReadingsContent />
    </ProtectedRoute>
  );
}

function ReadingsContent({ isDemo = false }: { isDemo?: boolean }) {
  const { user, signOut } = useAuth();
  const [range, setRange] = useState<RangeKey>('24h');
  const readings = useMemo(() => generateReadings(range), [range]);

  const correlationInsight = useMemo(() => {
    const hits: string[] = [];

    for (let i = 1; i < readings.length; i += 1) {
      const prev = readings[i - 1];
      const curr = readings[i];
      const fevDrop = prev.fev1 - curr.fev1;

      if (fevDrop >= 0.14 && curr.pm25 >= 36) {
        hits.push(`${curr.label} (FEV1 ${curr.fev1}L, PM2.5 ${curr.pm25})`);
      }
    }

    if (!hits.length) {
      return 'AI Insight: No strong FEV1-PM2.5 correlation detected in this selected period.';
    }

    return `AI Insight: ${hits.length} correlated episodes detected where FEV1 drop aligned with PM2.5 spikes at ${hits.slice(0, 3).join(', ')}${hits.length > 3 ? '...' : ''}.`;
  }, [readings]);

  const avgAqi = useMemo(() => {
    const avg = readings.reduce((acc, cur) => acc + cur.pm25, 0) / readings.length;
    return Math.round(avg * 1.8 + 24);
  }, [readings]);

  const toCSV = () => {
    const header = ['Label', 'SpO2', 'HR', 'FEV1', 'PM2.5'];
    const rows = readings.map((r) => [r.label, String(r.spo2), String(r.hr), String(r.fev1), String(r.pm25)]);
    const csv = [header, ...rows].map((row) => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient-readings-${range}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => {
    const html = `
      <html>
      <head><title>Patient Sensor Report</title></head>
      <body style="font-family: Arial, sans-serif; padding: 24px;">
        <h1>Patient Sensor Readings Report</h1>
        <p><strong>Range:</strong> ${range}</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
        <p>${correlationInsight}</p>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-top: 12px;">
          <thead>
            <tr>
              <th>Label</th><th>SpO2</th><th>HR</th><th>FEV1</th><th>PM2.5</th>
            </tr>
          </thead>
          <tbody>
            ${readings
              .map(
                (r) => `<tr><td>${r.label}</td><td>${r.spo2}</td><td>${r.hr}</td><td>${r.fev1}</td><td>${r.pm25}</td></tr>`
              )
              .join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const displayName = String(user?.user_metadata?.full_name || user?.email || 'Patient');
  const initials = displayName
    .split(' ')
    .map((segment: string) => segment[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['visualization'],
  });

  const heatmapData = useMemo(() => {
    if (!isLoaded || typeof window === 'undefined' || !(window as any).google) {
      return [];
    }

    return MOVEMENT_POINTS.map(
      (p) => ({
        location: new (window as any).google.maps.LatLng(p.lat, p.lng),
        weight: p.weight,
      }) as any
    );
  }, [isLoaded]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-50/80">
      <header className="sticky top-0 z-50 border-b border-white/30 bg-white/70 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.35)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
              WRev
            </Link>
            <span className="hidden rounded-full border border-white/70 bg-white/60 px-3 py-1 text-xs font-semibold text-blue-700 backdrop-blur-sm sm:inline-flex">
              Sensor Readings
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link href={isDemo ? '/patient?demo=1' : '/patient'} className="rounded-xl border border-white/70 bg-white/70 px-3 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm transition hover:bg-white">
              Back to Dashboard
            </Link>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-xs font-bold text-white shadow-md">
              {initials}
            </div>
            {isDemo ? (
              <Link href="/login" className="rounded-xl border border-white/70 bg-white/70 px-3 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm transition hover:bg-white">
                Login
              </Link>
            ) : (
              <button onClick={signOut} className="rounded-xl border border-white/70 bg-white/70 px-3 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm transition hover:bg-white">
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {isDemo && (
          <div className="mb-4 rounded-2xl border border-blue-200 bg-blue-50/90 px-4 py-3 text-sm font-medium text-blue-700 backdrop-blur-sm animate-fade-in-down">
            Demo mode enabled. Sensor Readings preview.
          </div>
        )}

        <div className="mb-6 animate-fade-in-down">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Sensor Readings</h1>
          <p className="mt-1 text-sm text-gray-600 sm:text-base">Clinical timeline, AI correlation cues, and environmental movement context.</p>
        </div>

        <div className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-left">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-gray-900">Vitals + Environment Timeline</h2>
            <div className="flex flex-wrap gap-2">
              {RANGE_META.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setRange(item.key)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    range === item.key
                      ? 'border-blue-300 bg-blue-50 text-blue-700'
                      : 'border-white/70 bg-white/70 text-gray-700 hover:bg-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[360px] w-full rounded-2xl border border-white/70 bg-white/60 p-3 backdrop-blur-sm">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={readings} margin={{ top: 12, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                <XAxis dataKey="label" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis yAxisId="vitals" tick={{ fill: '#64748b', fontSize: 12 }} domain={[60, 105]} />
                <YAxis yAxisId="pm25" orientation="right" tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 80]} />
                <Tooltip />
                <Legend />
                <Line yAxisId="vitals" type="monotone" dataKey="spo2" stroke="#2563eb" strokeWidth={2.2} dot={false} name="SpO₂" />
                <Line yAxisId="vitals" type="monotone" dataKey="hr" stroke="#ef4444" strokeWidth={2.2} dot={false} name="HR" />
                <Line yAxisId="vitals" type="monotone" dataKey="fev1" stroke="#06b6d4" strokeWidth={2.2} dot={false} name="FEV1" />
                <Line yAxisId="pm25" type="monotone" dataKey="pm25" stroke="#f59e0b" strokeWidth={2.2} dot={false} name="PM2.5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 rounded-2xl border border-cyan-200 bg-cyan-50 p-4 text-sm text-cyan-800">
            {correlationInsight}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={toCSV} className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:shadow-lg">
              Export CSV
            </button>
            <button type="button" onClick={exportPdf} className="rounded-xl border border-white/70 bg-white/80 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-white">
              Export PDF
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-left lg:col-span-2">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-gray-900">GPS Heatmap + AQI Zones</h2>
                <p className="text-sm text-gray-600">Patient movement history overlaid with AQI intensity (Google Maps)</p>
              </div>
              <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-gray-700 backdrop-blur-sm">
                Avg AQI {avgAqi}
              </span>
            </div>

            <div className="h-[360px] overflow-hidden rounded-2xl border border-white/70 bg-white/60 backdrop-blur-sm">
              {loadError ? (
                <div className="grid h-full place-items-center p-6 text-center text-sm text-red-700">
                  Failed to load Google Maps. Check your API key setup.
                </div>
              ) : !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
                <div className="grid h-full place-items-center p-6 text-center text-sm text-gray-700">
                  Google Maps key not found. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local to enable the live heatmap.
                </div>
              ) : !isLoaded ? (
                <div className="grid h-full place-items-center text-sm text-gray-700">Loading map...</div>
              ) : (
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={{ lat: 40.7484, lng: -73.9857 }}
                  zoom={12}
                  options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                    styles: [
                      { featureType: 'poi', stylers: [{ visibility: 'off' }] },
                      { featureType: 'transit', stylers: [{ visibility: 'off' }] },
                    ],
                  }}
                >
                  <HeatmapLayer
                    data={heatmapData}
                    options={{
                      radius: 35,
                      opacity: 0.7,
                      gradient: [
                        'rgba(37,99,235,0)',
                        'rgba(37,99,235,0.3)',
                        'rgba(14,165,233,0.45)',
                        'rgba(234,179,8,0.6)',
                        'rgba(239,68,68,0.75)',
                      ],
                    }}
                  />
                  <MarkerF position={{ lat: 40.7484, lng: -73.9857 }} />
                </GoogleMap>
              )}
            </div>
          </section>

          <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-right">
            <h2 className="text-xl font-bold text-gray-900">AQI Zones</h2>
            <p className="mt-1 text-sm text-gray-600">Movement split by zone</p>

            <div className="mt-4 space-y-3">
              <ZonePill label="Good" value={`${MOVEMENT_POINTS.filter((p) => p.aqiZone === 'good').length} points`} className="bg-green-50 border-green-200 text-green-700" />
              <ZonePill label="Moderate" value={`${MOVEMENT_POINTS.filter((p) => p.aqiZone === 'moderate').length} points`} className="bg-yellow-50 border-yellow-200 text-yellow-700" />
              <ZonePill label="Unhealthy" value={`${MOVEMENT_POINTS.filter((p) => p.aqiZone === 'unhealthy').length} points`} className="bg-red-50 border-red-200 text-red-700" />
            </div>

            <div className="mt-4 rounded-2xl border border-white/70 bg-white/60 p-4 text-xs text-gray-600 backdrop-blur-sm">
              Heat intensity reflects both visitation frequency and AQI severity.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ZonePill({ label, value, className }: { label: string; value: string; className: string }) {
  return (
    <div className={`rounded-xl border px-3 py-2 ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em]">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
