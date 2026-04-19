import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import Link from 'next/link';

const problemStats = [
  {
    value: '55M',
    label: 'People living with COPD and severe respiratory risk',
    accent: 'from-blue-600 to-cyan-600',
  },
  {
    value: '4M',
    label: 'Deaths linked to respiratory illness each year',
    accent: 'from-cyan-600 to-blue-600',
  },
  {
    value: '₹48,000 Cr',
    label: 'Estimated annual economic burden in India',
    accent: 'from-blue-700 to-cyan-500',
  },
];

const featureCards = [
  {
    title: 'Hyperspectral IoT',
    description: 'Continuously tracks respiratory and environmental biomarkers with multi-sensor precision.',
  },
  {
    title: 'Edge AI',
    description: 'Runs predictive risk analysis locally for faster, privacy-aware decision support.',
  },
  {
    title: 'SOS System',
    description: 'Instant emergency trigger that alerts family, caregivers, and clinical responders.',
  },
  {
    title: 'Offline Mode',
    description: 'Keeps core monitoring and alert logic active even during low-connectivity periods.',
  },
  {
    title: 'Doctor Connect',
    description: 'Securely shares trend reports and events with doctors for better treatment planning.',
  },
  {
    title: 'Affordable',
    description: 'Built for scalable deployment with low operating cost and accessible subscription options.',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Install Device',
    description: 'Set up the compact WRev sensor hub at home in minutes.',
  },
  {
    number: '02',
    title: 'Collect Signals',
    description: 'Respiratory and air-quality data is captured continuously.',
  },
  {
    number: '03',
    title: 'Analyze Risk',
    description: 'Edge AI evaluates patterns and predicts potential flare-ups.',
  },
  {
    number: '04',
    title: 'Act Fast',
    description: 'Get alerts, SOS options, and doctor-ready insights immediately.',
  },
];

