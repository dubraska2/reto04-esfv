# ESFV — Dimensionamiento Fotovoltaico (Retos 01 a 04)

Aplicación web de una sola interfaz continua para caracterizar el consumo eléctrico de una instalación (**Reto 01**), dimensionar el generador fotovoltaico correspondiente (**Reto 02**), dimensionar el regulador/inversor MPPT y, cuando aplica, el banco de baterías (**Reto 03**), y cerrar el ciclo con despliegue, pruebas y documentación para evaluación (**Reto 04**): cuadro de cargas, perfil horario de 24 h, demanda máxima (con detección de horas empatadas), energía diaria/mensual/anual, recurso solar (API o base de datos local, con una segunda fuente independiente), potencia pico, catálogo comercial de paneles, configuración en cadenas, verificación de tensiones/corrientes del arreglo, catálogo de reguladores/inversores/baterías, dimensionamiento del banco, balance de cierre, exportación de resultados (CSV/JSON) e informe técnico de una página.

## Versión

La versión activa y su fecha se muestran siempre en la cabecera de la aplicación en ejecución y en el informe de una página (RF-48). El historial completo de cambios está en [`CHANGELOG.md`](CHANGELOG.md).

- **v1.0.0** (2026-10-26) — primera versión etiquetada, lista para evaluación del Reto 04: incorpora el Escenario D del grupo, exportación de resultados, detección de demanda máxima empatada, versión/fecha visibles y esta documentación ampliada.

## Archivos del proyecto

Deben estar **todos en la misma carpeta** (el HTML carga los `.js` como `<script src="...">` externos; si falta alguno, la aplicación no arrancará):

| Archivo | Contenido |
|---|---|
| `ESFV_Reto04.html` | Aplicación completa (interfaz, estilos y lógica). Es el único archivo que se abre en el navegador. |
| `config.js` | Parámetros de conexión a PVWatts. Solo lleva la clave pública `DEMO_KEY` (ver "Sin credenciales expuestas"). |
| `api/pvwatts.js` | Función serverless de Vercel: consulta PVWatts con la clave guardada en la variable de entorno `NREL_API_KEY`, sin que la clave llegue al navegador. |
| `pruebas.html` | Pruebas automáticas de cálculo (RF-45): 7 casos y 227 comprobaciones, se abre desde el navegador. |
| `recurso_solar.js` | Base de datos local de respaldo (6 ubicaciones con irradiación mensual documentada, incluido el Escenario D). |
| `catalogo_paneles.js` | Catálogo comercial de paneles fotovoltaicos (fichas técnicas STC). |
| `catalogo_equipos.js` | Catálogo de reguladores MPPT, inversores con entrada MPPT y baterías (genéricos del TdR del Reto 03 + referencias comerciales reales). |
| `CHANGELOG.md` | Historial de versiones (RF-48). No es necesario para que la aplicación funcione. |
| `README.md` | Este documento. No es necesario para que la aplicación funcione. |
| `MANUAL_USUARIO.md` | Manual de usuario rápido (1–2 páginas, RF-47). No es necesario para que la aplicación funcione. |

## Dependencias

- **Ninguna instalación**: no requiere Node, npm, build ni conexión a internet para funcionar en su modo básico.
- **Chart.js 4.4.4** va embebido dentro del propio HTML (no se descarga de ningún CDN), para que las gráficas del Reto 01 funcionen incluso sin internet o en redes restringidas.
- **Fuentes**: usa fuentes del sistema; si hay internet intenta cargar Google Fonts (Space Grotesk / Inter / JetBrains Mono) pero tiene alternativas de respaldo (`sans-serif`, `monospace`) si no hay conexión.
- Navegador moderno con soporte de ES2017+ (`fetch`, `async/await`, `URLSearchParams`). Probado en Chrome/Edge recientes.

## Cómo ejecutarlo

### Opción A — Abrir directamente (la más simple)
Doble clic sobre `ESFV_Reto04.html`. Funciona completa; la consulta en línea a PVWatts usa la clave pública `DEMO_KEY` y, si falla, la base de datos local.

### Opción B — Servidor local (recomendada si se quiere usar la API en línea)
Los navegadores bloquean por CORS las peticiones `fetch` hechas desde un archivo abierto con `file://`. Para que la consulta en línea del recurso solar tenga la mejor oportunidad de funcionar, sirve la carpeta con un servidor local y ábrela por `http://localhost`:

