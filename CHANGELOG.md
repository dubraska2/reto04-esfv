# Historial de versiones — ESFV (Universidad del Magdalena)

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).
La versión y la fecha de esta tabla son las mismas que se muestran en la cabecera
de la aplicación en ejecución (RF-48) y en el informe de una página.

## [v1.0.0] — 2026-10-26

Primera versión etiquetada y lista para evaluación (Reto 04). Integra en una sola
aplicación web los Retos 01 a 04 sobre Energía Solar Fotovoltaica (2026-II).
Incorpora las correcciones de la auditoría del Reto 03 (2026-10-26).

### Corregido — auditoría del Reto 03
- **Recurso solar:** NREL cambió de dominio (`developer.nlr.gov`); se quitó el proxy
  público `corsproxy.io`; la espera sube de 9 a 30 s (antes la app abandonaba la
  consulta y usaba en silencio los datos locales). Un caso guardado usa la base local
  y "Coordenadas manuales" consulta la API, mostrando el municipio consultado.
- **RF-42:** la clave personal ya no va en `config.js` (solo `DEMO_KEY`); en Vercel la
  usa la función `api/pvwatts.js` desde la variable de entorno `NREL_API_KEY`.
- **Ramas (RF-25):** cambiar el tipo de aplicación ya no borra el panel elegido a mano
  ni los valores de PR y tensión máxima fijados.
- **RF-28/RF-31:** columna "Ns máx." por equipo; verificación de la tensión de banco que
  admite cada regulador; reconfiguración concreta Ns × Np con un clic.
- **Banco (RF-32/33/35):** se separan la tensión nominal del sistema (corriente del
  regulador, tasa C, Ns) y la tensión real del banco (Cn [Ah], energía instalada,
  arranque). Con LFP de 51,2 V el Cn pasaba de 411,2 Ah a 438,7 Ah.
- **Comparación de tecnologías (RF-35):** cada batería usa su propio DoD; la lectura de
  "kWh / año de servicio" estaba invertida; se agrega "kWh entregados por kWh instalado".
- **Balance de cierre (RF-34):** "Aceptar ajuste" ahora amplía el generador con cadenas
  completas, recalcula todo el componente y revisa todo el catálogo (antes afirmaba que
  CTRL-B seguía cumpliendo con 91,7 A al banco).
- **Validación (RF-32/RF-46):** con entradas fuera de rango se ocultan los resultados del
  banco; los valores no numéricos se muestran como "—" en vez de "0,00".
- **Catálogo:** Pylontech Force H2 (alta tensión) reemplazada por US5000; BYD LVS 78 Ah;
  Dyness A48100 a 48 V; ventanas MPPT, Imp e Isc de los inversores según ficha;
  Isc de los reguladores; Phocos MPPT 100/40.
- **Estilos:** se restauran las clases de los veredictos (cumple / alerta / no cumple) y
  de la rama activa, que se habían borrado de la hoja de estilos.
- **Exportación (RF-40):** los resultados del Reto 03 usan el generador ampliado cuando se
  aceptó el ajuste del balance.

### Añadido — auditoría del Reto 04
- **Segunda fuente de recurso solar (§4):** contraste automático de la potencia pico con
  el reanálisis ERA5 (Open-Meteo, 2015–2024), trasladado al plano del generador (Erbs +
  Liu-Jordan), con la diferencia frente a la fuente principal y el límite de ±15 %; también
  en el informe y en la exportación. Escenario D: −0,4 %.
- **Inversor de las cargas en CA y arranque de motores (§4):** potencia continua requerida
  (demanda máxima) y pico de arranque (P(h) + (k − 1) × motor mayor activo, k = 3
  editable), catálogo `CATALOGO_INVERSORES_AISLADOS` (Victron MultiPlus-II 48/3000, Victron
  Phoenix 48/3000, Growatt SPF 5000 ES) con veredicto y márgenes; también en el informe.
- **Escenario D:** temperaturas de diseño de Yopal (16 °C mínima, 31 °C de operación,
  ERA5 2015–2024) en lugar de los valores por defecto (10 °C y 25 °C).
- `pruebas.html` (RF-45): 227 pruebas automáticas en 7 casos — los tres del Reto 01
  (solo diurno, solo nocturno y mixto con cruce de medianoche), el caso estandarizado de
  los Retos 02 y 03, el ejemplo 1 de la Sesión 10 y el Escenario D (incluido el inversor).

### Corregido — auditoría del Reto 04
- **RF-41:** si la API de recurso solar falla, el aviso explica el problema en lenguaje
  del usuario, sin el texto técnico del error.
- **RF-44:** el CSV usa coma decimal como la pantalla (con UTF-8 para las tildes); la
  pestaña del navegador se titula "ESFV · Dimensionamiento Fotovoltaico".
- **RF-43/RF-48:** en el teléfono la versión y su fecha siguen visibles en la cabecera.
- **RF-46:** un intervalo con hora de fin anterior a la de inicio muestra cómo se
  interpreta (cruce de medianoche y número de horas) y cómo corregirlo.

