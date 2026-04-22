const pool = require('../database/connection.js')
  
  
  const listarTodosTutores = async () => {
    const result = await pool.query('SELECT * FROM tutores');
  return result.rows;
  };
  
  
  const buscarTutorPorId = async (id) => {
    const result = await pool.query(
      'SELECT * FROM tutores WHERE id = $1',[id]
    );
    return result.rows[0] || null;
  };
  
  
  const criarTutor = async ({ nome, telefone, email }) => {
    if (!nome || !email) {
      throw new Error('Nome e e-mail são obrigatórios.');
    }

    const query = `
    INSERT INTO tutores (nome, telefone, email)
    VALUES ($1, $2, $3)
    RETURNING *;`;

    const values = [nome, telefone, email];

    const result = await pool.query(query, values);

    return result.rows[0]

  };

  const atualizarTutor = async (id, { nome, telefone, email }) => {
    if (!nome || !email) {
      throw new Error('Nome e e-mail são obrigatórios.');
    }
  
    const query = `
      UPDATE tutores
      SET nome = $1, telefone = $2, email = $3
      WHERE id = $4
      RETURNING *;
    `;
  
    const values = [nome, telefone, email, id];
    const result = await pool.query(query, values);
  
    return result.rows[0] || null;
  };

  const deletarTutor = async (id) => {
    const query = `
      DELETE FROM tutores
      WHERE id = $1
      RETURNING *;
    `;
  
    const result = await pool.query(query, [id]);
  
    return result.rows[0] || null;
  };

  
  
  module.exports = { listarTodosTutores, buscarTutorPorId, criarTutor, atualizarTutor, deletarTutor };