-- ═══════════════════════════════════════════════════════════════════════════
-- CALLEFITS BY DANNI — Seed Data (Catálogo Editorial Completo)
-- Traduce fielmente los 16 productos de src/data/mock-products.ts
-- a sentencias SQL para poblar la base de datos de Supabase.
--
-- INSTRUCCIONES:
--   supabase db reset && supabase db seed  (o ejecutar manualmente en SQL Editor)
--
-- NOTA: Las imágenes usan URLs de Unsplash como storage_path para desarrollo.
-- En producción, reemplazar por rutas relativas del bucket 'products-media'.
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── Limpiar datos previos (orden inverso de dependencias) ────────────────────
TRUNCATE testimonials, product_images, product_variants, products, categories
  RESTART IDENTITY CASCADE;

-- ─── CATEGORÍAS ───────────────────────────────────────────────────────────────

INSERT INTO categories (id, slug, name, description, is_active) VALUES
  ('10000000-0000-0000-0000-000000000001', 'leggings',  'Leggings',         'Leggings deportivos de alto rendimiento con tecnología anti-transparencias', true),
  ('10000000-0000-0000-0000-000000000002', 'tops',      'Tops',             'Tops y bralettes deportivos con soporte ergonómico y diseño editorial',       true),
  ('10000000-0000-0000-0000-000000000003', 'sets',      'Sets Combinados',  'Sets coordinados de legging y top en tejidos y tonos sincronizados',          true),
  ('10000000-0000-0000-0000-000000000004', 'enterizos', 'Enterizos',        'Enterizos y catsuits de compresión integral para máximo rendimiento',         true);

-- ─── PRODUCTOS ────────────────────────────────────────────────────────────────

INSERT INTO products (id, category_id, slug, name, short_description, description,
                      base_price, compare_at_price, status, is_featured, attributes) VALUES

-- ── LEGGINGS ──

  ('20000000-0000-0000-0000-000000000001',
   '10000000-0000-0000-0000-000000000001',
   'legging-seamless-sculpt-pro',
   'Legging Seamless Sculpt Pro',
   'Tiro ultra alto con compresión postural inteligente y tecnología sin costuras',
   'Diseñado para transformar cada entrenamiento en una experiencia de máximo rendimiento y sofisticación. Confeccionado en fibra de poliamida reciclada con micro-tejido sin costuras que elimina fricciones y abraza el cuerpo con precisión escultórica. La banda perimetral de tiro ultra alto proporciona soporte lumbar activo sin comprimir el abdomen. Resistente a la luz y a sentadillas profundas: la prueba definitiva de calidad de CALLEFITS.',
   135000, 160000, 'active', true,
   '{"compression": "Alta", "material": "80% Poliamida reciclada, 20% Elastano de alta recuperación", "waistType": "Tiro Ultra Alto Anatómico con banda perimetral de soporte lumbar", "careInstructions": ["Lavar a mano o máquina en ciclo suave (máx. 30°C)", "No usar blanqueador ni suavizante de telas", "Tender en sombra sobre superficie plana", "No usar secadora ni plancha directa"]}'::jsonb),

  ('20000000-0000-0000-0000-000000000002',
   '10000000-0000-0000-0000-000000000001',
   'biker-high-waist-airtouch',
   'Biker High-Waist AirTouch',
   'Short deportivo de alto impacto con tejido respirable y ajuste de segunda piel',
   'Diseñado para sesiones intensas de running, CrossFit y ciclismo indoor. El tejido AirTouch combina microporos de ventilación estratégica con compresión activa que modela sin restringir. La cintura alta anatomizada fija el core durante los movimientos más explosivos.',
   95000, NULL, 'active', false,
   '{"compression": "Media", "material": "75% Poliéster de alto rendimiento, 25% Elastano con poros de ventilación", "waistType": "Tiro Alto con elástico invisible de doble capa y acabado plano", "careInstructions": ["Lavar a mano o máquina en ciclo suave (máx. 30°C)", "No usar blanqueador ni suavizante de telas", "Tender en sombra sobre superficie plana", "No usar secadora ni plancha directa"]}'::jsonb),

  ('20000000-0000-0000-0000-000000000003',
   '10000000-0000-0000-0000-000000000001',
   'legging-ribbed-v-waist-mocha',
   'Legging Ribbed V-Waist Mocha',
   'Tejido acanalado premium con cintura en V que estiliza y alarga la silueta',
   'La combinación perfecta entre funcionalidad atlética y diseño editorial. La textura ribbed de alta densidad realza las curvas naturales con una compresión media que acompaña sin oprimir. El corte en V del tiro alto es la firma estética que distingue esta pieza.',
   140000, NULL, 'active', true,
   '{"compression": "Media", "material": "72% Poliamida premium, 28% Elastano con textura ribbed de alta densidad", "waistType": "Cintura en V de Tiro Alto con doble panel de soporte abdominal", "careInstructions": ["Lavar únicamente a mano en agua fría", "Usar detergente suave para ropa técnica", "No escurrir ni retorcer — presionar suavemente", "Tender en horizontal para conservar la forma"]}'::jsonb),

  ('20000000-0000-0000-0000-000000000004',
   '10000000-0000-0000-0000-000000000001',
   'legging-compresivo-eclipse-noir',
   'Legging Compresivo Eclipse Noir',
   'Tecnología anti-transparencia de alta compresión con diseño anatómico modelador',
   'Para quienes no negocian ni rendimiento ni elegancia. La tecnología de triple capa garantiza cero transparencias incluso en sentadillas profundas. Las líneas de costura anatómica guían la mirada hacia arriba y alargan visualmente las piernas.',
   145000, NULL, 'active', false,
   '{"compression": "Alta", "material": "82% Poliamida de triple tejido certificado, 18% Elastano resistente al cloro", "waistType": "Tiro Alto Anatómico con panel interno de soporte abdominal de 360°", "careInstructions": ["Lavar únicamente a mano en agua fría", "Usar detergente suave para ropa técnica", "No escurrir ni retorcer — presionar suavemente", "Tender en horizontal para conservar la forma"]}'::jsonb),

