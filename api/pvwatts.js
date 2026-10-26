// Función serverless de Vercel: reenvía la consulta a PVWatts v8 agregando la clave
// guardada en la variable de entorno NREL_API_KEY, para que la clave personal nunca
// quede escrita en el repositorio ni llegue al navegador.
// Configuración en Vercel: Project → Settings → Environment Variables → NREL_API_KEY.
const BASE_URL = 'https://developer.nlr.gov/api/pvwatts/v8.json';
const PARAMS = ['lat', 'lon', 'system_capacity', 'tilt', 'azimuth', 'array_type', 'module_type', 'losses'];

module.exports = async (req, res) => {
  const apiKey = process.env.NREL_API_KEY;
  if (!apiKey) {
    res.status(503).json({ errors: ['NREL_API_KEY no está configurada en el servidor.'] });
    return;
  }
  const params = new URLSearchParams({ api_key: apiKey });
  for (const p of PARAMS) {
    if (req.query[p] != null) params.set(p, String(req.query[p]));
  }
  try {
    const resp = await fetch(`${BASE_URL}?${params}`);
    const body = await resp.text();
    res.status(resp.status).setHeader('Content-Type', 'application/json').send(body);
  } catch (err) {
    res.status(502).json({ errors: ['No se pudo contactar PVWatts: ' + err.message] });
  }
};
