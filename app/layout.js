import './globals.css';
import { HotelProvider } from '@/context/HotelContext';
import { ToastProvider } from '@/context/ToastContext';
import { ThemeProvider } from '@/context/ThemeContext';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata = {
  title: "L'Horizon Azure | Ultra-Luxury Resort & Suites",
  description: "Experience unparalleled hospitality and world-class luxury at L'Horizon Azure Resort & Suites. Book oceanfront penthouses, private villas, and access full digital guest services.",
  keywords: 'luxury resort, hotel management, hotel booking, penthouse suite, room service, digital key, AI concierge',
  authors: [{ name: "L'Horizon Luxury Hospitality" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#fafaf9] dark:bg-[#090d16] text-slate-900 dark:text-white antialiased selection:bg-amber-100 selection:text-amber-900 transition-colors duration-300">
        <ThemeProvider>
          <ToastProvider>
            <HotelProvider>
              {children}
            </HotelProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
