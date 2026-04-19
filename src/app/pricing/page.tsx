import Footer from '@/components/Footer';
import Link from 'next/link';

const plans = [
  {
    name: 'Basic',
    subtitle: 'Essential monitoring for individuals',
    price: '$49',
    period: '/month',
    cta: 'Get Started',
    accent: 'from-blue-500 to-cyan-500',
    animation: 'animate-fade-in-left animation-delay-200',
    features: [
      'SpO2 monitoring',
      'Basic air quality alerts',
      'Mobile app access',
      'Email support',
      '1 emergency contact',
    ],
  },
  {
    name: 'Pro',
    subtitle: 'Advanced monitoring with AI insights',
    price: '$99',
    period: '/month',
    cta: 'Get Started',
    accent: 'from-cyan-500 to-blue-500',
    animation: 'animate-zoom-in-soft animation-delay-400',
    badge: 'Most Popular',
    featured: true,
    features: [
      'Everything in Basic',
      'Advanced air quality monitoring',
      'Geo-tagged warnings',
      'AI-powered predictions',
      'Priority support',
      'Up to 5 emergency contacts',
      'Healthcare provider integration',
    ],
  },
  {
    name: 'Enterprise',
    subtitle: 'Complete solution for healthcare facilities',
    price: 'Custom',
    period: '',
    cta: 'Contact Sales',
    accent: 'from-blue-600 to-cyan-400',
    animation: 'animate-fade-in-right animation-delay-600',
    features: [
      'Everything in Pro',
      'Multi-patient management',
      'Custom integrations',
      'Advanced analytics dashboard',
      'Dedicated account manager',
      '24/7 phone support',
      'SLA guarantee',
    ],
  },
];

const faqs = [
  {
    question: 'Is there a setup fee?',
    answer:
      'No, there are no setup fees. Your monthly subscription includes all hardware, software, and support.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees.',
  },
  {
    question: "What\'s included in the hardware?",
    answer:
      'Each plan includes medical-grade sensors, a base station, and all necessary accessories for monitoring.',
  },
  {
    question: 'Do you offer discounts for healthcare providers?',
    answer:
      'Yes, we offer special pricing for healthcare facilities and bulk deployments. Contact our sales team for details.',
  },
];

export default function Pricing() {
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
              <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">How It Works</Link>
              <Link href="/pricing" className="text-blue-600 font-medium">Pricing</Link>
              <Link href="/team" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Team</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 section-sheen">
        <div className="absolute -left-16 top-10 h-44 w-44 rounded-full bg-blue-200/30 blur-3xl"></div>
        <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-cyan-200/30 blur-3xl"></div>
        <div className="absolute left-[14%] top-[22%] h-16 w-16 rounded-full bg-white/45 blur-2xl animate-float"></div>
        <div className="absolute right-[20%] top-[20%] h-20 w-20 rounded-full bg-cyan-300/25 blur-2xl animate-float-delayed"></div>
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:42px_42px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-fade-in-down">
              <div className="mb-5 inline-flex items-center rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-semibold text-blue-700 shadow-md backdrop-blur-md">
                <span className="mr-2 h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
                Flexible plans for personal and clinical care
              </div>
              <h1 className="max-w-2xl text-5xl font-bold leading-tight bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-600 bg-clip-text text-transparent mb-6 animate-gradient">
                Pricing that feels clear, fair, and ready to scale.
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Start with essential monitoring, grow into predictive intelligence, and scale up to enterprise-grade operations.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">No setup fees</span>
                <span className="rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">Cancel anytime</span>
                <span className="rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">Built for growth</span>
              </div>
            </div>

            <div className="relative animate-zoom-in-soft animation-delay-400">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-blue-400/20 via-cyan-300/10 to-transparent blur-2xl"></div>
              <div className="card-glow relative rounded-[2rem] p-6 shadow-2xl">
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/70 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-blue-500">Pricing snapshot</p>
                    <h2 className="mt-2 text-xl font-semibold text-gray-900">Compare at a glance</h2>
                  </div>
                  <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                    3 plans
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-md">
                    <p className="text-sm font-medium text-gray-500">Entry point</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">$49</p>
                    <p className="mt-1 text-sm text-gray-600">For individual daily monitoring</p>
                  </div>
                  <div className="rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-md">
                    <p className="text-sm font-medium text-gray-500">Most selected</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">Pro</p>
                    <p className="mt-1 text-sm text-gray-600">AI insights and stronger alerting</p>
                  </div>
                  <div className="rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-md sm:col-span-2">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Scale mode</p>
                        <p className="mt-2 text-lg font-semibold text-gray-900">Enterprise custom deployment</p>
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

      {/* Side-scroll Plan Preview */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto pb-3">
            <div className="flex min-w-max snap-x snap-mandatory gap-5 pr-6">
              {plans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`card-glow min-w-[280px] max-w-[320px] snap-start rounded-[1.75rem] p-6 shadow-xl ${index === 0 ? 'animate-fade-in-left animation-delay-200' : index === 1 ? 'animate-zoom-in-soft animation-delay-400' : 'animate-fade-in-right animation-delay-600'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    {plan.badge && (
                      <span className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-gray-600">{plan.subtitle}</p>
                  <div className="mt-6 flex items-end gap-1">
                    <span className="text-4xl font-bold text-blue-700">{plan.price}</span>
                    <span className="pb-1 text-gray-500">{plan.period}</span>
                  </div>
                  <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent"></div>
                  <p className="mt-5 text-sm font-medium text-gray-700">{plan.features.length} core inclusions</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`card-glow rounded-[2rem] p-8 shadow-xl relative hover-lift ${plan.featured ? 'card-glow-pulse border-2 border-blue-200 scale-[1.02] lg:scale-[1.05]' : ''} ${plan.animation}`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-2 text-sm font-semibold text-white shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.subtitle}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                    {plan.period && <span className="text-gray-600">{plan.period}</span>}
                  </div>
                  <button
                    className={`w-full rounded-2xl bg-gradient-to-r ${plan.accent} px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                  >
                    {plan.cta}
                  </button>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start rounded-2xl border border-white/65 bg-white/55 px-3 py-2 backdrop-blur-md">
                      <svg className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50/60 to-cyan-50/60 section-sheen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-down">
            <div className="inline-flex items-center rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-semibold text-blue-700 shadow-md backdrop-blur-md">
              <span className="mr-2 h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
              Common questions
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className={`card-glow rounded-2xl p-6 shadow-lg hover-lift ${index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'} ${index === 0 ? 'animation-delay-200' : index === 1 ? 'animation-delay-400' : index === 2 ? 'animation-delay-600' : 'animation-delay-800'}`}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
