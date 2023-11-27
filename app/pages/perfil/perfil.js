const form = document.querySelector('form');
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const nameInput = document.getElementById("name");
const logout = document.getElementById("logout");

$(document).ready(function () {
    if (verificarLogin() == false) {
        location.href = "/controle_pokemon/app/index.html";
        return true;
    }
});


function verificarLogin() {
    const sessao = localStorage.getItem("emSessao") || "nao";
    if (sessao == "sim") {
        return true;
    } else {
        return false;
    }
}

logout.addEventListener("click", function (e) {
    localStorage.clear();
    location.href = "/controle_pokemon/app/index.html";
});

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

function lerDados() {
    // Recupera os dados armazenados no localStorage
    const dadosJson = localStorage.getItem('dados');

    // Transforma os dados JSON em um objeto JavaScript
    const dados = JSON.parse(dadosJson);
    document.getElementById("email").value = dados.email;
    document.getElementById("name").value = dados.name;
    document.getElementById("birthday").value = dados.birthday;
    document.getElementById("phone").value = dados.phone;
}

phoneInput.addEventListener("input", function (e) {
    const regex = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{3,4})/;
    const isValid = regex.test(e.target.value);

    if (isValid) {
        // Se o nome for válido, limpe a mensagem de erro personalizada
        e.target.setCustomValidity("");
    } else {
        // Se o nome não for válido, defina a mensagem de erro personalizada
        e.target.setCustomValidity("Número inválido!");
    }
});

$(document).ready(function () {
    lerDados();
    $('#birthday').mask('00/00/0000', {
        placeholder: "__/__/____"
    });
    $('#phone').mask('(00) 0000-00009', {
        placeholder: "(**) ****-****"
    });
});

function capturarDados() {
    const dadosJson2 = JSON.parse(localStorage.getItem('dados'));

    const password2 = dadosJson2.password;
    const dados = {
        name: form.querySelector("#name").value,
        email: form.querySelector("#email").value,
        phone: form.querySelector("#phone").value,
        password: password2,
        birthday: form.querySelector("#birthday").value
    };

    // Transforma os dados em formato JSON
    const dadosJson = JSON.stringify(dados);

    // Armazena os dados no localStorage
    localStorage.setItem("dados", dadosJson);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();


    // Captura os dados do formulário
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const birthday = document.querySelector("#birthday").value;
    const phone = document.querySelector("#phone").value;
    capturarDados();
    $(function () {
        // Adiciona um efeito de animação ao painel de resultados
        $("#modal-enviado").modal("show");
        $("#modal-enviado").fadeIn();
    });
});