import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InstallPWA from "@/components/InstallPWA";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WRev - Respiratory Health Protection System",
  description: "Real-time respiratory and environmental monitoring for asthma and COPD care",
  manifest: "/manifest.json",
  themeColor: "#3B82F6",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WRev",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "WRev",
    title: "WRev - Respiratory Health Protection System",
    description: "Real-time respiratory and environmental monitoring for asthma and COPD care",
  },
  twitter: {
    card: "summary",
    title: "WRev - Respiratory Health Protection System",
    description: "Real-time respiratory and environmental monitoring for asthma and COPD care",
  },
  icons: {
    icon: "/icons/wrev-icon.svg",
    shortcut: "/icons/wrev-icon.svg",
    apple: "/icons/wrev-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/wrev-icon.svg" type="image/svg+xml"></link>
        <link rel="shortcut icon" href="/icons/wrev-icon.svg" type="image/svg+xml"></link>
        <link rel="apple-touch-icon" href="/icons/wrev-icon.svg"></link>
        <link rel="manifest" href="/manifest.json"></link>
        <meta name="theme-color" content="#3B82F6"></meta>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="apple-mobile-web-app-status-bar-style" content="default"></meta>
        <meta name="apple-mobile-web-app-title" content="WRev"></meta>
        <meta name="msapplication-TileImage" content="/icons/wrev-icon.svg"></meta>
        <meta name="msapplication-TileColor" content="#3B82F6"></meta>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <InstallPWA />
        </AuthProvider>
      </body>
    </html>
  );
}
