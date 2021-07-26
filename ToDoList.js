var inputTarefa = document.querySelector('#inputTarefa')

var listaToDo = []


const buscaBanco = () => {

    var listaItens = JSON.parse(localStorage.getItem('ToDo'));
    if (listaItens) {
        return listaItens;
    } else {
        return listaItens = [];
    }
}

function inserirItem(txtItem, statusCheckBox = '', index) {

    var label = document.createElement('label')
    label.classList.add('todo_item')
    label.innerHTML = `
        <input type="checkbox" name="" data-id="${index}"${statusCheckBox}>
        <div id="itensDaLista">${txtItem}</div> 
        <button  data-id="${index}">X</button>`


    inputTarefa.value = ''
    inputTarefa.focus()
    document.querySelector('#list').appendChild(label)
}

function salvarLocalStorage(dados) {
    localStorage.setItem('ToDo', JSON.stringify(dados))
}

function criaTarefa() {
    const texto = inputTarefa.value

    if (texto) {

        var banco = buscaBanco()
        banco.push({ 'tarefa': texto, 'statusCheckBox': status, })
        salvarLocalStorage(banco)
        busca()
        inputTarefa.value = ''
    }
}

const limparTarefas = () => {
    const list = document.getElementById('list');
    while (list.firstChild) {
        list.removeChild(list.lastChild)
    }
}

function busca() {
    limparTarefas()
    var dados = buscaBanco()

    console.log(typeof dados)
    dados.forEach((dado, index) => inserirItem(dado.tarefa, dado.statusCheckBox, index))
}

function atualizaItem(index) {
    var dados = buscaBanco()
    dados[index].statusCheckBox = dados[index].statusCheckBox === '' ? 'checked' : ''
    salvarLocalStorage(dados)
    busca()
}

function deletaTarefa(index) {
    var dados = buscaBanco()
    dados.splice(index, 1)
    salvarLocalStorage(dados)
    busca()
}

function deletaAtualiza(evento) {
    const acao = evento.target
    console.log(evento.target.type)
    if (acao.type === 'submit') {
        const confirmacao = window.confirm("Tem certeza que deseja excluir a tarefa?")
        console.log(confirmacao)
        if (confirmacao) {
            console.log('bate')
            const index = acao.dataset.id
            deletaTarefa(index)
        }
    } else if (acao.type === 'checkbox') {
        const index = acao.dataset.id
        atualizaItem(index)
    }

}

document.getElementById('list').addEventListener('click', deletaAtualiza);

busca()