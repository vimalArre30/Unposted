import { AppShell } from "@/ui/components/AppShell";
import { TreePlaceholder } from "@/ui/components/TreePlaceholder";
import { getLifeTreeStage } from "@/domain/services/lifeTreeService";

export default function TreePage() {
  const leafCount = 0;
  const stage = getLifeTreeStage(leafCount);

  return (
    <AppShell>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Life Tree</h2>
        <TreePlaceholder leafCount={leafCount} stage={stage} />
      </div>
    </AppShell>
  );
}
