const tutoresService = require('../services/tutores.service');


const listarTutores = async (req, res) => {
  try {
    const tutores = await tutoresService.listarTodosTutores();
    res.status(200).json({ total: tutores.length, tutores });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao listar usuarios.' });
  }
};


const buscarTutorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tutor = await tutoresService.buscarTutorPorId(id);

    if (!tutor) {
      return res.status(404).json({ erro: `Usuário ${id} não encontrado.` });
    }

    res.status(200).json({ tutor });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao buscar usuário.' });
  }
};


const criarTutor = async (req, res) => {
  try {
    const { nome, email } = req.body;
    const novoTutor = await tutorService.criarTutor({ nome, email });

    
    res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!',
      tutor: novoTutor,
    });
  } catch (erro) {
    
    res.status(400).json({ erro: erro.message });
  }
};

module.exports = { listarTutores, buscarTutorPorId, criarTutor };