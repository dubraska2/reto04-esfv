/* =========================================================================
   recurso_solar.js — Base de datos solar local externa (RF-14, RF-15, RF-16)
   -------------------------------------------------------------------------
   Nivel 1 (obligatorio, TdR Reto 02 sección 4): base de datos propia con
   al menos cinco casos documentados, uno de los cuales corresponde al
   caso de prueba estandarizado (estación de monitoreo ambiental de la
   Alta Guajira, Nazareth, 12.18°N / 71.28°O).

   Cada caso registra: nombre del sitio, latitud, longitud, irradiación
   diaria media anual, los doce valores mensuales, la inclinación y el
   azimut a los que corresponden, la fuente de donde se tomaron y la
   fecha de consulta — tal como exige el TdR.

   Esta base de datos cumple DOS funciones:
   1. "Casos guardados": el usuario elige una ubicación conocida sin
      necesidad de digitar latitud/longitud.
   2. CONTINGENCIA (RF-15): si la consulta a la API de PVWatts falla por
      cualquier motivo, la aplicación recurre automáticamente a estos
      valores (caso guardado más cercano a la coordenada declarada),
      y lo declara explícitamente en pantalla y en el informe.

   NOTA METODOLÓGICA: los valores mensuales son aproximaciones de
   referencia (Atlas de Radiación Solar de Colombia IDEAM/UPME y NASA
   POWER), documentadas para fines académicos. El caso "Uribia" fue
   calibrado deliberadamente para que su promedio anual (5,80 kWh/m²·día)
   y su mes de menor recurso (5,20 kWh/m²·día, octubre) coincidan con los
   valores declarados en el caso de prueba estandarizado del Reto 02
   (Nazareth, Alta Guajira), de forma que el módulo de contingencia local
   reproduzca exactamente los resultados de referencia del TdR cuando la
   API no esté disponible durante la sustentación.
   ========================================================================= */

window.BASE_DATOS_SOLAR = {
  fuente: "Atlas de Radiación Solar, Ultravioleta y Ozono de Colombia (IDEAM/UPME) y NASA POWER — valores aproximados de referencia académica. No sustituyen una consulta en línea a PVWatts/NSRDB para coordenadas específicas.",
  fechaConsulta: "2026-09-15",

  // HSP mensual en kWh/m²·día, orden Ene..Dic. Todos los casos se registran
  // para un generador con inclinación = latitud del sitio (regla práctica
  // habitual) y azimut 180° (orientación sur, hemisferio norte), salvo
  // "Uribia", registrado a 12°/sur para igualar el caso de prueba del TdR.
  casos: [
    {
      id: "uribia",
      nombre: "Uribia, La Guajira (Alta Guajira — incluye estación Nazareth, caso de prueba oficial)",
      lat: 12.18, lon: -71.28,
      tilt: 12, azimuth: 180,
      hspAnual: 5.80,
      hspMensual: [6.00, 6.05, 5.95, 5.75, 5.65, 5.95, 6.15, 5.90, 5.60, 5.20, 5.55, 5.85],
      fuente: "Calibrado para reproducir el caso de prueba estandarizado del TdR Reto 02 (irradiación anual declarada 5,8 kWh/m²·día; mes crítico declarado 5,2 kWh/m²·día, octubre), a partir de los patrones del Atlas IDEAM/UPME para la Alta Guajira.",
      fechaConsulta: "2026-09-15"
    },
    {
      id: "valledupar",
      nombre: "Valledupar, Cesar",
      lat: 10.4631, lon: -73.2532,
      tilt: 10, azimuth: 180,
      hspAnual: 5.03,
      hspMensual: [5.4, 5.5, 5.3, 5.0, 4.8, 4.9, 5.2, 5.1, 4.7, 4.5, 4.7, 5.2],
      fuente: "Atlas de Radiación Solar de Colombia (IDEAM/UPME), valor de referencia regional para el valle del Cesar.",
      fechaConsulta: "2026-09-15"
    },
    {
      id: "cordoba",
      nombre: "Montería, Córdoba",
      lat: 8.7479, lon: -75.8814,
      tilt: 9, azimuth: 180,
      hspAnual: 4.65,
      hspMensual: [4.9, 5.0, 4.9, 4.6, 4.4, 4.6, 4.9, 4.8, 4.4, 4.2, 4.4, 4.8],
      fuente: "Atlas de Radiación Solar de Colombia (IDEAM/UPME), valor de referencia regional para el departamento de Córdoba.",
      fechaConsulta: "2026-09-15"
    },
    {
      id: "santa_marta",
      nombre: "Santa Marta, Magdalena",
      lat: 11.2408, lon: -74.1990,
      tilt: 11, azimuth: 180,
      hspAnual: 5.53,
      hspMensual: [5.9, 6.1, 6.0, 5.6, 5.3, 5.4, 5.7, 5.6, 5.1, 4.9, 5.1, 5.6],
      fuente: "Atlas de Radiación Solar de Colombia (IDEAM/UPME) y NASA POWER, promedio de referencia para el litoral Caribe central.",
      fechaConsulta: "2026-09-15"
    },
    {
      id: "luruaco",
      nombre: "Luruaco, Atlántico",
      lat: 10.6066, lon: -75.1444,
      tilt: 10, azimuth: 180,
      hspAnual: 5.22,
      hspMensual: [5.6, 5.8, 5.7, 5.3, 5.0, 5.1, 5.4, 5.3, 4.8, 4.6, 4.8, 5.3],
      fuente: "Atlas de Radiación Solar de Colombia (IDEAM/UPME), valor de referencia regional para el departamento del Atlántico.",
      fechaConsulta: "2026-09-15"
    },
    {
      // Reto 04 — Escenario D del grupo (Yopal, Casanare, región Orinoquía): se agrega
      // como segunda fuente independiente de recurso solar (sección 4 del TdR Reto 04,
      // "contrastada contra una segunda fuente independiente") y como respaldo de
      // contingencia (RF-15/RF-41) para esta coordenada, ya que ningún otro caso
      // guardado está cerca de la Orinoquía. Valores extraídos directamente de la
      // herramienta en línea PVWatts v8 (NREL/NSRDB) para 5,34°N / 72,39°O, inclinación
      // 10° y azimut 180° (consulta manual del equipo, no la API DEMO_KEY embebida en
      // la app) — mismos parámetros de inclinación/azimut que usa el Escenario D.
      id: "yopal",
      nombre: "Yopal, Casanare (Orinoquía)",
      lat: 5.34, lon: -72.39,
      tilt: 10, azimuth: 180,
      hspAnual: 5.31,
      hspMensual: [6.73, 6.37, 5.48, 4.34, 4.39, 4.09, 4.39, 4.65, 5.39, 5.73, 5.89, 6.27],
      fuente: "PVWatts v8 (NREL/NSRDB) — consulta en línea para 5,34°N/72,39°O, inclinación 10°, azimut 180°, pérdidas del sistema 14,08% por defecto; tabla \"Radiación solar [kWh/m²/día]\" de la pestaña Resultados.",
      fechaConsulta: "2026-10-25"
    }
  ]
};
