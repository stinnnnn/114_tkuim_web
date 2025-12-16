document.addEventListener('DOMContentLoaded', () => {
    // Initialize Chart.js
    const ctx = document.getElementById('mainChart').getContext('2d');

    // Gradient for the chart
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 122, 255, 0.5)'); // Blue top
    gradient.addColorStop(1, 'rgba(0, 122, 255, 0.0)'); // Transparent bottom

    const mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
            datasets: [{
                label: 'Bitcoin Price (USD)',
                data: [62000, 62500, 61800, 63200, 64100, 63800, 64231],
                borderColor: '#007aff',
                backgroundColor: gradient,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.4 // Smooth curve
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#1e2536',
                    titleColor: '#fff',
                    bodyColor: '#94a3b8',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    displayColors: false,
                    padding: 10
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            family: "'Inter', sans-serif",
                            size: 11
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            family: "'JetBrains Mono', monospace",
                            size: 11
                        },
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });

    // Timeframe Buttons Interaction
    const timeBtns = document.querySelectorAll('.time-btn');
    timeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            timeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Mock data update effect
            const randomData = Array.from({length: 7}, () => Math.floor(Math.random() * (65000 - 60000) + 60000));
            mainChart.data.datasets[0].data = randomData;
            mainChart.update();
        });
    });

    // Trade Tab Interaction
    const tradeTabs = document.querySelectorAll('.trade-tab');
    const tradeBtn = document.querySelector('.trade-form .btn');
    
    tradeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tradeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            if (tab.textContent === 'Sell') {
                tradeBtn.textContent = 'Sell Bitcoin';
                tradeBtn.style.backgroundColor = '#ef4444'; // Red
            } else {
                tradeBtn.textContent = 'Buy Bitcoin';
                tradeBtn.style.backgroundColor = '#007aff'; // Blue
            }
        });
    });
});