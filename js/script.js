
const lista = document.getElementById("lista-personagens");
const pesquisa = document.getElementById("pesquisa");

const API = "https://rickandmortyapi.com/api/character";

let personagens = [];

const descricoes = {
    "Rick Sanchez": "Um cientista genial e excêntrico que viaja por diferentes dimensões com seu neto Morty.",
    "Morty Smith": "Um adolescente que acompanha seu avô Rick em aventuras perigosas pelo multiverso.",
    "Summer Smith": "Irmã mais velha de Morty, que também participa das aventuras interdimensionais da família.",
    "Beth Smith": "Mãe de Morty e Summer, filha de Rick e cirurgiã veterinária.",
    "Jerry Smith": "Pai de Morty e Summer, frequentemente envolvido nas confusões da família."
};

function traduzirStatus(status) {
    const traducoes = {
        Alive: "Vivo",
        Dead: "Morto",
        unknown: "Desconhecido"
    };

    return traducoes[status] || status;
}

function traduzirEspecie(especie) {
    const traducoes = {
        Human: "Humano",
        Alien: "Alienígena",
        Humanoid: "Humanoide",
        Robot: "Robô",
        Animal: "Animal",
        "Mythological Creature": "Criatura mitológica",
        Cronenberg: "Cronenberg",
        Disease: "Doença",
        Poopybutthole: "Poopybutthole",
        unknown: "Desconhecida"
    };

    return traducoes[especie] || especie;
}

// Criar os cards dinamicamente
function mostrarPersonagens(dados) {
    lista.innerHTML = "";

    if (dados.length === 0) {
        lista.textContent = "Nenhum personagem encontrado.";
        return;
    }

    dados.forEach(personagem => {
        const card = document.createElement("div");
        card.classList.add("card");

        const imagem = document.createElement("img");
        imagem.src = personagem.image;
        imagem.alt = personagem.name;
        imagem.loading = "lazy";

        const nome = document.createElement("h3");
        nome.textContent = personagem.name;

        card.appendChild(imagem);
        card.appendChild(nome);

        if (descricoes[personagem.name]) {
            const descricao = document.createElement("p");
            descricao.classList.add("descricao");
            descricao.textContent = descricoes[personagem.name];
            card.appendChild(descricao);
        }

        const especie = document.createElement("p");
        especie.textContent =
            "Espécie: " + traduzirEspecie(personagem.species);

        const status = document.createElement("p");
        status.textContent =
            "Situação: " + traduzirStatus(personagem.status);

        card.appendChild(especie);
        card.appendChild(status);

        lista.appendChild(card);
    });
}

// Carregar somente 20 personagens
async function carregarPersonagens() {
    lista.textContent = "Carregando personagens...";

    try {
        const resposta = await fetch(API + "?page=1");

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const dados = await resposta.json();

        personagens = dados.results;

        mostrarPersonagens(personagens);

    } catch (erro) {
        console.error("Erro ao carregar personagens:", erro);

        lista.textContent =
            "Não foi possível carregar os personagens. " +
            "Tente novamente mais tarde.";
    }
}

// Pesquisar entre os 20 personagens carregados
pesquisa.addEventListener("input", () => {
    const texto = pesquisa.value.toLowerCase().trim();

    const filtrados = personagens.filter(personagem =>
        personagem.name.toLowerCase().includes(texto)
    );

    mostrarPersonagens(filtrados);
});

carregarPersonagens();
