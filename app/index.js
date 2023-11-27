const form = document.querySelector('form');

function verificarLogin() {
    const sessao = localStorage.getItem("emSessao");
    if (sessao == "sim") {
        return true;
    } else {
        return false;
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailu = document.getElementById('email').value;
    const passwordu = document.getElementById('password').value;

    // Transforma os dados JSON em um objeto JavaScript
    const dados = JSON.parse(localStorage.getItem('dados'));

    // Simulação de dados armazenados no localStorage
    const email = dados.email || "admin";
    const password = dados.password || "admin";

    if (email === emailu && password === passwordu) {
        localStorage.setItem("emSessao", "sim");

        location.href = "/controle_pokemon/app/pages/lista/lista.html";
    } else {
        $("#error").show();
    }
});

function accDefault() {
    const sessaoa = localStorage.getItem("dados");
    const sessao = [sessaoa];
    if (sessao.includes(email)) {
        return true;
    } else {
        const dados = {
            name: "admin",
            email: "admin@admin.com",
            password: "admin"
        };

        // Transforma os dados em formato JSON
        const dadosJson = JSON.stringify(dados);

        // Armazena os dados no localStorage
        localStorage.setItem("dados", dadosJson);
    }
}

$(document).ready(function () {
    if (verificarLogin() == true) {
        location.href = "/controle_pokemon/app/pages/lista/lista.html";
        return true;
    }
    $("#error").hide();
    accDefault();
});