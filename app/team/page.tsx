import type { Metadata } from "next";
import PageShell from "@/components/landing/PageShell";
import PageHeader from "@/components/landing/PageHeader";
import TeamSection from "@/components/landing/TeamSection";

export const metadata: Metadata = {
  title: "Our team | CS Learn",
  description: "The Carnegie Mellon students behind CS Learn.",
};

export default function TeamPage() {
  return (
    <PageShell>
      <PageHeader
        title="Our team"
        intro={
          <>
            CS Learn is built by Carnegie Mellon students, with the support of{" "}
            <a href="https://scottylabs.org" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-primary">
              ScottyLabs
            </a>
            .
          </>
        }
      />
      <TeamSection />
    </PageShell>
  );
}
