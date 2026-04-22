const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutores.controller');

router.get('/', tutorController.listarTutores);
router.get('/:id', tutorController.buscarTutorPorId);
router.post('/', tutorController.criarTutor);

module.exports = router;