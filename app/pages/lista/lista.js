function verifyLogin() {
    const sessao = localStorage.getItem("emSessao") || "nao";
    if (sessao == "sim") {
        return true;
    } else {
        return false;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Recuperar dados do localStorage
    const pokemons = JSON.parse(localStorage.getItem("pokemons")) || {};

    // Adicionar evento de clique para cada checkbox
    const checkboxes = document.querySelectorAll("input[type=checkbox]");

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const pokemonId = this.id;
            const isCaptured = this.checked;

            // Atualizar o estado no localStorage
            pokemons[pokemonId] = isCaptured;
            localStorage.setItem("pokemons", JSON.stringify(pokemons));
        });

        // Inicializar o estado dos checkboxes com base no localStorage
        if (pokemons[checkbox.id]) {
            checkbox.checked = true;
        }
    });
});

$(document).ready(function () {
    if (verifyLogin() == false) {
        location.href = "/controle_pokemon/app/index.html";
        return true;
    }
});