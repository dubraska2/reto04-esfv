/* =========================================================================
   catalogo_equipos.js — Catálogo externo de equipos de conversión y baterías
   (RF-27, TdR Reto 03 sección 5)
   -------------------------------------------------------------------------
   Tres catálogos editables, todos externos a la lógica de la aplicación,
   siguiendo exactamente el mismo patrón que catalogo_paneles.js del Reto 02:

   1) window.CATALOGO_REGULADORES — reguladores/controladores MPPT (rama
      CON almacenamiento). Incluye los tres equipos genéricos declarados
      textualmente en el TdR del Reto 03 (CTRL-A, CTRL-B, CTRL-C, sección 6)
      — marcados con esReferenciaNoComercial:true, igual que el panel de
      referencia del Reto 02 — más siete referencias comerciales reales
      (Victron ×2 variantes de tensión, EPEVER, Morningstar, Phocos,
      Outback Power, Steca) con su ficha técnica citada, cada una con
      tensión/corriente distintas, incluyendo al menos una opción de alta
      tensión de entrada (250 V) para arreglos con más módulos en serie.

   2) window.CATALOGO_INVERSORES — inversores de conexión a red con entrada
      MPPT (rama SIN almacenamiento). Incluye los tres genéricos del TdR
      (INV-A, INV-B, INV-C) más seis referencias comerciales reales (SMA,
      Fronius, Growatt, Huawei, Solis, GoodWe).

   3) window.CATALOGO_BATERIAS — bancos de baterías por unidad (dos
      tecnologías mínimo, RF-27). Incluye las dos genéricas del TdR (AGM y
      LFP, sección 6) más seis referencias comerciales reales: tres AGM
      (Victron, Trojan, Ritar) y tres LFP (Pylontech, Dyness, BYD).

   Todas las referencias comerciales corresponden a marcas con distribución
   activa en el mercado colombiano de energía solar (ya sea a través de
   distribuidores/integradores EPC locales o de presencia directa del
   fabricante en el país, como es el caso documentado de Growatt), con
   parámetros eléctricos distintos entre sí para cubrir distintos escenarios
   de diseño (con y sin almacenamiento) y garantizar que siempre exista al
   menos una configuración válida en el catálogo.

   Campos:
     Reguladores (CATALOGO_REGULADORES):
       marca, modelo, vocMaxV (tensión máxima de entrada FV [V]),
       iSalidaBancoA (corriente nominal de salida al banco [A]),
       iscMaxA (corriente de cortocircuito FV máxima admisible [A]),
       tensionesBancoV (opcional: tensiones nominales de banco que admite el
       equipo, p. ej. [12, 24]; si falta, se asume que admite cualquiera),
       fuente, fechaConsulta
       NOTA: el TdR no publica una "ventana MPPT" propia para los
       reguladores genéricos — solo tensión máxima de entrada y corriente
       de arranque genérica (V_banco + 5 V, igual para cualquier equipo,
       ver RF-28). Para las referencias comerciales reales se declara
       además, cuando el fabricante la publica, ventanaMpptMinV (tensión
       mínima de operación del seguidor MPPT) como dato adicional informativo.

     Inversores (CATALOGO_INVERSORES):
       marca, modelo, pacW (potencia CA nominal [W]), vocMaxV (tensión
       máxima de entrada FV [V]), ventanaMpptMinV, ventanaMpptMaxV (ventana
       de tensión del seguidor MPPT [V]), impMaxA (corriente máxima en el
       punto de máxima potencia por entrada [A]), iscMaxA (corriente de
       cortocircuito FV máxima admisible por entrada [A]), fuente,
       fechaConsulta

     Baterías (CATALOGO_BATERIAS):
       marca, modelo, tecnologia ('AGM'|'LFP'), vUnidadV (tensión nominal
       de la unidad [V]), cUnidadAh (capacidad nominal de la unidad [Ah]),
       dodDisenoPct (profundidad de descarga de diseño recomendada por el
       fabricante [%]), etaIdaVueltaPct (eficiencia de ida y vuelta [%]),
       limiteCargaC (tasa C máxima de carga), limiteDescargaC (tasa C
       máxima de descarga, null si el fabricante no la publica por separado),
       vidaAnios (vida útil estimada [años] a la DoD de diseño), fuente,
       fechaConsulta
   ========================================================================= */

