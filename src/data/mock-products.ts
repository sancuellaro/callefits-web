/**
 * mock-products.ts — Catálogo editorial de alta fidelidad CALLEFITS BY DANNI.
 *
 * 16 prendas distribuidas en 4 categorías (4 por categoría).
 * Todo el catálogo se valida contra ProductSchema en tiempo de carga del módulo.
 * En Fase 6 este módulo será reemplazado por consultas tipadas a Supabase
 * sin necesidad de tocar los componentes (ver docs/technical-manual.md §4).
 *
 * Fotografías: Unsplash (uso libre) con parámetros de optimización CDN.
 * Nombres y descripciones: redacción editorial estilo marca deportiva premium.
 */
import { z } from "zod";
import { ProductSchema, type Product } from "@/types/product";

// ─── Helpers internos de construcción ────────────────────────────────────────

const BASE_DATE = "2026-09-01T10:00:00.000Z";
const CARE_STANDARD = [
  "Lavar a mano o máquina en ciclo suave (máx. 30°C)",
  "No usar blanqueador ni suavizante de telas",
  "Tender en sombra sobre superficie plana",
  "No usar secadora ni plancha directa",
];
const CARE_DELICATE = [
  "Lavar únicamente a mano en agua fría",
  "Usar detergente suave para ropa técnica",
  "No escurrir ni retorcer — presionar suavemente",
  "Tender en horizontal para conservar la forma",
];

function img(
  id: string,
  photoId: string,
  altText: string,
  isPrimary: boolean,
  sortOrder: number,
) {
  return {
    id,
    url: `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1000&q=80`,
    altText,
    isPrimary,
    sortOrder,
  };
}

function variant(
  id: string,
  sku: string,
  size: "XS" | "S" | "M" | "L" | "XL",
  color: string,
  colorHex: string,
  stock: number,
  priceOverride?: number,
) {
  return {
    id,
    sku,
    size,
    color,
    colorHex,
    stockQuantity: stock,
    isAvailable: stock > 0,
    ...(priceOverride !== undefined ? { priceOverride } : {}),
  };
}

// ─── CATEGORÍA: LEGGINGS ──────────────────────────────────────────────────────

