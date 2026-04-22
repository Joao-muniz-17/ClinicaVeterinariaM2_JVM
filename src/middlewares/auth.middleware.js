const CHAVE_ACESSO = 'Veterinária';

const autenticar = (req, res, next) => {
  
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      erro: 'Acesso negado. Crachá de identificação não encontrado.',
      dica: 'Envie o cabeçalho: Authorization: Bearer <chave>',
    });
  }

  
  const token = authHeader.split(' ')[1];

  if (token !== CHAVE_ACESSO) {
    return res.status(403).json({
      erro: 'Acesso proibido. Crachá inválido ou vencido.',
    });
  }

 
  next();
};

module.exports = autenticar;