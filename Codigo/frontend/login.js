let usuarios_ls = localStorage.getItem('usuarios_ls') !== null ? JSON.parse(localStorage.getItem('usuarios_ls')) : []
let isLogged = localStorage.getItem('usuario_logado') !== null ? true : false
if (isLogged) {
    alert('Login já realizado')
    window.location.href = './inicio.html'
}

const loginForm = document.querySelector('#login'),
    entrarButton = document.querySelector('#entrar-btn'),
    newUserBtn = document.querySelector('#new-user-btn')

const generateUUID = () => {
    let d = new Date().getTime()
    let d2 = (performance && performance.now && (performance.now() * 1000)) || 0
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16
        if (d > 0) {
            r = (d + r) % 16 | 0
            d = Math.floor(d / 16)
        } else {
            r = (d2 + r) % 16 | 0
            d2 = Math.floor(d2 / 16)
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
}

const Login = () => {
    const user = loginForm.querySelector('#user').value,
        senha = loginForm.querySelector('#senha').value

    if (user === '' || senha === '') {
        alert('Preencha todos os campos')
    }
    else {
        const usuario = usuarios_ls.find(usuario => usuario.user === user || usuario.email === user)
        if (usuario === undefined) {
            alert('Usuário não encontrado, faça seu cadastro')
        }
        else if (usuario.senha !== senha) {
            alert('Senha incorreta')
        }
        else {
            localStorage.setItem('usuario_logado', JSON.stringify(usuario))
            window.location.href = './inicio.html'
        }
    }
}

const openPopup = () => {
    const popupDiv = document.createElement('div'),
        saveButton = document.createElement('div'),
        cancelButton = document.createElement('div')

    popupDiv.classList.add('popup')
    saveButton.className = 'button'
    cancelButton.className = 'button'
    saveButton.innerHTML = 'Salvar'
    cancelButton.innerHTML = 'Cancelar'

    cancelButton.addEventListener('click', () => {
        popupDiv.style.opacity = '0'
        setTimeout(() => { popupDiv.remove() }, 200)
    })
    popupDiv.innerHTML = `
        <div class="popup-content">
            <h3>Cadastro</h3>
            <form id="cadastro">
                            <div  class="form-group">
                                <label for="user">Usuário</label>
                                <input
                                    type="text"
                                    name="user"
                                    id="user"
                                    class="form-control"
                                    placeholder="Usuário"
                                />
                            </div>
                            <div class="form-group">
                                <label for="email">E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    class="form-control"
                                    placeholder="E-mail"
                                />
                            </div>
                            <div class="form-group">
                                <label for="senha">Senha</label>
                                <input
                                    type="password"
                                    name="senha"
                                    id="senha"
                                    class="form-control"
                                    placeholder="Senha"
                                />
                            </div>
                            <div class="form-group">
                                <label for="rsenha">Repetir senha</label>
                                <input
                                    type="password"
                                    name="rsenha"
                                    id="rsenha"
                                    class="form-control"
                                    placeholder="Confirmar senha"
                                />
                            </div>
            </form>
            <div id="buttons"></div>
        </div>
    `
    const close = (mouse) => {
        if (mouse.target === popupDiv) {
            popupDiv.style.opacity = '0'
            setTimeout(() => { popupDiv.remove() }, 200)
        }
    }

    document.body.appendChild(popupDiv)
    popupDiv.querySelector('#buttons').appendChild(saveButton)
    popupDiv.querySelector('#buttons').appendChild(cancelButton)
    setTimeout(() => { popupDiv.style.opacity = '1' }, 1)
    popupDiv.addEventListener('click', close)

    saveButton.addEventListener('click', () => {
        const user = popupDiv.querySelector('#cadastro #user').value,
            email = popupDiv.querySelector('#cadastro #email').value,
            senha = popupDiv.querySelector('#cadastro #senha').value,
            rsenha = popupDiv.querySelector('#cadastro #rsenha').value

        if (user === '' || email === '' || senha === '' || rsenha === '') {
            alert('Preencha todos os campos')
        }
        else if (senha !== rsenha) {
            alert('As senhas não conferem')
        }
        else if (!email.includes('@')) {
            alert('E-mail inválido')
        }
        else {
            const id = generateUUID()
            usuarios_ls.push({
                id,
                user,
                email,
                senha
            })
            localStorage.setItem('usuarios_ls', JSON.stringify(usuarios_ls))

            popupDiv.style.opacity = '0'
            setTimeout(() => { popupDiv.remove() }, 200)
        }
    })
}

entrarButton.addEventListener('click', Login)
newUserBtn.addEventListener('click', openPopup)