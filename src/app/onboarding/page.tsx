import { AppShell } from "@/ui/components/AppShell";

export default function OnboardingPage() {
  return (
    <AppShell>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Sign in to Unposted</h2>
        <p className="text-sm text-stone-600">Phase 1 wires Cognito and Google provider setup server-side. UI forms are minimal placeholders.</p>
        <form className="space-y-3 rounded-xl border p-4">
          <input className="w-full rounded border px-3 py-2" placeholder="Email" type="email" />
          <input className="w-full rounded border px-3 py-2" placeholder="Password" type="password" />
          <button type="button" className="w-full rounded bg-moss px-3 py-2 text-white">
            Continue with Email
          </button>
        </form>
        <button type="button" className="w-full rounded border px-3 py-2">
          Continue with Google
        </button>
      </div>
    </AppShell>
  );
}
