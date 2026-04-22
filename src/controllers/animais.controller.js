const animaisService = require('../services/animais.service');
                      

const listarAnimais = async (req, res) => {
  try {
    const animais = await animaisService.listarTodosAnimais();
    res.status(200).json({ total: animais.length, animais });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao listar livros.' });
  }
};
                      

const buscarAnimalPorId = async (req, res) => {
  try {
    
    const { id } = req.params;
    const animal = await animaisService.buscarAnimalPorId(id);
                      
    
    if (!animais) {
      return res.status(404).json({ erro: `Livro ${id} não encontrado no acervo.` });
    }
                      
    res.status(200).json({ animal });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao buscar livro.' });
  }
};
                      

const criarAnimal = async (req, res) => {
  try {
  
    const { id, raca } = req.body;
    const novoAnimal = await animaisService.criarAnimal({ id, raca });
    
    res.status(201).json({
      mensagem: 'animal cadastrado na veterinária com sucesso!',
      animal: novoAnimal,
    });
  } catch (erro) {
    
    res.status(400).json({ erro: erro.message });
  }
};
                      
module.exports = { listarAnimais, buscarAnimalPorId, criarAnimal };

