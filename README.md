# WRev - Respiratory Health Protection System

A modern, responsive web application for respiratory health monitoring built with Next.js, Tailwind CSS, and Supabase authentication.

## 🌟 Features

- **Modern Health-Tech Design**: Clean, professional interface with glassmorphism effects
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Multi-Page Architecture**: Complete website with landing pages, features, pricing, and more
- **Health-Focused UI**: Soft blue/cyan color scheme designed for healthcare applications
- **Accessibility**: WCAG compliant design with proper contrast and navigation

## 📄 Pages

- **Home** (`/`) - Landing page with hero section and key features
- **About** (`/about`) - Company story, mission, and values
- **Features** (`/features`) - Detailed feature explanations and benefits
- **How It Works** (`/how-it-works`) - Step-by-step process explanation
- **Pricing** (`/pricing`) - Subscription plans and pricing information
- **Contact** (`/contact`) - Contact form and company information
- **Privacy Policy** (`/privacy`) - HIPAA-compliant privacy policy

## 🚀 Key Features

### Respiratory Monitoring Capabilities
- **SpO2 Monitoring**: Continuous oxygen saturation tracking
- **Air Quality Monitoring**: Environmental sensors for pollutants and allergens
- **Geo-Tagged Warnings**: Location-based health alerts
- **Caregiver Notifications**: Emergency alerts to family and healthcare providers

### Technical Features
- **Next.js 14**: Latest React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe development
- **Responsive Design**: Mobile-first approach
- **Modern UI Components**: Glassmorphism and gradient effects

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel
- **Version Control**: Git

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Debsmit16/WRev.git
cd WRev
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

### Environment Variables
Create a `.env.local` file in the project root with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

`SUPABASE_SERVICE_ROLE_KEY` is used only on server routes for secure role verification. Never expose it in client code.

### Google Login Setup (Supabase)
1. In Supabase, go to `Authentication -> Providers -> Google` and enable Google.
2. Add your Google OAuth Client ID and Secret.
3. Add redirect URLs:
	- `http://localhost:3000/login`
	- `https://your-domain/login`
4. In Google Cloud Console, add matching Authorized redirect URIs using your Supabase auth callback URL.

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
wrev-app/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── features/       # Features page
│   │   ├── how-it-works/   # How It Works page
│   │   ├── pricing/        # Pricing page
│   │   ├── privacy/        # Privacy Policy page
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   └── components/         # Reusable components
│       └── Footer.tsx      # Shared footer component
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6) to Cyan (#06B6D4) gradients
- **Background**: Light gradients from blue-50 to cyan-50
- **Text**: Gray scale for optimal readability
- **Accents**: Glassmorphism effects with backdrop blur

### Components
- **Navigation**: Sticky glassmorphism navbar
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Footer**: Comprehensive footer with company info and links

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Deploy automatically with each push to main branch

### Environment Variables
Set these in your deployment provider:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 👥 Team

Developed by **Team_Avyantrix**

## 📄 License

© 2025 WRev, Team_Avyantrix. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Email: support@wrev.health
- Phone: +1 (555) 123-WREV

---

**WRev** - Advanced respiratory health monitoring through intelligent technology and compassionate care.