```bash
# Python 3 (ya viene instalado en la mayoría de sistemas)
cd carpeta-del-proyecto
python -m http.server 8080
# luego abre http://localhost:8080/ESFV_Reto04.html
```

También funciona con la extensión "Live Server" de VS Code o cualquier servidor estático equivalente.

## Recurso solar: API en línea vs. base de datos local

El módulo "Recurso solar" del Reto 02 (pestaña **Generador FV**) intenta primero consultar una **API pública en línea** y, si falla por cualquier motivo (sin internet, CORS, error HTTP, tiempo de espera agotado), **cae automáticamente** a la base de datos local — sin interrumpir al usuario, mostrando un aviso en pantalla y dejándolo declarado también en el informe.

### Casos guardados frente a coordenadas manuales
- Con un **caso guardado** seleccionado (por ejemplo Yopal), "Consultar recurso solar" usa los datos de `recurso_solar.js` tal como están, sin consultar la API.
- Con **"— Coordenadas manuales —"**, consulta **PVWatts v8** en `developer.nlr.gov` (NREL cambió de dominio; `developer.nrel.gov` ya no existe). Además muestra el municipio, departamento y país del punto consultado, obtenidos de OpenStreetMap (Nominatim).
- La espera máxima es de 30 s. Si la API falla, la app usa el caso guardado más cercano y lo avisa.

### Clave de la API
- **En Vercel:** la clave personal va en *Settings → Environment Variables* con el nombre `NREL_API_KEY` (después, *Redeploy*). La usa `api/pvwatts.js`, así que no aparece en el código del navegador ni en el repositorio (RF-42).
- **Sin Vercel** (archivo abierto con doble clic o servidor local): la app consulta PVWatts directamente con `DEMO_KEY`, la clave pública de NREL. Tiene un límite bajo de consultas y puede responder con error 429; en ese caso usa la base local.
- La clave personal **nunca** se escribe en `config.js` ni en ningún archivo del proyecto.

### Qué hace falta para que el respaldo local funcione
**Nada adicional** — ya funciona de fábrica. `recurso_solar.js` trae 6 ubicaciones documentadas (las 5 de abajo más Yopal, del Escenario D) (nombre, coordenadas, inclinación, azimut, los 12 valores mensuales de irradiación y la fuente de cada dato):

- Uribia, La Guajira (calibrado para reproducir el caso de prueba estandarizado del Reto 02)
- Valledupar, Cesar
- Montería, Córdoba
- Santa Marta, Magdalena
- Luruaco, Atlántico

Si la coordenada declarada no coincide con ninguna, la aplicación usa automáticamente el caso guardado más cercano. Para agregar más ubicaciones, se edita `recurso_solar.js` siguiendo el mismo formato (no requiere tocar el HTML).

## Catálogo de paneles

`catalogo_paneles.js` trae 8 referencias comerciales (Canadian Solar, LONGi Solar, Jinko Solar, JA Solar, QCELLS, Trina Solar, Risen Energy, Astronergy/Chint Solar) — todas marcas con distribución comercial activa en el mercado colombiano de energía solar — más un módulo de referencia no comercial usado solo para verificar el caso de prueba estandarizado. Para ampliar el catálogo, se agregan más entradas a ese archivo con los mismos campos (potencia, Voc, Isc, Vmp, Imp, coeficientes de temperatura, dimensiones, eficiencia, fuente).

## Reto 03 — Regulador/Inversor MPPT y banco de baterías

La pestaña **Regulador/Baterías** hereda sin reingreso los datos del Reto 01 y del Reto 02 (energía diaria, demanda máxima, tipo de aplicación, módulo y configuración en cadenas elegidos) y añade:

