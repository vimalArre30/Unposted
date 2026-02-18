import Link from "next/link";
import { AppShell } from "@/ui/components/AppShell";

export default function HomePage() {
  return (
    <AppShell>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Private journaling, one leaf at a time.</h2>
        <p className="text-stone-600">
          Capture voice reflections from branching prompts and grow your personal life tree.
        </p>
        <div className="flex gap-3">
          <Link href="/onboarding" className="rounded-lg bg-moss px-4 py-2 text-sm font-medium text-white">
            Get Started
          </Link>
          <Link href="/tree" className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium">
            View Tree
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
