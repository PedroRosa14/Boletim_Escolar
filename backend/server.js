import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import alunoRoutes from "./routes/alunoRoutes.js";
import { sql } from "./config/db.js";                          // Importa a configuração do banco de dados do arquivo db.js

dotenv.config();                                    

const app = express();
const PORT = process.env.PORT;

app.use(express.json());                       
app.use(cors());
app.use(helmet()); 
app.use(morgan("dev"));

app.use("/api/alunos", alunoRoutes); // Rota de teste que responde com "Hello World!" quando acessada.

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

    console.log("db conectada");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error); // Loga o erro caso a conexão falhe
  }
}

startdb().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`); // Loga a porta em que o servidor está rodando
  });
});