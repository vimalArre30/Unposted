import { AppShell } from "@/ui/components/AppShell";

export default function RecordPage() {
  return (
    <AppShell>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Record flow (L1 → L2 → L3)</h2>
        <p className="text-sm text-stone-600">Phase 1 includes question seed + API plumbing. Interactive picker and recording UI ship in Phase 2.</p>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-stone-700">
          <li>Pick Level 1 theme</li>
          <li>Pick Level 2 follow-up</li>
          <li>Pick Level 3 prompt and record audio</li>
        </ol>
      </div>
    </AppShell>
  );
}
