const main = document.querySelector('#main')
let isLogged = localStorage.getItem('usuario_logado') !== null ? true : false
if (isLogged) {
    const loginBtn = document.querySelector('#login-btn'),
        header = document.querySelector('header'),
        userDiv = document.createElement('div')

    userDiv.innerHTML = `
        <div class="user-info">
            Bem vindo, <span style="font-family:inherit" class="user-name">${JSON.parse(localStorage.getItem('usuario_logado')).user}</span>
        </div>
        <span id="editar-usuario" style="font-size:1.4rem;user-select:none;cursor:pointer">edit</span>
        <div class="button">
            Sair
        </div>
    `
    userDiv.classList.add('user-div')
    loginBtn.remove()
    header.classList.add('logged')
    header.appendChild(userDiv)
    userDiv.querySelector('.button').addEventListener('click', () => {
        localStorage.removeItem('usuario_logado')
        document.location.reload(true)
    })
    userDiv.querySelector('#editar-usuario').addEventListener('click', () => {
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
            <h3>Editar cadastro</h3>
            <form id="cadastro">
                            <div  class="form-group">
                                <label for="user">Usuário</label>
                                <input
                                    type="text"
                                    name="user"
                                    id="user"
                                    class="form-control"
                                    placeholder="Usuário"
                                    value="${JSON.parse(localStorage.getItem('usuario_logado')).user}"
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
                                    value="${JSON.parse(localStorage.getItem('usuario_logado')).email}"
                                />
                            </div>
                            <div class="form-group">
                                <label for="senhaAtual">Senha atual</label>
                                <input
                                    type="password"
                                    name="senhaAtual"
                                    id="senhaAtual"
                                    class="form-control"
                                    placeholder="Senha Atual"
                                />
                            </div>
                            <div class="form-group">
                                <label for="senha">Nova senha</label>
                                <input
                                    type="password"
                                    name="senha"
                                    id="senha"
                                    class="form-control"
                                    placeholder="Senha"
                                />
                            </div>
                            <div class="form-group">
                                <label for="rsenha">Repetir nova senha</label>
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
                rsenha = popupDiv.querySelector('#cadastro #rsenha').value,
                senhaAtual = popupDiv.querySelector('#cadastro #senhaAtual').value

            if (user === '' || email === '' || senha === '' || rsenha === '') {
                alert('Preencha todos os campos')
            }
            else if (senhaAtual !== JSON.parse(localStorage.getItem('usuario_logado')).senha) {
                alert('Senha atual incorreta')
            }
            else if (senha !== rsenha) {
                alert('As senhas não conferem')
            }
            else if (!email.includes('@')) {
                alert('E-mail inválido')
            }
            else {
                let usuarios = JSON.parse(localStorage.getItem('usuarios_ls'))
                let usuario = JSON.parse(localStorage.getItem('usuario_logado'))
                let index = usuarios.findIndex(u => u.id === usuario.id)
                usuario.user = user
                usuario.email = email
                usuario.senha = senha
                usuarios[index] = usuario
                localStorage.setItem('usuarios_ls', JSON.stringify(usuarios))
                localStorage.setItem('usuario_logado', JSON.stringify(usuario))

                popupDiv.style.opacity = '0'
                setTimeout(() => { popupDiv.remove() }, 200)
                window.location.reload(true)
            }
        })
    })
}
else {
    window.location.href = './login.html'
}

// Menu
const menu = document.querySelector('#menu')
const menuButton = document.querySelector('#menu-button')
let opened = false

const toggleMenu = () => {
    opened = !opened
    menu.setAttribute('data-opened', opened ? `true` : `false`)
    menuButton.style.transform = opened ? `rotate(180deg)` : `rotate(0deg)`
    menu.style.width = opened ? `250px` : `0px`
    main.style.marginLeft = opened ? `250px` : `0px`

}
menuButton.addEventListener('mousedown', toggleMenu)

//Notificações
const notificacoesButton = document.querySelector('#notification-btn')
const openNotifications = () => {
    const popupDiv = document.querySelector('.notifications')

    const close = (mouse) => {
        if (mouse.target != document.querySelector('.notification-content')) {
            popupDiv.classList.remove('opened')
        }
    }

    setTimeout(() => {
        if (!popupDiv.classList.contains('opened')) {
            popupDiv.classList.add('opened')
        }
    }, 1)


    window.addEventListener('click', close)
}

notificacoesButton.addEventListener('click', openNotifications)

// Criação de rotinas
const adicionarRotinaButton = document.querySelector('#addRotina'),
    adicionarRotinaInput = document.querySelector('#inputrotina')

