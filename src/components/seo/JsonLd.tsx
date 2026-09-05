/**
 * JsonLd — Inyector de datos estructurados Schema.org.
 * Renderiza un <script type="application/ld+json"> en el <head> del documento.
 * Compatible con Next.js 15 App Router (Server Component por defecto).
 */

interface JsonLdProps {
  schema: Record<string, unknown>;
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // dangerouslySetInnerHTML es seguro aquí: el contenido es JSON serializado
      // internamente por la aplicación, nunca una entrada directa de usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
