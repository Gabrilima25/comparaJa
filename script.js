// Função para obter um novo token de acesso usando o refresh token
function renewAccessToken(refreshToken) {
  const client_id = '2167142870741927'; // Seu Client ID
  const client_secret = 'vsN6PSMfpYK9zsP6sBiYdAMvP3sro9Q1'; // Seu Client Secret
  const redirect_uri = 'https://gabrilima25.github.io'; // Seu redirect URI

  // Requisição para renovar o token
  fetch('https://api.mercadolibre.com/oauth/token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: client_id,
          client_secret: client_secret,
          refresh_token: refreshToken,
          redirect_uri: redirect_uri
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.access_token) {
          // Armazene o novo token de acesso
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          console.log('Token renovado com sucesso!');
      } else {
          console.error('Erro ao renovar o token:', data);
      }
  })
  .catch(error => {
      console.error('Erro ao renovar o token:', error);
  });
}

// Função para obter o token de acesso armazenado ou renovar se necessário
function getAccessToken() {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  // Se o token de acesso expirou, renove-o
  if (!accessToken || isAccessTokenExpired(accessToken)) {
      if (refreshToken) {
          // Tente renovar o token com o refresh_token
          renewAccessToken(refreshToken);
      } else {
          console.error('Não há refresh token disponível para renovar o acesso.');
      }
  }

  return accessToken;
}

// Função para verificar se o token de acesso expirou
function isAccessTokenExpired(accessToken) {
  const tokenParts = accessToken.split('.');
  const decoded = JSON.parse(atob(tokenParts[1]));
  const expirationTime = decoded.exp * 1000; // exp é o tempo de expiração em segundos
  const currentTime = Date.now();

  return currentTime >= expirationTime;
}

// Exemplo de uso: antes de fazer uma requisição, verifique e renove o token se necessário
const accessToken = getAccessToken();
if (accessToken) {
  // Agora você pode usar o accessToken para fazer requisições à API
  console.log('Token de acesso válido:', accessToken);
  // Exemplo de requisição à API do Mercado Livre usando o token de acesso
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=mesa`, {
      headers: {
          'Authorization': `Bearer ${accessToken}`
      }
  })
  .then(response => response.json())
  .then(data => {
      console.log('Dados da API:', data);
  })
  .catch(error => {
      console.error('Erro ao buscar dados:', error);
  });
}