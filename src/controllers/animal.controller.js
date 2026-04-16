// CONTROLLER: Coordena a comunicação entre a Rota e o Service.
// Extrai dados do req, chama o Service e formata a resposta com res.
// Nunca contém regra de negócio — apenas orquestração.

const animalService = require('../services/animal.service');

// GET /livros — Lista todos os livros
const listarAnimais = async (req, res) => {
  try {
    const Animais = await AnimalService.listarTodosAnimais();
    res.status(200).json({ total: Animais.length, Animais });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao listar Animais.' });
  }
};

// GET /livros/:id — Busca livro por ID
const buscarAnimalPorId = async (req, res) => {
  try {
    // Extrai o parâmetro da URL — essa é a responsabilidade do Controller
    const { id } = req.params;
    const Animal = await AnimalService.buscarAnimalPorId(id);

    // Se o Service retornou null, o livro não existe
    if (!Animal) {
      return res
        .status(404)
        .json({ erro: `Livro ${id} não encontrado no acervo.` });
    }

    res.status(200).json({ Animal });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao buscar livro.' });
  }
};

// POST /livros — Cadastra novo livro
const criarAnimal = async (req, res) => {
  try {
    // Extrai os dados do corpo da requisição
    const { titulo, autor } = req.body;
    const novoAnimal = await animalService.criarAnimal({ titulo, autor });

    // 201 = Created — status correto para criação bem-sucedida
    res.status(201).json({
      mensagem: 'Livro cadastrado no acervo com sucesso!',
      animal: novoAnimal,
    });
  } catch (erro) {
    // Se o Service lançou um erro de validação, retornamos 400
    res.status(400).json({ erro: erro.message });
  }
};

module.exports = { listarAnimais, buscarAnimalPorId, criarAnimal };
