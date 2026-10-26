import type { ReactNode } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

/**
 * The homepage's frame for inner pages (catalog, course, about, team): skip
 * link, header, main, footer. Header and footer sit outside main so they keep
 * their banner and contentinfo landmarks.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        Skip to main content
      </a>
      <NavBar />
      <main id="main-content" tabIndex={-1} className="bg-white text-black outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
