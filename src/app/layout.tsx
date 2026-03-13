import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Professional Portfolio | Web Developer & Designer",
  description: "A premium, production-ready portfolio showcasing high-end web development, immersive animations, and exceptional UX.",
  keywords: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Portfolio", "Web Development"],
  authors: [{ name: "Professional Developer" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} font-sans antialiased`}
      >
        <div className="relative min-h-screen bg-background">
          {/* Background effects - Nebula/Mesh style */}
          <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[10%] right-[-5%] h-[50%] w-[50%] bg-accent/15 blur-[120px] rounded-full" />
            <div className="absolute top-[20%] right-[10%] h-[30%] w-[30%] bg-primary/10 blur-[100px] rounded-full" />
          </div>
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}


