document.addEventListener("DOMContentLoaded", function () {
    // Verificar se o usuario esta logado
    if (verifyLogin() == false) {
        location.href = "/PokeLegends/app/index.html";
        return true;
    }

    // Verificar se o usuario já marcou que capturou algum pokemon
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

    // Lista de Pokémon e IDs de elementos correspondentes
    const pokemonsGen = [{
        nome: 'articuno',
        idElemento: 'generationArti'
    },
    {
        nome: 'moltres',
        idElemento: 'generationMol'
    },
    {
        nome: 'zapdos',
        idElemento: 'generationZ'
    },
    {
        nome: 'mew',
        idElemento: 'generationMew'
    },
    {
        nome: 'mewtwo',
        idElemento: 'generationM'
    },
    {
        nome: 'raikou',
        idElemento: 'generationR'
    },
    {
        nome: 'entei',
        idElemento: 'generationE'
    },
    {
        nome: 'suicune',
        idElemento: 'generationS'
    },
    {
        nome: 'ho-oh',
        idElemento: 'generationH'
    },
    {
        nome: 'lugia',
        idElemento: 'generationL'
    },
    {
        nome: 'celebi',
        idElemento: 'generationC'
    },
];

    // Iterar sobre a lista e chamar a função para cada Pokémon
    pokemonsGen.forEach(({
        nome,
        idElemento
    }) => {
        obterDetalhesPokemon(nome, idElemento);
    });
});

async function obterDetalhesPokemon(nomePokemon, idElemento) {
    try {
        const responsePokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}/`);
        const especieUrl = responsePokemon.data.species.url;
        const responseEspecie = await axios.get(especieUrl);
        const regiaoUrl = responseEspecie.data.generation.url;
        const responseRegiao = await axios.get(regiaoUrl);
        let nomeRegiao = responseRegiao.data.main_region.name;
        nomeRegiao = nomeRegiao.charAt(0).toUpperCase() + nomeRegiao.slice(1);

        document.getElementById(idElemento).innerHTML = nomeRegiao;
    } catch (error) {
        console.error(`Erro ao obter detalhes do Pokémon ${nomePokemon}:`, error.message);
    }
}

function verifyLogin() {
    const sessao = localStorage.getItem("emSessao") || "nao";
    return sessao === "sim";
}