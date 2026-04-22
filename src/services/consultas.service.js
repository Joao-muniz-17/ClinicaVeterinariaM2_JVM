const pool = require('../database/connection.js');


const listarTodasConsultas = async () => {
  const result = await pool.query('SELECT * FROM consultas');
  return result.rows;
};


const buscarConsultaPorId = async (id) => {
  const result = await pool.query(
    'SELECT * FROM consultas WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
};


const criarConsulta = async ({ animal_id, data_consulta, motivo, diagnostico, veterinario }) => {
  if (!animal_id || !data_consulta) {
    throw new Error('animal_id e data_consulta são obrigatórios.');
  }

  const query = `
    INSERT INTO consultas (animal_id, data_consulta, motivo, diagnostico, veterinario)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [animal_id, data_consulta, motivo, diagnostico, veterinario];

  const result = await pool.query(query, values);

  return result.rows[0];
};


const atualizarConsulta = async (id, { animal_id, data_consulta, motivo, diagnostico, veterinario }) => {
  const query = `
    UPDATE consultas
    SET animal_id = $1,
        data_consulta = $2,
        motivo = $3,
        diagnostico = $4,
        veterinario = $5
    WHERE id = $6
    RETURNING *;
  `;

  const values = [animal_id, data_consulta, motivo, diagnostico, veterinario, id];

  const result = await pool.query(query, values);

  return result.rows[0] || null;
};


const deletarConsulta = async (id) => {
  const query = `
    DELETE FROM consultas
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0] || null;
};


const listarConsultasPorAnimal = async (animal_id) => {
  const query = `
    SELECT 
      c.*,
      a.nome AS animal_nome
    FROM consultas c
    JOIN animais a ON c.animal_id = a.id
    WHERE a.id = $1
  `;

  const result = await pool.query(query, [animal_id]);

  return result.rows;
};

module.exports = {
  listarTodasConsultas,
  buscarConsultaPorId,
  criarConsulta,
  atualizarConsulta,
  deletarConsulta,
  listarConsultasPorAnimal
};