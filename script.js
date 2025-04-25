document.getElementById('searchButton').addEventListener('click', function() {
  let searchQuery = document.getElementById('searchInput').value.trim();
  if (searchQuery === '') {
      alert('Por favor, insira um termo de pesquisa.');
      return;
  }

  // Fazendo a requisição à API do Mercado Livre
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${searchQuery}`)
      .then(response => response.json())
      .then(data => {
          let products = data.results;
          let output = '';
          if (products.length > 0) {
              products.forEach(product => {
                  output += `
                      <div class="product">
                          <img src="${product.thumbnail}" alt="${product.title}" />
                          <h3>${product.title}</h3>
                          <p>Preço: R$ ${product.price}</p>
                          <a href="${product.permalink}" target="_blank">Ver Produto</a>
                      </div>
                  `;
              });
          } else {
              output = '<p>Nenhum produto encontrado para sua pesquisa.</p>';
          }
          document.getElementById('productList').innerHTML = output;
      })
      .catch(error => {
          console.error('Erro ao buscar os produtos:', error);
          document.getElementById('productList').innerHTML = '<p>Ocorreu um erro ao buscar os produtos. Tente novamente mais tarde.</p>';
      });
});