const leggings = [
  // 1 — Legging Seamless Sculpt Pro
  {
    id: "prod-001",
    slug: "legging-seamless-sculpt-pro",
    name: "Legging Seamless Sculpt Pro",
    shortDescription:
      "Tiro ultra alto con compresión postural inteligente y tecnología sin costuras",
    description:
      "Diseñado para transformar cada entrenamiento en una experiencia de máximo rendimiento y sofisticación. Confeccionado en fibra de poliamida reciclada con micro-tejido sin costuras que elimina fricciones y abraza el cuerpo con precisión escultórica. La banda perimetral de tiro ultra alto proporciona soporte lumbar activo sin comprimir el abdomen. Resistente a la luz y a sentadillas profundas: la prueba definitiva de calidad de CALLEFITS.",
    basePrice: 135000,
    compareAtPrice: 160000,
    category: "leggings" as const,
    isFeatured: true,
    status: "active" as const,
    attributes: {
      compression: "Alta" as const,
      material: "80% Poliamida reciclada, 20% Elastano de alta recuperación",
      waistType: "Tiro Ultra Alto Anatómico con banda perimetral de soporte lumbar",
      careInstructions: CARE_STANDARD,
    },
    images: [
      img(
        "img-001-1",
        "1571019613454-1cb2f99b2d8b",
        "Legging Seamless Sculpt Pro en Negro Ónix, vista frontal completa mostrando el tiro ultra alto",
        true,
        0,
      ),
      img(
        "img-001-2",
        "1518611012118-696072aa579a",
        "Legging Seamless Sculpt Pro, detalle lateral del ajuste escultórico y la textura sin costuras",
        false,
        1,
      ),
    ],
    variants: [
      variant("var-001-1", "CF-LEG-SCULPT-BLK-S", "S", "Negro Ónix", "#121212", 8),
      variant("var-001-2", "CF-LEG-SCULPT-BLK-M", "M", "Negro Ónix", "#121212", 12),
      variant("var-001-3", "CF-LEG-SCULPT-MOC-M", "M", "Café Moca", "#6B4A3A", 6),
      variant("var-001-4", "CF-LEG-SCULPT-OLV-L", "L", "Verde Oliva Táctico", "#5C6B3A", 4),
      variant("var-001-5", "CF-LEG-SCULPT-MID-L", "L", "Azul Medianoche", "#1A2744", 0),
    ],
    createdAt: BASE_DATE,
  },

  // 2 — Biker High-Waist AirTouch
  {
    id: "prod-002",
    slug: "biker-high-waist-airtouch",
    name: "Biker High-Waist AirTouch",
    shortDescription:
      "Short deportivo de alto impacto con tejido respirable y ajuste de segunda piel",
    description:
      "Diseñado para sesiones intensas de running, CrossFit y ciclismo indoor. El tejido AirTouch combina microporos de ventilación estratégica con compresión activa que modela sin restringir. La cintura alta anatomizada fija el core durante los movimientos más explosivos. Acabado anti-pilling que mantiene el aspecto nuevo entrenamiento tras entrenamiento. Ideal para quienes entrenan duro y exigen lo mejor de su ropa.",
    basePrice: 95000,
    category: "leggings" as const,
    isFeatured: false,
    status: "active" as const,
    attributes: {
      compression: "Media" as const,
      material: "75% Poliéster de alto rendimiento, 25% Elastano con poros de ventilación",
      waistType: "Tiro Alto con elástico invisible de doble capa y acabado plano",
      careInstructions: CARE_STANDARD,
    },
    images: [
      img(
        "img-002-1",
        "1545205597-3d9d02c29597",
        "Biker High-Waist AirTouch en Negro Ónix, modelo en postura de extensión completa",
        true,
        0,
      ),
      img(
        "img-002-2",
        "1564415315949-7a0c4c73aab4",
        "Biker High-Waist AirTouch, detalle de cintura alta y textura AirTouch transpirable",
        false,
        1,
      ),
    ],
    variants: [
      variant("var-002-1", "CF-BIK-AIRT-BLK-S", "S", "Negro Ónix", "#121212", 10),
      variant("var-002-2", "CF-BIK-AIRT-BLK-M", "M", "Negro Ónix", "#121212", 15),
      variant("var-002-3", "CF-BIK-AIRT-CRM-L", "L", "Crema", "#F5F0E8", 5),
    ],
    createdAt: BASE_DATE,
  },

  // 3 — Legging Ribbed V-Waist Mocha
  {
    id: "prod-003",
    slug: "legging-ribbed-v-waist-mocha",
    name: "Legging Ribbed V-Waist Mocha",
    shortDescription:
      "Tejido acanalado premium con cintura en V que estiliza y alarga la silueta",
    description:
      "La combinación perfecta entre funcionalidad atlética y diseño editorial. La textura ribbed (acanalada) de alta densidad realza las curvas naturales con una compresión media que acompaña sin oprimir. El corte en V del tiro alto es la firma estética que distingue esta pieza. El tono Café Moca Tostado es el neutro cálido de la temporada: combina con absolutamente todo tu guardarropa de entrenamiento.",
    basePrice: 140000,
    category: "leggings" as const,
    isFeatured: true,
    status: "active" as const,
    attributes: {
      compression: "Media" as const,
      material: "72% Poliamida premium, 28% Elastano con textura ribbed de alta densidad",
      waistType: "Cintura en V de Tiro Alto con doble panel de soporte abdominal",
      careInstructions: CARE_DELICATE,
    },
    images: [
      img(
        "img-003-1",
        "1574680096145-d05b474e2155",
        "Legging Ribbed V-Waist Mocha en Café Moca Tostado, detalle de cintura en V y textura acanalada",
        true,
        0,
      ),
      img(
        "img-003-2",
        "1536922246289-88c42f957773",
        "Modelo usando el Legging Ribbed V-Waist Mocha en postura atlética completa de perfil",
        false,
        1,
      ),
    ],
    variants: [
      variant("var-003-1", "CF-LEG-RIBV-MOC-S", "S", "Café Moca", "#6B4A3A", 7),
      variant("var-003-2", "CF-LEG-RIBV-MOC-M", "M", "Café Moca", "#6B4A3A", 9),
      variant("var-003-3", "CF-LEG-RIBV-MOC-L", "L", "Café Moca", "#6B4A3A", 5),
      variant("var-003-4", "CF-LEG-RIBV-OLV-M", "M", "Verde Oliva Táctico", "#5C6B3A", 3),
    ],
    createdAt: BASE_DATE,
  },

  // 4 — Legging Compresivo Eclipse Noir
  {
    id: "prod-004",
    slug: "legging-compresivo-eclipse-noir",
    name: "Legging Compresivo Eclipse Noir",
    shortDescription:
      "Tecnología anti-transparencia de alta compresión con diseño anatómico modelador",
    description:
      "Para quienes no negocian ni rendimiento ni elegancia. La tecnología de triple capa garantiza cero transparencias incluso en sentadillas profundas y posturas invertidas de yoga. Las líneas de costura anatómica guían la mirada hacia arriba y alargan visualmente las piernas. La compresión graduada activa la circulación sanguínea y reduce la fatiga muscular post-entrenamiento. El estándar de oro en leggings de alta performance.",
    basePrice: 145000,
    category: "leggings" as const,
    isFeatured: false,
    status: "active" as const,
    attributes: {
      compression: "Alta" as const,
      material: "82% Poliamida de triple tejido certificado, 18% Elastano resistente al cloro",
      waistType: "Tiro Alto Anatómico con panel interno de soporte abdominal de 360°",
      careInstructions: CARE_DELICATE,
    },
    images: [
      img(
        "img-004-1",
        "1534438327276-14e5300c3a48",
        "Legging Compresivo Eclipse Noir en Negro Ónix, vista frontal completa mostrando líneas anatómicas",
        true,
        0,
      ),
      img(
        "img-004-2",
        "1544367567-0f2fcb009e0b",
        "Legging Compresivo Eclipse Noir, detalle de la tecnología de triple capa anti-transparencia",
        false,
        1,
      ),
    ],
    variants: [
      variant("var-004-1", "CF-LEG-ECLP-BLK-S", "S", "Negro Ónix", "#121212", 12),
      variant("var-004-2", "CF-LEG-ECLP-BLK-M", "M", "Negro Ónix", "#121212", 14),
      variant("var-004-3", "CF-LEG-ECLP-BLK-L", "L", "Negro Ónix", "#121212", 8),
    ],
    createdAt: BASE_DATE,
  },
];

