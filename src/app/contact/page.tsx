import Footer from '@/components/Footer';
import Link from 'next/link';

const contactCards = [
  {
    title: 'Email',
    lines: ['support@wrev.health', 'sales@wrev.health'],
    gradient: 'from-blue-500 to-cyan-500',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    title: 'Phone',
    lines: ['+1 (555) 123-WREV', 'Mon-Fri 9AM-6PM EST'],
    gradient: 'from-cyan-500 to-blue-500',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    ),
  },
  {
    title: 'Address',
    lines: ['123 Health Tech Drive', 'Innovation District', 'San Francisco, CA 94105'],
    gradient: 'from-blue-600 to-cyan-400',
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </>
    ),
  },
];

export default function Contact() {
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
              <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Pricing</Link>
              <Link href="/team" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Team</Link>
              <Link href="/contact" className="text-blue-600 font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 section-sheen">
        <div className="absolute -left-16 top-10 h-44 w-44 rounded-full bg-blue-200/30 blur-3xl"></div>
        <div className="absolute -right-16 bottom-10 h-44 w-44 rounded-full bg-cyan-200/30 blur-3xl"></div>
        <div className="absolute left-[12%] top-[20%] h-16 w-16 rounded-full bg-white/45 blur-2xl animate-float"></div>
        <div className="absolute right-[20%] top-[22%] h-20 w-20 rounded-full bg-cyan-300/25 blur-2xl animate-float-delayed"></div>
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:42px_42px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-fade-in-down">
              <div className="mb-5 inline-flex items-center rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-semibold text-blue-700 shadow-md backdrop-blur-md">
                <span className="mr-2 h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
                Talk to WRev support and sales
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-600 bg-clip-text text-transparent mb-6 animate-gradient leading-tight">
                Let&apos;s connect and build better respiratory care.
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Reach out for technical support, deployment planning, product demos, and partnership opportunities.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">Fast response team</span>
                <span className="rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">Dedicated support hours</span>
                <span className="rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">Enterprise assistance</span>
              </div>
            </div>

            <div className="relative animate-zoom-in-soft animation-delay-400">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-blue-400/20 via-cyan-300/10 to-transparent blur-2xl"></div>
              <div className="card-glow relative rounded-[2rem] p-6 shadow-2xl">
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/70 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-blue-500">Contact snapshot</p>
                    <h2 className="mt-2 text-xl font-semibold text-gray-900">Pick the right channel quickly</h2>
                  </div>
                  <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                    3 channels
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-md">
                    <p className="text-sm font-medium text-gray-500">General response</p>
                    <p className="mt-2 text-2xl font-bold text-gray-900">Within 24h</p>
                    <p className="mt-1 text-sm text-gray-600">Typical business-day turnaround</p>
                  </div>
                  <div className="rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-md">
                    <p className="text-sm font-medium text-gray-500">Priority clients</p>
                    <p className="mt-2 text-2xl font-bold text-gray-900">Faster</p>
                    <p className="mt-1 text-sm text-gray-600">Escalated support pathway</p>
                  </div>
                  <div className="rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-md sm:col-span-2">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Best for demos</p>
                        <p className="mt-2 text-lg font-semibold text-gray-900">Sales + partnership inquiries</p>
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

      {/* Side-scrolling contact rail */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto pb-3">
            <div className="flex min-w-max snap-x snap-mandatory gap-5 pr-6">
              {contactCards.map((card, index) => (
                <div
                  key={`${card.title}-rail`}
                  className={`card-glow min-w-[280px] max-w-[320px] snap-start rounded-[1.75rem] p-5 shadow-xl ${index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'} ${index === 0 ? 'animation-delay-200' : index === 1 ? 'animation-delay-400' : 'animation-delay-600'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${card.gradient} shadow-lg`}>
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {card.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{card.title}</p>
                      <p className="text-sm text-gray-600">{card.lines[0]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Contact Form */}
            <div className="card-glow self-start rounded-[2rem] p-6 shadow-xl hover-lift animate-fade-in-left animation-delay-200 lg:max-w-xl lg:mr-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              
              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full rounded-xl border border-white/70 bg-white/60 px-4 py-2.5 backdrop-blur-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full rounded-xl border border-white/70 bg-white/60 px-4 py-2.5 backdrop-blur-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full rounded-xl border border-white/70 bg-white/60 px-4 py-2.5 backdrop-blur-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full rounded-xl border border-white/70 bg-white/60 px-4 py-2.5 backdrop-blur-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full rounded-xl border border-white/70 bg-white/60 px-4 py-2.5 backdrop-blur-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="general">General Question</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full resize-none rounded-xl border border-white/70 bg-white/60 px-4 py-3 backdrop-blur-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8 animate-fade-in-right animation-delay-400">
              {/* Contact Cards */}
              <div className="card-glow rounded-[2rem] p-8 shadow-xl hover-lift">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  {contactCards.map((card, index) => (
                    <div
                      key={card.title}
                      className={`flex items-start space-x-4 rounded-2xl border border-white/70 bg-white/55 p-4 backdrop-blur-md ${index === 0 ? 'animate-fade-in-left animation-delay-200' : index === 1 ? 'animate-fade-in-down animation-delay-400' : 'animate-fade-in-right animation-delay-600'}`}
                    >
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r ${card.gradient}`}>
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {card.icon}
                        </svg>
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold text-gray-900">{card.title}</h4>
                        {card.lines.map((line) => (
                          <p key={line} className="text-gray-600">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Hours */}
              <div className="card-glow rounded-[2rem] p-8 shadow-xl hover-lift animate-fade-in-down animation-delay-400">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Support Hours</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="text-gray-900 font-medium">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="text-gray-900 font-medium">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="text-gray-900 font-medium">Emergency Only</span>
                  </div>
                  <div className="mt-4 rounded-xl border border-blue-200/60 bg-blue-50/80 p-4 backdrop-blur-sm">
                    <p className="text-sm text-blue-800">
                      <strong>Emergency Support:</strong> 24/7 emergency support available for Pro and Enterprise customers
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="card-glow rounded-[2rem] p-8 shadow-xl hover-lift animate-fade-in-right animation-delay-600">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Links</h3>
                
                <div className="space-y-3">
                  <a href="/features" className="block rounded-xl border border-white/60 bg-white/55 px-4 py-3 text-blue-600 transition-colors hover:text-blue-800 backdrop-blur-sm">
                    → View All Features
                  </a>
                  <a href="/pricing" className="block rounded-xl border border-white/60 bg-white/55 px-4 py-3 text-blue-600 transition-colors hover:text-blue-800 backdrop-blur-sm">
                    → See Pricing Plans
                  </a>
                  <a href="/how-it-works" className="block rounded-xl border border-white/60 bg-white/55 px-4 py-3 text-blue-600 transition-colors hover:text-blue-800 backdrop-blur-sm">
                    → How It Works
                  </a>
                  <a href="/privacy" className="block rounded-xl border border-white/60 bg-white/55 px-4 py-3 text-blue-600 transition-colors hover:text-blue-800 backdrop-blur-sm">
                    → Privacy Policy
                  </a>
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
