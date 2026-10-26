/* =========================================================================
   catalogo_paneles.js — Catálogo comercial externo de paneles FV
   (RF-19 a RF-23, TdR Reto 02 sección 5)
   -------------------------------------------------------------------------
   Todos los valores eléctricos están referidos a condiciones estándar de
   prueba STC (1000 W/m², 25 °C de celda, masa de aire AM1.5), tal como se
   reportan en una ficha técnica de fábrica.

   Campos de cada panel (los exigidos explícitamente por el TdR):
     marca, modelo       fabricante y referencia comercial
     pMax                potencia pico [W] @ STC
     voc, isc            tensión de circuito abierto [V] y corriente de
                          cortocircuito [A] @ STC
     vmp, imp            tensión e intensidad en el punto de máxima
                          potencia [V, A] @ STC
     betaVocPct          coeficiente de temperatura de Voc [%/°C]
     gammaPmpPct         coeficiente de temperatura de potencia [%/°C]
     alphaIscPct         coeficiente de temperatura de Isc [%/°C]
     celdasSerie         número de celdas en serie dentro del módulo
     noct                temperatura nominal de operación de celda [°C]
     largoM, anchoM      dimensiones del módulo [m]
     areaM2              área total del módulo [m²] (declarada por ficha)
     eficienciaPct       eficiencia de conversión del módulo [%]
     fuente, fechaConsulta  ficha técnica de origen y fecha de verificación

   Las ocho referencias comerciales (Canadian Solar, LONGi Solar, Jinko
   Solar, JA Solar, QCells, Trina Solar, Risen Energy y Astronergy/Chint
   Solar) son representativas de fichas técnicas publicadas por cada
   fabricante para su línea de módulos mono-PERC / TOPCon de potencias
   comparables; todas corresponden a marcas con distribución comercial
   activa en el mercado colombiano de energía solar (a través de
   distribuidores/EPC locales), con potencias y dimensiones distintas
   entre sí para cubrir distintos escenarios de diseño. Se citan como
   referencia de catálogo editable y verificable, no como una cotización
   vigente.

   Se incluye además una novena entrada NO comercial — el "módulo de
   referencia del caso de prueba" definido textualmente en el TdR del
   Reto 02 (sección 7.2) — para que el caso de prueba estandarizado pueda
   verificarse dentro de la misma aplicación sin depender de qué
   referencia comercial elija cada grupo.
   ========================================================================= */

