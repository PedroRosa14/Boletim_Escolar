import express from "express";
import {
  buscarAlunos,
  buscarAlunoId,
  adicionarAluno,  
  atualizarAluno,
  deletarAluno,
} from "../controller/alunoController.js";

const router = express.Router();

router.get("/", buscarAlunos);

router.get("/:id", buscarAlunoId);


router.post("/", adicionarAluno);


router.put("/:id", atualizarAluno);


router.delete("/:id", deletarAluno);

export default router;
