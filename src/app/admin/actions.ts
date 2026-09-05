"use server";

/**
 * admin/actions.ts — Server Actions del panel administrativo.
 *
 * Todas las mutaciones validan con Zod antes de tocar la base de datos.
 * Revalidación instantánea tras cada cambio exitoso (revalidatePath).
 * Modo dual: Supabase real o demo local con fallback silencioso.
 */
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import {
  AdminLoginSchema,
  UpdateProductPricingSchema,
  UpdateVariantStockSchema,
  ImageUploadSchema,
  type AdminActionResult,
} from "@/lib/admin-schemas";
import {
  isSupabaseConfigured,
} from "@/lib/services/product-service";
import {
  DEMO_SESSION_COOKIE,
  DEMO_SESSION_VALUE,
} from "@/middleware";

// ─── Credenciales de desarrollo (modo demo sin Supabase) ─────────────────────

const DEMO_ADMIN_EMAIL = "admin@callefits.com";
const DEMO_ADMIN_PASSWORD = "Callefits2026!";

// ─── loginAdminAction ─────────────────────────────────────────────────────────

export async function loginAdminAction(
  _prevState: AdminActionResult,
  formData: FormData,
): Promise<AdminActionResult> {
  const parsed = AdminLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? "Datos de acceso inválidos";
    return { success: false, message: firstError };
  }

  const { email, password } = parsed.data;

  // ── Modo Supabase ────────────────────────────────────────────────────────────
  if (isSupabaseConfigured()) {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("[Admin Auth] Supabase login error:", error.message);
      return {
        success: false,
        message: "Credenciales no válidas. Verifica tu email y contraseña.",
      };
    }

    redirect("/admin/products");
  }

  // ── Modo Demo (sin Supabase) ─────────────────────────────────────────────────
  if (email !== DEMO_ADMIN_EMAIL || password !== DEMO_ADMIN_PASSWORD) {
    return {
      success: false,
      message: "Credenciales de demo incorrectas. Usa admin@callefits.com / Callefits2026!",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(DEMO_SESSION_COOKIE, DEMO_SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 horas
    path: "/",
  });

  redirect("/admin/products");
}

// ─── logoutAdminAction ────────────────────────────────────────────────────────

export async function logoutAdminAction(): Promise<void> {
  if (isSupabaseConfigured()) {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  // Eliminar cookie demo en cualquier modo
  const cookieStore = await cookies();
  cookieStore.delete(DEMO_SESSION_COOKIE);

  redirect("/admin/login");
}

// ─── updateProductPricingAndStatusAction ──────────────────────────────────────

export async function updateProductPricingAndStatusAction(
  _prevState: AdminActionResult,
  formData: FormData,
): Promise<AdminActionResult> {
  const parsed = UpdateProductPricingSchema.safeParse({
    productId: formData.get("productId"),
    basePrice: formData.get("basePrice"),
    compareAtPrice: formData.get("compareAtPrice") || undefined,
    status: formData.get("status"),
    isFeatured: formData.get("isFeatured"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? "Datos de precio inválidos";
    return { success: false, message: firstError };
  }

  const { productId, basePrice, compareAtPrice, status, isFeatured } = parsed.data;

  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();

      const { error } = await supabase
        .from("products")
        .update({
          base_price: basePrice,
          compare_at_price: compareAtPrice ?? null,
          status,
          is_featured: isFeatured,
          updated_at: new Date().toISOString(),
        })
        .eq("id", productId);

      if (error) throw error;
    } catch (err) {
      console.error("[Admin] Error actualizando precio:", err);
      return {
        success: false,
        message: "Error al guardar en la base de datos. Intenta de nuevo.",
      };
    }
  }

  // Revalidar todas las rutas afectadas
  revalidatePath("/catalog", "layout");
  revalidatePath("/", "layout");

  return {
    success: true,
    message: isSupabaseConfigured()
      ? "Precio y estado actualizados con éxito en la tienda."
      : "Cambio registrado en modo demo. Conecta Supabase para persistir.",
  };
}

// ─── updateVariantStockAction ─────────────────────────────────────────────────

export async function updateVariantStockAction(
  _prevState: AdminActionResult,
  formData: FormData,
): Promise<AdminActionResult> {
  const parsed = UpdateVariantStockSchema.safeParse({
    variantId: formData.get("variantId"),
    productSlug: formData.get("productSlug"),
    stockQuantity: formData.get("stockQuantity"),
    isAvailable: formData.get("isAvailable"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? "Datos de stock inválidos";
    return { success: false, message: firstError };
  }

  const { variantId, productSlug, stockQuantity, isAvailable } = parsed.data;

  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();

      const { error } = await supabase
        .from("product_variants")
        .update({ stock_quantity: stockQuantity, is_available: isAvailable })
        .eq("id", variantId);

      if (error) throw error;
    } catch (err) {
      console.error("[Admin] Error actualizando stock:", err);
      return {
        success: false,
        message: "Error al actualizar el stock. Intenta de nuevo.",
      };
    }
  }

  revalidatePath(`/catalog/${productSlug}`);
  revalidatePath("/catalog", "layout");

  return {
    success: true,
    message: isSupabaseConfigured()
      ? "Stock actualizado con éxito."
      : "Stock registrado en modo demo.",
  };
}

// ─── uploadProductImageAction ─────────────────────────────────────────────────

export async function uploadProductImageAction(
  _prevState: AdminActionResult,
  formData: FormData,
): Promise<AdminActionResult> {
  const fileEntry = formData.get("file");
  if (!(fileEntry instanceof File)) {
    return { success: false, message: "No se recibió ningún archivo." };
  }

  const parsed = ImageUploadSchema.safeParse({
    productId: formData.get("productId"),
    altText: formData.get("altText"),
    file: fileEntry,
  });

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? "Archivo no válido";
    return { success: false, message: firstError };
  }

  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message:
        "La subida de imágenes requiere Supabase configurado. Añade NEXT_PUBLIC_SUPABASE_URL al .env.local.",
    };
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { productId, altText, file } = parsed.data;

    // Generar ruta única en el bucket
    const ext = file.name.split(".").pop() ?? "jpg";
    const uniqueName = `${productId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("products-media")
      .upload(uniqueName, uint8Array, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // Registrar imagen en la tabla product_images
    const { error: dbError } = await supabase.from("product_images").insert({
      product_id: productId,
      storage_path: uniqueName,
      alt_text: altText,
      sort_order: 99,
      is_primary: false,
    });

    if (dbError) throw dbError;

    revalidatePath(`/catalog`, "layout");
    revalidatePath(`/`, "layout");

    return { success: true, message: "Fotografía subida y registrada con éxito." };
  } catch (err) {
    console.error("[Admin] Error subiendo imagen:", err);
    return {
      success: false,
      message: "Error al subir la imagen. Verifica el formato y el tamaño (máx. 5 MB).",
    };
  }
}
