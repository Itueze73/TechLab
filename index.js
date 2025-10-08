// index.js
import fetch from "node-fetch"; // Instala con: npm install node-fetch

// Capturamos los argumentos ingresados por consola
const [,, method, resource, ...params] = process.argv;

// Endpoint base
const BASE_URL = "https://fakestoreapi.com";

// Función principal
async function main() {
  try {
    switch (method?.toUpperCase()) {
      // 🟢 GET products o GET products/:id
      case "GET": {
        if (!resource) {
          console.log("Debes indicar un recurso, por ejemplo: products");
          return;
        }

        // Si el usuario puso algo como "products/5"
        const [endpoint, id] = resource.split("/");

        const url = id
          ? `${BASE_URL}/${endpoint}/${id}`
          : `${BASE_URL}/${endpoint}`;

        const response = await fetch(url);
        const data = await response.json();

        console.log("✅ Resultado:");
        console.log(data);
        break;
      }

      // 🟡 POST products <title> <price> <category>
      case "POST": {
        if (!resource || params.length < 3) {
          console.log("Uso correcto: npm run start POST products <title> <price> <category>");
          return;
        }

        const [endpoint] = resource.split("/");
        const [title, price, category] = params;

        const body = {
          title,
          price: Number(price),
          category,
        };

        const response = await fetch(`${BASE_URL}/${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await response.json();
        console.log("✅ Producto creado:");
        console.log(data);
        break;
      }

      // 🔴 DELETE products/:id
      case "DELETE": {
        const [endpoint, id] = resource.split("/");

        if (!id) {
          console.log("Uso correcto: npm run start DELETE products/<productId>");
          return;
        }

        const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();
        console.log("🗑️ Producto eliminado:");
        console.log(data);
        break;
      }

      // ⚠️ Comando desconocido
      default:
        console.log(`Método no reconocido: ${method}`);
        console.log("Usá GET, POST o DELETE.");
        break;
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

// Ejecutar la función
main();
