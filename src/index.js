// index.js
const [,, method, resource, ...params] = process.argv;

import { getAllProducts, getProductById, createProduct, deleteProduct } from './products.js';

// ✅ Mostrar ayuda
function showHelp() {
  console.log(`
**********************************************
  🛍️ GESTOR DE PRODUCTOS - FAKE STORE API
**********************************************

📋 COMANDOS DISPONIBLES:

📦 Consultar todos los productos:
   npm run start GET products

🔍 Consultar producto específico:
   npm run start GET products/<productId>
   Ejemplo: npm run start GET products/15

➕ Crear nuevo producto:
   npm run start POST products <title> <price> <category>
   Ejemplo: npm run start POST products "Remera Nueva" 300 remeras

🗑️  Eliminar producto:
   npm run start DELETE products/<productId>
   Ejemplo: npm run start DELETE products/7

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
}

// ✅ Función principal
async function processCommand() {
  if (!method || !resource) {
    showHelp();
    process.exit(1);
  }

  const httpMethod = method.toUpperCase();
  
  const normalizedResource = resource.toLowerCase();
  const [baseResource, productId] = normalizedResource.split('/');

  if (baseResource !== 'products') {
    console.error('❌ Recurso no válido. Usa "products" o "products/<id>".');
    process.exit(1);
  }

  try {
    if (httpMethod === 'GET') {
      productId ? await getProductById(productId) : await getAllProducts();
    } 
    else if (httpMethod === 'POST') {
      const [title, price, category] = params;
      await createProduct(title, price, category);
    } 
    else if (httpMethod === 'DELETE') {
      await deleteProduct(productId);
    } 
    else {
      console.error(`❌ Método HTTP no soportado: ${httpMethod}`);
      console.log('Métodos disponibles: GET, POST, DELETE');
    }
  } catch (err) {
    console.error('❌ Error al procesar el comando:', err.message);
  }
}


processCommand();
