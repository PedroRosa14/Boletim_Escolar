import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import alunoRoutes from "./routes/alunoRoutes.js";
import { sql } from "./config/db.js";
import { setupSwagger } from "./swagger.js"; // Importe setupSwagger no topo

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Rotas
app.use("/", alunoRoutes);

// Configuração do Swagger (DEVE VIR APÓS A DEFINIÇÃO DAS ROTAS)
setupSwagger(app);

// Criação da tabela no banco se não existir
async function startdb() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS alunos (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        notamat DECIMAL(2, 1) NOT NULL,
        notaport DECIMAL(2, 1) NOT NULL,
        notahist DECIMAL(2, 1) NOT NULL,
        notamedia DECIMAL(2, 1) NOT NULL,
        url VARCHAR(255)
      )
    `;

    console.log("Banco de dados conectado com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
}

// Inicializa servidor
startdb().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});