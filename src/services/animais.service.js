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
  
 
  const criarAnimal = async ({ nome, especie, raca, data_nascimento, tutor_id }) => {
    if (!nome || tutor_id) {
      throw new Error('Nome e obrgatorio.');
    }

     const query = `
    INSERT INTO animais (nome, especie, raca, data_nascimento, tutor_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

    const values = [nome, especie, raca, data_nascimento, tutor_id];

    const result = await pool.query(query, values);

    return result.rows[0]

  };

  const atualizarAnimal = async (id, { nome, especie, raca, data_nascimento, tutor_id }) => {
    if (!nome || tutor_id) {
      throw new Error('Nome e e-mail são obrigatórios.');
    }
  
    const query = `
      UPDATE animais
    SET nome=$1, especie=$2, raca=$3, data_nascimento=$4, tutor_id=$5
    WHERE id=$6
    RETURNING *;
    `;
  
    const values = [nome, especie, raca, data_nascimento, tutor_id, id];
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