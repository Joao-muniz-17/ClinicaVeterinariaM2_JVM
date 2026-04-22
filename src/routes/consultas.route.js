const router = require('express').Router();
const consultasController = require('../controllers/consultas.controller');

router.get('/', consultasController.listarConsultas);
router.get('/:id', consultasController.buscarConsultaPorId);
router.post('/', consultasController.criarConsulta);
router.put('/:id', consultasController.atualizarConsulta);
router.delete('/:id', consultasController.deletarConsulta);

module.exports = router;