import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BRAND_CONFIG } from "@/config/brand.config";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <Badge variant="accent">Fase 1 · Scaffolding</Badge>
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
        {BRAND_CONFIG.name}
      </h1>
      <p className="max-w-md text-sm uppercase tracking-widest text-foreground/60">
        {BRAND_CONFIG.tagline}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button variant="default">Explorar Colección</Button>
        <Button variant="outline">Sobre Danni</Button>
        <Button variant="secondary">Contactar</Button>
      </div>
    </main>
  );
}
