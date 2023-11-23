class Usuario {
    constructor(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}

const form = document.querySelector("form");
const dados = document.querySelector("#dados");

// Evento de submit do formulário
// document.getElementById('form').addEventListener('submit', (event) {
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Captura os dados do formulário
    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    // Cria um objeto da classe Usuario
    const usuario = new Usuario(nome, email, senha);

    const url = "/controle_pokemon/app/perfil.html";
    location.href = url;
});