// ─── CATEGORÍA: TOPS ──────────────────────────────────────────────────────────

const tops = [
  // 5 — Top Deportivo Vitality Cross-Back
  {
    id: "prod-005",
    slug: "top-deportivo-vitality-cross-back",
    name: "Top Deportivo Vitality Cross-Back",
    shortDescription:
      "Espalda cruzada de tiras dobles con soporte medio y copas removibles transpirables",
    description:
      "El top que acompaña desde el primer burpee hasta el último plank con comodidad y elegancia. La arquitectura de tiras cruzadas en la espalda distribuye el soporte ergonómicamente, eliminando puntos de presión durante saltos y movimientos de alta intensidad. Las copas removibles en malla transpirable se adaptan a cada entrenamiento. El escote moderado combina funcionalidad con una estética editorial sofisticada.",
    basePrice: 85000,
    category: "tops" as const,
    isFeatured: true,
    status: "active" as const,
    attributes: {
      compression: "Media" as const,
      material: "68% Poliamida, 32% Elastano con soporte de malla estructural interior",
      waistType: "Top corto con borde elástico anti-ride y ajuste ceñido al torso",
      careInstructions: CARE_STANDARD,
    },
    images: [
      img(
        "img-005-1",
        "1483721310020-03333e577078",
        "Top Deportivo Vitality Cross-Back en Negro Ónix, vista de la espalda cruzada con tiras dobles",
        true,
        0,
      ),
      img(
        "img-005-2",
        "1506629082955-511b1aa562c8",
        "Top Deportivo Vitality Cross-Back vista frontal con soporte integrado y escote deportivo",
        false,
        1,
      ),
    ],
    variants: [
      variant("var-005-1", "CF-TOP-VITL-BLK-S", "S", "Negro Ónix", "#121212", 10),
      variant("var-005-2", "CF-TOP-VITL-TRR-M", "M", "Terracota", "#C4622D", 7),
      variant("var-005-3", "CF-TOP-VITL-MID-L", "L", "Azul Medianoche", "#1A2744", 4),
    ],
    createdAt: BASE_DATE,
  },

  // 6 — Top Halter Sculpt Asymmetric
  {
    id: "prod-006",
    slug: "top-halter-sculpt-asymmetric",
    name: "Top Halter Sculpt Asymmetric",
    shortDescription:
      "Diseño asimétrico de un hombro con banda elástica reforzada y soporte ergonómico",
    description:
      "Donde el deporte se convierte en arte. El diseño de un solo hombro con banda de soporte asimétrica es una declaración de estilo que no sacrifica ni un milímetro de funcionalidad. La banda elástica inferior de doble capa fija el top en su lugar durante cualquier movimiento sin necesidad de reajustes constantes. Perfecto para yoga, pilates, entrenamiento funcional y sesiones fotográficas post-gym.",
    basePrice: 89000,
    category: "tops" as const,
    isFeatured: false,
    status: "active" as const,
    attributes: {
      compression: "Ligera" as const,
      material: "70% Poliamida satinada, 30% Elastano con acabado compresión ligera",
      waistType: "Diseño asimétrico de un hombro con banda inferior de doble capa",
      careInstructions: CARE_DELICATE,
    },
    images: [
      img(
        "img-006-1",
        "1517836357463-d25dfeac3438",
        "Top Halter Sculpt Asymmetric en Negro Ónix, vista frontal mostrando el diseño de un hombro",
        true,
        0,
      ),
      img(
        "img-006-2",
        "1541534741688-6078c738b9d5",
        "Top Halter Sculpt Asymmetric vista lateral destacando el corte asimétrico y la banda reforzada",
        false,
        1,
      ),
    ],
    variants: [
      variant("var-006-1", "CF-TOP-HALT-BLK-S", "S", "Negro Ónix", "#121212", 8),
      variant("var-006-2", "CF-TOP-HALT-BLK-M", "M", "Negro Ónix", "#121212", 10),
      variant("var-006-3", "CF-TOP-HALT-TRR-M", "M", "Terracota", "#C4622D", 5),
    ],
    createdAt: BASE_DATE,
  },

  // 7 — Crop Top Manga Larga Seamless Flow
  {
    id: "prod-007",
    slug: "crop-top-manga-larga-seamless-flow",
    name: "Crop Top Manga Larga Seamless Flow",
    shortDescription:
      "Manga larga con orificios para pulgares, compresión postural y tejido sin costuras",
    description:
      "Diseñado para los días de entrenamiento de alta exigencia en climas frescos sin renunciar al estilo. Los orificios para pulgares en los puños mantienen las mangas en su lugar durante planks, mountain climbers y sesiones de yoga flow. La tecnología Seamless elimina costuras irritantes en zonas de fricción y la compresión postural suave mantiene la alineación de la columna activada durante todo el workout.",
    basePrice: 115000,
    category: "tops" as const,
    isFeatured: false,
    status: "active" as const,
    attributes: {
      compression: "Media" as const,
      material: "76% Poliamida sin costuras, 24% Elastano con fibra termo-reguladora",
      waistType: "Crop corto con borde acanalado y panel de compresión postural en la espalda",
      careInstructions: CARE_STANDARD,
    },
    images: [
      img(
        "img-007-1",
        "1593079831268-3381b0db4a77",
        "Crop Top Manga Larga Seamless Flow en Gris Mineral, vista frontal con orificios para pulgares visibles",
        true,
        0,
      ),
      img(
        "img-007-2",
        "1576013551627-0cc20b96c2a7",
        "Crop Top Manga Larga Seamless Flow vista trasera mostrando el panel de compresión postural",
        false,
        1,
      ),
    ],
    variants: [
      variant("var-007-1", "CF-TOP-FLOW-GRY-XS", "XS", "Gris Mineral", "#8A8A8A", 6),
      variant("var-007-2", "CF-TOP-FLOW-BLK-S", "S", "Negro Ónix", "#121212", 9),
      variant("var-007-3", "CF-TOP-FLOW-BLK-M", "M", "Negro Ónix", "#121212", 7),
    ],
    createdAt: BASE_DATE,
  },

  // 8 — Top Bralette Essential Luxe
  {
    id: "prod-008",
    slug: "top-bralette-essential-luxe",
    name: "Top Bralette Essential Luxe",
    shortDescription:
      "Escote limpio con copas removibles transpirables y sujeción de bralette de lujo",
    description:
      "El básico premium que no puede faltar en tu colección. La silueta de bralette con escote cuadrado y cierre posterior de presilla elástica combina la elegancia de la lencería deportiva de lujo con la funcionalidad necesaria para yoga, pilates y entrenamientos de baja a media intensidad. Las copas removibles en espuma transpirable ofrecen cobertura personalizable. La tela ultra-suave de tacto piel es su característica más adictiva.",
    basePrice: 79000,
    category: "tops" as const,
    isFeatured: false,
    status: "active" as const,
    attributes: {
      compression: "Ligera" as const,
      material: "65% Poliamida de tacto piel, 35% Elastano con forro de malla transpirable",
      waistType: "Bralette con escote cuadrado y cierre posterior de presilla elástica ajustable",
      careInstructions: CARE_DELICATE,
    },
    images: [
      img(
        "img-008-1",
        "1549476464-37392f717541",
        "Top Bralette Essential Luxe en Negro Ónix, vista frontal del escote cuadrado y detalle de copa",
        true,
        0,
      ),
      img(
        "img-008-2",
        "1571731956672-f2b94d7dd0cb",
        "Top Bralette Essential Luxe en Rosa Empolvado, vista lateral del ajuste de bralette de lujo",
        false,
        1,
      ),
    ],
    variants: [
      variant("var-008-1", "CF-TOP-BRAL-BLK-S", "S", "Negro Ónix", "#121212", 12),
      variant("var-008-2", "CF-TOP-BRAL-RSE-M", "M", "Rosa Empolvado", "#D4A0A0", 8),
      variant("var-008-3", "CF-TOP-BRAL-BLK-L", "L", "Negro Ónix", "#121212", 6),
    ],
    createdAt: BASE_DATE,
  },
];