- **Selector de rama** (con o sin almacenamiento), con valor inicial según el tipo de aplicación del Reto 01 (on-grid → sin almacenamiento; off-grid e híbridos → con almacenamiento) y recálculo inmediato al cambiarla.
- **Verificación del arreglo** (Voc en frío, Vmp en caliente y en frío contra la ventana MPPT o el arranque V_banco+5V, según corresponda), con el **Ns máximo de cada equipo** en la tabla, y de corrientes (salida al banco con la tensión nominal del sistema, Isc e Imp por entrada, corriente de diseño de conductores 1,25 × 1,25 × Isc, el mismo criterio del Reto 02).
- **Catálogo editable** de reguladores MPPT y de inversores (`catalogo_equipos.js`), con veredicto cumple/alerta/no cumple por equipo, el dato que falla, la verificación de la tensión de banco que admite cada regulador y una **reconfiguración concreta Ns × Np** que se aplica con un clic.
- **Relación DC/AC** configurable (rango visible, 1,0–1,3 por defecto) con alerta de recorte esperado o de inversor sobredimensionado (rama sin almacenamiento).
- **Banco de baterías**: capacidad en Ah y kWh a partir de la autonomía, el DoD de diseño, el factor de temperatura y la **tensión nominal del sistema** (con ella se calculan la corriente del regulador y la tasa C); el Cn [Ah] y la energía instalada usan la **tensión real del banco** (Ns × V<sub>unidad</sub>, por ejemplo 51,2 V con LFP). Configuración serie-paralelo en unidades enteras, DoD al final de la autonomía y DoD diario. Con entradas fuera de rango, la app oculta los resultados y dice qué corregir.
- **Balance de cierre**: recalcula la potencia pico requerida con las eficiencias del inversor y de la batería, la compara con la instalada (promedio anual y mes crítico) e informa el margen o déficit, con la base del porcentaje declarada. **Aceptar el ajuste** amplía el generador con cadenas completas y recalcula todo el componente, revisando todo el catálogo; se puede deshacer.
- **Tasa C de carga/descarga** frente a la ficha de cada batería, **tiempo de recuperación** del banco tras agotar la autonomía y **comparación de tecnologías**, dimensionando cada una con su propio DoD: kWh por año de servicio (menor es mejor) y kWh entregados por kWh instalado (mayor es mejor).
- El **informe de una página** se amplía con la rama activa, el equipo elegido, el banco y el balance de cierre; **Guardar/Cargar** persiste también la configuración completa del Reto 02 y del Reto 03 (no solo el Reto 01).

### Catálogo de equipos

`catalogo_equipos.js` trae tres catálogos editables, ampliados con referencias comerciales reales con distribución activa en Colombia, cada una con características eléctricas distintas (tensión máxima, corriente, ventana MPPT) para garantizar que siempre exista al menos una configuración comercial válida, con o sin almacenamiento:

- **Reguladores MPPT** (10 equipos): los tres genéricos del TdR (CTRL-A/B/C, no comerciales) más siete referencias comerciales — Victron SmartSolar 150/100-Tr y 250/100-Tr, EPEVER Tracer AN 100 V/30 A, Morningstar TriStar MPPT 60, Phocos MPPT 100/40, Outback FlexMax 80 y Steca Tarom MPPT 6000-M. Cada uno declara las tensiones de banco que admite según su ficha.
- **Inversores con entrada MPPT** (9 equipos): los tres genéricos del TdR (INV-A/B/C, no comerciales) más seis referencias comerciales — SMA Sunny Boy 2.0, Fronius Primo 3.0-1, Growatt MIN 2500TL-X, Huawei SUN2000-3KTL-L1, Solis S6-GR1P3K y GoodWe GW3000-NS.
- **Baterías** (8 equipos): las dos genéricas del TdR (AGM y LFP) más tres comerciales por tecnología — AGM: Victron 12 V/220 Ah, Trojan SAGM 12 205, Ritar RA12-200; LFP: Pylontech US5000, Dyness A48100, BYD Battery-Box Premium LVS 4.0.

Los valores se contrastaron con las fichas técnicas el 2026-10-26; cuando una ficha no publica un dato, la fuente de cada equipo lo dice y se adopta un valor conservador explícito.

Para ampliar cualquiera de los tres catálogos basta con agregar más entradas al archivo con los mismos campos (documentados en la cabecera del propio archivo); no requiere tocar el HTML.

## Persistencia de proyectos

Los botones **Guardar** / **Cargar** del encabezado exportan e importan el proyecto completo (cargas y horarios del Reto 01, configuración del generador del Reto 02, y rama/equipo/banco del Reto 03) como un archivo `.json` independiente — no depende de ningún servidor ni base de datos externa. Un archivo guardado con una versión anterior (solo Reto 01) sigue cargando correctamente: los campos del Reto 02 y del Reto 03 se completan con sus valores por defecto.

