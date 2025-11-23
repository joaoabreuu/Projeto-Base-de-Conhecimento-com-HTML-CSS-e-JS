// Seleciona os elementos do DOM necessários para a funcionalidade
let cardcontainer = document.querySelector("main"); // O container principal para os cards
const campoBusca = document.querySelector("div input");
const botaoBusca = document.getElementById("botao-busca");
let dados = [];

// Função assíncrona para carregar os dados do arquivo JSON
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados); // Renderiza todos os cards inicialmente
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

// Função para renderizar os cards na tela
function renderizarCards(items) {
    cardcontainer.innerHTML = ""; // Limpa o container antes de renderizar novos cards

    if (items.length === 0) {
        cardcontainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    for (let item of items) {
        let article = document.createElement("article");
        article.innerHTML = `
            <h2>${item.nome}</h2>
            <p>
                <strong>Ano de Criação:</strong> ${item.data_criacao} <br>
            </p>
            <p>${item.descricao}</p>
            <a href="${item.link}" target="_blank">Saiba mais</a> 
            `;
        cardcontainer.appendChild(article);
    }
}

// Função para filtrar os dados com base no termo de busca
function buscar() {
    const termo = campoBusca.value.toLowerCase();
    const resultados = dados.filter(item =>
        item.nome.toLowerCase().includes(termo) ||
        item.descrição.toLowerCase().includes(termo)
    );
    renderizarCards(resultados);
}

// Adiciona os "escutadores" de eventos para acionar a busca
botaoBusca.addEventListener("click", buscar);
campoBusca.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        buscar();
    }
});

// Inicia o carregamento dos dados quando a página é carregada
carregarDados();
