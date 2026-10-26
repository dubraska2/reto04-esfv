/* =========================================================================
   config.js — Configuración externa de la aplicación ESFV
   -------------------------------------------------------------------------
   Parámetros de conexión al servicio PVWatts v8 (NREL). NREL cambió de
   dominio: la API responde en developer.nlr.gov (developer.nrel.gov ya no
   existe).

   CLAVE DE API (RF-42: sin secretos expuestos):
   - Aquí solo va "DEMO_KEY", la clave PÚBLICA de demostración de NREL. Tiene
     un límite bajo de consultas compartido por todo internet, así que puede
     responder con error 429; en ese caso la aplicación cae automáticamente a
     la base de datos local (recurso_solar.js) y lo avisa (RF-41).
   - La clave personal NUNCA se escribe en este archivo ni en el repositorio:
     en el despliegue (Vercel) se guarda en la variable de entorno
     NREL_API_KEY y la usa la función api/pvwatts.js, de modo que tampoco
     llega al navegador.
   ========================================================================= */

window.CONFIG = {
  // Clave pública de demostración de NREL (no es una credencial privada).
  API_KEY: "DEMO_KEY",

  // Endpoint del servicio PVWatts v8 (el parámetro "api_key" se añade en tiempo de ejecución)
  PVWATTS_BASE_URL: "https://developer.nlr.gov/api/pvwatts/v8.json",

  // Tiempo máximo de espera por la respuesta de la API antes de considerarla fallida [ms].
  // PVWatts suele tardar más de 10 s: con menos tiempo la consulta se abandona y se usan
  // los datos locales aunque la API sí esté respondiendo.
  PVWATTS_TIMEOUT_MS: 30000,

  // Parámetros fijos de la consulta (solo para obtener los 12 valores mensuales de
  // irradiación del sitio; la inclinación y el azimut se toman de la pantalla):
  PVWATTS_DEFAULTS: {
    system_capacity: 4,   // kW, valor nominal de referencia exigido por el endpoint
    module_type: 0,       // 0 = estándar
    array_type: 1,        // 1 = inclinación fija
    losses: 14.08          // % pérdidas de sistema por defecto de PVWatts
  }
};