window.CATALOGO_REGULADORES = [
  {
    id: "ctrl-a",
    esReferenciaNoComercial: true,
    marca: "(Genérico TdR Reto 03 — no comercial)",
    modelo: "CTRL-A",
    vocMaxV: 150, iSalidaBancoA: 60, iscMaxA: 50,
    fuente: "Valores declarados textualmente en los Términos de Referencia del Reto 03 (sección 6), para verificación cruzada del caso de prueba estandarizado. No corresponde a un producto comercial.",
    fechaConsulta: "2026-09-15"
  },
  {
    id: "ctrl-b",
    esReferenciaNoComercial: true,
    marca: "(Genérico TdR Reto 03 — no comercial)",
    modelo: "CTRL-B",
    vocMaxV: 250, iSalidaBancoA: 80, iscMaxA: 50,
    fuente: "Valores declarados textualmente en los Términos de Referencia del Reto 03 (sección 6), para verificación cruzada del caso de prueba estandarizado. No corresponde a un producto comercial.",
    fechaConsulta: "2026-09-15"
  },
  {
    id: "ctrl-c",
    esReferenciaNoComercial: true,
    marca: "(Genérico TdR Reto 03 — no comercial)",
    modelo: "CTRL-C",
    vocMaxV: 250, iSalidaBancoA: 40, iscMaxA: 50,
    fuente: "Valores declarados textualmente en los Términos de Referencia del Reto 03 (sección 6), para verificación cruzada del caso de prueba estandarizado. No corresponde a un producto comercial.",
    fechaConsulta: "2026-09-15"
  },
  {
    id: "victron-smartsolar-150-100",
    marca: "Victron Energy",
    modelo: "SmartSolar MPPT 150/100-Tr",
    vocMaxV: 150, iSalidaBancoA: 100, iscMaxA: 70, ventanaMpptMinV: 12, tensionesBancoV: [12, 24, 36, 48],
    fuente: "Ficha técnica Victron Energy SmartSolar MPPT 150/85 y 150/100 (\"Max. PV short circuit current: 70 A\"), datasheet publicado por el fabricante.",
    fechaConsulta: "2026-10-26"
  },
  {
    id: "victron-smartsolar-250-100",
    marca: "Victron Energy",
    modelo: "SmartSolar MPPT 250/100-Tr",
    vocMaxV: 250, iSalidaBancoA: 100, iscMaxA: 70, ventanaMpptMinV: 12, tensionesBancoV: [12, 24, 36, 48],
    fuente: "Ficha técnica Victron Energy SmartSolar MPPT 250/100-Tr, datasheet publicado por el fabricante. Variante de mayor tensión de entrada de la misma línea, para arreglos con más módulos en serie. Marca con distribución comercial activa en Colombia a través de distribuidores/EPC locales.",
    fechaConsulta: "2026-10-23"
  },
  {
    id: "epever-tracer-100-30",
    marca: "EPEVER",
    modelo: "Tracer AN 100 V / 30 A (serie MPPT)",
    vocMaxV: 100, iSalidaBancoA: 30, iscMaxA: 30, ventanaMpptMinV: 12, tensionesBancoV: [12, 24],
    fuente: "Ficha técnica EPEVER Tracer AN Series (3210AN): Voc máx. 100 V, corriente de carga 30 A, sistema 12/24 V. La ficha no publica una Isc máxima independiente: se limita la Isc del arreglo a la corriente máxima del equipo (30 A).",
    fechaConsulta: "2026-10-26"
  },
  {
    id: "morningstar-ts-mppt-60",
    marca: "Morningstar",
    modelo: "TriStar MPPT 60",
    vocMaxV: 150, iSalidaBancoA: 60, iscMaxA: 60, ventanaMpptMinV: 12, tensionesBancoV: [12, 24, 36, 48],
    fuente: "Ficha técnica Morningstar TriStar MPPT 60: Voc máx. 150 V, corriente de carga 60 A, sistema 12/24/36/48 V. La ficha no publica una Isc máxima independiente: se limita la Isc del arreglo a la corriente máxima del equipo (60 A).",
    fechaConsulta: "2026-10-26"
  },
  {
    id: "phocos-mppt-100-40",
    marca: "Phocos",
    modelo: "MPPT 100/40",
    vocMaxV: 95, iSalidaBancoA: 40, iscMaxA: 40, ventanaMpptMinV: 12, tensionesBancoV: [12, 24],
    fuente: "Ficha técnica Phocos MPPT 100/40: corriente de carga 40 A (máx. de batería 41 A), sistema 12/24 V con reconocimiento automático, Voc máx. del panel 95 V. La ficha no publica una Isc máxima independiente: se limita la Isc del arreglo a la corriente máxima del equipo (40 A). Marca ampliamente usada en proyectos de electrificación rural/off-grid en Colombia.",
    fechaConsulta: "2026-10-26"
  },
  {
    id: "outback-flexmax-80",
    marca: "Outback Power",
    modelo: "FlexMax 80",
    vocMaxV: 150, iSalidaBancoA: 80, iscMaxA: 80, ventanaMpptMinV: 12, tensionesBancoV: [12, 24, 36, 48, 60],
    fuente: "Ficha técnica Outback Power FlexMax 80 (FM80-150VDC): Voc máx. 150 V, corriente de carga 80 A, Isc máx. 80 A, sistema 12/24/36/48/60 V. Marca con distribución comercial activa en Colombia a través de distribuidores/EPC locales.",
    fechaConsulta: "2026-10-23"
  },
  {
    id: "steca-tarom-mppt-6000",
    marca: "Steca",
    modelo: "Tarom MPPT 6000-M",
    vocMaxV: 200, iSalidaBancoA: 60, iscMaxA: 60, ventanaMpptMinV: 12, tensionesBancoV: [12, 24, 36, 48, 60],
    fuente: "Ficha técnica Steca Tarom MPPT 6000-M: Voc máx. 200 V, corriente de carga 60 A, Isc máx. 60 A, sistema 12–60 V. Marca con distribución comercial activa en Colombia a través de distribuidores/EPC locales.",
    fechaConsulta: "2026-10-23"
  }
];