const coresAleatorias = () => {
    const cores = [
        '#FFADAD',
        '#FFD6A5',
        '#FDFFB6',
        '#CAFFBF',
        '#9BF6FF',
        '#A0C4FF',
        '#BDB2FF',
        '#FFC6FF',
        '#B4E4E4',
        '#BEB9DF',
    ]
    const coresAleatorias = []
    while (coresAleatorias.length < 1) {
        const cor = cores[Math.floor(Math.random() * cores.length)]
        if (!coresAleatorias.includes(cor)) {
            coresAleatorias.push(cor)
        }
    }

    return coresAleatorias[0]
}

const criarRotina = () => {
    const titulo = adicionarRotinaInput.value

    if (titulo.length > 0) {
        const rotinasCriadas = JSON.parse(localStorage.getItem('rotinas')) || []

        const rotina = {
            id: localStorage.getItem('rotinas') !== null ? JSON.parse(localStorage.getItem('rotinas')).length : 0,
            titulo: titulo,
            data: new Date().toISOString().split('T')[0],
            hora: new Date().toLocaleTimeString(),
            usuario: JSON.parse(localStorage.getItem('usuario_logado')).id,
            cor: coresAleatorias(),
            tarefas: [],
            subtitulos: []
        }

        localStorage.setItem('rotinas', JSON.stringify(rotinasCriadas.concat(rotina)))

        criarRotinas()

        adicionarRotinaInput.value = ''
    }
}

adicionarRotinaInput.addEventListener('keyup', (key) => {
    if (key.keyCode == 13) {
        criarRotina()
    }
})

adicionarRotinaButton.addEventListener('click', criarRotina)



const resumoRotinas = () => {
    const rotinasCriadas = JSON.parse(localStorage.getItem('rotinas')) || []
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado')).id
    const resumo = document.body.querySelector('#resumo .pendentes')

    rotinasCriadas.forEach(rotina => {
        if (rotina.usuario == usuarioLogado) {
            const tarefas = rotina.tarefas.filter(tarefa => tarefa.concluido == false)
            resumo.innerHTML += `
                <div style="margin-bottom:1rem;cursor:pointer" onclick="window.location.href='./rotina.html?id=${rotina.id}'" class="resumo-tarefa">
                    <div class="resumo-tarefa-title">
                        <b>${rotina.titulo}</b>
                    </div>
                    <div class="resumo-tarefa-descricao">
                        ${tarefas.length} tarefa(s) pendente(s)
                    </div>
                </div>
            `
        }
    })

    if (resumo.innerHTML === '') {
        resumo.innerHTML = `
            <div class="resumo-tarefa">
                <div class="resumo-tarefa-title">
                    <b>Nenhuma tarefa pendente</b>
                </div>
            </div>
        `
    }
}
resumoRotinas()

const relatorioRotinasComplete = () => {
    let rotinasCriadas = JSON.parse(localStorage.getItem('rotinas')) || []
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado')).id
    const relArea = document.body.querySelector('#relatorio .rel-area')
    const relAreaDesc = document.body.querySelector('#relatorio .rel-area-desc')
    rotinasCriadas = rotinasCriadas.filter(rotina => rotina.usuario == usuarioLogado)

    let data = []
    let dataBackground = []
    let dataLabel = []
    let qntTarefas = 0
    let qntTarefasConcluidas = 0
    rotinasCriadas.forEach(rotina => {
        if (rotina.tarefas.length > 0) {
            data.push(rotina.tarefas.filter(tarefa => tarefa.concluido == true).length)
            dataBackground.push(rotina.cor)
            dataLabel.push(rotina.titulo)
            qntTarefas += rotina.tarefas.length
            qntTarefasConcluidas += rotina.tarefas.filter(tarefa => tarefa.concluido == true).length
        }
    })
    if (qntTarefas != qntTarefasConcluidas) {
        data.push(qntTarefas - qntTarefasConcluidas)
        dataBackground.push('#fff')
        dataLabel.push('Pendentes')
    }

    if (qntTarefas > 0) {
        const graph = document.createElement('canvas')
        graph.id = 'grafico'
        relArea.insertBefore(graph, relArea.firstChild)


        var myChart = new Chart(graph, {
            type: 'doughnut',
            data:
            {
                datasets: [{
                    data: data,
                    backgroundColor: dataBackground
                }],
                labels: dataLabel
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle'
                        },
                        position: 'bottom',
                        align: 'center'
                    },
                    title: {
                        display: true,
                        text: 'Tarefas concluídas'
                    }
                }
            }

        })
    }

    if (qntTarefasConcluidas === 0 && rotinasCriadas.length > 0) {
        relAreaDesc.innerHTML = `
            <div class="rel-area-title">
                Você ainda não completou nenhuma tarefa
                <br>
                Não desista!
            </div>
        `
    }

    if (qntTarefasConcluidas === 0 && rotinasCriadas.length === 0) {
        relAreaDesc.innerHTML = `
            <div class="rel-area-title">
                Não há tarefas para serem exibidas
                <br>
                Crie uma rotina para começar
            </div>
        `
    }
    else if (qntTarefas === qntTarefasConcluidas && qntTarefas > 0) {
        relAreaDesc.innerHTML = `
            <div class="rel-area-title">
                Você concluiu todas as tarefas
                <br>
                Parabéns!
            </div>
        `
    }
    else if (qntTarefas > 0 && qntTarefasConcluidas > 0) {
        relAreaDesc.innerHTML = `
            <div class="rel-area-title">
                Você concluiu ${qntTarefasConcluidas} de ${qntTarefas} tarefas
                <br>
                Continue assim!
            </div>
        `
    }
}
relatorioRotinasComplete()