// ─── CATEGORÍA: SETS ──────────────────────────────────────────────────────────

const sets = [
  // 9 — Set Essential Sculpt Biker & Top
  {
    id: "prod-009",
    slug: "set-essential-sculpt-biker-top",
    name: "Set Essential Sculpt Biker & Top",
    shortDescription:
      "Dúo coordinado de biker y top en Café Moca Tostado con tejido seamless integrado",
    description:
      "El conjunto que define el concepto de sofisticación deportiva de CALLEFITS BY DANNI. La combinación de biker de compresión media y top de soporte integrado en el mismo tono Café Moca Tostado crea una silueta cohesiva y poderosa. Ambas piezas están confeccionadas en la misma familia textil para garantizar textura, opacidad y durabilidad homogéneas. Juntas o separadas, son prendas de autor.",
    basePrice: 169000,
    compareAtPrice: 195000,
    category: "sets" as const,
    isFeatured: true,
    status: "active" as const,
    attributes: {
      compression: "Media" as const,
      material: "78% Poliamida reciclada seamless, 22% Elastano — coordina textura y opacidad en ambas piezas",
      waistType: "Biker: Tiro Alto de soporte | Top: Cross-back con banda elástica inferior",
      careInstructions: CARE_STANDARD,
    },
    images: [
      img(
        "img-009-1",
        "1434682881908-b43d0467b798",
        "Set Essential Sculpt Biker & Top en Café Moca Tostado completo, vista frontal de conjunto coordinado",
        true,
        0,
      ),
      img(
        "img-009-2",
        "1460925895917-afdab827c52f",
        "Set Essential Sculpt Biker & Top, detalle de la coordinación de textura y tono entre las dos piezas",
        false,
        1,
      ),
    ],
    variants: [
      variant("var-009-1", "CF-SET-ESSC-MOC-S", "S", "Café Moca", "#6B4A3A", 5),
      variant("var-009-2", "CF-SET-ESSC-MOC-M", "M", "Café Moca", "#6B4A3A", 8),
      variant("var-009-3", "CF-SET-ESSC-MOC-L", "L", "Café Moca", "#6B4A3A", 4),
    ],
    createdAt: BASE_DATE,
  },

  // 10 — Set Ribbed Athletic Olive
  {
    id: "prod-010",
    slug: "set-ribbed-athletic-olive",
    name: "Set Ribbed Athletic Olive",
    shortDescription:
      "Legging largo ribbed y crop top coordinados en Verde Oliva Táctico de alto impacto visual",
    description:
      "El Verde Oliva Táctico es el neutro aspiracional de la temporada en fitness de alto rendimiento: tierra, energía y sofisticación al mismo tiempo. Este conjunto de legging largo y crop top en textura ribbed sincronizada eleva cualquier sesión de entrenamiento a categoría editorial. La compresión media del legging y el soporte suave del crop top crean un balance perfecto para sesiones de fuerza, yoga y pilates reformer.",
    basePrice: 189000,
    category: "sets" as const,
    isFeatured: false,
    status: "active" as const,
    attributes: {
      compression: "Media" as const,
      material: "72% Poliamida con textura ribbed de alta densidad, 28% Elastano en ambas piezas",
      waistType: "Legging: Cintura alta con doble capa | Top: Bralette de escote cuadrado",
      careInstructions: CARE_DELICATE,
    },
    images: [
      img(
        "img-010-1",
        "1578764078641-46dcb312d7a3",
        "Set Ribbed Athletic Olive en Verde Oliva Táctico, conjunto completo de legging largo y crop top coordinados",
        true,
        0,
      ),
      img(
        "img-010-2",
        "1571019613454-1cb2f99b2d8b",
        "Detalle de la textura ribbed del Set Ribbed Athletic Olive y coordinación de tono entre piezas",
        false,
        1,
      ),
    ],
    variants: [
      variant("var-010-1", "CF-SET-RIBO-OLV-S", "S", "Verde Oliva Táctico", "#5C6B3A", 4),
      variant("var-010-2", "CF-SET-RIBO-OLV-M", "M", "Verde Oliva Táctico", "#5C6B3A", 7),
      variant("var-010-3", "CF-SET-RIBO-OLV-L", "L", "Verde Oliva Táctico", "#5C6B3A", 3),
    ],
    createdAt: BASE_DATE,
  },

  // 11 — Set Core Comfort Midnight
  {
    id: "prod-011",
    slug: "set-core-comfort-midnight",
    name: "Set Core Comfort Midnight",
    shortDescription:
      "Top de escote cuadrado y biker en Azul Medianoche profundo para entrenamiento de fuerza",
    description:
      "El Azul Medianoche es el color de quienes entrenan con convicción. Este conjunto de top de escote cuadrado y biker de compresión media en el tono más oscuro y sofisticado de la paleta de CALLEFITS fue diseñado para sesiones de levantamiento, entrenamiento funcional y cualquier disciplina que exija tanto del cuerpo como de la mente. La comodidad que genera confianza desde el primer movimiento.",
    basePrice: 175000,
    category: "sets" as const,
    isFeatured: false,
    status: "active" as const,
    attributes: {
      compression: "Media" as const,
      material: "70% Poliamida tintada en frío para fijación profunda del color, 30% Elastano",
      waistType: "Top: Escote cuadrado con copas integradas | Biker: Tiro alto de soporte continuo",
      careInstructions: CARE_STANDARD,
    },
    images: [
      img(
        "img-011-1",
        "1545205597-3d9d02c29597",
        "Set Core Comfort Midnight en Azul Medianoche, conjunto de top y biker de entrenamiento de fuerza",
        true,
        0,
      ),
      img(
        "img-011-2",
        "1536922246289-88c42f957773",
        "Set Core Comfort Midnight vista lateral destacando la profundidad y riqueza del tono Azul Medianoche",
        false,
        1,
      ),
    ],
    variants: [
      variant("var-011-1", "CF-SET-CORE-MID-S", "S", "Azul Medianoche", "#1A2744", 6),
      variant("var-011-2", "CF-SET-CORE-MID-M", "M", "Azul Medianoche", "#1A2744", 9),
      variant("var-011-3", "CF-SET-CORE-MID-L", "L", "Azul Medianoche", "#1A2744", 5),
    ],
    createdAt: BASE_DATE,
  },

  // 12 — Set Terracota Energy Duo
  {
    id: "prod-012",
    slug: "set-terracota-energy-duo",
    name: "Set Terracota Energy Duo",
    shortDescription:
      "Conjunto energizante de alta elasticidad en Terracota con top de halter y legging de compresión alta",
    description:
      "La Terracota es el color de la energía activa, del movimiento con propósito, de la mujer que no pasa desapercibida en el gimnasio. Este dúo de top halter y legging de compresión alta concentra todo ese poder en una combinación de alta elasticidad y recuperación inmediata de la forma. Cada pieza soporta al menos 200 ciclos de lavado sin pérdida de color ni elasticidad. El set favorito de la colección de temporada.",
    basePrice: 185000,
    category: "sets" as const,
    isFeatured: true,
    status: "active" as const,
    attributes: {
      compression: "Alta" as const,
      material: "80% Poliamida de alta elasticidad con pigmentación Terracota resistente al UV, 20% Elastano",
      waistType: "Legging: Tiro ultra alto | Top: Halter de nudo frontal ajustable",
      careInstructions: CARE_DELICATE,
    },
    images: [
      img(
        "img-012-1",
        "1574680096145-d05b474e2155",
        "Set Terracota Energy Duo vista frontal completa con top halter y legging en color Terracota energizante",
        true,
        0,
      ),
      img(
        "img-012-2",
        "1506629082955-511b1aa562c8",
        "Set Terracota Energy Duo detalle del nudo frontal del top halter y la textura de alta elasticidad",
        false,
        1,
      ),
    ],
    variants: [
      variant("var-012-1", "CF-SET-TERR-TRR-S", "S", "Terracota", "#C4622D", 5),
      variant("var-012-2", "CF-SET-TERR-TRR-M", "M", "Terracota", "#C4622D", 8),
      variant("var-012-3", "CF-SET-TERR-TRR-L", "L", "Terracota", "#C4622D", 4),
    ],
    createdAt: BASE_DATE,
  },
];

