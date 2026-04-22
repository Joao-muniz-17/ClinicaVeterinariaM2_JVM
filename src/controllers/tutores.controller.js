const tutoresService = require('../services/tutores.service');

const listarTutores = async (req, res) => {
  try {
    const tutores = await tutoresService.listarTodosTutores();
    res.status(200).json({ total: tutores.length, tutores });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar tutores.' });
  }
};

const buscarTutorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tutor = await tutoresService.buscarTutorPorId(id);

    if (!tutor) {
      return res.status(404).json({ erro: `Tutor ${id} não encontrado.` });
    }

    res.status(200).json({ tutor });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar tutor.' });
  }
};

const criarTutor = async (req, res) => {
  try {
    const { nome, telefone, email } = req.body;

    const novoTutor = await tutoresService.criarTutor({
      nome,
      telefone,
      email
    });

    res.status(201).json({
      mensagem: 'Tutor cadastrado com sucesso!',
      tutor: novoTutor,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

const atualizarTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;

    const tutorAtualizado = await tutoresService.atualizarTutor(id, dados);

    if (!tutorAtualizado) {
      return res.status(404).json({ erro: 'Tutor não encontrado.' });
    }

    res.status(200).json({ tutor: tutorAtualizado });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

const deletarTutor = async (req, res) => {
  try {
    const { id } = req.params;

    const tutorRemovido = await tutoresService.deletarTutor(id);

    if (!tutorRemovido) {
      return res.status(404).json({ erro: 'Tutor não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Tutor removido com sucesso.' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

module.exports = {
  listarTutores,
  buscarTutorPorId,
  criarTutor,
  atualizarTutor,
  deletarTutor
};