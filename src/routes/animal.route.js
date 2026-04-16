// ROUTE: Mapeia URLs para funções do Controller.
// Nada mais, nada menos. Sem lógica, sem processamento.

const router = require('express').Router();
const animalController = require('../controllers/animal.controller');

router.get('/', animalController.listarAnimais);
router.get('/:id', animalController.buscarAnimalPorId);
router.post('/', animalController.criarAnimal);

module.exports = router;
