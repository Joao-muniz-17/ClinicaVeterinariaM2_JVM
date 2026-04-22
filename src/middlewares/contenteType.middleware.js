const validarContentType = (req, res, next) => {
    
    const metodosComBody = ['POST', 'PUT'];
  
    if (metodosComBody.includes(req.method)) {
      const contentType = req.headers['content-type'];
  
      
      if (!contentType || !contentType.includes('application/json')) {
        return res.status(415).json({
          erro: 'Tipo de mídia não suportado',
          mensagem:
            'A Veterinaria exige Content-Type: application/json para esta operação.',
        });
      }
    }
  
    next();
  };
  
  module.exports = validarContentType;