const listaRotinas = document.getElementById('listarotinas')
const inputElement = document.getElementById('inputrotina')
const adicionarRotina = document.querySelector('.botaorotina')
const botaoaddrotina = document.querySelector('#addRotina')
const janelaRotina = document.getElementById('janelaRotina')
const suasRotinas = document.getElementById('suasRotinas')
const editarRotina = document.getElementById('editarRotina')
const botaofechar = document.getElementById('botaofechar')
const botaoCancelar = document.getElementById('botaoCancelar')
const btnNovaTarefa = document.getElementById('btnnovatarefa')


const rotinas = JSON.parse(localStorage.getItem('listaRotinas')) || []

botaoaddrotina.addEventListener('click', addRotina)
adicionarRotina.addEventListener('click', abrirRotina)
botaofechar.addEventListener('click', fecharRotina)
btnNovaTarefa.addEventListener('click', abrirTarefa)
botaoCancelar.addEventListener('click', fecharTarefa)


function addRotina() {

    const novarotina = document.createElement('li')
    novarotina.setAttribute('class', 'rotinas')
    const novobotao = document.createElement('button')
    novobotao.setAttribute('class', 'botaorotina')

    const iconbox = document.createElement('i')
    iconbox.setAttribute('class', 'fa fa-cube')
    const nomeRotina = document.createElement('span')
    nomeRotina.setAttribute('id', 'spanRotina')
    const negrito = document.createElement('b')

    const rotina = inputElement.value
    negrito.innerHTML = rotina

    listaRotinas.prepend(novarotina)
    novarotina.appendChild(novobotao)
    novobotao.appendChild(iconbox)
    novobotao.appendChild(nomeRotina)
    nomeRotina.appendChild(negrito)
    rotinas.push(rotina)
    inputElement.value = ''
    salvarNoLS()
}

function salvarNoLS() {
    localStorage.setItem.id('listaRotinas', JSON.stringify(rotinas))
}

function abrirRotina() {
    suasRotinas.removeAttribute('class')
    suasRotinas.setAttribute('class', 'fechar')
    janelaRotina.setAttribute('class', 'abrir')
    editarRotina.removeAttribute('class')
    editarRotina.setAttribute('class', 'fechar')
}

function fecharRotina() {
    suasRotinas.removeAttribute('class')
    suasRotinas.setAttribute('class', 'abrir')
    editarRotina.removeAttribute('class')
    janelaRotina.removeAttribute('class')
}

function abrirTarefa() {
    suasRotinas.removeAttribute('class')
    suasRotinas.setAttribute('class', 'fechar')
    janelaRotina.setAttribute('class', 'fechar')
    editarRotina.removeAttribute('class')
    editarRotina.setAttribute('class', 'abrir')
}

function fecharTarefa(event) {
    suasRotinas.removeAttribute('class')
    suasRotinas.setAttribute('class', 'fechar')
    janelaRotina.removeAttribute('class')
    janelaRotina.setAttribute('class', 'abrir')
    editarRotina.removeAttribute('class')
    editarRotina.setAttribute('class', 'fechar')
    event.preventDefault()
}
