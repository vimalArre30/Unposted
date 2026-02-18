import type { LifeTreeStage } from "@/domain/types/lifeTree";

const stageMap: Record<LifeTreeStage, string> = {
  SAPLING: "🌱",
  PLANT: "🪴",
  SMALL_TREE: "🌳",
  BIG_TREE: "🌲",
};

export function TreePlaceholder({ leafCount, stage }: { leafCount: number; stage: LifeTreeStage }) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
      <p className="text-sm text-stone-600">Life Tree Stage</p>
      <div className="mt-2 flex items-center gap-3">
        <span className="text-4xl" aria-hidden>
          {stageMap[stage]}
        </span>
        <div>
          <p className="font-semibold text-moss">{stage.replace("_", " ")}</p>
          <p className="text-sm text-stone-600">{leafCount} leaves grown</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-stone-500">Phase 1 placeholder: interactive leaves and hover/tap summary arrive in Phase 2.</p>
    </section>
  );
}