-- ── TOPS ──

  ('20000000-0000-0000-0000-000000000005',
   '10000000-0000-0000-0000-000000000002',
   'top-deportivo-vitality-cross-back',
   'Top Deportivo Vitality Cross-Back',
   'Espalda cruzada de tiras dobles con soporte medio y copas removibles transpirables',
   'El top que acompaña desde el primer burpee hasta el último plank. La arquitectura de tiras cruzadas distribuye el soporte ergonómicamente. Las copas removibles en malla transpirable se adaptan a cada entrenamiento.',
   85000, NULL, 'active', true,
   '{"compression": "Media", "material": "68% Poliamida, 32% Elastano con soporte de malla estructural interior", "waistType": "Top corto con borde elástico anti-ride y ajuste ceñido al torso", "careInstructions": ["Lavar a mano o máquina en ciclo suave (máx. 30°C)", "No usar blanqueador ni suavizante de telas", "Tender en sombra sobre superficie plana", "No usar secadora ni plancha directa"]}'::jsonb),

  ('20000000-0000-0000-0000-000000000006',
   '10000000-0000-0000-0000-000000000002',
   'top-halter-sculpt-asymmetric',
   'Top Halter Sculpt Asymmetric',
   'Diseño asimétrico de un hombro con banda elástica reforzada y soporte ergonómico',
   'Donde el deporte se convierte en arte. El diseño de un solo hombro con banda de soporte asimétrica es una declaración de estilo que no sacrifica funcionalidad. Perfecto para yoga, pilates, entrenamiento funcional y sesiones fotográficas post-gym.',
   89000, NULL, 'active', false,
   '{"compression": "Ligera", "material": "70% Poliamida satinada, 30% Elastano con acabado compresión ligera", "waistType": "Diseño asimétrico de un hombro con banda inferior de doble capa", "careInstructions": ["Lavar únicamente a mano en agua fría", "Usar detergente suave para ropa técnica", "No escurrir ni retorcer — presionar suavemente", "Tender en horizontal para conservar la forma"]}'::jsonb),

  ('20000000-0000-0000-0000-000000000007',
   '10000000-0000-0000-0000-000000000002',
   'crop-top-manga-larga-seamless-flow',
   'Crop Top Manga Larga Seamless Flow',
   'Manga larga con orificios para pulgares, compresión postural y tejido sin costuras',
   'Los orificios para pulgares mantienen las mangas en su lugar durante planks y mountain climbers. La tecnología Seamless elimina costuras irritantes y la compresión postural suave mantiene la alineación de la columna activada.',
   115000, NULL, 'active', false,
   '{"compression": "Media", "material": "76% Poliamida sin costuras, 24% Elastano con fibra termo-reguladora", "waistType": "Crop corto con borde acanalado y panel de compresión postural en la espalda", "careInstructions": ["Lavar a mano o máquina en ciclo suave (máx. 30°C)", "No usar blanqueador ni suavizante de telas", "Tender en sombra sobre superficie plana", "No usar secadora ni plancha directa"]}'::jsonb),

  ('20000000-0000-0000-0000-000000000008',
   '10000000-0000-0000-0000-000000000002',
   'top-bralette-essential-luxe',
   'Top Bralette Essential Luxe',
   'Escote limpio con copas removibles transpirables y sujeción de bralette de lujo',
   'El básico premium que no puede faltar. La silueta de bralette con escote cuadrado combina la elegancia de la lencería deportiva de lujo con la funcionalidad para yoga, pilates y entrenamientos de baja a media intensidad.',
   79000, NULL, 'active', false,
   '{"compression": "Ligera", "material": "65% Poliamida de tacto piel, 35% Elastano con forro de malla transpirable", "waistType": "Bralette con escote cuadrado y cierre posterior de presilla elástica ajustable", "careInstructions": ["Lavar únicamente a mano en agua fría", "Usar detergente suave para ropa técnica", "No escurrir ni retorcer — presionar suavemente", "Tender en horizontal para conservar la forma"]}'::jsonb),

