const animaisService = require('../services/animais.service');

const listarAnimais = async (req, res) => {
  try {
    const animais = await animaisService.listarTodosAnimais();
    res.status(200).json({ total: animais.length, animais });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar animais.' });
  }
};

const buscarAnimalPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await animaisService.buscarAnimalPorId(id);

    if (!animal) {
      return res.status(404).json({ erro: `Animal ${id} não encontrado.` });
    }

    res.status(200).json({ animal });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar animal.' });
  }
};

const criarAnimal = async (req, res) => {
  try {
    const { nome, especie, raca, data_nascimento, tutor_id } = req.body;

    const novoAnimal = await animaisService.criarAnimal({
      nome,
      especie,
      raca,
      data_nascimento,
      tutor_id
    });

    res.status(201).json({
      mensagem: 'Animal cadastrado com sucesso!',
      animal: novoAnimal,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

const atualizarAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;

    const animalAtualizado = await animaisService.atualizarAnimal(id, dados);

    if (!animalAtualizado) {
      return res.status(404).json({ erro: 'Animal não encontrado.' });
    }

    res.status(200).json({ animal: animalAtualizado });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

const deletarAnimal = async (req, res) => {
  try {
    const { id } = req.params;

    const animalRemovido = await animaisService.deletarAnimal(id);

    if (!animalRemovido) {
      return res.status(404).json({ erro: 'Animal não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Animal removido com sucesso.' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

const listarConsultasDoAnimal = async (req, res) => {
  try {
    const { id } = req.params;

    const consultas = await require('../services/consultas.service')
      .listarConsultasPorAnimal(id);

    res.status(200).json({ total: consultas.length, consultas });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

module.exports = {
  listarAnimais,
  buscarAnimalPorId,
  criarAnimal,
  atualizarAnimal,
  deletarAnimal,
  listarConsultasDoAnimal
};