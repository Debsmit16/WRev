'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  if (!showInstallButton) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Install WRev App</h3>
            <p className="text-gray-600 text-xs mb-3">Get quick access to your respiratory health monitoring</p>
            <div className="flex space-x-2">
              <button
                onClick={handleInstallClick}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:shadow-md transition-all duration-300"
              >
                Install
              </button>
              <button
                onClick={() => setShowInstallButton(false)}
                className="text-gray-500 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