-- ── SETS ──

  ('20000000-0000-0000-0000-000000000009',
   '10000000-0000-0000-0000-000000000003',
   'set-essential-sculpt-biker-top',
   'Set Essential Sculpt Biker & Top',
   'Dúo coordinado de biker y top en Café Moca Tostado con tejido seamless integrado',
   'El conjunto que define el concepto de sofisticación deportiva de CALLEFITS. Biker de compresión media y top de soporte integrado en el mismo tono Café Moca. Ambas piezas en la misma familia textil para garantizar textura, opacidad y durabilidad homogéneas.',
   169000, 195000, 'active', true,
   '{"compression": "Media", "material": "78% Poliamida reciclada seamless, 22% Elastano — coordina textura y opacidad en ambas piezas", "waistType": "Biker: Tiro Alto de soporte | Top: Cross-back con banda elástica inferior", "careInstructions": ["Lavar a mano o máquina en ciclo suave (máx. 30°C)", "No usar blanqueador ni suavizante de telas", "Tender en sombra sobre superficie plana", "No usar secadora ni plancha directa"]}'::jsonb),

  ('20000000-0000-0000-0000-000000000010',
   '10000000-0000-0000-0000-000000000003',
   'set-ribbed-athletic-olive',
   'Set Ribbed Athletic Olive',
   'Legging largo ribbed y crop top coordinados en Verde Oliva Táctico de alto impacto visual',
   'El Verde Oliva Táctico es el neutro aspiracional de la temporada. Este conjunto de legging largo y crop top en textura ribbed sincronizada eleva cualquier sesión de entrenamiento a categoría editorial.',
   189000, NULL, 'active', false,
   '{"compression": "Media", "material": "72% Poliamida con textura ribbed de alta densidad, 28% Elastano en ambas piezas", "waistType": "Legging: Cintura alta con doble capa | Top: Bralette de escote cuadrado", "careInstructions": ["Lavar únicamente a mano en agua fría", "Usar detergente suave para ropa técnica", "No escurrir ni retorcer — presionar suavemente", "Tender en horizontal para conservar la forma"]}'::jsonb),

  ('20000000-0000-0000-0000-000000000011',
   '10000000-0000-0000-0000-000000000003',
   'set-core-comfort-midnight',
   'Set Core Comfort Midnight',
   'Top de escote cuadrado y biker en Azul Medianoche profundo para entrenamiento de fuerza',
   'El Azul Medianoche es el color de quienes entrenan con convicción. Este conjunto de top y biker fue diseñado para sesiones de levantamiento, entrenamiento funcional y cualquier disciplina que exija tanto del cuerpo como de la mente.',
   175000, NULL, 'active', false,
   '{"compression": "Media", "material": "70% Poliamida tintada en frío para fijación profunda del color, 30% Elastano", "waistType": "Top: Escote cuadrado con copas integradas | Biker: Tiro alto de soporte continuo", "careInstructions": ["Lavar a mano o máquina en ciclo suave (máx. 30°C)", "No usar blanqueador ni suavizante de telas", "Tender en sombra sobre superficie plana", "No usar secadora ni plancha directa"]}'::jsonb),

  ('20000000-0000-0000-0000-000000000012',
   '10000000-0000-0000-0000-000000000003',
   'set-terracota-energy-duo',
   'Set Terracota Energy Duo',
   'Conjunto energizante de alta elasticidad en Terracota con top de halter y legging de compresión alta',
   'La Terracota es el color de la energía activa, del movimiento con propósito. Este dúo de top halter y legging de compresión alta concentra todo ese poder en alta elasticidad y recuperación inmediata de la forma.',
   185000, NULL, 'active', true,
   '{"compression": "Alta", "material": "80% Poliamida de alta elasticidad con pigmentación Terracota resistente al UV, 20% Elastano", "waistType": "Legging: Tiro ultra alto | Top: Halter de nudo frontal ajustable", "careInstructions": ["Lavar únicamente a mano en agua fría", "Usar detergente suave para ropa técnica", "No escurrir ni retorcer — presionar suavemente", "Tender en horizontal para conservar la forma"]}'::jsonb),

