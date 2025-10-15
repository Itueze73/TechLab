// src/products.js
import { fetchAPI } from './api.js';

// ✅ Obtener todos los productos
export async function getAllProducts() {
  console.log('🔍 Consultando todos los productos...\n');
  const products = await fetchAPI('/products');
  console.log('✅ Productos obtenidos:');
  console.log(JSON.stringify(products, null, 2));
}

// ✅ Obtener un producto por ID
export async function getProductById(productId) {
  if (isNaN(productId)) {
    console.error('❌ El ID del producto debe ser un número');
    process.exit(1);
  }

  console.log(`🔍 Consultando producto con ID: ${productId}...\n`);

  const product = await fetchAPI(`/products/${productId}`);

  if (!product) {
    console.error(`⚠️  No se encontró ningún producto con ID ${productId}`);
    return;
  }

  console.log('✅ Producto obtenido:');
  console.log(JSON.stringify(product, null, 2));
}


// ✅ Crear un nuevo producto
export async function createProduct(title, price, category) {
  if (!title || !price || !category) {
    console.error('❌ Faltan parámetros. Uso: npm run start POST products <title> <price> <category>');
    process.exit(1);
  }

  const priceNumber = parseFloat(price);
  if (isNaN(priceNumber) || priceNumber <= 0) {
    console.error('❌ El precio debe ser un número válido mayor a 0.');
    process.exit(1);
  }

  console.log('➕ Creando nuevo producto...\n');
  const newProduct = {
    title,
    price: priceNumber,
    category,
    description: `Producto ${title} creado desde CLI`,
    image: 'https://via.placeholder.com/200'
  };

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct)
  };

  const result = await fetchAPI('/products', options);
  console.log('✅ Producto creado exitosamente:');
  console.log(JSON.stringify(result, null, 2));
}

// ✅ Eliminar un producto
export async function deleteProduct(productId) {
  if (!productId || isNaN(productId)) {
    console.error('❌ El ID del producto debe ser un número válido.');
    process.exit(1);
  }

  console.log(`🗑️  Eliminando producto con ID: ${productId}...\n`);
  const options = { method: 'DELETE' };
  const result = await fetchAPI(`/products/${productId}`, options);
  if (!result) {
    console.error(`⚠️  No se pudo eliminar el producto con ID ${productId}. Es posible que no exista.`);
    return;
  }
  console.log('✅ Producto eliminado exitosamente:');
  console.log(JSON.stringify(result, null, 2));
}