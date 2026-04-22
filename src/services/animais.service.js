const pool = require('../database/connection.js')
  

  const listarTodosAnimais = async () => {
    const result = await pool.query('SELECT * FROM animais');
  return result.rows;
  };
  
 
  const buscarAnimalPorId = async (id) => {
    const result = await pool.query(
      'SELECT * FROM animais WHERE id = $1',[id]
    );
    return result.rows[0] || null;
  };
  
 
  const criarAnimal = async ({ titulo, autor }) => {
    if (!nome || !email) {
      throw new Error('Nome e e-mail são obrigatórios.');
    }

    const query = `
    INSERT INTO animais (nome, email)
    VALUES ($1, $2)
    RETURNING *;`;

    const values = [nome, email];

    const result = await pool.query(query, values);

    return result.rows[0]

  };

  const atualizarAnimal = async (id, { nome, email }) => {
    if (!nome || !email) {
      throw new Error('Nome e e-mail são obrigatórios.');
    }
  
    const query = `
      UPDATE tutores
      SET nome = $1, email = $2
      WHERE id = $3
      RETURNING *;
    `;
  
    const values = [nome, email, id];
    const result = await pool.query(query, values);
  
    return result.rows[0] || null;
  };

  const deletarAnimal = async (id) => {
    const query = `
      DELETE FROM tutores
      WHERE id = $1
      RETURNING *;
    `;
  
    const result = await pool.query(query, [id]);
  
    return result.rows[0] || null;
  };
  
  module.exports = { listarTodosAnimais, buscarAnimalPorId, criarAnimal, atualizarAnimal, deletarAnimal };