$(document).ready(function () {
    if(verificarLogin() == false) {
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