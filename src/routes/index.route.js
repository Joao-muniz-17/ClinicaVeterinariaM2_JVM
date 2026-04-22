const express       = require('express');
const router        = express.Router();

const AnimaisRoute   = require('./animais.route');
const TutoresRoute = require('./tutores.route');

const { autenticar } =
  require('../middlewares/main.middleware');


router.get('/', (req, res) => {
  res.json({ sistema: 'Veterinaria', status: 'Online' });
});


router.use(autenticar);


router.use('/animais',   AnimaisRoute);
router.use('/tutores', TutoresRoute);


router.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada na na veterinaria.' });
});

module.exports = router; 