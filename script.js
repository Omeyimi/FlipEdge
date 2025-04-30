// script.js
const API_KEY = '7JPsmDFlhQbw3e6IbP';
const API_SECRET = '4U9GzMI36XbJ9BATqGjc7d1nqzGTXcy1DgQU';

const BASE_URL = 'https://api-testnet.bybit.com';

async function fetchTrades() {
  const response = await fetch('/proxy-api/fill?symbol=BTCUSDT'); // Replace with actual proxy route
  const data = await response.json();

  const tbody = document.querySelector("#tradesTable tbody");
  tbody.innerHTML = ""; // clear previous data

  data.result.list.forEach(trade => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${new Date(trade.created_time * 1000).toLocaleString()}</td>
      <td>${trade.symbol}</td>
      <td>${trade.side}</td>
      <td>${trade.qty}</td>
      <td>${trade.leverage || '—'}</td>
      <td>${trade.unrealised_pnl || 0}</td>
      <td>${trade.realised_pnl || 0}</td>
    `;
    tbody.appendChild(row);
  });
}

setInterval(fetchTrades, 5000); // refresh every 5 seconds
fetchTrades();
