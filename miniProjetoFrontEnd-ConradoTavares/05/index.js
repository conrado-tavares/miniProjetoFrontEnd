// Função para recuperar os interesses do localStorage e exibi-los na lista
function carregarInteresses() {
    // Recupera a string de interesses do localStorage
    const interessesString = localStorage.getItem('meus-interesses');

    // Converte a string de volta para um array, se existir
    const interesses = interessesString ? JSON.parse(interessesString) : [];

    // Seleciona o elemento <ul> onde os interesses serão exibidos
    const listaInteresses = document.querySelector('.list ul');

    // Limpa o conteúdo atual da lista
    listaInteresses.innerHTML = '';

    // Itera sobre o array de interesses e cria um <li> para cada um
    interesses.forEach(interesse => {
        const li = document.createElement('li');
        li.textContent = interesse;
        listaInteresses.appendChild(li);
    });
}

// Chama a função para carregar os interesses quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarInteresses);

// Atualiza a lista de interesses a cada 1 segundo
setInterval(carregarInteresses, 1000);

// Função para adicionar um novo interesse
function adicionarInteresse() {
    const input = document.querySelector('.form input');
    const novoInteresse = input.value.trim();

    if (novoInteresse) {
        // Recupera os interesses atuais do localStorage
        const interessesString = localStorage.getItem('meus-interesses');
        const interesses = interessesString ? JSON.parse(interessesString) : [];

        // Adiciona o novo interesse ao array
        interesses.push(novoInteresse);

        // Salva o array atualizado no localStorage
        localStorage.setItem('meus-interesses', JSON.stringify(interesses));

        // Limpa o campo de input
        input.value = '';

        // Recarrega a lista de interesses
        carregarInteresses();
    }
}

// Função para limpar a lista de interesses
function limparLista() {
    // Remove os interesses do localStorage
    localStorage.removeItem('meus-interesses');

    // Seleciona o elemento <ul> onde os interesses são exibidos
    const listaInteresses = document.querySelector('.list ul');

    // Limpa o conteúdo atual da lista no DOM
    listaInteresses.innerHTML = '';
}

// Função para carregar a notícia em destaque do IBGE
function carregarNoticia() {
    fetch('https://servicodados.ibge.gov.br/api/v3/noticias/?destaque=0')
        .then(response => response.json())
        .then(data => {
            // Obtém a lista de itens
            const items = data.items;

            if (items && items.length > 0) {
                // Obtém o primeiro item da lista
                const primeiraNoticia = items[0];

                // Obtém o título da primeira notícia
                const tituloNoticia = primeiraNoticia.titulo;

                // Exibe o título da notícia em destaque no DOM
                const tituloNoticiaElemento = document.querySelector('.title-news-today');
                tituloNoticiaElemento.textContent = tituloNoticia;
            }
        })
        .catch(error => console.error('Erro ao carregar a notícia:', error));
}

// Chama a função para carregar a notícia quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarNoticia);


// Adiciona event listeners para os botões
document.querySelector('.button-add').addEventListener('click', adicionarInteresse);
document.querySelector('.button-clear').addEventListener('click', limparLista);
