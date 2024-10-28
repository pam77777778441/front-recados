const formLogin = document.getElementById('form-login')
formLogin.addEventListener('submit', (event) => {
    event.preventDefault()// Previne o envio do formulário
    // Lógica do login aqui
});


const email = document.getElementById('email-login')
const password = document.getElementById('password-login')

function setError(input, message) {
  const formControl = input.parentElement 
  const small = formControl.querySelector('small')

  small.textContent = message
  formControl.classList.remove('success')
  formControl.classList.add('error')
}

function setSuccess(input) {
  const formControl = input.parentElement

  formControl.classList.remove('error')
  formControl.classList.add('success')
}


async function login(email, password) {
    try {
        const response = await api.post('/login', { email, password })

        if (response.status === 200) {
            const { userId } = response.data // Verifique se userId está na resposta

            // Salvar o userId no localStorage
            localStorage.setItem('userId', userId)
            console.log('User ID armazenado no localStorage:', userId)

            alert('Login bem-sucedido!')
            location.href = 'list-note.html'// Redirecionar após o login
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error)
    }
}


formLogin.addEventListener('submit', (event) => {
  event.preventDefault()

  const data = {
    email: email.value,
    password: password.value
  }

  if (!email.value) {
    setError(email, 'E-mail é obrigatório')
  } else {
    setSuccess(email)
  }

  if (!password.value) {
    setError(password, 'Senha é obrigatória')
  } else {
    setSuccess(password)
  }

  if (data.email && data.password) {
    login(data)
  }
})