-- ── ENTERIZOS ──

  ('20000000-0000-0000-0000-000000000013',
   '10000000-0000-0000-0000-000000000004',
   'enterizo-escultor-halter-backless',
   'Enterizo Escultor Halter Backless',
   'Espalda abierta en U con sujeción interna anatómica y compresión escultórica total',
   'La pieza más editorial de la colección. La apertura en U de la espalda crea una línea arquitectónica que desnuda el poder y la elegancia del cuerpo atlético. La compresión escultórica total desde hombros hasta tobillos activa cada grupo muscular.',
   179000, NULL, 'active', true,
   '{"compression": "Alta", "material": "82% Poliamida de alta compresión, 18% Elastano con estructura de bralette interna integrada", "waistType": "Enterizo de cuerpo completo con escote halter y espalda abierta en U", "careInstructions": ["Lavar únicamente a mano en agua fría", "Usar detergente suave para ropa técnica", "No escurrir ni retorcer — presionar suavemente", "Tender en horizontal para conservar la forma"]}'::jsonb),

  ('20000000-0000-0000-0000-000000000014',
   '10000000-0000-0000-0000-000000000004',
   'catsuit-deportivo-long-leg-eclipse',
   'Catsuit Deportivo Long-Leg Eclipse',
   'Enterizo largo de compresión integral con cremallera frontal invisible y tecnología Eclipse',
   'El catsuit más avanzado de CALLEFITS: compresión integral con tecnología Eclipse de triple capa que garantiza cero transparencias. La cremallera frontal invisible facilita ponértelo y quitártelo.',
   210000, NULL, 'active', false,
   '{"compression": "Alta", "material": "84% Poliamida de triple tejido Eclipse, 16% Elastano con cremallera YKK invisible", "waistType": "Enterizo largo de cuerpo completo con escote en V y cremallera frontal oculta", "careInstructions": ["Lavar únicamente a mano en agua fría", "Usar detergente suave para ropa técnica", "No escurrir ni retorcer — presionar suavemente", "Tender en horizontal para conservar la forma"]}'::jsonb),

  ('20000000-0000-0000-0000-000000000015',
   '10000000-0000-0000-0000-000000000004',
   'unitard-biker-contour-studio',
   'Unitard Biker Contour Studio',
   'Diseño corto ergonómico para pilates y entrenamiento funcional con líneas de contorno modeladoras',
   'El unitard pensado para el estudio de pilates, yoga y entrenamiento funcional de precisión. Las líneas de costura Contour crean la ilusión óptica de una silueta más larga y definida.',
   155000, NULL, 'active', false,
   '{"compression": "Media", "material": "74% Poliamida Contour de alta definición, 26% Elastano con costura anatómica visible", "waistType": "Unitard biker con escote cuadrado y tirantes ajustables de doble aguja", "careInstructions": ["Lavar a mano o máquina en ciclo suave (máx. 30°C)", "No usar blanqueador ni suavizante de telas", "Tender en sombra sobre superficie plana", "No usar secadora ni plancha directa"]}'::jsonb),

  ('20000000-0000-0000-0000-000000000016',
   '10000000-0000-0000-0000-000000000004',
   'enterizo-ribbed-strappy-performance',
   'Enterizo Ribbed Strappy Performance',
   'Textura acanalada con tirantes ajustables cruzados y compresión de alto rendimiento',
   'El encuentro entre la arquitectura de moda y la ingeniería textil deportiva. Los tirantes cruzados ajustables permiten personalizar el soporte. La textura ribbed añade dimensión visual y compresión media.',
   169000, NULL, 'active', false,
   '{"compression": "Media", "material": "73% Poliamida acanalada de alta densidad, 27% Elastano con tirantes ajustables reforzados", "waistType": "Enterizo de cuerpo completo con tirantes cruzados ajustables y espalda arquitectónica", "careInstructions": ["Lavar a mano o máquina en ciclo suave (máx. 30°C)", "No usar blanqueador ni suavizante de telas", "Tender en sombra sobre superficie plana", "No usar secadora ni plancha directa"]}'::jsonb);

-- ─── IMÁGENES DE PRODUCTO ─────────────────────────────────────────────────────
-- storage_path = Unsplash URL (placeholder para desarrollo).
-- En producción, reemplazar por rutas relativas del bucket 'products-media'.

