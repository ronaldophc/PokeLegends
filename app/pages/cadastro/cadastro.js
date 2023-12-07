const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");

// Função para verificar se o usuário está em sessão
function verificarLogin() {
    return localStorage.getItem("emSessao") === "sim";
}

// Função para validar o formato do email
function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// Função para validar o formato do nome
function validarNome(nome) {
    const regex = /([A-Z][a-z]{3,} )([A-Z][a-z]{3,} )?([A-Z][a-z]{3,})/;
    return regex.test(nome);
}

// Função para exibir mensagem de erro no campo
function exibirErroCampo(input) {
    input.setCustomValidity(`Digite um ${input.name} válido!`);
    $(`#${input.id}`).css("border-color", "red");
}

// Função para limpar mensagem de erro no campo
function limparErroCampo(input) {
    input.setCustomValidity("");
    $(`#${input.id}`).css("border-color", "");
}

// Adiciona eventos de validação para os campos de email e nome
emailInput.addEventListener("input", function (e) {
    if (validarEmail(e.target.value)) {
        limparErroCampo(e.target);
    } else {
        exibirErroCampo(e.target);
    }
});

nameInput.addEventListener("input", function (e) {
    if (validarNome(e.target.value)) {
        limparErroCampo(e.target);
    } else {
        exibirErroCampo(e.target);
    }
});

// Função para capturar e armazenar dados no localStorage
function capturarDados() {
    const dados = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };

    // Armazena os dados no localStorage
    localStorage.setItem("dados", JSON.stringify(dados));
}

// Evento de submit do formulário
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Captura os dados do formulário
    capturarDados();

    // Exibe o modal de envio com animação
    $('#modal-enviado').modal('show');
    $('#modal-enviado').fadeIn();

});

// Verifica se o usuário está em sessão ao carregar a página
$(document).ready(function () {
    if (verificarLogin()) {
        location.href = "/app/pages/lista/lista.html";
    }
});