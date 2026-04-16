const tutores = [
  {
    id: 1,
    nome: 'Anderson Dutra',
    email: 'anderson@gmail.com',
  },
  {
    id: 2,
    nome: 'Ralph Dutra',
    email: 'ralph@gmail.com',
  },
  {
    id: 3,
    nome: 'Teddy Dutra',
    email: 'teddy@gmail.com',
  },
];

// Lista todos os usuarios
const listarTodosTutores = async () => {
  return tutores;
};

// Busca um usuario específico pelo ID
const buscarTutorPorId = async (id) => {
  const tutor = tutores.find((item) => item.id === Number(id));
  return tutor || null;
};

// Criar um novo usuario
const criarTutor = async ({ nome, email }) => {
  if (!nome || !email) {
    throw new Error('Nome e e-mail são obrigatórios.');
  }
  const novoTutor = {
    id: tutores.length + 1,
    nome,
    email,
  };
  tutores.push(novoTutor);
  return novoTutor;
};

module.exports = { listarTodosTutores, buscarTutorPorId, criarTutor };
