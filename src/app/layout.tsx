import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dev-frame.vercel.app";
const title = "Sandro Ramírez — Full Stack & Mobile Developer";
const description =
  "Full Stack and Mobile Developer building web and mobile products with Flutter, Next.js, TypeScript and Node.js. Open to new opportunities.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Sandro Ramírez",
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  keywords: ["Flutter", "Dart", "Next.js", "React", "TypeScript", "Node.js", "Mobile Developer", "Full Stack Developer", "Portfolio"],
  authors: [{ name: "Sandro Ramírez" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint so the page never flashes the wrong theme.
const themeScript = `(function(){try{var s=localStorage.getItem("theme");var t=s==="light"||s==="dark"?s:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${dmSans.variable} ${dmMono.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
