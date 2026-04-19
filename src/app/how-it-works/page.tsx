import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

const steps = [
  {
    number: '01',
    title: 'Setup & Installation',
    description:
      'Receive the WRev kit, connect the sensors, and complete a guided setup in minutes with a clean onboarding flow.',
    bullets: ['Unbox and connect sensors', 'Download the mobile app', 'Complete initial calibration'],
    image: '/how-it-works/phase-01-setup.svg',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    ),
  },
  {
    number: '02',
    title: 'Continuous Monitoring',
    description:
      'Once active, WRev tracks respiratory health and environmental conditions around the clock with steady, low-friction monitoring.',
    bullets: ['Real-time SpO2 tracking', 'Air quality assessment', 'Environmental data collection'],
    image: '/how-it-works/phase-02-monitoring.svg',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
  },
  {
    number: '03',
    title: 'Intelligent Analysis',
    description:
      'AI models identify patterns, flag risk changes, and turn raw readings into clear guidance that is easy to act on.',
    bullets: ['Pattern recognition', 'Predictive analytics', 'Personalized recommendations'],
    image: '/how-it-works/phase-03-analysis.svg',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    ),
  },
  {
    number: '04',
    title: 'Alerts & Notifications',
    description:
      'When something needs attention, WRev escalates instantly to the right people so the response stays fast and coordinated.',
    bullets: ['Instant mobile alerts', 'Caregiver notifications', 'Healthcare provider integration'],
    image: '/how-it-works/phase-04-alerts.svg',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 17h5l-5 5v-5zM12 17h.01M6 17h.01M12 3v4m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
      />
    ),
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-50/70">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.35)]">
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
              <Link href="/features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</Link>
              <Link href="/how-it-works" className="text-blue-600 font-medium">How It Works</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Pricing</Link>
              <Link href="/team" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Team</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 section-sheen">
        <div className="absolute -left-20 top-10 h-52 w-52 rounded-full bg-blue-200/30 blur-3xl"></div>
        <div className="absolute -right-20 bottom-10 h-52 w-52 rounded-full bg-cyan-200/30 blur-3xl"></div>
        <div className="absolute left-[12%] top-[18%] h-16 w-16 rounded-full bg-white/40 blur-2xl animate-float"></div>
        <div className="absolute right-[18%] top-[28%] h-20 w-20 rounded-full bg-cyan-300/20 blur-2xl animate-float-delayed"></div>
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:42px_42px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-fade-in-up">
              <div className="mb-5 inline-flex items-center rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-semibold text-blue-700 shadow-lg backdrop-blur-md">
                <span className="mr-2 h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
                Clear workflow from setup to care escalation
              </div>
              <h1 className="max-w-2xl text-5xl font-bold leading-tight bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-600 bg-clip-text text-transparent mb-6 animate-gradient">
                How it works, in a cleaner and more guided flow.
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                WRev turns respiratory monitoring into a simple sequence: install, monitor, analyze, and act before small issues become larger ones.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">Setup in minutes</span>
                <span className="rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">Continuous tracking</span>
                <span className="rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">Actionable alerts</span>
              </div>
            </div>

            <div className="relative animate-zoom-in-soft animation-delay-400">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-blue-400/20 via-cyan-300/10 to-transparent blur-2xl"></div>
              <div className="card-glow relative rounded-[2rem] p-6 shadow-2xl">
                <div className="flex items-center justify-between gap-4 border-b border-white/60 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-blue-500">Workflow preview</p>
                    <h2 className="mt-2 text-xl font-semibold text-gray-900">A guided sequence that feels light</h2>
                  </div>
                  <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                    4 steps
                  </div>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-md">
                    <p className="text-sm font-medium text-gray-500">System mode</p>
                    <p className="mt-2 text-2xl font-bold text-gray-900">Always on</p>
                    <p className="mt-1 text-sm text-gray-600">Monitoring stays active throughout the day</p>
                  </div>
                  <div className="rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-md">
                    <p className="text-sm font-medium text-gray-500">Alert path</p>
                    <p className="mt-2 text-2xl font-bold text-gray-900">Direct</p>
                    <p className="mt-1 text-sm text-gray-600">Critical issues move quickly to the right people</p>
                  </div>
                  <div className="rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-md sm:col-span-2">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Motion language</p>
                        <p className="mt-2 text-lg font-semibold text-gray-900">Side-scroll + vertical reveal</p>
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

      {/* Process Preview Strip */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto pb-3">
            <div className="flex min-w-max snap-x snap-mandatory gap-5 pr-6">
              {steps.map((step, index) => (
                <div key={step.number} className={`card-glow min-w-[280px] max-w-[320px] snap-start rounded-[1.75rem] p-5 shadow-xl ${index % 2 === 0 ? 'animate-fade-in-up' : 'animate-zoom-in-soft'} animation-delay-${(index + 1) * 200}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-blue-500">Step {step.number}</p>
                      <h3 className="mt-2 text-xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <div className="h-12 w-12 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-[1px] shadow-lg">
                      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white/95 text-blue-700">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {step.icon}
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">{step.description}</p>
                  <div className="mt-5 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent"></div>
                  <ul className="mt-5 space-y-2 text-sm text-gray-700">
                    {step.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Timeline */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-down">
            <div className="inline-flex items-center rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-semibold text-blue-700 shadow-md backdrop-blur-md">
              <span className="mr-2 h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
              The main care loop
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 mb-4">A visual path from signal to action</h2>
            <p className="text-lg text-gray-600">Each stage is clear, calm, and designed to make the next step obvious.</p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-blue-200 via-cyan-200 to-blue-200"></div>
            <div className="space-y-10 lg:space-y-14">
              {steps.map((step, index) => {
                const reverse = index % 2 === 1;

                return (
                  <div
                    key={step.number}
                    className={`relative flex flex-col items-center gap-6 lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''}`}
                  >
                    <div className="hidden lg:block absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg"></div>

                    <div className={`w-full lg:w-1/2 ${reverse ? 'lg:pl-12' : 'lg:pr-12'} animate-${reverse ? 'fade-in-right' : 'fade-in-left'} animation-delay-${(index + 1) * 200}`}>
                      <div className="card-glow rounded-[2rem] p-8 shadow-xl">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-lg font-bold text-white shadow-lg">
                              {step.number.replace('0', '')}
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-[0.35em] text-blue-500">Phase {step.number}</p>
                              <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                            </div>
                          </div>
                          <div className="hidden sm:block rounded-full border border-white/70 bg-white/60 px-3 py-1 text-xs font-semibold text-gray-600 backdrop-blur-md">
                            Step {step.number}
                          </div>
                        </div>

                        <p className="mt-5 text-gray-600 leading-relaxed">{step.description}</p>

                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                          {step.bullets.map((bullet) => (
                            <div key={bullet} className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm font-medium text-gray-700 backdrop-blur-md">
                              {bullet}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={`w-full lg:w-1/2 ${reverse ? 'lg:pr-12' : 'lg:pl-12'} animate-zoom-in-soft animation-delay-${(index + 1) * 200 + 200}`}>
                      <div className="relative card-glow overflow-hidden rounded-[2rem] p-8 shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/20 to-cyan-100/30"></div>
                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-400/15 blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-cyan-400/15 blur-3xl"></div>
                        <div className="relative h-64 overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/50">
                          <Image src={step.image} alt={step.title} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/35 via-transparent to-white/0"></div>
                          <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-blue-700 backdrop-blur-md">
                            Phase {step.number}
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/70 bg-white/70 p-4 backdrop-blur-md">
                            <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                            <p className="mt-1 text-xs text-gray-600">Visual reference for {step.number}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom strip */}
      <section className="py-16 bg-gradient-to-r from-blue-50/60 to-cyan-50/60 section-sheen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="card-glow rounded-[1.75rem] p-6 shadow-lg animate-fade-in-left">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Built for clarity</p>
              <h3 className="mt-4 text-xl font-bold text-gray-900">No clutter, no guesswork</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">The page structure keeps each stage separated, readable, and visually calm.</p>
            </div>
            <div className="card-glow rounded-[1.75rem] p-6 shadow-lg animate-zoom-in-soft animation-delay-300">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Motion language</p>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Horizontal + vertical reveals</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">A side-scroll preview strip and alternating workflow panels add depth without feeling busy.</p>
            </div>
            <div className="card-glow rounded-[1.75rem] p-6 shadow-lg animate-fade-in-right animation-delay-600">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Professional feel</p>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Transparent glass boxes</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">Soft borders, blur, and layered gradients keep the UI premium and modern.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
