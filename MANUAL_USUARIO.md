# ESFV — Manual de usuario rápido

*(1–2 páginas — RF-47. Para la documentación técnica completa, ver `README.md`.)*

## ¿Qué es esta aplicación?

Una sola página web que lleva el dimensionamiento de un sistema solar fotovoltaico de principio a fin: desde las cargas eléctricas de una instalación hasta el regulador/inversor y el banco de baterías, con un informe final de una página. No requiere instalar nada ni crear una cuenta.

## Flujo de trabajo (7 pestañas, en orden)

1. **Proyecto** — nombre, ID, integrantes y tipo de aplicación del sistema (off-grid, on-grid, híbrido off-grid, híbrido on-grid). El tipo elegido aquí determina más adelante qué ramas del Reto 03 están disponibles.
   - Si tu equipo tiene asignado el **Escenario D** (finca lechera, Yopal), el botón **"⚡ Cargar Escenario D"** en la parte superior de esta pestaña carga todo de una vez: ubicación, tipo de sistema y las 7 cargas con sus horarios — no hace falta digitar nada.
2. **Cargas y Horarios** — agrega cada carga eléctrica (descripción, cantidad, potencia unitaria en vatios y uno o más intervalos horarios de funcionamiento). El botón **"+ Agregar carga"** abre el formulario; **"↺ Restaurar demo"** carga un ejemplo de referencia si quieres ver cómo se ve un proyecto ya lleno.
3. **Análisis** — gráficos del perfil de potencia a lo largo del día, energía por carga, factor de utilización y distribución. Haz clic en una barra del gráfico de potencia para ver el detalle de esa hora.
4. **Resultados** — los indicadores principales: potencia instalada, demanda máxima (y la hora en que ocurre — si se repite en varias horas, la aplicación las lista todas), energía diaria/mensual/anual y costos.
5. **Generador FV** — con tus cargas ya calculadas, esta pestaña define dónde está tu proyecto (latitud/longitud), consulta el recurso solar (irradiación) y elige un panel comercial del catálogo, configurado automáticamente en la cantidad de módulos en serie/paralelo que necesitas. Debajo del recurso solar aparece el **contraste con una segunda fuente** (ERA5): si la diferencia supera ±15 %, se marca en amarillo.
6. **Regulador/Baterías** — elige la rama "con almacenamiento" (banco de baterías) o "sin almacenamiento" (inversor de conexión a la red) — la aplicación ya la preselecciona según el tipo de sistema del paso 1. Si el equipo elegido automáticamente no cumple con tu arreglo, aparece un botón para **ajustar automáticamente** (cambia de equipo o de configuración de módulos) con un mensaje que explica qué cambió. En la rama con almacenamiento también se elige el **inversor de las cargas en CA**: marca qué cargas tienen motor (bombas, neveras) y la aplicación calcula el pico de arranque que debe soportar.
7. **Informe** — vista previa del informe de una página con todo lo anterior. Desde aquí puedes:
   - **Imprimir / Guardar como PDF** (botones de imprimir y descargar).
   - **Exportar los resultados** calculados a **JSON** o **CSV** (distinto de guardar el proyecto: esto exporta los números ya calculados, para usarlos en otra herramienta).

## Guardar y recuperar tu trabajo

Los botones **Guardar** / **Cargar** de la cabecera (arriba, siempre visibles) exportan e importan **todo el proyecto** —cargas, generador y banco— como un archivo `.json` que puedes volver a abrir más tarde o enviar a un compañero de equipo. Esto es distinto de "Exportar resultados": Guardar/Cargar recupera las *entradas* para seguir trabajando; Exportar resultados entrega los *resultados ya calculados* para leerlos en otra parte.

## Mensajes de validación

Si falta un dato obligatorio, una potencia o cantidad es cero o negativa, un horario está mal formado, o el costo unitario quedó en $0, la aplicación lo señala junto al campo correspondiente (en rojo) y no deja avanzar hasta corregirlo — no hace falta adivinar qué está mal.

## Verificar que todo funciona (modo evaluador)

Cada pestaña con dimensionamiento (Generador FV, Regulador/Baterías) tiene un botón **"Cargar caso de prueba"** que reproduce exactamente el caso estandarizado de los Términos de Referencia, sin depender de que haya datos cargados previamente — útil para confirmar que el motor de cálculo da los valores esperados antes de usar tus propios datos.

## ¿Y si la consulta de recurso solar en línea falla?

Primero, ten en cuenta qué consultas: si en "Caso guardado" hay una ciudad elegida (por ejemplo Yopal), la aplicación usa sus datos guardados y no consulta internet; para consultar la API en línea elige **"— Coordenadas manuales —"** y escribe la latitud y longitud. La consulta puede tardar hasta 30 segundos. Si aun así falla (sin internet, o límite de consultas de la clave pública), la aplicación **cae automáticamente** a su propia base de datos local de respaldo, lo avisa en pantalla con un mensaje claro, y lo deja registrado también en el informe final — el cálculo nunca se queda en blanco ni se detiene con un error técnico.