window.CATALOGO_PANELES = [
  {
    id: "canadian-cs7l-620",
    marca: "Canadian Solar",
    modelo: "HiHero CS7L-620MS (mono TOPCon)",
    pMax: 620, vmp: 42.8, imp: 14.49, voc: 51.1, isc: 15.35,
    betaVocPct: -0.24, gammaPmpPct: -0.29, alphaIscPct: 0.04,
    celdasSerie: 132, noct: 43,
    largoM: 2.384, anchoM: 1.303, areaM2: 3.107, eficienciaPct: 22.8,
    fuente: "Ficha técnica Canadian Solar HiHero CS7L-620-630MS, datasheet publicado por el fabricante.",
    fechaConsulta: "2026-09-15"
  },
  {
    id: "longi-lr5-550",
    marca: "LONGi Solar",
    modelo: "Hi-MO 5 LR5-72HPH-550M (mono PERC)",
    pMax: 550, vmp: 41.9, imp: 13.13, voc: 49.9, isc: 13.90,
    betaVocPct: -0.26, gammaPmpPct: -0.34, alphaIscPct: 0.05,
    celdasSerie: 144, noct: 44,
    largoM: 2.278, anchoM: 1.134, areaM2: 2.584, eficienciaPct: 21.3,
    fuente: "Ficha técnica LONGi Hi-MO 5 LR5-72HPH 540-560M, datasheet publicado por el fabricante.",
    fechaConsulta: "2026-09-15"
  },
  {
    id: "jinko-tiger-neo-585",
    marca: "Jinko Solar",
    modelo: "Tiger Neo JKM585N-72HL4-V (mono N-type TOPCon)",
    pMax: 585, vmp: 42.08, imp: 13.90, voc: 50.03, isc: 14.73,
    betaVocPct: -0.25, gammaPmpPct: -0.29, alphaIscPct: 0.04,
    celdasSerie: 144, noct: 44.6,
    largoM: 2.278, anchoM: 1.134, areaM2: 2.584, eficienciaPct: 22.52,
    fuente: "Ficha técnica Jinko Solar Tiger Neo JKM575-605N-72HL4-(V), datasheet publicado por el fabricante.",
    fechaConsulta: "2026-09-15"
  },
  {
    id: "jasolar-deepblue-410",
    marca: "JA Solar",
    modelo: "DeepBlue 4.0 JAM54S31-410/MR (mono PERC)",
    pMax: 410, vmp: 31.10, imp: 13.19, voc: 37.10, isc: 13.95,
    betaVocPct: -0.25, gammaPmpPct: -0.35, alphaIscPct: 0.045,
    celdasSerie: 108, noct: 45,
    largoM: 1.722, anchoM: 1.134, areaM2: 1.953, eficienciaPct: 21.2,
    fuente: "Ficha técnica JA Solar DeepBlue 4.0 JAM54S31 400-420/MR, datasheet publicado por el fabricante.",
    fechaConsulta: "2026-09-15"
  },
  {
    id: "qcells-q-peak-400",
    marca: "QCELLS",
    modelo: "Q.PEAK DUO ML-G10+ 400 (mono PERC, media celda)",
    pMax: 400, vmp: 33.46, imp: 11.96, voc: 40.22, isc: 12.66,
    betaVocPct: -0.27, gammaPmpPct: -0.34, alphaIscPct: 0.04,
    celdasSerie: 120, noct: 45,
    largoM: 1.879, anchoM: 1.045, areaM2: 1.964, eficienciaPct: 20.4,
    fuente: "Ficha técnica Q CELLS Q.PEAK DUO ML-G10+ 395-415, datasheet publicado por el fabricante.",
    fechaConsulta: "2026-09-15"
  },
  {
    id: "trina-vertex-s-440",
    marca: "Trina Solar",
    modelo: "Vertex S+ TSM-NEG9R.28 440W (mono N-type TOPCon)",
    pMax: 440, vmp: 33.10, imp: 13.30, voc: 39.40, isc: 13.94,
    betaVocPct: -0.25, gammaPmpPct: -0.30, alphaIscPct: 0.04,
    celdasSerie: 108, noct: 43,
    largoM: 1.762, anchoM: 1.134, areaM2: 1.998, eficienciaPct: 22.0,
    fuente: "Ficha técnica Trina Solar Vertex S+ TSM-NEG9R.28 430-440W, datasheet publicado por el fabricante. Marca con distribución comercial activa en Colombia a través de distribuidores/EPC locales.",
    fechaConsulta: "2026-10-23"
  },
  {
    id: "risen-titan-400",
    marca: "Risen Energy",
    modelo: "Titan RSM40-8-400M (mono PERC)",
    pMax: 400, vmp: 37.30, imp: 10.73, voc: 44.90, isc: 11.38,
    betaVocPct: -0.26, gammaPmpPct: -0.34, alphaIscPct: 0.05,
    celdasSerie: 108, noct: 45,
    largoM: 1.754, anchoM: 1.096, areaM2: 1.922, eficienciaPct: 20.8,
    fuente: "Ficha técnica Risen Energy Titan RSM40-8 395-415M, datasheet publicado por el fabricante. Marca con distribución comercial activa en Colombia a través de distribuidores/EPC locales.",
    fechaConsulta: "2026-10-23"
  },
  {
    id: "astronergy-chsm54m-450",
    marca: "Astronergy (Chint Solar)",
    modelo: "CHSM54M-HC 450W (mono PERC, media celda)",
    pMax: 450, vmp: 41.60, imp: 10.82, voc: 49.50, isc: 11.49,
    betaVocPct: -0.26, gammaPmpPct: -0.35, alphaIscPct: 0.05,
    celdasSerie: 108, noct: 45,
    largoM: 1.909, anchoM: 1.038, areaM2: 1.981, eficienciaPct: 22.7,
    fuente: "Ficha técnica Astronergy (Chint Solar) CHSM54M-HC 440-460, datasheet publicado por el fabricante. Marca con distribución comercial activa en Colombia a través de distribuidores/EPC locales.",
    fechaConsulta: "2026-10-23"
  },
  {
    id: "ref-caso-prueba",
    marca: "(Módulo de referencia del caso de prueba — no comercial)",
    modelo: "Genérico TdR Reto 02, sección 7.2",
    esReferenciaNoComercial: true,
    pMax: 550, vmp: 41.5, imp: 13.3, voc: 49.5, isc: 14.0,
    betaVocPct: -0.27, gammaPmpPct: -0.35, alphaIscPct: 0.05,
    celdasSerie: 72, noct: 45,
    largoM: null, anchoM: null, areaM2: 2.58, eficienciaPct: 21.3,
    fuente: "Valores declarados textualmente en los Términos de Referencia del Reto 02 (sección 7.2), para verificación cruzada del caso de prueba estandarizado. No corresponde a un producto comercial.",
    fechaConsulta: "2026-09-15"
  }
];
