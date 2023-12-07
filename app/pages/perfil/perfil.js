// Função para verificar se o usuário está logado
function verificarLogin() {
    return localStorage.getItem("emSessao") === "sim";
}

// Função para ler dados do localStorage e preencher os campos do formulário
function lerDados() {
    const dadosJson = localStorage.getItem('dados');

    if (dadosJson) {
        const dados = JSON.parse(dadosJson);
        document.getElementById("email").value = dados.email;
        document.getElementById("name").value = dados.name;
        document.getElementById("birthday").value = dados.birthday;
        document.getElementById("phone").value = dados.phone || "";
    }
}

// Função para capturar dados do formulário e armazenar no localStorage
function capturarDados() {
    const password2 = JSON.parse(localStorage.getItem('dados')).password;
    const dados = {
        name: form.querySelector("#name").value,
        email: form.querySelector("#email").value,
        phone: form.querySelector("#phone").value,
        password: password2,
        birthday: form.querySelector("#birthday").value
    };

    const dadosJson = JSON.stringify(dados);
    localStorage.setItem("dados", dadosJson);
}

// Variáveis
const form = document.querySelector('form');
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const nameInput = document.getElementById("name");
const birthdayInput = document.getElementById("birthday");
const logout = document.getElementById("logout");

// Eventos e lógica principal
$(document).ready(function () {
    if (!verificarLogin()) {
        location.href = "/app/index.html";
        return;
    }
    lerDados();
    // Máscaras para input
    $('#birthday').mask('00/00/0000', {
        placeholder: "**/**/****"
    });
    $('#phone').mask('(00) 0000-00009', {
        placeholder: "(**) ****-****"
    });
});

// Evento de logout
logout.addEventListener("click", function (e) {
    localStorage.clear();
    location.href = "/app/index.html";
});

birthdayInput.addEventListener("input", function (e) {
    const regex = /\d{2}\/\d{2}\/\d{4}/;
    const isValid = regex.test(e.target.value);

    if (isValid) {
        e.target.setCustomValidity("");
    } else {
        e.target.setCustomValidity("Preencha sua data de aniversário");
    }
});

// Evento de validação para o campo de nome
nameInput.addEventListener("input", function (e) {
    const regex = /([A-Z][a-z]{3,} )([A-Z][a-z]{3,} )?([A-Z][a-z]{3,})/;
    const isValid = regex.test(e.target.value);

    if (isValid) {
        e.target.setCustomValidity("");
        $("#name").css("border-color", "");
    } else {
        e.target.setCustomValidity("Digite seu nome completo!");
        $("#name").css("border-color", "red");
    }
});

// Evento de validação para o campo de email
emailInput.addEventListener("input", function (e) {
    const regex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = regex.test(e.target.value);

    if (isValid) {
        e.target.setCustomValidity("");
        $("#email").css("border-color", "");
    } else {
        e.target.setCustomValidity("Digite um Email válido!");
        $("#email").css("border-color", "red");
    }
});

// Evento de validação para o campo de telefone
phoneInput.addEventListener("input", function (e) {
    const regex = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{3,4})/;
    const isValid = regex.test(e.target.value);

    if (isValid) {
        e.target.setCustomValidity("");
    } else {
        e.target.setCustomValidity("Número inválido!");
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    capturarDados();
    $(function () {
        // Adiciona um efeito de animação ao painel de resultados
        $("#modal-enviado").modal("show");
        $("#modal-enviado").fadeIn();
    });
});