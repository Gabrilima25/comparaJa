document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o recarregamento da página
  
    const searchInput = document.getElementById("search-input").value;
    const resultsContainer = document.getElementById("results");
  
    // Limpa os resultados anteriores
    resultsContainer.innerHTML = "";
  
    // Simulando resultados
    const dummyResults = [
      {
        name: "Máquina de cortar cabelo profissional",
        price: "R$ 129,90",
        image: "https://via.placeholder.com/250",
        link: "https://mercadolivre.com"
      },
      {
        name: "Máquina de acabamento barbeiro",
        price: "R$ 89,90",
        image: "https://via.placeholder.com/250",
        link: "https://mercadolivre.com"
      },
      {
        name: "Kit barbeador e cortador 3 em 1",
        price: "R$ 199,00",
        image: "https://via.placeholder.com/250",
        link: "https://mercadolivre.com"
      }
    ];
  
    dummyResults.forEach(item => {
      const productDiv = document.createElement("div");
      productDiv.className = "result-item";
      productDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <a href="${item.link}" target="_blank">Ver produto</a>
      `;
      resultsContainer.appendChild(productDiv);
    });
  });