const router = require('express').Router();
const animalController = require('../controllers/animais.controller');

router.get('/', animalController.listarAnimais);
router.get('/:id', animalController.buscarAnimalPorId);
router.post('/', animalController.criarAnimal);

module.exports = router;