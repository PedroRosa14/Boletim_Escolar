import { sql } from "../config/db.js";

export const buscarAlunos = async (req, res) => {
  try {
    const alunos = await sql`
        SELECT * FROM alunos
        ORDER BY id DESC
        `;

    console.log("alunos: ", alunos);
    res.status(200).json({ success: true, data: alunos });
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno no servidor" });
  }
};

export const adicionarAluno = async (req, res) => {
  const { nome, notamat, notaport, notahist, notamedia, url } = req.body;

  if (!nome || !notamat || !notaport || !notahist || !notamedia ) {
    return res
      .status(400)
      .json({ success: false, message: "Preencha todos os campos!" });
  }

  try {
    const novoAluno = await sql`
        INSERT INTO alunos (nome, notamat, notaport, notahist, notamedia, url)
        VALUES (${nome}, ${notamat}, ${notaport}, ${notahist}, ${notamedia}, ${url})
        RETURNING *;
        `;
    console.log("Novo aluno adicionado:", novoAluno);
    res.status(201).json({ success: true, data: novoAluno[0] });
  } catch (error) {
    console.error("Erro ao adicionar aluno:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno no servidor" });
  }
};

export const buscarAlunoId = async (req, res) => {
  const { id } = req.params;

  try {
    const aluno = await sql`
        SELECT * FROM alunos WHERE id =${id}
        `;

    res.status(200).json({ success: true, data: aluno[0] });
  } catch (error) {
    console.error("Erro ao buscar aluno:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno no servidor" });
  }
};

export const atualizarAluno = async (req, res) => {
  const { id } = req.params;
  const { nome, notamat, notaport, notahist, notamedia, url } = req.body;

  try {
    const alunoAtualizado = await sql`
        UPDATE  alunos SET nome = ${nome}, notamat = ${notamat}, notaport = ${notaport}, notahist = ${notahist}, notamedia = ${notamedia}, url = ${url}
        WHERE id = ${id} 
        RETURNING *
        `;

    if (alunoAtualizado.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Aluno não encontrado" });
    }

    res.status(200).json({ success: true, data: alunoAtualizado[0] });
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno no servidor" });
  }
};

export const deletarAluno = async (req, res) => {
  const { id } = req.params;

  try {
    const alunoDeletado = await sql`
        DELETE FROM alunos WHERE id = ${id}
        RETURNING *;
        `;

    if (alunoDeletado.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "aluno não encontrado" });
    }

    res.status(200).json({
      success: true,
      data: alunoDeletado[0],
    });
  } catch (error) {
    console.error("Erro ao deletar aluno:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno no servidor" });
  }
};