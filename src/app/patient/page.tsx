'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
type MedStatus = 'taken' | 'pending' | 'missed';

type AlertItem = {
  id: number;
  title: string;
  severity: RiskLevel;
  timestamp: Date;
  detail: string;
};

type MedicationItem = {
  id: number;
  name: string;
  time: string;
  status: MedStatus;
};

export default function PatientDashboardPage() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === '1';

  if (isDemo) {
    return <PatientDashboardContent isDemo />;
  }

  return (
    <ProtectedRoute>
      <PatientDashboardContent />
    </ProtectedRoute>
  );
}

function PatientDashboardContent({ isDemo = false }: { isDemo?: boolean }) {
  const { user, signOut } = useAuth();

  const [spo2, setSpo2] = useState(97);
  const [heartRate, setHeartRate] = useState(74);
  const [fev1, setFev1] = useState(3.1);
  const [pm25, setPm25] = useState(32);
  const [pm10, setPm10] = useState(48);
  const [aqi, setAqi] = useState(82);
  const [riskScore, setRiskScore] = useState(58);
  const [prevRiskScore, setPrevRiskScore] = useState(54);
  const [symptomLevel, setSymptomLevel] = useState<'good' | 'mild' | 'moderate' | 'severe'>('mild');
  const [waterIntake, setWaterIntake] = useState(5);
  const [stepCount, setStepCount] = useState(4320);
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [lastExportAt, setLastExportAt] = useState<Date | null>(null);

  const [medications] = useState<MedicationItem[]>([
    { id: 1, name: 'Morning Inhaler', time: '08:00 AM', status: 'taken' },
    { id: 2, name: 'Bronchodilator', time: '01:00 PM', status: 'pending' },
    { id: 3, name: 'Steroid Dose', time: '07:30 PM', status: 'pending' },
    { id: 4, name: 'Rescue Inhaler Check', time: '09:00 PM', status: 'missed' },
  ]);

  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: 1,
      title: 'Moderate exposure risk',
      severity: 'MODERATE',
      timestamp: new Date(Date.now() - 14 * 60 * 1000),
      detail: 'PM2.5 crossed your configured threshold near current location.',
    },
    {
      id: 2,
      title: 'Breathing trend shift',
      severity: 'HIGH',
      timestamp: new Date(Date.now() - 41 * 60 * 1000),
      detail: 'FEV1 dropped below your weekly average for two consecutive checks.',
    },
    {
      id: 3,
      title: 'Medication reminder overdue',
      severity: 'MODERATE',
      timestamp: new Date(Date.now() - 79 * 60 * 1000),
      detail: 'Rescue inhaler check remains incomplete.',
    },
    {
      id: 4,
      title: 'Air quality fluctuation',
      severity: 'LOW',
      timestamp: new Date(Date.now() - 142 * 60 * 1000),
      detail: 'AQI moved from Good to Moderate in your zone.',
    },
    {
      id: 5,
      title: 'Night-time oxygen dip',
      severity: 'HIGH',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      detail: 'SpO2 briefly dropped below 95 during rest period.',
    },
  ]);

  const weeklyTrend = {
    spo2: [96, 97, 97, 98, 97, 98, spo2],
    fev1: [2.9, 3.0, 3.0, 3.1, 3.0, 3.1, fev1],
    pm25: [40, 36, 33, 35, 31, 29, pm25],
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const nextSpo2 = 95 + Math.floor(Math.random() * 4);
      const nextHr = 70 + Math.floor(Math.random() * 12);
      const nextFev1 = Number((2.8 + Math.random() * 0.6).toFixed(1));
      const nextPm25 = 24 + Math.floor(Math.random() * 18);
      const nextPm10 = 40 + Math.floor(Math.random() * 28);
      const nextAqi = 70 + Math.floor(Math.random() * 35);

      const calculatedRisk = Math.max(
        12,
        Math.min(
          98,
          Math.round((100 - nextSpo2) * 6 + (nextHr - 65) * 0.7 + (3.4 - nextFev1) * 16 + nextPm25 * 0.85)
        )
      );

      setSpo2(nextSpo2);
      setHeartRate(nextHr);
      setFev1(nextFev1);
      setPm25(nextPm25);
      setPm10(nextPm10);
      setAqi(nextAqi);
      setBatteryLevel((old) => (old > 12 ? old - 1 : 87));
      setStepCount((old) => old + Math.floor(Math.random() * 120));
      setWaterIntake((old) => (old >= 8 ? 2 : old + (Math.random() > 0.65 ? 1 : 0)));
      setPrevRiskScore((old) => {
        setRiskScore(calculatedRisk);
        return old === calculatedRisk ? Math.max(0, calculatedRisk - 2) : old;
      });

      if (calculatedRisk >= 65) {
        setAlerts((old) => [
          {
            id: Date.now(),
            title: 'Elevated risk pulse',
            severity: calculatedRisk >= 80 ? 'CRITICAL' : 'HIGH',
            timestamp: new Date(),
            detail: 'Composite risk score increased due to respiratory and environment signals.',
          },
          ...old,
        ].slice(0, 5));
      }
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const riskLevel = useMemo<RiskLevel>(() => {
    if (riskScore >= 80) return 'CRITICAL';
    if (riskScore >= 65) return 'HIGH';
    if (riskScore >= 40) return 'MODERATE';
    return 'LOW';
  }, [riskScore]);

  const trendUp = riskScore > prevRiskScore;
  const riskStroke = useMemo(() => {
    if (riskLevel === 'CRITICAL') return '#dc2626';
    if (riskLevel === 'HIGH') return '#f97316';
    if (riskLevel === 'MODERATE') return '#f59e0b';
    return '#16a34a';
  }, [riskLevel]);

  const medicationSummary = useMemo(() => {
    return medications.reduce(
      (acc, med) => {
        acc[med.status] += 1;
        return acc;
      },
      { taken: 0, pending: 0, missed: 0 }
    );
  }, [medications]);

  const goalsSummary = useMemo(() => {
    const stepsGoal = 7000;
    const hydrationGoal = 8;
    const breathingGoal = 3;
    const completedBreathing = riskLevel === 'LOW' ? 1 : 2;

    return {
      stepsPct: Math.min(100, Math.round((stepCount / stepsGoal) * 100)),
      hydrationPct: Math.min(100, Math.round((waterIntake / hydrationGoal) * 100)),
      breathingPct: Math.min(100, Math.round((completedBreathing / breathingGoal) * 100)),
      completedBreathing,
    };
  }, [stepCount, waterIntake, riskLevel]);

  const getRiskBadgeClass = (level: RiskLevel) => {
    if (level === 'CRITICAL') return 'bg-red-50 text-red-700 border-red-200';
    if (level === 'HIGH') return 'bg-orange-50 text-orange-700 border-orange-200';
    if (level === 'MODERATE') return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    return 'bg-green-50 text-green-700 border-green-200';
  };

  const getMedStatusClass = (status: MedStatus) => {
    if (status === 'taken') return 'bg-green-50 text-green-700 border-green-200';
    if (status === 'missed') return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-yellow-50 text-yellow-700 border-yellow-200';
  };

  const getAlertClass = (level: RiskLevel) => {
    if (level === 'CRITICAL') return 'bg-red-50 border-red-200 text-red-700';
    if (level === 'HIGH') return 'bg-orange-50 border-orange-200 text-orange-700';
    if (level === 'MODERATE') return 'bg-yellow-50 border-yellow-200 text-yellow-700';
    return 'bg-blue-50 border-blue-200 text-blue-700';
  };

  const formatTimeAgo = (time: Date) => {
    const diff = Date.now() - time.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    return `${hrs}h ${mins % 60}m ago`;
  };

  const initials = (user?.user_metadata?.full_name || user?.email || 'Patient')
    .split(' ')
    .map((s) => s[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-50/80">
      <header className="sticky top-0 z-50 border-b border-white/30 bg-white/70 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.35)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
              WRev
            </Link>
            <span className="hidden rounded-full border border-white/70 bg-white/60 px-3 py-1 text-xs font-semibold text-blue-700 backdrop-blur-sm sm:inline-flex">
              Patient Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-green-200 bg-green-50/90 px-3 py-1 text-xs font-semibold text-green-700 sm:inline-flex">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Monitoring
            </div>
            <Link
              href={isDemo ? '/patientreadings?demo=1' : '/patientreadings'}
              className="rounded-xl border border-white/70 bg-white/70 px-3 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm transition hover:bg-white"
            >
              Sensor Readings
            </Link>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-xs font-bold text-white shadow-md">
              {initials}
            </div>
            {isDemo ? (
              <Link
                href="/login"
                className="rounded-xl border border-white/70 bg-white/70 px-3 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm transition hover:bg-white"
              >
                Back to Login
              </Link>
            ) : (
              <button
                onClick={signOut}
                className="rounded-xl border border-white/70 bg-white/70 px-3 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm transition hover:bg-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {isDemo && (
          <div className="mb-4 rounded-2xl border border-blue-200 bg-blue-50/90 px-4 py-3 text-sm font-medium text-blue-700 backdrop-blur-sm animate-fade-in-down">
            Demo mode enabled. This is a preview of the Patient Dashboard.
          </div>
        )}

        <div className="mb-6 animate-fade-in-down">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Good to see you</h1>
          <p className="mt-1 text-sm text-gray-600 sm:text-base">
            Real-time respiratory intelligence with proactive risk guidance.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-left xl:col-span-2">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Live Status Card</h2>
                <p className="text-sm text-gray-600">SpO2, HR, FEV1, PM2.5 in real-time</p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getRiskBadgeClass(riskLevel)}`}>
                {riskLevel} RISK
              </span>
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="flex min-w-max snap-x snap-mandatory gap-4 sm:grid sm:min-w-0 sm:grid-cols-2 lg:grid-cols-4">
                <MetricTile label="SpO2" value={`${spo2}%`} sub="Oxygen saturation" tone="blue" />
                <MetricTile label="HR" value={`${heartRate} bpm`} sub="Heart rate" tone="red" />
                <MetricTile label="FEV1" value={`${fev1} L`} sub="Lung function" tone="cyan" />
                <MetricTile label="PM2.5" value={`${pm25} ug/m3`} sub="Particulate load" tone="orange" />
              </div>
            </div>
          </section>

          <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-right">
            <h2 className="text-xl font-bold text-gray-900">AI Risk Gauge</h2>
            <p className="mt-1 text-sm text-gray-600">Current score and direction</p>

            <div className="mt-5 flex flex-col items-center">
              <div
                className="relative grid h-40 w-40 place-items-center rounded-full"
                style={{ background: `conic-gradient(${riskStroke} ${riskScore * 3.6}deg, #e5e7eb 0deg)` }}
              >
                <div className="grid h-30 w-30 place-items-center rounded-full bg-white/85 backdrop-blur-sm">
                  <p className="text-4xl font-bold text-gray-900">{riskScore}</p>
                  <p className="text-xs font-semibold text-gray-500">/ 100</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
                <span className={trendUp ? 'text-red-600' : 'text-green-600'}>
                  {trendUp ? '↑' : '↓'} {Math.abs(riskScore - prevRiskScore)}
                </span>
                <span className="text-gray-600">from previous cycle</span>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-left animation-delay-200">
            <h2 className="text-xl font-bold text-gray-900">Environmental Widget</h2>
            <p className="mt-1 text-sm text-gray-600">Mini air quality map and local readings</p>

            <div className="mt-5 rounded-2xl border border-white/70 bg-white/60 p-4 backdrop-blur-sm">
              <div className="relative h-40 overflow-hidden rounded-xl bg-gradient-to-br from-cyan-100 via-sky-100 to-blue-100">
                <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
                <div className="absolute left-[58%] top-[47%] h-4 w-4 rounded-full bg-blue-600 ring-4 ring-blue-200 animate-pulse"></div>
                <div className="absolute left-[52%] top-[50%] text-xs font-semibold text-blue-700">Current location</div>
                <div className="absolute bottom-3 left-3 rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
                  AQI {aqi}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <InfoPill label="AQI" value={String(aqi)} />
                <InfoPill label="PM2.5" value={`${pm25}`} />
                <InfoPill label="PM10" value={`${pm10}`} />
              </div>
            </div>
          </section>

          <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-right animation-delay-200">
            <h2 className="text-xl font-bold text-gray-900">Today&apos;s Medications</h2>
            <p className="mt-1 text-sm text-gray-600">Pending, taken, and missed status</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                Taken: {medicationSummary.taken}
              </span>
              <span className="rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
                Pending: {medicationSummary.pending}
              </span>
              <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                Missed: {medicationSummary.missed}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {medications.map((med) => (
                <div key={med.id} className="rounded-2xl border border-white/70 bg-white/60 p-3 backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">{med.name}</p>
                      <p className="text-xs text-gray-500">{med.time}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${getMedStatusClass(med.status)}`}>
                      {med.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-up lg:col-span-2">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Alerts</h2>
                <p className="text-sm text-gray-600">Last 5 events with time and severity</p>
              </div>
              <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-gray-700 backdrop-blur-sm">
                Updated live
              </span>
            </div>

            <div className="space-y-3">
              {alerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="rounded-2xl border border-white/70 bg-white/60 p-4 backdrop-blur-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">{alert.title}</p>
                      <p className="mt-1 text-sm text-gray-600">{alert.detail}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getAlertClass(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <p className="mt-1 text-xs text-gray-500">{formatTimeAgo(alert.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-down">
            <h2 className="text-xl font-bold text-gray-900">Breathing Exercise</h2>
            {riskLevel === 'LOW' ? (
              <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4">
                <p className="text-sm font-semibold text-green-800">No prompt needed right now</p>
                <p className="mt-1 text-sm text-green-700">Keep regular breathing rhythm. System will prompt when risk rises.</p>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
                <p className="text-sm font-semibold text-cyan-800">Prompt active: 4-4-6 pattern</p>
                <ul className="mt-3 space-y-2 text-sm text-cyan-700">
                  <li>1. Inhale for 4 seconds</li>
                  <li>2. Hold for 4 seconds</li>
                  <li>3. Exhale slowly for 6 seconds</li>
                  <li>4. Repeat for 3 minutes</li>
                </ul>
                <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:shadow-lg">
                  Start Guided Breathing
                </button>
              </div>
            )}

            <div className="mt-4 rounded-2xl border border-white/70 bg-white/60 p-4 text-xs text-gray-600 backdrop-blur-sm">
              Prompt appears automatically when risk is MODERATE or above.
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-left xl:col-span-2">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Weekly Trends</h2>
                <p className="text-sm text-gray-600">7-day trend summary for respiratory and exposure metrics</p>
              </div>
              <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-gray-700 backdrop-blur-sm">
                Updated now
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <TrendMiniChart
                title="SpO2 trend"
                subtitle="Higher is better"
                values={weeklyTrend.spo2}
                colorClass="from-blue-500 to-cyan-500"
                valueSuffix="%"
              />
              <TrendMiniChart
                title="FEV1 trend"
                subtitle="Stable lung capacity"
                values={weeklyTrend.fev1}
                colorClass="from-cyan-500 to-blue-500"
                valueSuffix=" L"
              />
              <TrendMiniChart
                title="PM2.5 trend"
                subtitle="Lower is better"
                values={weeklyTrend.pm25}
                colorClass="from-amber-500 to-orange-500"
                valueSuffix=""
              />
            </div>
          </section>

          <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-right">
            <h2 className="text-xl font-bold text-gray-900">Symptom Check-in</h2>
            <p className="mt-1 text-sm text-gray-600">How are you feeling right now?</p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { key: 'good', label: 'Good' },
                { key: 'mild', label: 'Mild' },
                { key: 'moderate', label: 'Moderate' },
                { key: 'severe', label: 'Severe' },
              ].map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setSymptomLevel(option.key as 'good' | 'mild' | 'moderate' | 'severe')}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    symptomLevel === option.key
                      ? 'border-blue-300 bg-blue-50 text-blue-700'
                      : 'border-white/70 bg-white/60 text-gray-700 hover:bg-white/80'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-white/70 bg-white/60 p-3 text-sm text-gray-700 backdrop-blur-sm">
              Current check-in: <span className="font-semibold capitalize">{symptomLevel}</span>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-left animation-delay-200">
            <h2 className="text-xl font-bold text-gray-900">Care Team Connect</h2>
            <p className="mt-1 text-sm text-gray-600">Your assigned care contacts</p>

            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/70 bg-white/60 p-3 backdrop-blur-sm">
                <p className="font-semibold text-gray-900">Dr. Maya Fernandes</p>
                <p className="text-xs text-gray-500">Pulmonologist</p>
                <p className="mt-2 text-sm text-blue-700">Next consult: Tomorrow, 10:30 AM</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/60 p-3 backdrop-blur-sm">
                <p className="font-semibold text-gray-900">Care Coordinator</p>
                <p className="text-xs text-gray-500">A. Mitchell</p>
                <p className="mt-2 text-sm text-gray-700">Response window: under 2 business hours</p>
              </div>
            </div>

            <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:shadow-lg">
              Message Care Team
            </button>
          </section>

          <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-down animation-delay-200">
            <h2 className="text-xl font-bold text-gray-900">Daily Goals</h2>
            <p className="mt-1 text-sm text-gray-600">Progress for today&apos;s wellness targets</p>

            <div className="mt-4 space-y-4">
              <GoalRow label="Steps" value={`${stepCount}/7000`} pct={goalsSummary.stepsPct} tone="blue" />
              <GoalRow label="Hydration" value={`${waterIntake}/8`} pct={goalsSummary.hydrationPct} tone="cyan" />
              <GoalRow
                label="Breathing sessions"
                value={`${goalsSummary.completedBreathing}/3`}
                pct={goalsSummary.breathingPct}
                tone="orange"
              />
            </div>
          </section>

          <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-right animation-delay-200">
            <h2 className="text-xl font-bold text-gray-900">Device Health</h2>
            <p className="mt-1 text-sm text-gray-600">Sensor status and sync quality</p>

            <div className="mt-4 rounded-2xl border border-white/70 bg-white/60 p-4 backdrop-blur-sm">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">Battery</span>
                <span className="font-semibold text-gray-900">{batteryLevel}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full ${batteryLevel <= 20 ? 'bg-red-500' : batteryLevel <= 45 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${batteryLevel}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <p className="rounded-xl border border-white/70 bg-white/60 px-3 py-2 backdrop-blur-sm">Last sync: 1m ago</p>
              <p className="rounded-xl border border-white/70 bg-white/60 px-3 py-2 backdrop-blur-sm">Sensor uptime: 99.2%</p>
              <p className="rounded-xl border border-white/70 bg-white/60 px-3 py-2 backdrop-blur-sm">Firmware: v2.4.1</p>
            </div>
          </section>

          <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-up animation-delay-400">
            <h2 className="text-xl font-bold text-gray-900">Export Today Report</h2>
            <p className="mt-1 text-sm text-gray-600">Generate a compact summary for sharing with your care team</p>

            <div className="mt-4 rounded-2xl border border-white/70 bg-white/60 p-4 text-sm text-gray-700 backdrop-blur-sm">
              <ul className="space-y-2">
                <li>• Live vitals and trend snapshot</li>
                <li>• Air quality and risk profile</li>
                <li>• Medication and alert summary</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setLastExportAt(new Date())}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:shadow-lg"
            >
              Export Today&apos;s Report
            </button>

            <div className="mt-3 rounded-xl border border-white/70 bg-white/60 px-3 py-2 text-xs text-gray-600 backdrop-blur-sm">
              {lastExportAt
                ? `Last export: ${lastExportAt.toLocaleTimeString()}`
                : 'No export generated today'}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function MetricTile({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone: 'blue' | 'red' | 'cyan' | 'orange';
}) {
  const toneClass =
    tone === 'red'
      ? 'from-rose-100 to-red-50 text-red-700'
      : tone === 'cyan'
        ? 'from-cyan-100 to-sky-50 text-cyan-700'
        : tone === 'orange'
          ? 'from-amber-100 to-orange-50 text-orange-700'
          : 'from-blue-100 to-cyan-50 text-blue-700';

  return (
    <div className="min-w-[170px] snap-start rounded-2xl border border-white/70 bg-white/55 p-4 backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
      <span className={`mt-3 inline-flex rounded-full bg-gradient-to-r px-2.5 py-1 text-xs font-semibold ${toneClass}`}>
        {sub}
      </span>
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/70 bg-white/70 p-2 backdrop-blur-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}

function TrendMiniChart({
  title,
  subtitle,
  values,
  colorClass,
  valueSuffix,
}: {
  title: string;
  subtitle: string;
  values: number[];
  colorClass: string;
  valueSuffix: string;
}) {
  const max = Math.max(...values);

  return (
    <div className="rounded-2xl border border-white/70 bg-white/60 p-4 backdrop-blur-sm">
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
      <div className="mt-3 flex h-20 items-end gap-1">
        {values.map((v, idx) => (
          <div
            key={`${title}-${idx}`}
            className={`w-full rounded-t-md bg-gradient-to-t ${colorClass}`}
            style={{ height: `${Math.max(14, Math.round((v / max) * 100))}%` }}
          ></div>
        ))}
      </div>
      <p className="mt-3 text-sm font-semibold text-gray-800">
        Latest: {values[values.length - 1]}
        {valueSuffix}
      </p>
    </div>
  );
}

function GoalRow({
  label,
  value,
  pct,
  tone,
}: {
  label: string;
  value: string;
  pct: number;
  tone: 'blue' | 'cyan' | 'orange';
}) {
  const barClass = tone === 'cyan' ? 'from-cyan-500 to-blue-500' : tone === 'orange' ? 'from-amber-500 to-orange-500' : 'from-blue-500 to-cyan-500';

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-semibold text-gray-900">{value}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div className={`h-2 rounded-full bg-gradient-to-r ${barClass}`} style={{ width: `${pct}%` }}></div>
      </div>
    </div>
  );
}
