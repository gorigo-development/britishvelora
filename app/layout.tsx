import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BritishVelora — Autopilot",
  description: "Autopilot Build Loop (Next.js + Vercel), ready for Supabase."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
