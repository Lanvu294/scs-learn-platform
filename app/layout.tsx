import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, Open_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
});

// CMU's web headline face is Source Serif Pro (cmu.edu loads it via Typekit);
// Source Serif 4 is its open-source successor on Google Fonts. Used by the
// landing page so it matches the university's own site.
const sourceSerif = Source_Serif_4({
  variable: "--font-brand-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "CS Learn", template: "%s | CS Learn" },
  description: "Free computer science courseware from Carnegie Mellon, online, at your pace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-scroll-behavior: the CSS below smooth-scrolls in-page anchor jumps
    // (the landing nav's Courses / How it works / FAQ); this tells Next 16 to
    // switch it off during route navigations so new pages don't glide to the top.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${openSans.variable} ${bricolage.variable} ${inter.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