window.CATALOGO_INVERSORES = [
  {
    id: "inv-a",
    esReferenciaNoComercial: true,
    marca: "(Genérico TdR Reto 03 — no comercial)",
    modelo: "INV-A",
    pacW: 1500, vocMaxV: 500, ventanaMpptMinV: 80, ventanaMpptMaxV: 450, impMaxA: 12, iscMaxA: 15,
    fuente: "Valores declarados textualmente en los Términos de Referencia del Reto 03 (sección 6), para verificación cruzada del caso de prueba estandarizado. No corresponde a un producto comercial.",
    fechaConsulta: "2026-09-15"
  },
  {
    id: "inv-b",
    esReferenciaNoComercial: true,
    marca: "(Genérico TdR Reto 03 — no comercial)",
    modelo: "INV-B",
    pacW: 2000, vocMaxV: 600, ventanaMpptMinV: 90, ventanaMpptMaxV: 550, impMaxA: 16, iscMaxA: 20,
    fuente: "Valores declarados textualmente en los Términos de Referencia del Reto 03 (sección 6), para verificación cruzada del caso de prueba estandarizado. No corresponde a un producto comercial.",
    fechaConsulta: "2026-09-15"
  },
  {
    id: "inv-c",
    esReferenciaNoComercial: true,
    marca: "(Genérico TdR Reto 03 — no comercial)",
    modelo: "INV-C",
    pacW: 3000, vocMaxV: 600, ventanaMpptMinV: 90, ventanaMpptMaxV: 550, impMaxA: 16, iscMaxA: 20,
    fuente: "Valores declarados textualmente en los Términos de Referencia del Reto 03 (sección 6), para verificación cruzada del caso de prueba estandarizado. No corresponde a un producto comercial.",
    fechaConsulta: "2026-09-15"
  },
  {
    id: "sma-sunny-boy-2.0",
    marca: "SMA",
    modelo: "Sunny Boy 2.0",
    pacW: 2000, vocMaxV: 600, ventanaMpptMinV: 210, ventanaMpptMaxV: 500, impMaxA: 10, iscMaxA: 18,
    fuente: "Manual SMA Sunny Boy SBxx-1VL-40, datos técnicos del SB2.0-1VL-40: tensión máx. de entrada 600 V, rango MPP 210–500 V, corriente máx. de entrada 10 A, corriente máx. de cortocircuito 18 A.",
    fechaConsulta: "2026-10-26"
  },
  {
    id: "fronius-primo-3.0-1",
    marca: "Fronius",
    modelo: "Primo 3.0-1",
    pacW: 3000, vocMaxV: 1000, ventanaMpptMinV: 200, ventanaMpptMaxV: 800, impMaxA: 12.0, iscMaxA: 18,
    fuente: "Ficha técnica Fronius Primo 3.0-1 a 8.2-1: rango de tensión MPP 200–800 V (3.0-1), tensión máx. de entrada 1000 V, corriente máx. de entrada 12 A por seguidor, cortocircuito del arreglo 18 A (versiones posteriores de la ficha indican 24 A; se adopta el menor).",
    fechaConsulta: "2026-10-26"
  },
  {
    id: "growatt-min-2500tl-x",
    marca: "Growatt",
    modelo: "MIN 2500TL-X",
    pacW: 2500, vocMaxV: 500, ventanaMpptMinV: 80, ventanaMpptMaxV: 500, impMaxA: 12.5, iscMaxA: 16,
    fuente: "Ficha técnica Growatt MIN 2500-6000TL-X: rango MPPT 80–500 V, corriente máx. de entrada 12,5 A por seguidor, cortocircuito 16 A (las revisiones más recientes indican 13,5 A; se adopta el menor). Growatt tiene distribución comercial activa y consolidada en Colombia (aliado estratégico Tronex, garantía extendida a 10 años para inversores on-grid en el país).",
    fechaConsulta: "2026-09-15"
  },
  {
    id: "huawei-sun2000-3ktl-l1",
    marca: "Huawei",
    modelo: "SUN2000-3KTL-L1",
    pacW: 3000, vocMaxV: 600, ventanaMpptMinV: 90, ventanaMpptMaxV: 560, impMaxA: 12.5, iscMaxA: 18,
    fuente: "Especificaciones Huawei SUN2000-3/4/5/6KTL-L1 (solar.huawei.com): tensión máx. de entrada 600 V, rango MPPT 90–560 V, corriente máx. por MPPT 12,5 A, cortocircuito 18 A. Marca con distribución comercial activa en Colombia a través de distribuidores/EPC locales.",
    fechaConsulta: "2026-10-23"
  },
  {
    id: "solis-mini-s6-3k",
    marca: "Solis",
    modelo: "Mini S6-GR1P3K",
    pacW: 3000, vocMaxV: 600, ventanaMpptMinV: 80, ventanaMpptMaxV: 500, impMaxA: 14.0, iscMaxA: 14.0,
    fuente: "Ficha técnica Solis S6-GR1P(0.6-3.6)K-M: tensión máx. de entrada 600 V, rango MPPT 80–500 V, corriente máx. de entrada 14 A. La Isc máx. no se pudo confirmar: se adopta el valor conservador Isc = Imp máx. = 14 A. Marca con distribución comercial activa en Colombia a través de distribuidores/EPC locales.",
    fechaConsulta: "2026-10-23"
  },
  {
    id: "goodwe-gw3000-ns",
    marca: "GoodWe",
    modelo: "GW3000-NS",
    pacW: 3000, vocMaxV: 500, ventanaMpptMinV: 80, ventanaMpptMaxV: 450, impMaxA: 18.0, iscMaxA: 22.5,
    fuente: "Ficha técnica GoodWe NS Series (GW3000-NS, un MPPT): tensión máx. de entrada 500 V, rango MPPT 80–450 V, corriente máx. de entrada 18 A, cortocircuito 22,5 A. Marca con distribución comercial activa en Colombia a través de distribuidores/EPC locales.",
    fechaConsulta: "2026-10-23"
  }
];

