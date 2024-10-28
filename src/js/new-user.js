// Seleciona o formulário de cadastro
const formNewUser = document.getElementById('form-new-user');

// Adiciona um listener para o evento de submissão do formulário
formNewUser.addEventListener('submit', async (event) => {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a página

    // Obtém os valores dos campos do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Cria um objeto com os dados do novo usuário
    const data = {
        name: name,
        email: email,
        password: password
    };

    try {
        // Envia os dados para a API
        const response = await api.post('/signup', data);
        
        // Se o cadastro for bem-sucedido
        if (response.status === 201) {
            alert('Usuário cadastrado com sucesso.');
            location.href = 'index.html'; // Redireciona para a página de login
        }
    } catch (error) {
        // Se houver um erro, exibe a mensagem no console
        console.error('Erro ao cadastrar usuário:', error.response ? error.response.data : error.message);
        alert('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
    }
});
