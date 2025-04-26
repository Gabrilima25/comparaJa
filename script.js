document.getElementById('searchButton').addEventListener('click', function() {
  let searchQuery = document.getElementById('searchInput').value.trim();
  if (searchQuery === '') {
      alert('Por favor, insira um termo de pesquisa.');
      return;
  }

  // Fazendo a requisição à API do Mercado Livre com token
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${searchQuery}`, {
      headers: {
          'Authorization': 'Bearer APP_USR-2167142870741927-042617-deca4b4e32f4aca0f1c49e5d5837b2a2-1889101079'
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Erro na resposta da API');
      }
      return response.json();
  })
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