/* Inversores (o inversores-cargadores) aislados de la rama CON almacenamiento: toman la
   energía del banco y alimentan las cargas en CA. Se verifican contra la demanda máxima
   (potencia continua) y contra el pico de arranque de los motores (potencia pico).
   Campos: pContW (potencia continua a 25 °C [W]), pPicoW (potencia pico de arranque [W]),
   vBancoV (tensión nominal de batería [V]), fuente, fechaConsulta. */
window.CATALOGO_INVERSORES_AISLADOS = [
  {
    id: "victron-multiplus-ii-48-3000",
    marca: "Victron Energy",
    modelo: "MultiPlus-II 48/3000/35-32",
    pContW: 2400, pPicoW: 5500, vBancoV: 48,
    fuente: "Especificaciones técnicas Victron MultiPlus-II 230 V: 3000 VA, potencia continua 2400 W a 25 °C (2200 W a 40 °C), potencia pico 5500 W, batería de 48 V.",
    fechaConsulta: "2026-10-26"
  },
  {
    id: "victron-phoenix-48-3000",
    marca: "Victron Energy",
    modelo: "Phoenix Inverter 48/3000 230V Smart",
    pContW: 2400, pPicoW: 6000, vBancoV: 48,
    fuente: "Ficha Victron Phoenix Inverter 48/3000 230V (distribuidores): 3000 VA, potencia continua 2400 W a 25 °C (2000 W a 40 °C), potencia pico 6000 W, batería de 48 V. Solo inversor (no carga desde red).",
    fechaConsulta: "2026-10-26"
  },
  {
    id: "growatt-spf-5000-es",
    marca: "Growatt",
    modelo: "SPF 5000 ES",
    pContW: 5000, pPicoW: 10000, vBancoV: 48,
    fuente: "Ficha Growatt SPF 5000 ES (distribuidores): potencia nominal 5000 W, sobrecarga de arranque 10 000 VA durante 5 s, batería de 48 V, onda senoidal pura.",
    fechaConsulta: "2026-10-26"
  }
];

