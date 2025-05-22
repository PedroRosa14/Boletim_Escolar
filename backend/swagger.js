import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Minha API",
      version: "1.0.0",
      description: "Documentação da API com Swagger",
    },
  },
  apis: [path.join(__dirname, './routes/*.js')] // Ajuste o '../' conforme necessário
};


const swaggerSpec = swaggerJSDoc(options);
console.log(JSON.stringify(swaggerSpec, null, 2)); // <--- ADICIONE ESTA LINHA

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};