### Exportación de resultados (distinta de Guardar/Cargar)

Guardar/Cargar exporta las **entradas** del proyecto, para poder reabrirlo en la misma aplicación. La pestaña **Informe** añade dos botones adicionales que exportan los **resultados ya calculados** (KPIs del Reto 01, generador del Reto 02, regulador/inversor y banco del Reto 03) a un archivo independiente, legible por cualquier hoja de cálculo o herramienta externa, sin tener que volver a abrir la aplicación:

- **⇩ Resultados (JSON)** — estructura anidada completa.
- **⇩ Resultados (CSV)** — la misma información aplanada en filas `Indicador;Valor`, lista para abrir en Excel/Sheets/LibreOffice. Usa el mismo formato que la pantalla (RF-44): coma decimal, sin separador de miles y hasta 4 decimales, con codificación UTF-8 para que las tildes se vean bien. El JSON usa punto decimal, como exige ese formato.

## Reto 04 — Escenario D del grupo, despliegue, pruebas y documentación

El Reto 04 no agrega cálculos nuevos: cierra el ciclo de evaluación sobre la misma aplicación de los Retos 01–03.

### Escenario D — Finca lechera, Yopal (Casanare)

Botón **"⚡ Cargar Escenario D"**, en la parte superior de la pestaña **Proyecto**: precarga en un solo clic, sin que el usuario tenga que volver a digitar nada (RF-39):

- Ubicación: Yopal, Casanare (Orinoquía) — 5,34° N, 72,39° O.
- Tipo de aplicación: off-grid, con almacenamiento (banco de 48 V).
- Área disponible: 35 m². Costo unitario: 1.200 $/kWh. 365 días/año de operación. Ventana solar 06:00–18:00.
- Las 7 cargas de la finca (tanque enfriador de leche, bomba de pozo y abrevaderos, aire acondicionado, iluminación LED, computador de báscula, ventiladores y nevera de insumos) con sus horarios exactos del TdR.

- **Temperaturas de diseño** (el TdR no las fija): mínima 16 °C y de operación 31 °C. Salen del reanálisis ERA5 (Open-Meteo, 2015–2024, celda a 338 m s. n. m.): la más baja de las mínimas diarias fue 16,6 °C y el promedio de las máximas diarias 30,6 °C. Con 16 °C el factor de temperatura del banco es 0,98.

El recurso solar de Yopal también está documentado como caso guardado local (`recurso_solar.js`, id `"yopal"`, valores de PVWatts v8): sirve de respaldo si la API no responde (RF-15/41).

#### Segunda fuente de recurso solar (TdR Reto 04, §4)
Cada vez que se consulta el recurso solar, la plataforma contrasta la potencia pico con una **segunda fuente independiente de PVWatts/NSRDB**: el reanálisis **ERA5 (ECMWF)**, servido por Open-Meteo (gratuito, sin clave). Así funciona:
1. Promedia por mes 10 años (2015–2024) de irradiación global horizontal diaria.
2. La traslada al plano del generador con el método de Duffie y Beckman: fracción difusa mensual de Erbs a partir del índice de claridad y modelo isotrópico de Liu-Jordan, con albedo 0,2.
3. Muestra la potencia pico con cada fuente y su diferencia, y marca si queda dentro de ±15 %.

Para Yopal (10°/180°) da 3,69 kWp con PVWatts frente a 3,67 kWp con ERA5: **−0,4 %**. NASA POWER se descartó como segunda fuente: su celda de 1° en Yopal tiene 1 513 m de altura media porque incluye la cordillera, y no representa la llanura (da ~15 % menos irradiación). El contraste también queda en el informe y en la exportación.

#### Inversor de las cargas en CA y arranque de la bomba (TdR Reto 04, §4)
En la rama con almacenamiento, un inversor aislado toma la energía del banco y alimenta las cargas en CA. La pestaña **Regulador/Baterías** lo dimensiona así:
- **Potencia continua requerida** = demanda máxima del Reto 01 (2 050 W a las 05:00).
- **Pico de arranque requerido** = máximo en las 24 h de P(h) + (k − 1) × potencia del motor más grande que funciona en esa hora. Se supone que los motores no arrancan a la vez.
  - k es el factor de arranque, editable: 3 por defecto. Los motores de inducción arrancan con 3 a 7 veces la corriente nominal; con arrancador suave o variador, 1,5 a 2.
  - Para el Escenario D: 2 050 + 2 × 1 100 = **4 250 W a las 05:00**, cuando arranca la bomba de pozo con el tanque enfriador ya funcionando.
