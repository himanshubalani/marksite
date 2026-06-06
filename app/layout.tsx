// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/SideBar";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MarkSite | Bookmark Manager",
  description: "A utility focused bookmark and link manager.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistMono.variable} dark antialiased h-full`}>
      <body className="min-h-full flex selection:bg-primary selection:text-white">
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
          <div className="max-w-6xl mx-auto w-full">{children}</div>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
