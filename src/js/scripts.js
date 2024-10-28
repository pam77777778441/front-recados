const notesContainer = document.getElementById('notes-list');
const prevPage = document.getElementById('prev-page');
const nextPage = document.getElementById('next-page');

let currentPage = 1; // Página atual
let perPage = 3; // Número de recados por página
let totalPages = 1; // Total de páginas

// Função para buscar recados com paginação
async function fetchNotes(page, perPage) {
  try {
    notesContainer.innerHTML = ''; // Limpa o container de notas
    const userId = localStorage.getItem('userId'); // Recupera o ID do usuário

    console.log('User ID recuperado do localStorage:', userId);

    // Verifica se o userId está definido
    if (!userId) {
      console.error('User ID não está definido. Verifique o login.');
      return;
    }

    const params = {
      page,      // página atual
      perPage    // registros por página
    };

    // Faz a chamada à API para buscar as notas do usuário
    const response = await api.get(`/notes/${userId}`, { params });
    const data = response.data;

    // Atualiza totalPages com base na resposta da API
    totalPages = data.totalPages; // Supondo que a API retorna `totalPages`
    const notes = data.notes; // Supondo que as notas estão em `data.notes`

    // Adiciona as notas ao container
    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.textContent = `${note.title}: ${note.description}`;
      notesContainer.appendChild(noteElement);
    });

    updatePaginationButtons(); // Atualiza os botões de navegação
  } catch (error) {
    console.error('Erro ao buscar recados.', error);
  }
}

// Navegação para a página de edição
function navigateToEditPage(noteId) {
  location.href = `edit-note.html?id=${noteId}`;
}

// Chame fetchNotes inicialmente
fetchNotes(currentPage, perPage);

// Botão para página anterior
prevPage.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchNotes(currentPage, perPage);
  }
});

// Botão para próxima página
nextPage.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchNotes(currentPage, perPage);
  }
});

// Função para atualizar os botões de navegação
function updatePaginationButtons() {
  prevPage.disabled = currentPage === 1;
  nextPage.disabled = currentPage === totalPages;
}
