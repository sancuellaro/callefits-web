/**
 * loading.tsx — Skeleton loader del catálogo.
 * Se activa automáticamente por Next.js durante la carga del Server Component.
 */
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonFilterBar() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-44" />
        <Skeleton className="h-7 w-40" />
      </div>
      <div className="border-t border-black/5" />
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="aspect-[3/4] w-full rounded-[var(--radius)]" />
      <div className="mt-3 flex flex-col gap-1.5">
        <Skeleton className="h-2.5 w-16" />
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

export default function CatalogLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header skeleton */}
      <div className="mb-8 space-y-2">
        <Skeleton className="h-8 w-80" />
        <Skeleton className="h-4 w-[480px] max-w-full" />
      </div>

      {/* Filtros skeleton */}
      <div className="mb-8">
        <SkeletonFilterBar />
      </div>

      {/* Grid skeleton — 8 tarjetas */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
