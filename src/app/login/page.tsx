'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const [selectedUserType, setSelectedUserType] = useState<'patient' | 'admin' | 'doctor' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const resetSelection = () => {
    setSelectedUserType(null);
    setIsSignUp(false);
    setEmail('');
    setPassword('');
    setFullName('');
    setError('');
  };

  const userTypes = [
    {
      id: 'patient' as const,
      title: 'Patient Login',
      description: 'Access your health dashboard',
      icon: '🏥',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
    },
    {
      id: 'doctor' as const,
      title: 'Doctor Login',
      description: 'Coming soon',
      icon: '👩‍⚕️',
      gradient: 'from-gray-400 to-gray-500',
      bgGradient: 'from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
      disabled: true,
    },
    {
      id: 'admin' as const,
      title: 'Admin Login',
      description: 'Coming soon',
      icon: '⚙️',
      gradient: 'from-gray-400 to-gray-500',
      bgGradient: 'from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
      disabled: true,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserType || selectedUserType !== 'patient') return;

    setIsLoading(true);
    setError('');

    try {
      if (isSignUp) {
        // Sign up new user
        if (!fullName.trim()) {
          setError('Please enter your full name');
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(email, password, fullName);

        if (error) {
          setError(error.message);
          setIsLoading(false);
        } else {
          // Successful signup - redirect to dashboard
          router.push('/dashboard');
        }
      } else {
        // Sign in existing user
        const { error } = await signIn(email, password);

        if (error) {
          setError(error.message);
          setIsLoading(false);
        } else {
          // Successful login - redirect to dashboard
          router.push('/dashboard');
        }
      }
    } catch {
      setError('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delayed"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
      </div>

      {/* Login Container */}
      <div className="relative w-full max-w-lg sm:max-w-2xl">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 animate-fade-in-up">
          {/* Logo/Brand */}
          <div className="text-center mb-6 sm:mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                WRev
              </h1>
            </Link>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
          </div>

          {!selectedUserType ? (
            <>
              {/* User Type Selection */}
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  Welcome to WRev
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Choose your login type to continue
                </p>
              </div>

              {/* User Type Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
                {userTypes.map((userType) => (
                  <button
                    key={userType.id}
                    onClick={() => !userType.disabled && setSelectedUserType(userType.id)}
                    disabled={userType.disabled}
                    className={`group relative p-4 sm:p-6 bg-gradient-to-br ${userType.bgGradient} border-2 ${userType.borderColor} rounded-2xl transition-all duration-300 ${
                      userType.disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:shadow-xl hover:scale-105 active:scale-95'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {userType.icon}
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-1">
                        {userType.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {userType.description}
                      </p>
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${userType.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Selected User Type Header */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center space-x-3 mb-4">
                  <button
                    onClick={resetSelection}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl mb-1">
                      {userTypes.find(type => type.id === selectedUserType)?.icon}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                      {isSignUp ? 'Create Patient Account' : userTypes.find(type => type.id === selectedUserType)?.title}
                    </h2>
                  </div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">
                  {isSignUp
                    ? 'Create your account to start monitoring your health'
                    : 'Enter your credentials to continue'
                  }
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Login/Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Full Name Input (only for signup) */}
                {isSignUp && (
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r ${userTypes.find(type => type.id === selectedUserType)?.gradient} text-white py-3 px-6 rounded-2xl font-semibold text-sm sm:text-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:outline-none group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95`}
                >
                  <span className="flex items-center justify-center space-x-2">
                    {isLoading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{isSignUp ? 'Creating Account...' : 'Signing in...'}</span>
                      </>
                    ) : (
                      <>
                        <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>

                {/* Toggle between Login and Signup */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setError('');
                      setFullName('');
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
                  >
                    {isSignUp
                      ? 'Already have an account? Sign in'
                      : "Don't have an account? Create one"
                    }
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Additional Options */}
          {!selectedUserType && (
            <div className="mt-6 sm:mt-8 text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 text-gray-500">or</span>
                </div>
              </div>

              {/* Demo Access */}
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="w-full bg-white/50 border border-gray-200 text-gray-700 py-3 px-6 rounded-2xl font-medium hover:bg-white/70 hover:border-gray-300 transition-all duration-300 focus:ring-4 focus:ring-gray-500/20 focus:outline-none active:scale-95"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="text-sm sm:text-base">View Demo Dashboard</span>
                </span>
              </button>
            </div>
          )}

          {/* Footer Links */}
          <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500 space-y-2">
            <p>
              Don&apos;t have an account?{' '}
              <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Contact us for access
              </Link>
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-blue-600 transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            <span className="text-green-700 text-sm font-medium">System Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