- **Cargas con arranque:** se marcan solas las que mencionan bomba, motor, compresor, enfriador, nevera, congelador o refrigeración. El aire acondicionado inverter arranca de forma suave y no se marca. El usuario puede cambiar cualquier marca.
- **Veredicto:** cada inversor del catálogo `CATALOGO_INVERSORES_AISLADOS` recibe un veredicto con su margen continuo y de arranque. Para el Escenario D se elige el **Victron MultiPlus-II 48/3000** (2 400 W continuos, 5 500 W pico): +17 % y +29 % de margen.
- El resultado y el criterio quedan en el informe y en la exportación.

### Despliegue público (RF-37)

Esta carpeta es un paquete estático lista para publicarse en cualquier hosting de archivos estáticos, sin build ni backend — por ejemplo:

- **GitHub Pages**: subir todos los archivos de "Archivos del proyecto" a un repositorio y activar Pages sobre esa rama/carpeta; renombrar `ESFV_Reto04.html` a `index.html` (o configurar esa página como raíz) para que la URL quede limpia. En GitHub Pages no corre `api/pvwatts.js`: la app usa `DEMO_KEY`.
- **Netlify / Vercel (modo estático)**: arrastrar la carpeta o conectar el repositorio; no se requiere ningún comando de build.
- Cualquier otro hosting de archivos estáticos (no se requiere Node, Python ni ningún servidor de aplicaciones en producción).

No se requiere instalación, registro ni credenciales para usar la aplicación ya desplegada — se abre y se usa directamente en el navegador.

### Sin credenciales expuestas (RF-42)

El único valor parecido a una credencial en el código es `config.js` → `window.CONFIG.API_KEY = "DEMO_KEY"`, la clave pública de demostración de NREL (no vinculada a ninguna cuenta). La clave personal, si se usa, vive solo en la variable de entorno `NREL_API_KEY` de Vercel y la consume `api/pvwatts.js` del lado del servidor: no está en el código del navegador, ni en el repositorio, ni en el informe.

### Arquitectura

Aplicación de una sola página (sin base de datos; el único componente de servidor es la función opcional `api/pvwatts.js`), separada en capas dentro del `<script>` de `ESFV_Reto04.html`:

1. **Datos / Estado** — `state` (proyecto y cargas, Reto 01), `genState` (generador, Reto 02), `bancState` (regulador/inversor y banco, Reto 03); cada uno con su función `new*State()` de valores por defecto.
2. **Cálculos (puro)** — funciones sin efectos secundarios que solo toman datos y devuelven resultados (`hourlyProfile`, `maxDemand`, `computePpicoW`, `computeBancoBaterias`, `computeBalanceCierre`, etc.), de forma que todo resultado es reconstruible desde las entradas visibles y estas reglas (RF-36/RF-48).
3. **Validación** — `validateLoad`, `validateProject`, `validarEntradasBanco` (RF-46): rechazan o advierten sobre entradas fuera de rango con mensajes concretos.
4. **Interfaz** — funciones `render*Tab()` que generan HTML a partir del estado actual; `attachRootEvents()` conecta los manejadores de eventos tras cada render.
5. **Persistencia e informe** — `serializeProject`/`loadProjectFromFile` (guardar/cargar el proyecto completo), `buildResultsExportObject`/`exportResultsJSON`/`exportResultsCSV` (RF-40), `buildReportHtml` (informe de una página, RF-36).

Los catálogos (`catalogo_paneles.js`, `catalogo_equipos.js`) y la base de datos solar local (`recurso_solar.js`) viven en archivos de datos aparte, cargados como `<script src>` externos, para poder ampliarlos sin tocar la lógica de la aplicación.

### Pruebas (RF-45)

Hay dos formas de verificar la aplicación, sin depender de ninguna infraestructura externa:

**Opción A — Pruebas automáticas en el navegador (`pruebas.html`), sin instalar nada:**

