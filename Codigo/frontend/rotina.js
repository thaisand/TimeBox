const main = document.querySelector('#main')
let isLogged = localStorage.getItem('usuario_logado') !== null ? true : false
if (isLogged) {
    const loginBtn = document.querySelector('#login-btn'),
        header = document.querySelector('header'),
        userDiv = document.createElement('div')

    userDiv.innerHTML = `
        <div class="user-info">
            Bem vindo, <span class="user-name">${JSON.parse(localStorage.getItem('usuario_logado')).user}</span>
        </div>
        <span id="editar-usuario" style="font-size:1.4rem;user-select:none;cursor:pointer;font-family:'Material Icons'">edit</span>
        <div class="button">
            Sair
        </div>
    `
    loginBtn.remove()
    header.classList.add('logged')
    userDiv.classList.add('user-div')

    header.appendChild(userDiv)
    userDiv.querySelector('.button').addEventListener('click', () => {
        localStorage.removeItem('usuario_logado')
        window.location.href = 'inicio.html'
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

//Campos de texto
let rotinaID = window.location.search.split('=')[1]

let rotinasSalvas = JSON.parse(localStorage.getItem('rotinas')),
    rotinaLS = rotinasSalvas.filter(rotina => rotina.id == rotinaID)[0],
    rotinaTitle = document.querySelector('#title')
rotinaID = rotinasSalvas.indexOf(rotinaLS)

const allTextFields = Array.from(document.querySelectorAll('textarea'))

allTextFields.forEach(textfield => {
    textfield.addEventListener('input', () => { autoGrowing(textfield) })
})

const autoGrowing = (element) => {
    element.style.height = 'auto'
    element.style.height = `${element.scrollHeight}px`
}

//Criar tarefa e texto
const createTaskButton = document.querySelector('#novo-campo-task')
const createTextButton = document.querySelector('#novo-campo-texto')
const createTask = () => {

    const popupDiv = document.createElement('div')
    popupDiv.classList.add('popup')
    const saveButton = document.createElement('div')
    const cancelButton = document.createElement('div')
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
            <textarea id="title" placeholder="Título"></textarea>
            <div id="info">
                        <div class="info-item" id="campo-data">
                            <div class="info-item-title"><span class="icon">calendar_today</span>Data:</div>
                            <input type="date" id="date" value="${new Date().toISOString().split('T')[0]}">
                        <div class="info-item" id="campo-repetir">
                            <input type="checkbox" id="repetir">
                            <label for="repetir">Repetir a cada</label>
                            <input type="number"> dia(s)
                        </div>
                            </div>
                        
                <div class="info-item" id="campo-notificacao">
                    <div class="info-item-title"><span class="icon">notifications</span>Notificar:</div>
                    <input type="time" id="time" value="0">
                </div>
                <div class="info-column">
                    <div class="column">
                        <div class="info-item" id="campo-description">
                            <div class="info-item-title"><span class="icon">description</span>Descrição:</div>
                            <textarea id="description-textarea" placeholder="Descrição"></textarea>
                        </div>
                    </div>
                    <div class="column">
                        <div class="info-item" id="campo-progress">
                            <div class="info-item-title"><span class="icon">trending_up</span>Progresso:</div>
                            <input type="number" value="1">
                        </div>
                        <div class="info-item" id="campo-categoria">
                            <div class="info-item-title"><span class="icon">label</span>Categoria:</div>
                            <select>
                                ${rotinasSalvas[rotinaID].subtitulos.map(subtitulo => `<option>${subtitulo}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="info-item">
                    <input type="checkbox" id="campo-concluido">
                            <label for="concluido">Já concluído?</label>
                </div>
            </div>
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
    saveButton.addEventListener('click', () => {
        const titulo = popupDiv.querySelector('#title').value
        const descricao = popupDiv.querySelector('#description-textarea').value
        const data = popupDiv.querySelector('#date').value
        const progresso = popupDiv.querySelector('#campo-progress input').value
        const categoria = popupDiv.querySelector('#campo-categoria select').value
        const concluido = popupDiv.querySelector('#campo-concluido').checked
        const repetir = popupDiv.querySelector('#repetir').checked
        const repetirValue = popupDiv.querySelector('#campo-repetir input[type="number"]').value
        const notificar = popupDiv.querySelector('#campo-notificacao input').value

        const tarefa = {
            titulo: titulo,
            descricao: descricao,
            data: data,
            progresso: progresso,
            progressoAtual: 0,
            categoria: categoria,
            concluido: concluido,
            repetir: repetir,
            repetirValue: repetirValue,
            notificar: notificar
        }

        if (titulo === '') {
            alert('Preencha o título')
        } else if ((repetir && repetirValue < 1) || (repetir && repetirValue < 1)) {
            alert('Preencha o campo repetir')
        }
        else if (progresso < 1) {
            alert('Preencha o campo progresso')
        }
        else {
            rotinasSalvas[rotinaID].tarefas.push(tarefa)
            localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
            rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))
            popupDiv.style.opacity = '0'
            window.location.reload()
            mostrarTarefas()
            setTimeout(() => { popupDiv.remove() }, 200)
        }
    })
    popupDiv.querySelector('#buttons').appendChild(saveButton)
    saveButton.style.backgroundColor = rotinaLS.cor
    popupDiv.querySelector('#buttons').appendChild(cancelButton)
    setTimeout(() => { popupDiv.style.opacity = '1' }, 1)
    popupDiv.addEventListener('click', close)
}
const editTask = (tarefa) => {
    const popupDiv = document.createElement('div')
    popupDiv.classList.add('popup')
    const saveButton = document.createElement('div')
    const cancelButton = document.createElement('div')
    const deleteButton = document.createElement('div')
    saveButton.className = 'button'
    cancelButton.className = 'button'
    saveButton.innerHTML = 'Salvar'
    cancelButton.innerHTML = 'Cancelar'
    deleteButton.innerHTML = 'Excluir'
    deleteButton.className = 'button'
    cancelButton.addEventListener('click', () => {
        popupDiv.style.opacity = '0'
        setTimeout(() => { popupDiv.remove() }, 200)
    })
    popupDiv.innerHTML = `
        <div class="popup-content">
            <textarea id="title" placeholder="Título">${tarefa.titulo}</textarea>
            <div id="info">
                        <div class="info-item" id="campo-data">
                            <div class="info-item-title"><span class="icon">calendar_today</span>Data:</div>
                            <input type="date" id="date" value="${tarefa.data}">
                        <div class="info-item" id="campo-repetir">
                            <input type="checkbox" ${tarefa.repetir ? 'checked' : ''} id="repetir">
                            <label for="repetir">Repetir a cada</label>
                            <input type="number" value="${tarefa.repetirValue}"> dia(s)
                        </div>
                            </div>
                        
                <div class="info-item" id="campo-notificacao">
                    <div class="info-item-title"><span class="icon">notifications</span>Notificar:</div>
                    <input type="time" id="time" value="${tarefa.notificar}">
                </div>
                <div class="info-column">
                    <div class="column">
                        <div class="info-item" id="campo-description">
                            <div class="info-item-title"><span class="icon">description</span>Descrição:</div>
                            <textarea id="description-textarea" placeholder="Descrição">${tarefa.descricao}</textarea>
                        </div>
                    </div>
                    <div class="column">
                        <div class="info-item" id="campo-progress">
                            <div class="info-item-title"><span class="icon">trending_up</span>Progresso:</div>
                            <input type="number" value="${tarefa.progresso}">
                        </div>
                        <div class="info-item" id="campo-categoria">
                            <div class="info-item-title"><span class="icon">label</span>Categoria:</div>
                            <select>
                                ${rotinasSalvas[rotinaID].subtitulos.map(subtitulo => {
        return `<option ${tarefa.categoria === subtitulo.replace('\n', ' ') ? 'selected' : ''}>${subtitulo}</option>`
    })}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="info-item">
                    <input type="checkbox" id="campo-concluido">
                            <label for="concluido">Já concluído?</label>
                </div>
            </div>
            <div id="buttons"></div>
        </div>
    `
    document.body.appendChild(popupDiv)

    deleteButton.addEventListener('click', () => {
        rotinasSalvas[rotinaID].tarefas.splice(rotinasSalvas[rotinaID].tarefas.indexOf(tarefa), 1)
        localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
        rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))
        popupDiv.style.opacity = '0'
        mostrarTarefas()
        window.location.reload()
        setTimeout(() => { popupDiv.remove() }, 200)
    })

    saveButton.addEventListener('click', () => {
        const titulo = popupDiv.querySelector('#title').value
        const descricao = popupDiv.querySelector('#description-textarea').value
        const data = popupDiv.querySelector('#date').value
        const progresso = popupDiv.querySelector('#campo-progress input').value
        const categoria = popupDiv.querySelector('#campo-categoria select').value
        const concluido = popupDiv.querySelector('#campo-concluido').checked
        const repetir = popupDiv.querySelector('#repetir').checked
        const repetirValue = popupDiv.querySelector('#campo-repetir input[type="number"]').value
        const notificar = popupDiv.querySelector('#campo-notificacao input').value

        const nTarefa = {
            titulo: titulo,
            descricao: descricao,
            data: data,
            progresso: progresso,
            progressoAtual: 0,
            categoria: categoria,
            concluido: concluido,
            repetir: repetir,
            repetirValue: repetirValue,
            notificar: notificar
        }

        if (titulo === '') {
            alert('Preencha o título')
        } else if (repetir && repetirValue < 1 && repetirValue !== '') {
            alert('Preencha o campo repetir')
        }
        else if (progresso < 1) {
            alert('Preencha o campo progresso')
        }
        else {
            rotinasSalvas[rotinaID].tarefas[rotinasSalvas[rotinaID].tarefas.indexOf(tarefa)] = nTarefa
            localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
            rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))
            popupDiv.style.opacity = '0'
            window.location.reload()
            mostrarTarefas()
            setTimeout(() => { popupDiv.remove() }, 200)
        }
    })
    const close = (mouse) => {
        if (mouse.target === popupDiv) {
            popupDiv.style.opacity = '0'
            setTimeout(() => { popupDiv.remove() }, 200)
        }
    }
    popupDiv.querySelector('#buttons').appendChild(saveButton)
    saveButton.style.backgroundColor = rotinaLS.cor
    popupDiv.querySelector('#buttons').appendChild(cancelButton)
    popupDiv.querySelector('#buttons').appendChild(deleteButton)
    deleteButton.style.backgroundColor = 'red'
    setTimeout(() => { popupDiv.style.opacity = '1' }, 1)
    popupDiv.addEventListener('click', close)
}
const createTextField = (texto, index) => {
    const textField = document.createElement('textarea')
    textField.classList.add('text-field')
    textField.classList.add(`line-${index + 1}`)
    textField.placeholder = 'Subtítulo...'
    textField.id = "line"
    textField.name = "line"
    if (texto.length > 0) {
        textField.setAttribute('data-value', texto)
        textField.value = texto
    }
    textField.addEventListener('input', () => { autoGrowing(textField) })
    textField.addEventListener('input', () => {
        console.log(textField.classList[1].slice(5) - 1)
        if (textField.value.length > 0) {
            if (rotinasSalvas[rotinaID].subtitulos[textField.classList[1].slice(5) - 1] === undefined) {
                rotinasSalvas[rotinaID].subtitulos.push(textField.value)

                localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
                rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))
                textField.className = `text-field line-${rotinasSalvas[rotinaID].subtitulos.length}`

            }
            else {
                rotinasSalvas[rotinaID].subtitulos[textField.classList[1].slice(5) - 1] = textField.value
                localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
                rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))
            }
        }
        else {
            rotinasSalvas[rotinaID].subtitulos.splice(textField.classList[1].slice(5) - 1, 1)
            localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
            rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))
            textField.remove()
        }
    })
    document.querySelector('.editavel').appendChild(textField)
    autoGrowing(textField)
}
createTaskButton.addEventListener('click', createTask)
createTextButton.addEventListener('click', createTextField)

rotinaLS.subtitulos.forEach((subtitulo, index) => {
    createTextField(subtitulo, index)
})

const mostrarTarefas = () => {
    const insertAfter = (referenceNode, newNode) => {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    }
    const formatarData = (data) => {
        const dataFormatada = data.split('-')
        return `${dataFormatada[2]}/${dataFormatada[1]}/${dataFormatada[0]}`
    }
    rotinaLS.tarefas.forEach((tarefa, index) => {
        const tarefaDiv = document.createElement('div')
        if (new Date(tarefa.data + ' ' + tarefa.notificar).getTime() < new Date().getTime() && tarefa.notificar !== '') {
            tarefaDiv.classList.add('tarefa-notificada')
        } else if (new Date(tarefa.data + ' ').getTime() + 86400000 < new Date().getTime() && tarefa.notificar === '') {
            tarefaDiv.classList.add('tarefa-notificada')
        }
        tarefaDiv.classList.add('tarefa')
        tarefaDiv.classList.add(`tarefa-${index + 1}`)
        tarefaDiv.innerHTML = `
            <div class="tarefa-main">
                <input type="checkbox" id="tarefa-concluido">
                <div id="edit-task" class="icon-button">edit</div>
            </div>
            <div class="tarefa-info">
                <div class="tarefa-info-title">${tarefa.titulo}</div>
                <div class="tarefa-info-description">${tarefa.descricao}</div>
                ${parseInt(tarefa.progresso) > 1 ? `<progress value="${tarefa.progressoAtual}" max="${tarefa.progresso}"></progress>` : ''}
            </div>
            <div class="tarefa-info-data">
                <span class="icon">alarm</span>
                <span class="data">${formatarData(tarefa.data)} 
                ${tarefa.notificar !== '' ? `<span class="icon">notifications</span>${tarefa.notificar}` : ''}
                </span>
                ${tarefa.repetir ? `<span class="icon">repeat</span>` : ''}
            </div>
                `

        if (document.querySelector('.editavel').querySelector(`.tarefa-${index + 1}`) === null && tarefa.concluido !== true) {
            if (Array.from(document.querySelector('.editavel').querySelectorAll(`textarea`)).filter(a => a.value.replace('\n', ' ').includes(`${tarefa.categoria}`))[0] === undefined) {
                document.body.querySelector('.editavel').appendChild(tarefaDiv)
            }
            else {
                insertAfter(Array.from(document.querySelector('.editavel').querySelectorAll(`textarea`)).filter(a => a.value.replace('\n', ' ').includes(`${tarefa.categoria}`))[0], tarefaDiv)
            }
        }
        tarefaDiv.querySelector('#edit-task').addEventListener('click', () => { editTask(tarefa) })
        tarefaDiv.querySelector('#tarefa-concluido').addEventListener('change', () => {
            if (tarefa.concluido === false) {
                if (tarefa.repetir === true && tarefa.repetirValue > 0) {
                    if (parseInt(tarefa.progresso) > 1) {
                        if (tarefa.progressoAtual + 1 >= parseInt(tarefa.progresso)) {
                            tarefa.concluido = true
                            tarefaDiv.querySelector('progress').value = tarefa.progressoAtual
                            tarefaDiv.classList.add('concluido')
                            tarefaDiv.querySelector('.tarefa-info-description').style.textDecoration = 'line-through'
                            tarefaDiv.querySelector('.tarefa-info-data').style.display = 'none'
                            tarefaDiv.querySelector('.tarefa-info-title').style.textDecoration = 'line-through'
                            tarefaDiv.querySelector('#tarefa-concluido').checked = true
                            rotinasSalvas[rotinaID].tarefas[index].concluido = true
                            rotinasSalvas[rotinaID].tarefas[index].progressoAtual = tarefa.progressoAtual
                            localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
                            rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))

                            let novaTarefa = tarefa
                            novaTarefa.data = `${new Date(new Date(tarefa.data + ' ').getTime() + (tarefa.repetirValue * 86400000)).getFullYear()}-${new Date(new Date(tarefa.data + ' ').getTime() + (tarefa.repetirValue * 86400000)).getMonth() + 1}-${new Date(new Date(tarefa.data + ' ').getTime() + (tarefa.repetirValue * 86400000)).getDate()}`
                            novaTarefa.progressoAtual = 0
                            novaTarefa.concluido = false
                            rotinasSalvas[rotinaID].tarefas.push(novaTarefa)
                            localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
                            rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))
                            window.location.reload()
                        }
                    } else {
                        let novaTarefa = tarefa
                        novaTarefa.data = `${new Date(new Date(tarefa.data + ' ').getTime() + (tarefa.repetirValue * 86400000)).getFullYear()}-${new Date(new Date(tarefa.data + ' ').getTime() + (tarefa.repetirValue * 86400000)).getMonth() + 1}-${new Date(new Date(tarefa.data + ' ').getTime() + (tarefa.repetirValue * 86400000)).getDate()}`
                        novaTarefa.concluido = false
                        rotinasSalvas[rotinaID].tarefas.push(novaTarefa)
                        localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
                        rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))
                        window.location.reload()

                    }
                }
                if (parseInt(tarefa.progresso) > 1) {
                    tarefa.progressoAtual++
                    if (tarefa.progressoAtual >= parseInt(tarefa.progresso)) {
                        tarefa.concluido = true
                        tarefaDiv.querySelector('progress').value = tarefa.progressoAtual
                        tarefaDiv.classList.add('concluido')
                        tarefaDiv.querySelector('.tarefa-info-description').style.textDecoration = 'line-through'
                        tarefaDiv.querySelector('.tarefa-info-data').style.display = 'none'
                        tarefaDiv.querySelector('.tarefa-info-title').style.textDecoration = 'line-through'
                        tarefaDiv.querySelector('#tarefa-concluido').checked = true
                        rotinasSalvas[rotinaID].tarefas[index].concluido = true
                        rotinasSalvas[rotinaID].tarefas[index].progressoAtual = tarefa.progressoAtual
                        localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
                        rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))
                    }
                    else {
                        tarefaDiv.querySelector('#tarefa-concluido').checked = false
                        tarefaDiv.querySelector('progress').value = tarefa.progressoAtual
                        rotinasSalvas[rotinaID].tarefas[index].progressoAtual = tarefa.progressoAtual
                        localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
                        rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))
                    }

                } else {
                    tarefa.concluido = true
                    tarefaDiv.classList.add('concluido')
                    tarefaDiv.querySelector('.tarefa-info-description').style.textDecoration = 'line-through'
                    tarefaDiv.querySelector('.tarefa-info-data').style.display = 'none'
                    tarefaDiv.querySelector('.tarefa-info-title').style.textDecoration = 'line-through'
                    tarefaDiv.querySelector('#tarefa-concluido').checked = true
                    rotinasSalvas[rotinaID].tarefas[index].concluido = true
                    localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
                    rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))
                }

            }
            else {
                tarefa.concluido = false
                tarefaDiv.classList.remove('concluido')
                tarefaDiv.querySelector('.tarefa-info-description').style.textDecoration = 'none'
                tarefaDiv.querySelector('.tarefa-info-data').style.display = 'flex'
                tarefaDiv.querySelector('.tarefa-info-title').style.textDecoration = 'none'
                tarefaDiv.querySelector('#tarefa-concluido').checked = false
                rotinasSalvas[rotinaID].tarefas[index].concluido = false
                localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
                rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))
            }
        })
    })
}
mostrarTarefas()

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

//Ler a rotina
rotinaTitle.innerHTML = rotinaLS.titulo

rotinaTitle.addEventListener('input', () => {
    rotinaLS.titulo = rotinaTitle.value

    rotinasSalvas[rotinaID] = rotinaLS

    localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
})

document.querySelector('#delete-rotina').addEventListener('click', () => {
    rotinasSalvas.splice(rotinasSalvas.indexOf(rotinaLS), 1)
    localStorage.setItem('rotinas', JSON.stringify(rotinasSalvas))
    rotinasSalvas = JSON.parse(localStorage.getItem('rotinas'))
    window.location.href = './inicio.html'
})

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