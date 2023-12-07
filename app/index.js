const form = document.querySelector('form');

// Função para verificar se o usuário está em sessão
function verificarLogin() {
    return localStorage.getItem("emSessao") === "sim";
}

// Função para exibir mensagem de erro
function exibirErro() {
    $("#error").show();
}

// Função para redirecionar para a página de lista
function redirecionarParaLista() {
    location.href = "/app/pages/lista/lista.html";
}

// Função para configurar dados padrão no localStorage, se não existirem
function configurarDadosPadrao() {
    if (localStorage.getItem("dados") === null) {
        const dadosPadrao = {
            name: "admin",
            email: "admin@admin.com",
            password: "admin"
        };
        localStorage.setItem("dados", JSON.stringify(dadosPadrao));
    }
}

// Evento de envio do formulário
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    const dadosArmazenados = JSON.parse(localStorage.getItem('dados'));

    if (dadosArmazenados == null) {
        exibirErro();
    } else {
        const email = dadosArmazenados.email;
        const password = dadosArmazenados.password;

        if (email === emailInput && password === passwordInput) {
            localStorage.setItem("emSessao", "sim");
            redirecionarParaLista();
        } else {
            exibirErro();
        }
    }
});

// Verifica se o usuário está em sessão ao carregar a página
$(document).ready(function () {
    if (verificarLogin()) {
        redirecionarParaLista();
        return;
    }

    $("#error").hide();
    configurarDadosPadrao();
});