Abre `pruebas.html` desde el servidor (en Vercel: `https://<tu-proyecto>.vercel.app/pruebas.html`; en local: `http://localhost:8080/pruebas.html`, no con doble clic). La página carga la plataforma sin mostrarla, le pasa los datos de cada caso y compara **227 resultados** con su respuesta conocida, con ✓ o ✗ por fila y un resumen arriba:

| Caso | Fuente de las respuestas |
|---|---|
| 1. Reto 01 — solo diurno (4 cargas diurnas del taller del Reto 01) | Cálculo manual |
| 2. Reto 01 — solo nocturno con cruce de medianoche (demanda máxima repetida en 6 horas, RF-46) | Cálculo manual |
| 3. Reto 01 — mixto con cruce de medianoche (caso del taller del Reto 01) | Valores de referencia del taller |
| 4. Reto 02 — caso estandarizado | Tabla de referencia del TdR del Reto 02, §7.3 |
| 5. Reto 03 — caso estandarizado, ambas ramas | Cálculo manual con las fórmulas del TdR del Reto 03, §4 |
| 6. Sesión 10 — ejemplo 1 (24 V, AGM y LFP de 25,6 V) | Respuestas publicadas por el docente |
| 7. Reto 04 — Escenario D (Yopal), incluido el inversor y el arranque de la bomba | Cálculo manual a partir de las 7 cargas del TdR |

La tolerancia es del 1 %, o igual al redondeo cuando la respuesta publicada viene redondeada.

**Opción B — Checklist manual ejecutable (sin instalar nada), para el evaluador:**

1. Abre la aplicación y pulsa **"↺ Restaurar demo"** (pestaña Cargas y Horarios) — verifica que el perfil horario y los KPIs de la pestaña Resultados no queden en cero.
2. Pestaña **Generador FV** → botón **"Cargar caso de prueba estandarizado"**: confirma que el generador queda en 4 módulos (4s×1p, 2,20 kWp) sin tocar nada manualmente.
3. Pestaña **Regulador/Baterías** → botón **"Cargar caso de prueba"**: confirma Voc en frío = 200,673 V, regulador Victron SmartSolar 250/100 en veredicto "cumple", banco en 48 V.
4. Pestaña **Proyecto** → botón **"⚡ Cargar Escenario D"**: confirma 7 cargas, potencia instalada 3.350 W, energía diaria 13,7 kWh/día, demanda máxima 2.050 W a las 05:00, ubicación Yopal (5,34°N/72,39°O), banco de 48 V con autonomía de 2 días.
5. Pestaña **Informe**: confirma que el botón **"Resultados (JSON)"** y **"Resultados (CSV)"** descargan un archivo no vacío con los datos del paso anterior.
6. Cambia el tipo de aplicación a **on-grid** en la pestaña Proyecto y confirma que la rama "sin almacenamiento" se habilita y "con almacenamiento" se deshabilita (y viceversa para off-grid).

### Limitaciones conocidas

- Sin la variable `NREL_API_KEY` configurada en Vercel, la consulta en línea a PVWatts usa la clave pública `DEMO_KEY`, compartida por todo internet: puede fallar por límite de peticiones (HTTP 429); en ese caso la aplicación cae automáticamente a la base de datos local y lo declara en pantalla y en el informe (RF-15/41).
- La segunda fuente de recurso solar (ERA5 vía Open-Meteo) necesita internet. Sin conexión, la plataforma sigue con la fuente principal y avisa que no pudo hacer el contraste. El traslado al plano inclinado supone un generador orientado al ecuador; con otro azimut el valor es una aproximación.
- Para la mayoría de los casos guardados de `recurso_solar.js`, los valores son aproximaciones de referencia académica (IDEAM/UPME, NASA POWER); el caso **"Yopal"** salió de una consulta a PVWatts v8 para 5,34°N/72,39°O, 10°/180°.
- El arranque de motores se modela con un factor k sobre la potencia nominal (no con la corriente transitoria real) y con potencias en W, suponiendo factor de potencia cercano a 1. Para motores con factor de potencia bajo conviene comparar en VA.
- No incluye conductores, protecciones, puesta a tierra ni análisis económico (explícitamente fuera de alcance en los TdR de los Retos 02 y 03).
- La exportación de resultados (CSV/JSON) refleja el estado calculado en el momento de pulsar el botón; si se cambia el generador o el banco después de exportar, hay que exportar de nuevo.
