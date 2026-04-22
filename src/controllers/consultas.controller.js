const consultasService = require('../services/consultas.service');

const listarConsultas = async (req, res) => {
  try {
    const consultas = await consultasService.listarTodasConsultas();
    res.status(200).json({ total: consultas.length, consultas });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar consultas.' });
  }
};

const buscarConsultaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const consulta = await consultasService.buscarConsultaPorId(id);

    if (!consulta) {
      return res.status(404).json({ erro: `Consulta ${id} não encontrada.` });
    }

    res.status(200).json({ consulta });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar consulta.' });
  }
};

const criarConsulta = async (req, res) => {
  try {
    const { animal_id, data_consulta, motivo, diagnostico, veterinario } = req.body;

    const novaConsulta = await consultasService.criarConsulta({
      animal_id,
      data_consulta,
      motivo,
      diagnostico,
      veterinario
    });

    res.status(201).json({
      mensagem: 'Consulta registrada com sucesso!',
      consulta: novaConsulta,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

const atualizarConsulta = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;

    const consultaAtualizada = await consultasService.atualizarConsulta(id, dados);

    if (!consultaAtualizada) {
      return res.status(404).json({ erro: 'Consulta não encontrada.' });
    }

    res.status(200).json({ consulta: consultaAtualizada });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

const deletarConsulta = async (req, res) => {
  try {
    const { id } = req.params;

    const consultaRemovida = await consultasService.deletarConsulta(id);

    if (!consultaRemovida) {
      return res.status(404).json({ erro: 'Consulta não encontrada.' });
    }

    res.status(200).json({ mensagem: 'Consulta removida com sucesso.' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

module.exports = {
  listarConsultas,
  buscarConsultaPorId,
  criarConsulta,
  atualizarConsulta,
  deletarConsulta
};