window.CATALOGO_BATERIAS = [
  {
    id: "agm-generico",
    esReferenciaNoComercial: true,
    marca: "(Genérico TdR Reto 03 — no comercial)",
    modelo: "AGM 12 V / 200 Ah",
    tecnologia: "AGM",
    vUnidadV: 12, cUnidadAh: 200, dodDisenoPct: 50, etaIdaVueltaPct: 80,
    limiteCargaC: 0.2, limiteDescargaC: null, vidaAnios: 4,
    fuente: "Valores declarados textualmente en los Términos de Referencia del Reto 03 (sección 6), para verificación cruzada del caso de prueba estandarizado. No corresponde a un producto comercial. La eficiencia (80%) es ilustrativa y supera el 75% mínimo exigido por RETIE 2026.",
    fechaConsulta: "2026-09-15"
  },
  {
    id: "lfp-generico",
    esReferenciaNoComercial: true,
    marca: "(Genérico TdR Reto 03 — no comercial)",
    modelo: "LFP 51,2 V / 100 Ah",
    tecnologia: "LFP",
    vUnidadV: 51.2, cUnidadAh: 100, dodDisenoPct: 80, etaIdaVueltaPct: 92,
    limiteCargaC: 0.5, limiteDescargaC: null, vidaAnios: 10,
    fuente: "Valores declarados textualmente en los Términos de Referencia del Reto 03 (sección 6), para verificación cruzada del caso de prueba estandarizado. No corresponde a un producto comercial.",
    fechaConsulta: "2026-09-15"
  },
  {
    id: "victron-agm-12-220",
    marca: "Victron Energy",
    modelo: "AGM Deep Cycle Battery 12 V / 220 Ah",
    tecnologia: "AGM",
    vUnidadV: 12, cUnidadAh: 220, dodDisenoPct: 50, etaIdaVueltaPct: 82,
    limiteCargaC: 0.2, limiteDescargaC: 0.2, vidaAnios: 5,
    fuente: "Ficha técnica Victron Energy AGM Deep Cycle Battery 12V/220Ah, datasheet publicado por el fabricante.",
    fechaConsulta: "2026-09-15"
  },
  {
    // Reemplaza a la Force H2, que es una batería de ALTA tensión (módulos de 96 V / 37 Ah,
    // pilas de 192–480 V) y no corresponde a un banco de 48 V.
    id: "pylontech-us5000",
    marca: "Pylontech",
    modelo: "US5000 (LFP) 48 V / 100 Ah",
    tecnologia: "LFP",
    vUnidadV: 48, cUnidadAh: 100, dodDisenoPct: 95, etaIdaVueltaPct: 95,
    limiteCargaC: 0.5, limiteDescargaC: 0.5, vidaAnios: 15,
    fuente: "Ficha técnica Pylontech US5000: 48 V nominales, 100 Ah (4,8 kWh; 4,56 kWh útiles), DoD 95 %, corriente recomendada de carga/descarga 50 A (0,5 C; máx. 100 A), vida de diseño 15+ años. La ficha no publica la eficiencia de ida y vuelta: se adopta 95 % (≥ 90 % exigido por RETIE para litio). Marca con amplia distribución comercial en Colombia entre integradores de sistemas fotovoltaicos con almacenamiento.",
    fechaConsulta: "2026-10-26"
  },
  {
    id: "trojan-sagm-12-205",
    marca: "Trojan Battery Company",
    modelo: "SAGM 12 205",
    tecnologia: "AGM",
    vUnidadV: 12, cUnidadAh: 205, dodDisenoPct: 50, etaIdaVueltaPct: 82,
    limiteCargaC: 0.2, limiteDescargaC: 0.3, vidaAnios: 6,
    fuente: "Ficha técnica Trojan Battery Company SAGM 12 205, datasheet publicado por el fabricante. Trojan tiene presencia comercial e industrial de larga data en Colombia (sector solar, agrícola e industrial).",
    fechaConsulta: "2026-10-23"
  },
  {
    id: "ritar-ra12-200",
    marca: "Ritar Power",
    modelo: "RA12-200",
    tecnologia: "AGM",
    vUnidadV: 12, cUnidadAh: 200, dodDisenoPct: 50, etaIdaVueltaPct: 80,
    limiteCargaC: 0.2, limiteDescargaC: 0.2, vidaAnios: 5,
    fuente: "Ficha técnica Ritar Power RA Series RA12-200, datasheet publicado por el fabricante. Marca con distribución comercial activa en Colombia entre proveedores de respaldo de energía y sistemas solares.",
    fechaConsulta: "2026-10-23"
  },
  {
    id: "dyness-a48100",
    marca: "Dyness",
    modelo: "A48100 (LFP) 48 V / 100 Ah",
    tecnologia: "LFP",
    vUnidadV: 48, cUnidadAh: 100, dodDisenoPct: 90, etaIdaVueltaPct: 95,
    limiteCargaC: 0.5, limiteDescargaC: 0.75, vidaAnios: 10,
    fuente: "Ficha técnica Dyness A48100: 48 V nominales (15 celdas LFP), 100 Ah (4,8 kWh), corriente recomendada de carga/descarga 50 A (0,5 C), máxima 75 A (0,75 C), ≥ 6000 ciclos. DoD: la ficha alemana indica 90 % y la francesa 95 %; se adopta el menor. La ficha no publica la eficiencia de ida y vuelta: se adopta 95 % (≥ 90 % RETIE). Marca con distribución comercial activa en Colombia a través de integradores de sistemas de almacenamiento.",
    fechaConsulta: "2026-10-23"
  },
  {
    id: "byd-battery-box-lvs",
    marca: "BYD",
    modelo: "Battery-Box Premium LVS 4.0 (módulo 51,2 V / 78 Ah)",
    tecnologia: "LFP",
    vUnidadV: 51.2, cUnidadAh: 78, dodDisenoPct: 96, etaIdaVueltaPct: 95,
    limiteCargaC: 0.5, limiteDescargaC: 0.83, vidaAnios: 10,
    fuente: "Ficha técnica BYD Battery-Box Premium LVS: módulo de 4,0 kWh a 51,2 V nominales (≈ 78 Ah), 3,84 kWh útiles (DoD 96 %), eficiencia de ida y vuelta ≥ 95 %, corriente de salida continua máx. 65 A (≈ 0,83 C). La ficha no separa un límite de carga: se adopta 0,5 C (valor conservador). Marca con distribución comercial activa en Colombia a través de integradores de sistemas de almacenamiento.",
    fechaConsulta: "2026-10-23"
  }
];
