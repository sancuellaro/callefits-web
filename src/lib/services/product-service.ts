/**
 * product-service.ts — Capa de acceso a datos de productos.
 *
 * ARQUITECTURA DE DESACOPLAMIENTO:
 * Todos los componentes UI deben llamar a estas funciones asíncronas.
 * En Fase 6 (Supabase), los cuerpos de cada función serán reemplazados
 * por consultas tipadas al cliente de Supabase SIN tocar los componentes
 * que las consumen (ver docs/technical-manual.md §4, Principio de
 * Separación de Responsabilidades).
 *
 * Compatibles con React Server Components (Next.js 15 App Router).
 * Cero `any`. Todas las respuestas son inferidas desde los tipos Zod.
 */
import {
  type Category,
  type Product,
  type ProductFilters,
  CATEGORY_LABELS,
  CategoryEnum,
} from "@/types/product";
import { MOCK_PRODUCTS } from "@/data/mock-products";

// ─── getProducts ──────────────────────────────────────────────────────────────

/**
 * Retorna el catálogo filtrado y ordenado según los criterios indicados.
 * Por defecto retorna todos los productos activos ordenados por destacados primero.
 *
 * @param filters - Filtros opcionales de categoría, talla, featured, sort y búsqueda.
 */
export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  // Simulación de latencia de base de datos (se elimina en Fase 6)
  await Promise.resolve();

  let results = MOCK_PRODUCTS.filter((p) => p.status !== "archived" && p.status !== "draft");

  // ── Filtros ────────────────────────────────────────────────────────────────

  if (filters?.category !== undefined) {
    results = results.filter((p) => p.category === filters.category);
  }

  if (filters?.size !== undefined) {
    results = results.filter((p) =>
      p.variants.some((v) => v.size === filters.size && v.isAvailable),
    );
  }

  if (filters?.featured !== undefined) {
    results = results.filter((p) => p.isFeatured === filters.featured);
  }

  if (filters?.search !== undefined && filters.search.trim() !== "") {
    const query = filters.search.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        p.attributes.material.toLowerCase().includes(query),
    );
  }

  // ── Ordenamiento ───────────────────────────────────────────────────────────

  switch (filters?.sort) {
    case "price_asc":
      results = [...results].sort((a, b) => a.basePrice - b.basePrice);
      break;
    case "price_desc":
      results = [...results].sort((a, b) => b.basePrice - a.basePrice);
      break;
    case "newest":
      results = [...results].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
    case "featured":
    default:
      // Destacados primero, luego orden estable por id
      results = [...results].sort((a, b) => {
        if (b.isFeatured && !a.isFeatured) return 1;
        if (a.isFeatured && !b.isFeatured) return -1;
        return a.id.localeCompare(b.id);
      });
      break;
  }

  return results;
}

// ─── getProductBySlug ──────────────────────────────────────────────────────────

/**
 * Busca un producto activo por su slug único.
 * Retorna `null` si no existe o está archivado/borrador.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  await Promise.resolve();

  const product = MOCK_PRODUCTS.find(
    (p) => p.slug === slug && p.status === "active",
  );

  return product ?? null;
}

// ─── getFeaturedProducts ───────────────────────────────────────────────────────

/**
 * Retorna los productos marcados como destacados (isFeatured: true).
 *
 * @param limit - Número máximo de resultados (por defecto: 8).
 */
export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  await Promise.resolve();

  return MOCK_PRODUCTS.filter((p) => p.isFeatured && p.status === "active").slice(
    0,
    limit,
  );
}

// ─── getRelatedProducts ────────────────────────────────────────────────────────

/**
 * Retorna productos de la misma categoría, excluyendo el producto actual.
 * Usado en la ficha de producto para la sección "También te puede interesar".
 *
 * @param currentSlug - Slug del producto actual (excluido del resultado).
 * @param category    - Categoría en la que buscar relacionados.
 * @param limit       - Número máximo de resultados (por defecto: 4).
 */
export async function getRelatedProducts(
  currentSlug: string,
  category: Category,
  limit = 4,
): Promise<Product[]> {
  await Promise.resolve();

  return MOCK_PRODUCTS.filter(
    (p) => p.category === category && p.slug !== currentSlug && p.status === "active",
  ).slice(0, limit);
}

// ─── getCategoriesWithCounts ───────────────────────────────────────────────────

export interface CategorySummary {
  category: Category;
  name: string;
  count: number;
  /** URL de imagen representativa de la categoría (portada del producto destacado). */
  image: string;
}

/**
 * Retorna el resumen de categorías con conteo de productos activos e imagen representativa.
 * Usado en la sección de categorías destacadas de la Home Page.
 */
export async function getCategoriesWithCounts(): Promise<CategorySummary[]> {
  await Promise.resolve();

  const categories = CategoryEnum.options;

  return categories.map((category) => {
    const categoryProducts = MOCK_PRODUCTS.filter(
      (p) => p.category === category && p.status === "active",
    );

    // Priorizar la imagen primaria del primer producto destacado de la categoría
    const featuredProduct = categoryProducts.find((p) => p.isFeatured);
    const representativeProduct = featuredProduct ?? categoryProducts[0];
    const primaryImage =
      representativeProduct?.images.find((img) => img.isPrimary)?.url ??
      representativeProduct?.images[0]?.url ??
      "";

    return {
      category,
      name: CATEGORY_LABELS[category],
      count: categoryProducts.length,
      image: primaryImage,
    };
  });
}