### Añadido
- **Reto 04 — Escenario D del grupo (RF-39):** botón "Cargar Escenario D" que
  precarga, en un solo clic, la finca lechera de Yopal (Casanare): ubicación
  (5,34°N / 72,39°O), tipo de aplicación off-grid con almacenamiento (banco de
  48 V), área disponible (35 m²), costo unitario (1.200 $/kWh), 365 días/año de
  operación, ventana solar 06:00–18:00 y las 7 cargas con sus horarios exactos.
- **Base de datos solar local — caso "Yopal" (RF-15/41 y segunda fuente del
  Reto 04 sección 4):** nuevo caso guardado para la región de la Orinoquía, de
  modo que la contingencia sin conexión a la API y el contraste contra una
  segunda fuente independiente también cubren el escenario asignado.
- **Exportación de resultados en CSV y JSON (RF-40):** además de guardar/cargar
  el proyecto completo (entradas), dos botones nuevos en la pestaña "Informe"
  exportan los resultados ya calculados de los Retos 01 a 03 (KPIs, cuadro de
  cargas, perfil horario, generador, regulador/inversor, banco de baterías,
  balance de cierre) a archivos `.json` y `.csv` independientes de la aplicación.
- **Versión y fecha visibles en la plataforma (RF-48):** la cabecera y el informe
  de una página muestran siempre la versión activa (`v1.0.0`, 2026-10-25); el
  resultado de cualquier cálculo es reconstruible a partir de las entradas
  visibles y las reglas de esta versión.
- Este `CHANGELOG.md`.

### Corregido
- **RF-46 — demanda máxima empatada:** `maxDemand()` ahora detecta todas las
  horas en las que se repite el valor de la demanda máxima, no solo la primera;
  la pestaña "Resultados", el panel de análisis y el informe de una página
  listan todas las horas empatadas en vez de mostrar una sola.

## [v0.4.0] — Reto 03 (regulador/inversor MPPT y banco de baterías)

- Selector de rama con/sin almacenamiento con valor inicial según el tipo de
  aplicación (RF-25), con matriz de coherencia rama↔tipo de aplicación: off-grid
  e híbrido off-grid bloquean "sin almacenamiento"; on-grid bloquea "con
  almacenamiento"; híbrido on-grid permite ambas.
- Catálogo editable de reguladores MPPT, inversores con entrada MPPT y baterías
  (RF-27), con fabricante, modelo, parámetros y fuente de la ficha visibles.
- Verificación de tensiones del arreglo (Voc en frío, Vmp en caliente/frío,
  ventana MPPT y arranque) y de corrientes (salida al banco, Isc/Imp por
  entrada, corriente de diseño con el factor 1,25) — RF-28/RF-29.
- Relación DC/AC con rango configurable y alertas de recorte esperado o
  inversor sobredimensionado (RF-30); veredicto cumple/alerta/no cumple por
  equipo y por criterio, con botón de ajuste automático de equipo, batería o
  arreglo de paneles cuando ninguno cumple (RF-31/RF-34).
- Dimensionamiento del banco en Ah/kWh con autonomía, DoD, factor de
  temperatura y tensión configurables (RF-32), configuración serie-paralelo con
  unidades enteras (RF-33), balance de cierre con margen/déficit y módulos
  adicionales sugeridos (RF-34), tasa C de carga/descarga y tiempo de
  recuperación tras agotar la autonomía (RF-35).
- Informe de una página ampliado con rama, equipo, banco, balance de cierre y
  alertas (RF-36); validación de caso de prueba estandarizado exacto.

## [v0.3.0] — Reto 02 (generador fotovoltaico)

- Cálculo de potencia pico requerida a partir de Ed, HSP anual/mes crítico y PR.
- Consulta del recurso solar a la API de PVWatts (NREL) con contingencia local
  automática y aviso explícito en pantalla cuando la API no responde (RF-15/41).
- Catálogo comercial de paneles, configuración automática en cadenas (series ×
  paralelo) y verificación de Voc máximo del sistema.
- Ajuste automático de arreglo/equipo cuando ninguna combinación cumple, con
  mensaje del cambio aplicado.

## [v0.2.0] — Reto 01 (requerimiento energético)

- Cuadro de cargas con horarios (incluye cruce de medianoche), factor de
  utilización por hora y clasificación diurna/nocturna/mixta.
- Perfil horario de 24 h, demanda máxima y su hora, energía diaria/mensual/anual
  y costos, con gráficos interactivos (potencia, energía, Fu, distribución).
- Validación de entradas (campos vacíos, cantidades/potencias no positivas,
  intervalos horarios inválidos o duplicados, costo unitario en cero).
- Guardado y carga del proyecto completo en un archivo `.json` descargable.

## [v0.1.0] — Prototipo inicial

- Primera versión funcional del cuadro de cargas y el perfil horario del Reto 01.
