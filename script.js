// script.js

// Replace with your actual endpoint
const API_URL = 'https://api.example.com/data';

async function fetchData() {
  const resp = await fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${YOUR_API_KEY}:${YOUR_API_SECRET}`
    }
  });
  if (!resp.ok) throw new Error('Network response was not ok');
  return resp.json();
}

function createChart(ctx, type, labels, data, label) {
  return new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

async function initDashboard() {
  try {
    const json = await fetchData();
    // Assume json = { timestamps: [...], valuesA: [...], valuesB: [...] }

    // Line Chart
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    createChart(lineCtx, 'line', json.timestamps, json.valuesA, 'Metric A');

    // Bar Chart
    const barCtx = document.getElementById('barChart').getContext('2d');
    createChart(barCtx, 'bar', json.timestamps, json.valuesB, 'Metric B');
  } catch (err) {
    console.error('Error loading data:', err);
  }
}

window.onload = initDashboard;
