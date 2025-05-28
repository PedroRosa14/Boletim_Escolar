import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

import alunoRoutes from "./routes/alunoRoutes.js";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Carregue a especificação Swagger do arquivo (ajuste o caminho conforme necessário)
const swaggerDocument = YAML.load(path.join(process.cwd(), 'docs', 'swagger.yaml')); // Assumindo que swagger.yaml está na pasta 'docs' na raiz do projeto

// Middlewares
app.use(cors());

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Rota para acessar a documentação Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas da sua API principal
app.use("/", alunoRoutes);



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