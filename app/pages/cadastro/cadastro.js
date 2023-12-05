class Usuario {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

$(document).ready(function () {
    if(verificarLogin() == true) {
        location.href = "../lista/lista.html";
        return true;
    }
});

function verificarLogin() {
    const sessao = localStorage.getItem("emSessao");
    if (sessao == "sim") {
        return true;
    } else {
        return false;
    }
}

const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const nameInput = document.getElementById("name");

// Defina um evento de validação personalizado para o campo de entrada
emailInput.addEventListener("input", function (e) {
    const regex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = regex.test(e.target.value);

    if (isValid) {
        // Se o email for válido, limpe a mensagem de erro personalizada
        e.target.setCustomValidity("");
        $("#email").css("border-color", "")
    } else {
        // Se o email não for válido, defina a mensagem de erro personalizada
        e.target.setCustomValidity("Digite um Email válido!");
        $("#email").css("border-color", "red")
    }
});

// Defina um evento de validação personalizado para o campo de entrada
nameInput.addEventListener("input", function (e) {
    const regex = /([A-Z][a-z]{3,} )([A-Z][a-z]{3,} )?([A-Z][a-z]{3,})/;
    const isValid = regex.test(e.target.value);

    if (isValid) {
        // Se o nome for válido, limpe a mensagem de erro personalizada
        e.target.setCustomValidity("");
        $("#name").css("border-color", "")
    } else {
        // Se o nome não for válido, defina a mensagem de erro personalizada
        e.target.setCustomValidity("Digite seu nome completo!");
        $("#name").css("border-color", "red")
    }
});

function capturarDados() {
    const dados = {
        name: form.querySelector("#name").value,
        email: form.querySelector("#email").value,
        password: form.querySelector("#password").value
    };

    // Transforma os dados em formato JSON
    const dadosJson = JSON.stringify(dados);

    // Armazena os dados no localStorage
    localStorage.setItem("dados", dadosJson);
}

// Evento de submit do formulário
form.addEventListener("submit", (event) => {
    event.preventDefault();


    // Captura os dados do formulário
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    capturarDados();

    $(function () {
        // Adiciona um efeito de animação ao painel de resultados
        $("#modal-enviado").modal("show");
        $("#modal-enviado").fadeIn();
    });

    // Cria um objeto da classe Usuario
    const usuario = new Usuario(name, email, password);

});