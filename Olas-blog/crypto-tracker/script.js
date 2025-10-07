const container = document.getElementById('crypto-container');

async function getExchangeRate() {
  try {
    const res = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=NGN');
    const data = await res.json();
    return data.rates;
  } catch (err) {
    console.error("Failed to fetch exchange rate:",err);
    return 0;
  } 
} 

async function getCryptoData ()  {
    const container = document.getElementById('crypto-container');
    container.innerHTML = '';

    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      );
      const coins = await res.json();
      displayData(coins);
    } catch (err) {
      console.error('Error fetching data:',err);
      document.getElementById('crypto-container').innerText="Failed to load data";
    } 
}
 
async function displayData(coins) {
  const exchangeRate = await getExchangeRate();
  const container = document.getElementById('crypto-container');
  container.innerHTML = '';

document.getElementById('search-input').addEventListener('input', function (e) {
    const searchTerm = e.target.value;

    const coinElements = document.querySelectorAll('#crypto-container div');

    coinElements.forEach((coin) => {
      const coinName = coin.textContent.toLowerCase();

      if (coinName.includes(searchTerm)) {  
        coin.style.display = 'block';
      } else {
        coin.style.display = 'none';  
      }
    });
});

  coins.forEach((coin) =>{
    const nairaPrice = (coin.current_price * exchangeRate).toFixed(2);
    const priceChange = coin.price_change_percentage_24h;
    const changeColor = priceChange >= 0 ? 'green' : 'red';

    const coinElement = document.createElement('div');
    coinElement.innerHTML = `
      <div class="coin-card">
          <img src="${coin.image}" alt="${coin.name}" class="coin-logo">
          <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
          <p>USD: $${coin.current_price}</p>
          <p>NGN: #${nairaPrice}</p>
          <p style="color: ${changeColor};">  
              24h Change:${priceChange.toFixed(2)}%
          </p>
          <hr />
      </div>
    `;
    container.appendChild(coinElement);
  });
}

const refreshButton = document.getElementById('refresh-btn');

refreshButton.addEventListener('click',() => {
    console.log("Button clicked");
    getCryptoData();
});

getCryptoData();