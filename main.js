const inputTxt = document.querySelector('.inputTarefas');
const ulTarefas = document.querySelector('.tarefas');
const form = document.querySelector('.container');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    salvarTarefa();
    salvaLocalmente();
})

function salvarTarefa() {
    let tarefa = inputTxt.value;

    const li = criaLi();
    li.innerText = tarefa;
    ulTarefas.appendChild(li);

    const botao = criaBotao();
    botao.innerText = "Apagar";
    botao.setAttribute('class', 'apagar');
    li.innerText += ' ';
    li.appendChild(botao);
    
    limpaInput();
    identificaElemento();
}

function criaLi() {
    const li = document.createElement('li');
    return li
}

function criaBotao() {
    const botao = document.createElement('button');
    return botao
}

function limpaInput() {
    inputTxt.value = '';
    inputTxt.focus();
}

function identificaElemento() {
    document.addEventListener('click', (e) => {
        let el = e.target;
        if (el.classList.contains('apagar')) {
            el.parentElement.remove();
            limpaInput();
            salvaLocalmente()
        }
    });
}

function salvaLocalmente(){
    let liTarefas = ulTarefas.querySelectorAll('li');
    let listaDeTarefas = [];

    for (const tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto)
    }

    let tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON)
}

function tarefasSalvas(){
    let tarefas = localStorage.getItem('tarefas');
    let listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
        salvarTarefa(tarefa)
    }
}

tarefasSalvas()