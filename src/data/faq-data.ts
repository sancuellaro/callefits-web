/**
 * faq-data.ts — Preguntas frecuentes del catálogo CALLEFITS BY DANNI.
 *
 * Extraído como módulo independiente para garantizar testabilidad unitaria
 * sin necesidad de renderizar React (ver tests/unit/home-sections.test.ts).
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-tallas",
    question: "¿Cómo elijo mi talla exacta si estoy entre dos medidas?",
    answer:
      "Te recomendamos consultar nuestra Guía de Tallas detallada (disponible próximamente en el sitio) y tomar tus medidas de cintura, cadera y largo de tiro en reposo. Si quedas en el límite entre dos tallas, la regla general en CALLEFITS es elegir la talla mayor para mayor comodidad o la menor si prefieres una compresión más activa. Y si aún tienes dudas, ¡escríbenos por WhatsApp! Danni te asesora personalmente en minutos para que tu pedido quede perfecto desde el primer uso.",
  },
  {
    id: "faq-pago",
    question: "¿Cómo se realiza el pago si el pedido se hace por WhatsApp?",
    answer:
      "Una vez que confirmes tu pedido por WhatsApp, Danni te compartirá los datos para realizar el pago de forma segura mediante transferencia bancaria, Nequi, Daviplata o los métodos que acuerden directamente en la conversación. Recibirás una confirmación inmediata de pago y el estado de tu pedido en tiempo real. Trabajamos con total transparencia: sin pagos sin confirmar y sin sorpresas al momento del despacho.",
  },
  {
    id: "faq-despacho",
    question: "¿Cuánto tiempo tardan los despachos a nivel nacional?",
    answer:
      "El tiempo promedio de entrega es de 2 a 4 días hábiles para las principales ciudades (Bogotá, Medellín, Cali, Barranquilla). Para municipios intermedios y zonas rurales, el tiempo puede extenderse a 4 a 7 días hábiles dependiendo de la cobertura de la transportadora. Cada pedido incluye número de guía para rastreo en tiempo real, compartido directamente por WhatsApp al momento del despacho.",
  },
  {
    id: "faq-cambios",
    question: "¿Qué garantía tengo si la prenda no me queda como esperaba?",
    answer:
      "En CALLEFITS BY DANNI entendemos que la talla perfecta puede requerir un ajuste. Ofrecemos política de cambio de talla rápida y sin complicaciones: si la prenda no quedó como esperabas por motivo de talla (sin señales de uso, con empaque original), coordina el cambio directamente con Danni por WhatsApp. Trabajamos caso a caso para encontrar la solución más ágil para ti. Tu satisfacción es el estándar de calidad.",
  },
  {
    id: "faq-transparencias",
    question: "¿Las telas realmente no transparentan en sentadillas?",
    answer:
      "¡Absolutamente garantizado! Todos los leggings y enterizos de CALLEFITS BY DANNI están confeccionados con tejidos de triple o doble capa de alta densidad, seleccionados y testeados personalmente por Danni en entrenamientos reales. Antes de que cualquier prenda llegue a tu puerta, pasa por una prueba de opacidad: se coloca bajo luz directa y en postura de sentadilla profunda. Si hay cualquier nivel de transparencia, la prenda no se despacha. Es nuestro compromiso de calidad Squat-Proof con cada una de nuestras clientas.",
  },
] as const;
