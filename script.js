document.getElementById('searchButton').addEventListener('click', function() {
  let searchQuery = document.getElementById('searchInput').value.trim();
  if (searchQuery === '') {
      alert('Por favor, insira um termo de pesquisa.');
      return;
  }

  // Token de acesso (substitua pelo seu token real)
  const accessToken = 'APP_USR-2167142870741927-042618-5590235421a4789a0494372dc5d2f7a0-1889101079';

  // Fazendo a requisição à API do Mercado Livre
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${searchQuery}`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${accessToken}`
      }
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);  // Verifique os dados recebidos da API

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