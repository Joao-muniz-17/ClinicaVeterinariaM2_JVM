const router = require('express').Router();
const animalController = require('../controllers/animais.controller');

router.get('/', animalController.listarAnimais);
router.get('/:id/consultas', animalController.listarConsultasDoAnimal);
router.get('/:id', animalController.buscarAnimalPorId);
router.post('/', animalController.criarAnimal);
router.put('/:id', animalController.atualizarAnimal);
router.delete('/:id', animalController.deletarAnimal);

module.exports = router;