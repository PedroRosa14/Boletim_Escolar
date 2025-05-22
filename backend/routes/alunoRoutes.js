import express from "express";
import {
  buscarAlunos,
  buscarAlunoId,
  adicionarAluno,  
  atualizarAluno,
  deletarAluno,
} from "../controller/alunoController.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Lista todos os alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Lista de alunos retornada com sucesso
 */
router.get("/", buscarAlunos);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Busca um aluno pelo ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do aluno
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aluno encontrado com sucesso
 *       404:
 *         description: Aluno não encontrado
 */
router.get("/:id", buscarAlunoId);

/**
 * @swagger
 * /
 *   post:
 *     summary: Adiciona um novo aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - notamat
 *               - notaport
 *               - notahist
 *             properties:
 *               nome:
 *                 type: string
 *               notamat:
 *                 type: number
 *               notaport:
 *                 type: number
 *               notahist:
 *                 type: number
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 */
router.post("/", adicionarAluno);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Atualiza um aluno existente
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do aluno
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               notamat:
 *                 type: number
 *               notaport:
 *                 type: number
 *               notahist:
 *                 type: number
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *       404:
 *         description: Aluno não encontrado
 */
router.put("/:id", atualizarAluno);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Deleta um aluno
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do aluno
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aluno deletado com sucesso
 *       404:
 *         description: Aluno não encontrado
 */
router.delete("/:id", deletarAluno);

export default router;