INSERT INTO product_images (id, product_id, storage_path, alt_text, sort_order, is_primary) VALUES
  -- Prod 001
  ('30000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000001','https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80','Legging Seamless Sculpt Pro en Negro Ónix, vista frontal completa mostrando el tiro ultra alto',0,true),
  ('30000000-0000-0000-0000-000000000002','20000000-0000-0000-0000-000000000001','https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80','Legging Seamless Sculpt Pro, detalle lateral del ajuste escultórico',1,false),
  -- Prod 002
  ('30000000-0000-0000-0000-000000000003','20000000-0000-0000-0000-000000000002','https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80','Biker High-Waist AirTouch en Negro Ónix, modelo en postura de extensión completa',0,true),
  ('30000000-0000-0000-0000-000000000004','20000000-0000-0000-0000-000000000002','https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?auto=format&fit=crop&w=1000&q=80','Biker High-Waist AirTouch, detalle de cintura alta y textura AirTouch transpirable',1,false),
  -- Prod 003
  ('30000000-0000-0000-0000-000000000005','20000000-0000-0000-0000-000000000003','https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80','Legging Ribbed V-Waist Mocha en Café Moca Tostado, detalle de cintura en V',0,true),
  ('30000000-0000-0000-0000-000000000006','20000000-0000-0000-0000-000000000003','https://images.unsplash.com/photo-1536922246289-88c42f957773?auto=format&fit=crop&w=1000&q=80','Modelo usando el Legging Ribbed V-Waist Mocha en postura atlética completa',1,false),
  -- Prod 004
  ('30000000-0000-0000-0000-000000000007','20000000-0000-0000-0000-000000000004','https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80','Legging Compresivo Eclipse Noir en Negro Ónix, vista frontal completa',0,true),
  ('30000000-0000-0000-0000-000000000008','20000000-0000-0000-0000-000000000004','https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80','Legging Compresivo Eclipse Noir, detalle de la tecnología de triple capa',1,false),
  -- Prod 005
  ('30000000-0000-0000-0000-000000000009','20000000-0000-0000-0000-000000000005','https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1000&q=80','Top Deportivo Vitality Cross-Back en Negro Ónix, vista de la espalda cruzada',0,true),
  ('30000000-0000-0000-0000-000000000010','20000000-0000-0000-0000-000000000005','https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=80','Top Deportivo Vitality Cross-Back vista frontal con soporte integrado',1,false),
  -- Prod 006
  ('30000000-0000-0000-0000-000000000011','20000000-0000-0000-0000-000000000006','https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80','Top Halter Sculpt Asymmetric en Negro Ónix, vista frontal del diseño de un hombro',0,true),
  ('30000000-0000-0000-0000-000000000012','20000000-0000-0000-0000-000000000006','https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80','Top Halter Sculpt Asymmetric vista lateral destacando el corte asimétrico',1,false),
  -- Prod 007
  ('30000000-0000-0000-0000-000000000013','20000000-0000-0000-0000-000000000007','https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1000&q=80','Crop Top Manga Larga Seamless Flow en Gris Mineral, vista frontal',0,true),
  ('30000000-0000-0000-0000-000000000014','20000000-0000-0000-0000-000000000007','https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80','Crop Top Manga Larga Seamless Flow vista trasera mostrando el panel de compresión',1,false),
  -- Prod 008
  ('30000000-0000-0000-0000-000000000015','20000000-0000-0000-0000-000000000008','https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=1000&q=80','Top Bralette Essential Luxe en Negro Ónix, vista frontal del escote cuadrado',0,true),
  ('30000000-0000-0000-0000-000000000016','20000000-0000-0000-0000-000000000008','https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?auto=format&fit=crop&w=1000&q=80','Top Bralette Essential Luxe en Rosa Empolvado, vista lateral del ajuste de bralette',1,false),
  -- Prod 009
  ('30000000-0000-0000-0000-000000000017','20000000-0000-0000-0000-000000000009','https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=1000&q=80','Set Essential Sculpt Biker & Top en Café Moca Tostado completo, vista frontal',0,true),
  ('30000000-0000-0000-0000-000000000018','20000000-0000-0000-0000-000000000009','https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80','Set Essential Sculpt detalle de la coordinación de textura',1,false),
  -- Prod 010
  ('30000000-0000-0000-0000-000000000019','20000000-0000-0000-0000-000000000010','https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80','Set Ribbed Athletic Olive en Verde Oliva Táctico, conjunto completo coordinado',0,true),
  ('30000000-0000-0000-0000-000000000020','20000000-0000-0000-0000-000000000010','https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80','Detalle de la textura ribbed del Set Ribbed Athletic Olive',1,false),
  -- Prod 011
  ('30000000-0000-0000-0000-000000000021','20000000-0000-0000-0000-000000000011','https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80','Set Core Comfort Midnight en Azul Medianoche, conjunto de top y biker',0,true),
  ('30000000-0000-0000-0000-000000000022','20000000-0000-0000-0000-000000000011','https://images.unsplash.com/photo-1536922246289-88c42f957773?auto=format&fit=crop&w=1000&q=80','Set Core Comfort Midnight vista lateral destacando el tono Azul Medianoche',1,false),
  -- Prod 012
  ('30000000-0000-0000-0000-000000000023','20000000-0000-0000-0000-000000000012','https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80','Set Terracota Energy Duo vista frontal completa en color Terracota',0,true),
  ('30000000-0000-0000-0000-000000000024','20000000-0000-0000-0000-000000000012','https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=80','Set Terracota Energy Duo detalle del nudo frontal del top halter',1,false),
  -- Prod 013
  ('30000000-0000-0000-0000-000000000025','20000000-0000-0000-0000-000000000013','https://images.unsplash.com/photo-1536922246289-88c42f957773?auto=format&fit=crop&w=1000&q=80','Enterizo Escultor Halter Backless en Negro Ónix, vista de espalda abierta en U',0,true),
  ('30000000-0000-0000-0000-000000000026','20000000-0000-0000-0000-000000000013','https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1000&q=80','Enterizo Escultor Halter Backless vista frontal completa del escote halter',1,false),
  -- Prod 014
  ('30000000-0000-0000-0000-000000000027','20000000-0000-0000-0000-000000000014','https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=1000&q=80','Catsuit Deportivo Long-Leg Eclipse en Negro Ónix, vista frontal del enterizo completo',0,true),
  ('30000000-0000-0000-0000-000000000028','20000000-0000-0000-0000-000000000014','https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80','Catsuit Deportivo Long-Leg Eclipse, detalle de la cremallera YKK invisible',1,false),
  -- Prod 015
  ('30000000-0000-0000-0000-000000000029','20000000-0000-0000-0000-000000000015','https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80','Unitard Biker Contour Studio en Negro Ónix, vista frontal del corte biker',0,true),
  ('30000000-0000-0000-0000-000000000030','20000000-0000-0000-0000-000000000015','https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=1000&q=80','Unitard Biker Contour Studio postura de pilates que demuestra amplitud de movimiento',1,false),
  -- Prod 016
  ('30000000-0000-0000-0000-000000000031','20000000-0000-0000-0000-000000000016','https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1000&q=80','Enterizo Ribbed Strappy Performance en Terracota, vista de la espalda con tirantes cruzados',0,true),
  ('30000000-0000-0000-0000-000000000032','20000000-0000-0000-0000-000000000016','https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80','Enterizo Ribbed Strappy Performance en Negro Ónix, vista frontal completa',1,false);