const notificacoesRotina = () => {
    const rotinasCriadas = JSON.parse(localStorage.getItem('rotinas')) || []
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado')).id
    const notificacoes = document.body.querySelector('#notificationPopup .notification-content')

    rotinasCriadas.forEach(rotina => {
        if (rotina.usuario == usuarioLogado) {
            const tarefas = rotina.tarefas.filter(tarefa => (tarefa.concluido == false && tarefa.notificar !== '' && new Date(tarefa.data + ' ' + tarefa.notificar).getTime() < new Date().getTime()) || (tarefa.concluido == false && new Date(tarefa.data + ' ').getTime() + 86400000 < new Date().getTime() && tarefa.notificar === ''))

            if (tarefas.length > 0) {
                notificacoes.innerHTML += `
                    <div class="notification-item" onclick="window.location.href='./rotina.html?id=${rotina.id}'">
                        <div class="notificacao-text">
                            ${tarefas.length} tarefa(s) pendente(s) em <b>${rotina.titulo}</b>
                        </div>
                    </div>
                `
            }
        }
    })
}
notificacoesRotina()

const conquistas = () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado')).id
    const rotinasCriadas = (JSON.parse(localStorage.getItem('rotinas')) || []).filter(rotina => rotina.usuario == usuarioLogado)
    const novasRotinas = document.body.querySelector('#novasrotinas')
    const novasTarefas = document.body.querySelector('#novastarefas')
    const completeTarefas = document.body.querySelector('#completetarefas')

    let qntRotinas = rotinasCriadas.length
    let qntTarefas = 0
    let qntTarefasConcluidas = 0
    rotinasCriadas.forEach(rotina => {
        qntTarefas += rotina.tarefas.length
        qntTarefasConcluidas += rotina.tarefas.filter(tarefa => tarefa.concluido == true).length
    })

    if (qntRotinas === 0) {
        novasRotinas.querySelector('.conq-area-desc').innerHTML = `Comece criando uma rotina.`
    } else if (qntRotinas > 0 && qntRotinas < 3) {
        novasRotinas.querySelector('.conq-area-desc').innerHTML = `Você tem ${qntRotinas} rotina(s) criada(s), crie 3 para avançar.`
        novasRotinas.querySelector('.conq-area-stars').firstElementChild.innerHTML = `star`
        novasRotinas.querySelector('.conq-area-stars').firstElementChild.classList.add('active')
    } else if (qntRotinas >= 3 && qntRotinas < 5) {
        novasRotinas.querySelector('.conq-area-desc').innerHTML = `Você tem ${qntRotinas} rotinas criadas, crie 5 para avançar.`
        novasRotinas.querySelector('.conq-area-stars').firstElementChild.innerHTML = `star`
        novasRotinas.querySelector('.conq-area-stars').firstElementChild.classList.add('active')
        novasRotinas.querySelector('.conq-area-stars').children[1].innerHTML = `star`
        novasRotinas.querySelector('.conq-area-stars').children[1].classList.add('active')
    } else if (qntRotinas >= 5) {
        novasRotinas.querySelector('.conq-area-desc').innerHTML = `Você tem ${qntRotinas} rotinas criadas, parabéns!`
        novasRotinas.querySelector('.conq-area-stars').firstElementChild.innerHTML = `star`
        novasRotinas.querySelector('.conq-area-stars').firstElementChild.classList.add('active')
        novasRotinas.querySelector('.conq-area-stars').children[1].innerHTML = `star`
        novasRotinas.querySelector('.conq-area-stars').children[1].classList.add('active')
        novasRotinas.querySelector('.conq-area-stars').children[2].innerHTML = `star`
        novasRotinas.querySelector('.conq-area-stars').children[2].classList.add('active')
    }

    if (qntTarefas === 0) {
        novasTarefas.querySelector('.conq-area-desc').innerHTML = `Comece criando uma tarefa.`
    } else if (qntTarefas > 0 && qntTarefas < 5) {
        novasTarefas.querySelector('.conq-area-desc').innerHTML = `Você tem ${qntTarefas} tarefa(s) criada(s), crie 5 para avançar.`
        novasTarefas.querySelector('.conq-area-stars').firstElementChild.innerHTML = `star`
        novasTarefas.querySelector('.conq-area-stars').firstElementChild.classList.add('active')
    } else if (qntTarefas >= 5 && qntTarefas < 10) {
        novasTarefas.querySelector('.conq-area-desc').innerHTML = `Você tem ${qntTarefas} tarefas criadas, crie 10 para avançar.`
        novasTarefas.querySelector('.conq-area-stars').firstElementChild.innerHTML = `star`
        novasTarefas.querySelector('.conq-area-stars').firstElementChild.classList.add('active')
        novasTarefas.querySelector('.conq-area-stars').children[1].innerHTML = `star`
        novasTarefas.querySelector('.conq-area-stars').children[1].classList.add('active')
    } else if (qntTarefas >= 10) {
        novasTarefas.querySelector('.conq-area-desc').innerHTML = `Você tem ${qntTarefas} tarefas criadas, parabéns!`
        novasTarefas.querySelector('.conq-area-stars').firstElementChild.innerHTML = `star`
        novasTarefas.querySelector('.conq-area-stars').firstElementChild.classList.add('active')
        novasTarefas.querySelector('.conq-area-stars').children[1].innerHTML = `star`
        novasTarefas.querySelector('.conq-area-stars').children[1].classList.add('active')
        novasTarefas.querySelector('.conq-area-stars').children[2].innerHTML = `star`
        novasTarefas.querySelector('.conq-area-stars').children[2].classList.add('active')
    }

    if (qntTarefasConcluidas === 0) {
        completeTarefas.querySelector('.conq-area-desc').innerHTML = `Complete uma tarefa, você consegue!`
    } else if (qntTarefasConcluidas > 0 && qntTarefasConcluidas < 5) {
        completeTarefas.querySelector('.conq-area-desc').innerHTML = `Você tem ${qntTarefasConcluidas} tarefa(s) concluida(s), complete 5 para avançar.`
        completeTarefas.querySelector('.conq-area-stars').firstElementChild.innerHTML = `star`
        completeTarefas.querySelector('.conq-area-stars').firstElementChild.classList.add('active')
    } else if (qntTarefasConcluidas >= 5 && qntTarefasConcluidas < 10) {
        completeTarefas.querySelector('.conq-area-desc').innerHTML = `Você tem ${qntTarefasConcluidas} tarefas concluidas, complete 10 para avançar.`
        completeTarefas.querySelector('.conq-area-stars').firstElementChild.innerHTML = `star`
        completeTarefas.querySelector('.conq-area-stars').firstElementChild.classList.add('active')
        completeTarefas.querySelector('.conq-area-stars').children[1].innerHTML = `star`
        completeTarefas.querySelector('.conq-area-stars').children[1].classList.add('active')
    } else if (qntTarefasConcluidas >= 10) {
        completeTarefas.querySelector('.conq-area-desc').innerHTML = `Você tem ${qntTarefasConcluidas} tarefas concluidas, parabéns!`
        completeTarefas.querySelector('.conq-area-stars').firstElementChild.innerHTML = `star`
        completeTarefas.querySelector('.conq-area-stars').firstElementChild.classList.add('active')
        completeTarefas.querySelector('.conq-area-stars').children[1].innerHTML = `star`
        completeTarefas.querySelector('.conq-area-stars').children[1].classList.add('active')
        completeTarefas.querySelector('.conq-area-stars').children[2].innerHTML = `star`
        completeTarefas.querySelector('.conq-area-stars').children[2].classList.add('active')
    }
}
conquistas()

const criarRotinas = () => {
    const rotinasCriadas = JSON.parse(localStorage.getItem('rotinas')) || []
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado')).id
    const rotinas = document.querySelector('#listarotinas')

    rotinasCriadas.forEach(rotina => {
        if (rotina.usuario == usuarioLogado && rotinas.querySelector(`#rotina-${rotina.id}`) === null) {
            const rotinaDiv = document.createElement('li')
            rotinaDiv.classList.add('rotinas')
            rotinaDiv.id = `rotina-${rotina.id}`
            rotinaDiv.innerHTML = `
            <button class="botaorotina" style="background-color:${rotina.cor}">
                <i class="fa fa-cube"></i>
                <div class="rotina-title">
                    ${rotina.titulo}
                </div>
            </button>
        `
            rotinas.insertBefore(rotinaDiv, rotinas.firstChild)

            rotinaDiv.addEventListener('click', () => {
                window.location.href = `./rotina.html?id=${rotina.id}`
            })
        }
    })

    conquistas()
}
criarRotinas()