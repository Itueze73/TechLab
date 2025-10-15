
const BASE_URL = 'https://fakestoreapi.com';

export async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Recurso no encontrado (404): ${endpoint}`);
      }
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    const text = await response.text();
    if (!text) {
      throw new Error(`Respuesta vacía del servidor para ${endpoint}`);
    }

    return JSON.parse(text);
  } catch (err) {
    console.error('❌ Error en la petición:', err.message);
    return null;
  }
}