-- ─── VARIANTES DE PRODUCTO ────────────────────────────────────────────────────

INSERT INTO product_variants (id, product_id, sku, size, color, color_hex, stock_quantity, is_available, price_override) VALUES
  -- Prod 001 (5 variantes)
  ('40000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000001','CF-LEG-SCULPT-BLK-S','S','Negro Ónix','#121212',8,true,NULL),
  ('40000000-0000-0000-0000-000000000002','20000000-0000-0000-0000-000000000001','CF-LEG-SCULPT-BLK-M','M','Negro Ónix','#121212',12,true,NULL),
  ('40000000-0000-0000-0000-000000000003','20000000-0000-0000-0000-000000000001','CF-LEG-SCULPT-MOC-M','M','Café Moca','#6B4A3A',6,true,NULL),
  ('40000000-0000-0000-0000-000000000004','20000000-0000-0000-0000-000000000001','CF-LEG-SCULPT-OLV-L','L','Verde Oliva Táctico','#5C6B3A',4,true,NULL),
  ('40000000-0000-0000-0000-000000000005','20000000-0000-0000-0000-000000000001','CF-LEG-SCULPT-MID-L','L','Azul Medianoche','#1A2744',0,false,NULL),
  -- Prod 002
  ('40000000-0000-0000-0000-000000000006','20000000-0000-0000-0000-000000000002','CF-BIK-AIRT-BLK-S','S','Negro Ónix','#121212',10,true,NULL),
  ('40000000-0000-0000-0000-000000000007','20000000-0000-0000-0000-000000000002','CF-BIK-AIRT-BLK-M','M','Negro Ónix','#121212',15,true,NULL),
  ('40000000-0000-0000-0000-000000000008','20000000-0000-0000-0000-000000000002','CF-BIK-AIRT-CRM-L','L','Crema','#F5F0E8',5,true,NULL),
  -- Prod 003
  ('40000000-0000-0000-0000-000000000009','20000000-0000-0000-0000-000000000003','CF-LEG-RIBV-MOC-S','S','Café Moca','#6B4A3A',7,true,NULL),
  ('40000000-0000-0000-0000-000000000010','20000000-0000-0000-0000-000000000003','CF-LEG-RIBV-MOC-M','M','Café Moca','#6B4A3A',9,true,NULL),
  ('40000000-0000-0000-0000-000000000011','20000000-0000-0000-0000-000000000003','CF-LEG-RIBV-MOC-L','L','Café Moca','#6B4A3A',5,true,NULL),
  ('40000000-0000-0000-0000-000000000012','20000000-0000-0000-0000-000000000003','CF-LEG-RIBV-OLV-M','M','Verde Oliva Táctico','#5C6B3A',3,true,NULL),
  -- Prod 004
  ('40000000-0000-0000-0000-000000000013','20000000-0000-0000-0000-000000000004','CF-LEG-ECLP-BLK-S','S','Negro Ónix','#121212',12,true,NULL),
  ('40000000-0000-0000-0000-000000000014','20000000-0000-0000-0000-000000000004','CF-LEG-ECLP-BLK-M','M','Negro Ónix','#121212',14,true,NULL),
  ('40000000-0000-0000-0000-000000000015','20000000-0000-0000-0000-000000000004','CF-LEG-ECLP-BLK-L','L','Negro Ónix','#121212',8,true,NULL),
  -- Prod 005
  ('40000000-0000-0000-0000-000000000016','20000000-0000-0000-0000-000000000005','CF-TOP-VITL-BLK-S','S','Negro Ónix','#121212',10,true,NULL),
  ('40000000-0000-0000-0000-000000000017','20000000-0000-0000-0000-000000000005','CF-TOP-VITL-TRR-M','M','Terracota','#C4622D',7,true,NULL),
  ('40000000-0000-0000-0000-000000000018','20000000-0000-0000-0000-000000000005','CF-TOP-VITL-MID-L','L','Azul Medianoche','#1A2744',4,true,NULL),
  -- Prod 006
  ('40000000-0000-0000-0000-000000000019','20000000-0000-0000-0000-000000000006','CF-TOP-HALT-BLK-S','S','Negro Ónix','#121212',8,true,NULL),
  ('40000000-0000-0000-0000-000000000020','20000000-0000-0000-0000-000000000006','CF-TOP-HALT-BLK-M','M','Negro Ónix','#121212',10,true,NULL),
  ('40000000-0000-0000-0000-000000000021','20000000-0000-0000-0000-000000000006','CF-TOP-HALT-TRR-M','M','Terracota','#C4622D',5,true,NULL),
  -- Prod 007
  ('40000000-0000-0000-0000-000000000022','20000000-0000-0000-0000-000000000007','CF-TOP-FLOW-GRY-XS','XS','Gris Mineral','#8A8A8A',6,true,NULL),
  ('40000000-0000-0000-0000-000000000023','20000000-0000-0000-0000-000000000007','CF-TOP-FLOW-BLK-S','S','Negro Ónix','#121212',9,true,NULL),
  ('40000000-0000-0000-0000-000000000024','20000000-0000-0000-0000-000000000007','CF-TOP-FLOW-BLK-M','M','Negro Ónix','#121212',7,true,NULL),
  -- Prod 008
  ('40000000-0000-0000-0000-000000000025','20000000-0000-0000-0000-000000000008','CF-TOP-BRAL-BLK-S','S','Negro Ónix','#121212',12,true,NULL),
  ('40000000-0000-0000-0000-000000000026','20000000-0000-0000-0000-000000000008','CF-TOP-BRAL-RSE-M','M','Rosa Empolvado','#D4A0A0',8,true,NULL),
  ('40000000-0000-0000-0000-000000000027','20000000-0000-0000-0000-000000000008','CF-TOP-BRAL-BLK-L','L','Negro Ónix','#121212',6,true,NULL),
  -- Prod 009
  ('40000000-0000-0000-0000-000000000028','20000000-0000-0000-0000-000000000009','CF-SET-ESSC-MOC-S','S','Café Moca','#6B4A3A',5,true,NULL),
  ('40000000-0000-0000-0000-000000000029','20000000-0000-0000-0000-000000000009','CF-SET-ESSC-MOC-M','M','Café Moca','#6B4A3A',8,true,NULL),
  ('40000000-0000-0000-0000-000000000030','20000000-0000-0000-0000-000000000009','CF-SET-ESSC-MOC-L','L','Café Moca','#6B4A3A',4,true,NULL),
  -- Prod 010
  ('40000000-0000-0000-0000-000000000031','20000000-0000-0000-0000-000000000010','CF-SET-RIBO-OLV-S','S','Verde Oliva Táctico','#5C6B3A',4,true,NULL),
  ('40000000-0000-0000-0000-000000000032','20000000-0000-0000-0000-000000000010','CF-SET-RIBO-OLV-M','M','Verde Oliva Táctico','#5C6B3A',7,true,NULL),
  ('40000000-0000-0000-0000-000000000033','20000000-0000-0000-0000-000000000010','CF-SET-RIBO-OLV-L','L','Verde Oliva Táctico','#5C6B3A',3,true,NULL),
  -- Prod 011
  ('40000000-0000-0000-0000-000000000034','20000000-0000-0000-0000-000000000011','CF-SET-CORE-MID-S','S','Azul Medianoche','#1A2744',6,true,NULL),
  ('40000000-0000-0000-0000-000000000035','20000000-0000-0000-0000-000000000011','CF-SET-CORE-MID-M','M','Azul Medianoche','#1A2744',9,true,NULL),
  ('40000000-0000-0000-0000-000000000036','20000000-0000-0000-0000-000000000011','CF-SET-CORE-MID-L','L','Azul Medianoche','#1A2744',5,true,NULL),
  -- Prod 012
  ('40000000-0000-0000-0000-000000000037','20000000-0000-0000-0000-000000000012','CF-SET-TERR-TRR-S','S','Terracota','#C4622D',5,true,NULL),
  ('40000000-0000-0000-0000-000000000038','20000000-0000-0000-0000-000000000012','CF-SET-TERR-TRR-M','M','Terracota','#C4622D',8,true,NULL),
  ('40000000-0000-0000-0000-000000000039','20000000-0000-0000-0000-000000000012','CF-SET-TERR-TRR-L','L','Terracota','#C4622D',4,true,NULL),
  -- Prod 013
  ('40000000-0000-0000-0000-000000000040','20000000-0000-0000-0000-000000000013','CF-ENT-HALT-BLK-S','S','Negro Ónix','#121212',5,true,NULL),
  ('40000000-0000-0000-0000-000000000041','20000000-0000-0000-0000-000000000013','CF-ENT-HALT-BLK-M','M','Negro Ónix','#121212',7,true,NULL),
  ('40000000-0000-0000-0000-000000000042','20000000-0000-0000-0000-000000000013','CF-ENT-HALT-BLK-L','L','Negro Ónix','#121212',3,true,NULL),
  -- Prod 014
  ('40000000-0000-0000-0000-000000000043','20000000-0000-0000-0000-000000000014','CF-ENT-CATS-BLK-XS','XS','Negro Ónix','#121212',3,true,NULL),
  ('40000000-0000-0000-0000-000000000044','20000000-0000-0000-0000-000000000014','CF-ENT-CATS-BLK-S','S','Negro Ónix','#121212',6,true,NULL),
  ('40000000-0000-0000-0000-000000000045','20000000-0000-0000-0000-000000000014','CF-ENT-CATS-BLK-M','M','Negro Ónix','#121212',8,true,NULL),
  -- Prod 015
  ('40000000-0000-0000-0000-000000000046','20000000-0000-0000-0000-000000000015','CF-ENT-UNIT-BLK-S','S','Negro Ónix','#121212',7,true,NULL),
  ('40000000-0000-0000-0000-000000000047','20000000-0000-0000-0000-000000000015','CF-ENT-UNIT-GRY-M','M','Gris Mineral','#8A8A8A',5,true,NULL),
  ('40000000-0000-0000-0000-000000000048','20000000-0000-0000-0000-000000000015','CF-ENT-UNIT-OLV-M','M','Verde Oliva Táctico','#5C6B3A',3,true,NULL),
  -- Prod 016
  ('40000000-0000-0000-0000-000000000049','20000000-0000-0000-0000-000000000016','CF-ENT-RIBS-TRR-S','S','Terracota','#C4622D',5,true,NULL),
  ('40000000-0000-0000-0000-000000000050','20000000-0000-0000-0000-000000000016','CF-ENT-RIBS-TRR-M','M','Terracota','#C4622D',8,true,NULL),
  ('40000000-0000-0000-0000-000000000051','20000000-0000-0000-0000-000000000016','CF-ENT-RIBS-BLK-L','L','Negro Ónix','#121212',4,true,NULL);

-- ─── TESTIMONIOS (Placeholder — reemplazar por reseñas reales verificadas) ────
INSERT INTO testimonials (author_name, city, quote, rating, is_published, sort_order) VALUES
  ('Valentina R.', 'Medellín', 'Compré el Legging Seamless Sculpt Pro y no lo puedo creer — ¡ni una sola transparencia en 60 minutos de crossfit! El tiro alto se mantiene sin esfuerzo y el ajuste es exactamente lo que describe la prenda. Definitivamente no es el último pedido.', 5, true, 1),
  ('Camila M.', 'Bogotá', 'Llevaba meses buscando un set de legging + top que no se vea genérico. El Set Terracota Energy Duo superó todas mis expectativas. Danni me asesoró personalmente en WhatsApp, me ayudó con la talla y el despacho llegó en 3 días. ¡Atención impecable!', 5, true, 2),
  ('Sofía G.', 'Cali', 'Primero me dio un poco de miedo comprar por WhatsApp sin tienda física, pero Danni me explicó todo el proceso paso a paso. La calidad del tejido es real — se nota que es artesanal y de alta calidad. Ya pedí el Enterizo Escultor y estoy enamorada.', 5, true, 3);