const subscriptionTiers = [
  {
    name: 'Basic Care',
    price: 'INR 499/mo',
    notes: 'Live monitoring, app alerts, and weekly summaries.',
  },
  {
    name: 'Family Care',
    price: 'INR 999/mo',
    notes: 'Includes caregiver alerts, SOS workflows, and detailed reports.',
    highlighted: true,
  },
  {
    name: 'Clinical Connect',
    price: 'INR 1,999/mo',
    notes: 'Doctor dashboard access, advanced analytics, and priority support.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-50 to-blue-200">
      <Navigation />

      <main className="relative overflow-hidden bg-gradient-to-br from-sky-200/85 via-sky-50 to-blue-200/85">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-48 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-300/30 to-cyan-200/30 blur-3xl"></div>
          <div className="absolute top-1/3 -left-28 h-80 w-80 rounded-full bg-blue-200/20 blur-3xl"></div>
          <div className="absolute bottom-16 -right-20 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"></div>
        </div>

        <section className="relative flex min-h-[calc(100vh-4rem)] items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center rounded-full border border-blue-200/70 bg-white/50 px-4 py-2 text-sm font-semibold text-blue-700 backdrop-blur-sm">
                Intelligent Respiratory Protection
              </div>

              <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-800 bg-clip-text text-transparent">WRev</span>
              </h1>

              <p className="mt-4 text-xl font-semibold text-slate-700 sm:text-2xl lg:text-3xl">Respiratory Health Protection System</p>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                <span className="animate-fade-in-up inline-block rounded-xl bg-white/40 px-3 py-1 text-blue-700 backdrop-blur-sm">
                  AI-first monitoring that warns before symptoms escalate.
                </span>
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Get Started
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center rounded-2xl border border-blue-300 bg-white/55 px-8 py-3.5 text-base font-semibold text-blue-700 backdrop-blur-sm transition-all duration-300 hover:bg-white/80"
                >
                  View Demo
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto w-full max-w-2xl">
                <div className="relative z-10 overflow-hidden rounded-[2rem] border border-white/60 bg-white/25 p-3 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.65)] backdrop-blur-xl">
                  <Image
                    src="/device-mockup.svg"
                    alt="WRev device mockup"
                    width={1366}
                    height={768}
                    className="h-auto w-full rounded-[1.4rem] object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                <span className="bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">The Problem At Scale</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {problemStats.map((stat) => (
                <div
                  key={stat.value}
                  className="rounded-3xl border border-white/60 bg-white/40 p-7 text-center shadow-lg backdrop-blur-md"
                >
                  <div className={`bg-gradient-to-r ${stat.accent} bg-clip-text text-5xl font-extrabold text-transparent`}>
                    {stat.value}
                  </div>
                  <p className="mt-4 text-base font-medium leading-relaxed text-slate-700">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                <span className="bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">Feature Grid</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featureCards.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-b from-white/60 via-sky-100/35 to-blue-100/45 p-7 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.75)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="absolute inset-x-7 top-0 h-1 rounded-b-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-80"></div>
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{feature.title}</h3>
                  <p className="mt-3 text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/60 bg-white/30 p-6 shadow-[0_30px_90px_-45px_rgba(2,132,199,0.45)] backdrop-blur-xl sm:p-10">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                <span className="bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">How It Works</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-700 sm:text-lg">4-step illustrated process flow</p>
            </div>

            <div className="relative">
              <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4 lg:pt-14">
                {processSteps.map((step, index) => (
                  <div
                    key={step.number}
                    className="group relative z-10 animate-fade-in-up rounded-3xl border border-blue-100/70 bg-gradient-to-b from-white/60 via-sky-100/35 to-blue-100/40 p-6 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.5)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    {index < processSteps.length - 1 && (
                      <div className="workflow-link absolute -right-14 top-1/2 hidden h-[3px] w-14 -translate-y-1/2 lg:block">
                        <span className="workflow-link-dot"></span>
                      </div>
                    )}
                    {index < processSteps.length - 1 && (
                      <div className="absolute left-5 top-full h-7 w-[2px] bg-gradient-to-b from-cyan-300 to-transparent md:hidden"></div>
                    )}

                    <div className="mb-4 flex items-center justify-between">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-sm font-bold text-white shadow-md">
                        {step.number}
                      </div>
                      <span className="rounded-full border border-blue-200 bg-white/60 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
                        Step {index + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-800">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>

                    <div className="mt-5 overflow-hidden rounded-xl border border-blue-100/80 bg-white/50 p-2">
                      <div className="h-2 w-full rounded-full bg-gradient-to-r from-blue-500/80 via-cyan-400/80 to-blue-500/80"></div>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        <div className="h-2 rounded-full bg-blue-200"></div>
                        <div className="h-2 rounded-full bg-cyan-200"></div>
                        <div className="h-2 rounded-full bg-blue-200"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                <span className="bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">Pricing</span>
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
              <div className="rounded-3xl border border-white/70 bg-white/45 p-6 shadow-lg backdrop-blur-md lg:col-span-1">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Device Purchase</p>
                <h3 className="mt-3 text-2xl font-bold text-slate-800">WRev Starter Device</h3>
                <p className="mt-2 text-3xl font-extrabold text-blue-700">INR 24,999</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">One-time hardware cost with sensors, SOS trigger, and mobile setup support.</p>
              </div>

              {subscriptionTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-3xl border p-6 backdrop-blur-md ${
                    tier.highlighted
                      ? 'border-cyan-300 bg-gradient-to-b from-cyan-100/65 to-blue-100/65 shadow-[0_22px_45px_-28px_rgba(8,145,178,0.65)]'
                      : 'border-white/70 bg-white/45 shadow-lg'
                  }`}
                >
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Subscription</p>
                  <h3 className="mt-3 text-2xl font-bold text-slate-800">{tier.name}</h3>
                  <p className="mt-2 text-3xl font-extrabold text-cyan-700">{tier.price}</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{tier.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
