import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
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
              <Link href="/features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">How It Works</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Pricing</Link>
              <Link href="/team" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Team</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy and data security are our top priorities
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: January 15, 2025</p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="prose prose-lg max-w-none">
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  WRev collects information necessary to provide our respiratory health monitoring services:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li><strong>Health Data:</strong> SpO2 levels, respiratory rate, and other vital signs</li>
                  <li><strong>Environmental Data:</strong> Air quality measurements, temperature, humidity</li>
                  <li><strong>Location Data:</strong> GPS coordinates for geo-tagged warnings (with consent)</li>
                  <li><strong>Account Information:</strong> Name, email, phone number, emergency contacts</li>
                  <li><strong>Device Information:</strong> Sensor data, device identifiers, usage statistics</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  Your information is used exclusively to provide and improve our health monitoring services:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Monitor your respiratory health and provide real-time alerts</li>
                  <li>Generate personalized health insights and recommendations</li>
                  <li>Send emergency notifications to designated caregivers</li>
                  <li>Improve our AI algorithms and predictive capabilities</li>
                  <li>Provide customer support and technical assistance</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Security & HIPAA Compliance</h2>
                <p className="text-gray-600 mb-4">
                  WRev is fully HIPAA compliant and implements enterprise-grade security measures:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>End-to-end encryption for all data transmission</li>
                  <li>Secure cloud storage with regular security audits</li>
                  <li>Multi-factor authentication for account access</li>
                  <li>Regular penetration testing and vulnerability assessments</li>
                  <li>Staff training on privacy and security best practices</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing & Disclosure</h2>
                <p className="text-gray-600 mb-4">
                  We do not sell your personal health information. Data may be shared only in these circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li><strong>Emergency Situations:</strong> With designated emergency contacts and healthcare providers</li>
                  <li><strong>Healthcare Integration:</strong> With your healthcare providers (with explicit consent)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or court order</li>
                  <li><strong>Service Providers:</strong> With trusted partners who help operate our service (under strict agreements)</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights & Choices</h2>
                <p className="text-gray-600 mb-4">
                  You have full control over your health data:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li><strong>Access:</strong> Request a copy of all your personal data</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                  <li><strong>Portability:</strong> Export your data in a standard format</li>
                  <li><strong>Opt-out:</strong> Disable specific features or data collection</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
                <p className="text-gray-600 mb-4">
                  We retain your data only as long as necessary:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li><strong>Active Accounts:</strong> Data retained while your account is active</li>
                  <li><strong>Closed Accounts:</strong> Most data deleted within 30 days of account closure</li>
                  <li><strong>Legal Requirements:</strong> Some data may be retained longer for legal compliance</li>
                  <li><strong>Anonymized Data:</strong> May be retained for research and service improvement</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. International Data Transfers</h2>
                <p className="text-gray-600 mb-4">
                  Your data is primarily stored in secure facilities within the United States. If data is transferred internationally, we ensure adequate protection through:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Standard Contractual Clauses approved by regulatory authorities</li>
                  <li>Adequacy decisions by relevant data protection authorities</li>
                  <li>Other appropriate safeguards as required by applicable law</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children&apos;s Privacy</h2>
                <p className="text-gray-600 mb-4">
                  WRev can be used to monitor children&apos;s respiratory health, but we require parental consent:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Parental consent required for users under 13</li>
                  <li>Parents can review and delete their child&apos;s data</li>
                  <li>Special protections for children&apos;s health information</li>
                  <li>Limited data collection for minors</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
                <p className="text-gray-600 mb-4">
                  We may update this privacy policy to reflect changes in our practices or legal requirements. We will:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Notify you of material changes via email or app notification</li>
                  <li>Post the updated policy on our website</li>
                  <li>Provide a summary of key changes</li>
                  <li>Allow you to review and accept changes before they take effect</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have questions about this privacy policy or your data rights, please contact us:
                </p>
                <div className="bg-blue-50 rounded-xl p-6 mt-4">
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Privacy Officer:</strong> privacy@wrev.health</p>
                    <p><strong>Phone:</strong> +1 (555) 123-WREV</p>
                    <p><strong>Mail:</strong> WRev Privacy Team, 123 Health Tech Drive, San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <p className="text-sm text-gray-500">
                  This privacy policy is effective as of January 15, 2025. By using WRev services, you acknowledge that you have read and understood this policy.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
