const formNewNote = document.getElementById('form-new-note')
const title = document.getElementById('title')
const description = document.getElementById('description')

async function createNewNote(note) {
  try {
    const response = await api.post('/notes', note)

    if (response.status === 201) {
      alert('Recado cadastrado com sucesso!')

      title.value = ''
      description.value = ''

      location.href = 'list-note.html' // Redireciona para a página de lista após o cadastro
    }
  } catch (error) {
    console.error('Erro ao cadastrar recado', error)
  }
}

formNewNote.addEventListener('submit', (event) => {
  event.preventDefault()

  const userId = localStorage.getItem('userId')

  // Verifica se o userId foi encontrado
  if (!userId) {
    alert('Você precisa estar logado para cadastrar uma nova nota.')
    return // Impede o cadastro se não estiver logado
  }

  const newNote = {
    title: title.value,
    description: description.value,
    userId // Inclui o userId no objeto newNote
  }

  createNewNote(newNote)
})
