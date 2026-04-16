const tutorService = require('../services/tutor.service');

// GET /usuarios
const listarTutores = async (req, res) => {
  try {
    const Tutores = await tutorService.listarTodosTutores();
    res.status(200).json({ total: Tutores.length, tutores });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao listar usuarios.' });
  }
};

// GET /usuarios/:id — Busca usuario por ID
const buscarTutorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tutor = await tutorService.buscarTutorPorId(id);

    if (!tutor) {
      return res.status(404).json({ erro: `Usuário ${id} não encontrado.` });
    }

    res.status(200).json({ tutor });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao buscar usuário.' });
  }
};

// POST /usuarios — Cadastra novo usuario
const criarTutor = async (req, res) => {
  try {
    const { nome, email } = req.body;
    const novoTutor = await tutorService.criarTutor({ nome, email });

    // 201 = Created — status correto para criação bem-sucedida
    res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!',
      tutor: novoTutor,
    });
  } catch (erro) {
    // Se o Service lançou um erro de validação, retornamos 400
    res.status(400).json({ erro: erro.message });
  }
};

module.exports = { listarTutores, buscarTutorPorId, criarTutor };
