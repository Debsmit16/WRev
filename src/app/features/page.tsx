import Footer from '@/components/Footer';
import Link from 'next/link';

const featureCards = [
  {
    title: 'Hyperspectral IoT',
    label: 'Signal layer',
    description:
      'Multi-sensor monitoring that blends respiratory, environmental, and movement data into one live health stream.',
    bullets: ['Sensor fusion in real time', 'Covers indoor and outdoor triggers', 'Built for continuous monitoring'],
    gradient: 'from-sky-500 via-blue-500 to-cyan-500',
    accent: 'bg-sky-500/10 text-sky-700',
    animation: 'animate-fade-in-left animation-delay-200',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 12h4l2-5 4 10 2-5h4"
      />
    ),
  },
  {
    title: 'Edge AI',
    label: 'Smart inference',
    description:
      'On-device intelligence spots patterns early, so alerts stay fast even when connectivity is weak or unstable.',
    bullets: ['Low-latency decisions', 'Less dependence on the cloud', 'Adaptive alert scoring'],
    gradient: 'from-cyan-500 via-blue-500 to-sky-600',
    accent: 'bg-cyan-500/10 text-cyan-700',
    animation: 'animate-fade-in-right animation-delay-300',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
  },
  {
    title: 'SOS System',
    label: 'Emergency response',
    description:
      'One-tap escalation sends critical alerts with the right context to family members and caregivers immediately.',
    bullets: ['Priority emergency routing', 'Multi-recipient notifications', 'Clear event context'],
    gradient: 'from-blue-600 via-cyan-500 to-sky-500',
    accent: 'bg-blue-500/10 text-blue-700',
    animation: 'animate-fade-in-left animation-delay-400',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        />
      </>
    ),
  },
  {
    title: 'Offline Mode',
    label: 'Always available',
    description:
      'Core alerts and saved insights remain available offline, so the system keeps working when the signal drops.',
    bullets: ['Local-first protection', 'Stores recent readings safely', 'Syncs automatically later'],
    gradient: 'from-sky-500 via-cyan-500 to-blue-600',
    accent: 'bg-cyan-600/10 text-cyan-800',
    animation: 'animate-fade-in-right animation-delay-500',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16h8M12 12h.01M9 6h6l2 3H7l2-3zm1-2h2"
      />
    ),
  },
  {
    title: 'Doctor Connect',
    label: 'Care network',
    description:
      'Share trends, summaries, and critical events with doctors so they can review respiratory health with better context.',
    bullets: ['Clinical-ready summaries', 'Secure sharing workflow', 'Care team visibility'],
    gradient: 'from-cyan-500 via-sky-500 to-blue-500',
    accent: 'bg-sky-600/10 text-sky-800',
    animation: 'animate-fade-in-left animation-delay-600',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m0 0a4 4 0 100-7.26m0 7.26a4 4 0 110-7.26m8 7.26a4 4 0 100-7.26m0 7.26a4 4 0 110-7.26"
      />
    ),
  },
  {
    title: 'Affordable',
    label: 'Accessible care',
    description:
      'A cost-conscious design keeps the system usable for more families, clinics, and communities without trimming the essentials.',
    bullets: ['Lower operating overhead', 'Scales without heavy hardware', 'Practical for wide deployment'],
    gradient: 'from-blue-500 via-sky-500 to-cyan-500',
    accent: 'bg-blue-500/10 text-blue-800',
    animation: 'animate-zoom-in-soft animation-delay-700',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.66 0-3 1-3 2.25S10.34 12.5 12 12.5s3 1 3 2.25S13.66 17 12 17m0-9V6m0 11v-2m9-5a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100/60">
      {/* Navigation */}
      <nav className="backdrop-blur-md bg-white/80 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">WRev</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">About</Link>
              <Link href="/features" className="text-blue-600 font-medium">Features</Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">How It Works</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Pricing</Link>
              <Link href="/team" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Team</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 section-sheen">
        <div className="absolute -left-20 top-12 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl"></div>
        <div className="absolute -right-20 bottom-8 h-48 w-48 rounded-full bg-cyan-200/30 blur-3xl"></div>
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="animate-fade-in-down">
              <div className="mb-5 inline-flex items-center rounded-full border border-white/70 bg-white/50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-md backdrop-blur-md">
                <span className="mr-2 h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
                Feature set designed for fast care decisions
              </div>
              <h1 className="max-w-2xl text-5xl font-bold leading-tight bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-600 bg-clip-text text-transparent mb-6 animate-gradient">
                Powerful Features, shaped for real respiratory care.
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                WRev combines sensor intelligence, emergency response, and care-team connectivity into one clear system.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">
                  Live insights
                </span>
                <span className="rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">
                  Emergency ready
                </span>
                <span className="rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">
                  Care-team sharing
                </span>
              </div>
            </div>

            <div className="relative animate-zoom-in-soft animation-delay-400">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-blue-400/20 via-cyan-300/10 to-transparent blur-2xl"></div>
              <div className="card-glow relative rounded-[2rem] p-6 shadow-2xl">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-blue-500">System snapshot</p>
                    <h2 className="mt-2 text-xl font-semibold text-gray-900">A cleaner signal flow</h2>
                  </div>
                  <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                    6 core cards
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-md">
                    <p className="text-sm font-medium text-gray-500">Alert speed</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">&lt; 5s</p>
                    <p className="mt-1 text-sm text-gray-600">Fast enough for critical response windows</p>
                  </div>
                  <div className="rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-md">
                    <p className="text-sm font-medium text-gray-500">Uptime mode</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">Offline</p>
                    <p className="mt-1 text-sm text-gray-600">Keeps core protection active even without signal</p>
                  </div>
                  <div className="rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-md sm:col-span-2">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Care bridge</p>
                        <p className="mt-2 text-lg font-semibold text-gray-900">Doctor Connect + SOS escalation</p>
                      </div>
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featureCards.map((feature) => (
              <article
                key={feature.title}
                className={`card-glow rounded-[1.75rem] p-7 shadow-xl hover-lift ${feature.animation}`}
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${feature.accent}`}>
                    {feature.label}
                  </div>
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-[1px] shadow-lg`}>
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white/95">
                      <svg className="h-7 w-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {feature.icon}
                      </svg>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                <p className="mt-4 text-gray-600 leading-relaxed">{feature.description}</p>

                <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent"></div>

                <ul className="mt-6 space-y-3 text-gray-700">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-r ${feature.gradient}`}></span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Supporting section */}
      <section className="py-16 bg-gradient-to-r from-blue-50/60 to-cyan-50/60 section-sheen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="card-glow rounded-[2rem] p-8 shadow-xl animate-fade-in-left">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Why it feels better</p>
              <h2 className="mt-4 text-3xl font-bold text-gray-900">A calmer interface with clearer signals.</h2>
              <p className="mt-4 max-w-2xl text-gray-600 leading-relaxed">
                The new layout gives every feature a stronger visual rhythm, clearer spacing, and easier scanning on both desktop and mobile.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">Glass cards</span>
                <span className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">Directional motion</span>
                <span className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">Simpler scanning</span>
              </div>
            </div>

            <div className="card-glow rounded-[2rem] p-8 shadow-xl animate-zoom-in-soft animation-delay-300">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-500">Feature density</p>
                  <p className="mt-2 text-4xl font-bold text-gray-900">6</p>
                </div>
                <div className="h-20 w-20 rounded-[1.5rem] bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 p-[1px] shadow-xl">
                  <div className="flex h-full w-full items-center justify-center rounded-[1.45rem] bg-white/90">
                    <svg className="h-10 w-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h10" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div className="rounded-2xl bg-white/70 p-4 text-center backdrop-blur-md">
                  <p className="text-2xl font-bold text-gray-900">Fast</p>
                  <p className="text-sm text-gray-600">alerts</p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4 text-center backdrop-blur-md">
                  <p className="text-2xl font-bold text-gray-900">Smart</p>
                  <p className="text-sm text-gray-600">context</p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4 text-center backdrop-blur-md">
                  <p className="text-2xl font-bold text-gray-900">Wide</p>
                  <p className="text-sm text-gray-600">access</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