// ─── CATEGORÍA: ENTERIZOS ─────────────────────────────────────────────────────

const enterizos = [
  // 13 — Enterizo Escultor Halter Backless
  {
    id: "prod-013",
    slug: "enterizo-escultor-halter-backless",
    name: "Enterizo Escultor Halter Backless",
    shortDescription:
      "Espalda abierta en U con sujeción interna anatómica y compresión escultórica total",
    description:
      "La pieza más editorial de la colección. La apertura en U de la espalda crea una línea arquitectónica que desnuda el poder y la elegancia del cuerpo atlético femenino. La sujeción interna con estructura de bralette integrada garantiza comodidad y soporte sin la necesidad de correas visibles. La compresión escultórica total desde hombros hasta tobillos activa cada grupo muscular y proyecta confianza absoluta desde el primer movimiento.",
    basePrice: 179000,
    category: "enterizos" as const,
    isFeatured: true,
    status: "active" as const,
    attributes: {
      compression: "Alta" as const,
      material: "82% Poliamida de alta compresión, 18% Elastano con estructura de bralette interna integrada",
      waistType: "Enterizo de cuerpo completo con escote halter y espalda abierta en U",
      careInstructions: CARE_DELICATE,
    },
    images: [
      img(
        "img-013-1",
        "1573495612937-f01400959f76",
        "Enterizo Escultor Halter Backless en Negro Ónix, vista de espalda abierta en U con sujeción interna",
        true,
        0,
      ),
      img(
        "img-013-2",
        "1593079831268-3381b0db4a77",
        "Enterizo Escultor Halter Backless vista frontal completa del escote halter y la silueta escultórica",
        false,
        1,
      ),
    ],
    variants: [
      variant("var-013-1", "CF-ENT-HALT-BLK-S", "S", "Negro Ónix", "#121212", 5),
      variant("var-013-2", "CF-ENT-HALT-BLK-M", "M", "Negro Ónix", "#121212", 7),
      variant("var-013-3", "CF-ENT-HALT-BLK-L", "L", "Negro Ónix", "#121212", 3),
    ],
    createdAt: BASE_DATE,
  },

  // 14 — Catsuit Deportivo Long-Leg Eclipse
  {
    id: "prod-014",
    slug: "catsuit-deportivo-long-leg-eclipse",
    name: "Catsuit Deportivo Long-Leg Eclipse",
    shortDescription:
      "Enterizo largo de compresión integral con cremallera frontal invisible y tecnología Eclipse",
    description:
      "El catsuit más avanzado de CALLEFITS: compresión integral de cuerpo completo con tecnología Eclipse de triple capa que garantiza cero transparencias en cualquier posición. La cremallera frontal invisible facilita ponértelo y quitártelo sin esfuerzo, mientras la estructura interna de bralette con copas removibles permite personalizarlo según el entrenamiento. De yoga al entrenamiento de fuerza, sin compromisos.",
    basePrice: 210000,
    category: "enterizos" as const,
    isFeatured: false,
    status: "active" as const,
    attributes: {
      compression: "Alta" as const,
      material: "84% Poliamida de triple tejido Eclipse, 16% Elastano con cremallera YKK invisible",
      waistType: "Enterizo largo de cuerpo completo con escote en V y cremallera frontal oculta",
      careInstructions: CARE_DELICATE,
    },
    images: [
      img(
        "img-014-1",
        "1541534741688-6078c738b9d5",
        "Catsuit Deportivo Long-Leg Eclipse en Negro Ónix, vista frontal del enterizo completo con cremallera invisible",
        true,
        0,
      ),
      img(
        "img-014-2",
        "1460925895917-afdab827c52f",
        "Catsuit Deportivo Long-Leg Eclipse, detalle de la cremallera YKK invisible y la textura Eclipse de triple capa",
        false,
        1,
      ),
    ],
    variants: [
      variant("var-014-1", "CF-ENT-CATS-BLK-XS", "XS", "Negro Ónix", "#121212", 3),
      variant("var-014-2", "CF-ENT-CATS-BLK-S", "S", "Negro Ónix", "#121212", 6),
      variant("var-014-3", "CF-ENT-CATS-BLK-M", "M", "Negro Ónix", "#121212", 8),
    ],
    createdAt: BASE_DATE,
  },

  // 15 — Unitard Biker Contour Studio
  {
    id: "prod-015",
    slug: "unitard-biker-contour-studio",
    name: "Unitard Biker Contour Studio",
    shortDescription:
      "Diseño corto ergonómico para pilates y entrenamiento funcional con líneas de contorno modeladoras",
    description:
      "El unitard pensado para el estudio de pilates, yoga y entrenamiento funcional de precisión. Su corte corto (biker) no restringe los movimientos de piernas ni las posturas invertidas. Las líneas de costura Contour están diseñadas para guiar la mirada y crear la ilusión óptica de una silueta más larga y definida. El tejido de mediana compresión permite la máxima amplitud de movimiento sin perder el ajuste escultórico.",
    basePrice: 155000,
    category: "enterizos" as const,
    isFeatured: false,
    status: "active" as const,
    attributes: {
      compression: "Media" as const,
      material: "74% Poliamida Contour de alta definición, 26% Elastano con costura anatómica visible",
      waistType: "Unitard biker con escote cuadrado y tirantes ajustables de doble aguja",
      careInstructions: CARE_STANDARD,
    },
    images: [
      img(
        "img-015-1",
        "1576013551627-0cc20b96c2a7",
        "Unitard Biker Contour Studio en Negro Ónix, vista frontal del corte biker y las líneas de contorno",
        true,
        0,
      ),
      img(
        "img-015-2",
        "1549476464-37392f717541",
        "Unitard Biker Contour Studio en Verde Oliva Táctico, postura de pilates que demuestra la amplitud de movimiento",
        false,
        1,
      ),
    ],
    variants: [
      variant("var-015-1", "CF-ENT-UNIT-BLK-S", "S", "Negro Ónix", "#121212", 7),
      variant("var-015-2", "CF-ENT-UNIT-GRY-M", "M", "Gris Mineral", "#8A8A8A", 5),
      variant("var-015-3", "CF-ENT-UNIT-OLV-M", "M", "Verde Oliva Táctico", "#5C6B3A", 3),
    ],
    createdAt: BASE_DATE,
  },

  // 16 — Enterizo Ribbed Strappy Performance
  {
    id: "prod-016",
    slug: "enterizo-ribbed-strappy-performance",
    name: "Enterizo Ribbed Strappy Performance",
    shortDescription:
      "Textura acanalada con tirantes ajustables cruzados y compresión de alto rendimiento",
    description:
      "El encuentro entre la arquitectura de moda y la ingeniería textil deportiva. Los tirantes cruzados ajustables en la espalda permiten personalizar el nivel de soporte y crear diferentes siluetas. La textura ribbed (acanalada) añade dimensión visual y una compresión media que acompaña el movimiento con precisión. Ideal para entrenamientos de media y alta intensidad, del HIIT al reformer, con una estética que nunca pasa desapercibida.",
    basePrice: 169000,
    category: "enterizos" as const,
    isFeatured: false,
    status: "active" as const,
    attributes: {
      compression: "Media" as const,
      material: "73% Poliamida acanalada de alta densidad, 27% Elastano con tirantes ajustables reforzados",
      waistType: "Enterizo de cuerpo completo con tirantes cruzados ajustables y espalda arquitectónica",
      careInstructions: CARE_STANDARD,
    },
    images: [
      img(
        "img-016-1",
        "1483721310020-03333e577078",
        "Enterizo Ribbed Strappy Performance en Terracota, vista de la espalda con tirantes cruzados ajustables",
        true,
        0,
      ),
      img(
        "img-016-2",
        "1517836357463-d25dfeac3438",
        "Enterizo Ribbed Strappy Performance en Negro Ónix, vista frontal completa de la textura acanalada",
        false,
        1,
      ),
    ],
    variants: [
      variant("var-016-1", "CF-ENT-RIBS-TRR-S", "S", "Terracota", "#C4622D", 5),
      variant("var-016-2", "CF-ENT-RIBS-TRR-M", "M", "Terracota", "#C4622D", 8),
      variant("var-016-3", "CF-ENT-RIBS-BLK-L", "L", "Negro Ónix", "#121212", 4),
    ],
    createdAt: BASE_DATE,
  },
];

// ─── Ensamblado y validación global ──────────────────────────────────────────

const rawCatalog = [...leggings, ...tops, ...sets, ...enterizos];

/**
 * Catálogo completo validado.
 * Si cualquiera de las 16 prendas falla el esquema Zod, la aplicación
 * lanzará un error descriptivo en tiempo de carga del módulo — garantía
 * de integridad de datos desde el primer render.
 */
export const MOCK_PRODUCTS: Product[] = z.array(ProductSchema).parse(rawCatalog);
