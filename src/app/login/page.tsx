'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

type UserType = 'patient' | 'admin' | 'doctor';
type ResolvedRole = 'patient' | 'doctor' | 'admin' | 'super_admin' | 'moderator';

const isAdminRole = (role: ResolvedRole | null) => role === 'admin' || role === 'super_admin' || role === 'moderator';

export default function Login() {
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, signInWithGoogle, signUp } = useAuth();

  const loginThrottleKey = 'wrev-login-attempts';
  const loginThrottleWindowMs = 5 * 60 * 1000;
  const maxLoginAttempts = 5;

  const getAttemptState = () => {
    if (typeof window === 'undefined') {
      return { attempts: 0, blockedUntil: 0 };
    }

    try {
      const raw = window.localStorage.getItem(loginThrottleKey);
      if (!raw) {
        return { attempts: 0, blockedUntil: 0 };
      }

      const parsed = JSON.parse(raw) as { attempts?: number; blockedUntil?: number };
      return {
        attempts: parsed.attempts || 0,
        blockedUntil: parsed.blockedUntil || 0,
      };
    } catch {
      return { attempts: 0, blockedUntil: 0 };
    }
  };

  const setAttemptState = (attempts: number, blockedUntil = 0) => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(loginThrottleKey, JSON.stringify({ attempts, blockedUntil }));
  };

  const isLoginBlocked = () => {
    const state = getAttemptState();
    return state.blockedUntil > Date.now();
  };

  const resolveRole = async (accessToken: string): Promise<ResolvedRole | null> => {
    const response = await fetch('/api/auth/resolve-role', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json() as { role?: ResolvedRole };
    return data.role ?? null;
  };

  const redirectForResolvedRole = useCallback((role: ResolvedRole) => {
    if (isAdminRole(role)) {
      router.push('/admin');
      return;
    }

    if (role === 'doctor') {
      router.push('/dashboard');
      return;
    }

    router.push('/patient');
  }, [router]);

  useEffect(() => {
    const intent = searchParams.get('intent');
    if (!intent) {
      return;
    }

    const completeOAuthLogin = async () => {
      setIsLoading(true);
      setError('');

      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session?.access_token) {
          setError('Google login failed. Please try again.');
          setIsLoading(false);
          return;
        }

        const role = await resolveRole(session.access_token);
        if (!role) {
          setError('Unable to verify account access. Please try again.');
          setIsLoading(false);
          return;
        }

        if (intent === 'admin' && !isAdminRole(role)) {
          await supabase.auth.signOut();
          setError('Access denied. Admin privileges required.');
          setIsLoading(false);
          router.replace('/login');
          return;
        }

        if (intent === 'doctor' && role === 'patient') {
          router.push('/dashboard');
          return;
        }

        redirectForResolvedRole(role);
      } catch {
        setError('Google login failed. Please try again.');
        setIsLoading(false);
      }
    };

    void completeOAuthLogin();
  }, [searchParams, router, redirectForResolvedRole]);

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
      description: 'Access care overview dashboard',
      icon: '👩‍⚕️',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      borderColor: 'border-emerald-200',
      disabled: false,
    },
    {
      id: 'admin' as const,
      title: 'Admin Login',
      description: 'System administration',
      icon: '⚙️',
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50',
      borderColor: 'border-purple-200',
      disabled: false,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserType) return;

    if (isLoginBlocked()) {
      const { blockedUntil } = getAttemptState();
      const minutesRemaining = Math.max(1, Math.ceil((blockedUntil - Date.now()) / 60000));
      setError(`Too many login attempts. Try again in ${minutesRemaining} minute(s).`);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (isSignUp && selectedUserType === 'patient') {
        // Sign up new patient
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
          // Successful signup - redirect to patient dashboard
          router.push('/patient');
        }
      } else {
        const { error } = await signIn(email, password, selectedUserType);

        if (error) {
          const state = getAttemptState();
          const attempts = state.attempts + 1;
          const blockedUntil = attempts >= maxLoginAttempts ? Date.now() + loginThrottleWindowMs : 0;
          setAttemptState(attempts >= maxLoginAttempts ? 0 : attempts, blockedUntil);
          setError(error.message);
          setIsLoading(false);
        } else {
          setAttemptState(0, 0);
          const { data: { session } } = await supabase.auth.getSession();

          if (!session?.access_token) {
            setError('Authentication failed. Please try again.');
            setIsLoading(false);
            return;
          }

          const role = await resolveRole(session.access_token);

          if (!role) {
            setError('Unable to verify account access. Please try again.');
            setIsLoading(false);
            return;
          }

          if (selectedUserType === 'admin' && !isAdminRole(role)) {
            await supabase.auth.signOut();
            setError('Access denied. Admin privileges required.');
            setIsLoading(false);
            return;
          }

          if (selectedUserType === 'doctor') {
            if (isAdminRole(role)) {
              router.push('/admin');
              return;
            }

            router.push('/dashboard');
            return;
          }

          redirectForResolvedRole(role);
        }
      }
    } catch {
      setError('Authentication service is unreachable. Please check your internet and Supabase settings.');
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!selectedUserType) {
      return;
    }

    if (isLoginBlocked()) {
      const { blockedUntil } = getAttemptState();
      const minutesRemaining = Math.max(1, Math.ceil((blockedUntil - Date.now()) / 60000));
      setError(`Too many login attempts. Try again in ${minutesRemaining} minute(s).`);
      return;
    }

    setIsLoading(true);
    setError('');

    const { error } = await signInWithGoogle(selectedUserType);
    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-50/80 flex items-center justify-center p-4 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:42px_42px]"></div>
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-blue-200/30 blur-3xl opacity-70 animate-float"></div>
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-cyan-200/30 blur-3xl opacity-70 animate-float-delayed"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 rounded-full bg-blue-300/30 blur-3xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-12 right-28 w-56 h-56 rounded-full bg-cyan-300/30 blur-3xl opacity-60 animate-float-delayed"></div>
      </div>

      {/* Login Container */}
      <div className="relative w-full max-w-lg sm:max-w-3xl">
        <div className="card-glow rounded-[2.2rem] p-6 sm:p-8 shadow-2xl border border-white/40 animate-fade-in-up section-sheen">
          {/* Logo/Brand */}
          <div className="text-center mb-6 sm:mb-8 animate-fade-in-down">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-600 bg-clip-text text-transparent mb-2 animate-gradient">
                WRev
              </h1>
            </Link>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
          </div>

          {!selectedUserType ? (
            <>
              {/* User Type Selection */}
              <div className="text-center mb-6 sm:mb-8 animate-fade-in-down animation-delay-200">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  Welcome to WRev
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Choose your login type to continue
                </p>
              </div>

              {/* User Type Cards */}
              <div className="mb-6 overflow-x-auto pb-2 sm:overflow-visible">
                <div className="flex min-w-max snap-x snap-mandatory gap-4 sm:grid sm:min-w-0 sm:grid-cols-3 sm:gap-6">
                {userTypes.map((userType) => (
                  <button
                    key={userType.id}
                    onClick={() => !userType.disabled && setSelectedUserType(userType.id)}
                    disabled={userType.disabled}
                    className={`group relative min-w-[220px] sm:min-w-0 snap-start p-4 sm:p-6 bg-gradient-to-br ${userType.bgGradient} border-2 ${userType.borderColor} rounded-2xl transition-all duration-300 ${
                      userType.disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:shadow-xl hover:scale-[1.03] active:scale-95'
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
              </div>
            </>
          ) : (
            <>
              {/* Selected User Type Header */}
              <div className="text-center mb-6 sm:mb-8 animate-fade-in-down animation-delay-200">
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
                <div className="bg-red-50/90 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm backdrop-blur-sm animate-fade-in-down">
                  {error}
                </div>
              )}

              {/* Login/Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 animate-fade-in-up animation-delay-200">
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
                        className="w-full px-4 py-3 bg-white/65 border border-white/70 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-gray-900 caret-gray-900 text-sm sm:text-base backdrop-blur-sm"
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
                      autoComplete="off"
                      className="w-full px-4 py-3 bg-white/65 border border-white/70 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-gray-900 caret-gray-900 text-sm sm:text-base backdrop-blur-sm"
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
                  <div className="flex items-center justify-between gap-3">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="off"
                      className="w-full px-4 py-3 bg-white/65 border border-white/70 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-gray-900 caret-gray-900 text-sm sm:text-base backdrop-blur-sm"
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

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full bg-white/85 border border-white/70 text-gray-700 py-3 px-6 rounded-2xl font-semibold text-sm sm:text-base hover:bg-white transition-all duration-300 focus:ring-4 focus:ring-gray-500/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                  <span className="flex items-center justify-center space-x-3">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.8-5.5 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.4 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12s4.3 9.5 9.5 9.5c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </span>
                </button>

                {/* Toggle between Login and Signup (only for patients) */}
                {selectedUserType === 'patient' && (
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
                )}
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
                  <span className="px-4 bg-white/80 text-gray-500 rounded-full">or</span>
                </div>
              </div>

              {/* Demo Access */}
              <button
                type="button"
                onClick={() => router.push('/patient?demo=1')}
                className="w-full bg-white/60 border border-white/70 text-gray-700 py-3 px-6 rounded-2xl font-medium hover:bg-white/75 hover:border-gray-300 transition-all duration-300 focus:ring-4 focus:ring-gray-500/20 focus:outline-none active:scale-95 backdrop-blur-sm"
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
          <div className="inline-flex items-center bg-green-50/90 border border-green-200 rounded-full px-4 py-2 shadow-sm backdrop-blur-sm animate-fade-in-up animation-delay-400">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            <span className="text-green-700 text-sm font-medium">System Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
