import './style.css';

let allCoins = [];
const RATES = { usd: 1, bs: 36.5, eur: 0.92, mxn: 17.1, cop: 3900 };

// SPLASH & AUTH
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash-screen').classList.add('opacity-0');
        setTimeout(() => {
            document.getElementById('splash-screen').style.display = 'none';
            document.getElementById('login-screen').classList.remove('hidden');
            setTimeout(() => document.getElementById('login-card').classList.add('scale-100', 'opacity-100'), 100);
        }, 700);
    }, 2000);
});

document.getElementById('btn-login').addEventListener('click', () => {
    const user = document.getElementById('user-name').value;
    const pass = document.getElementById('user-pass').value;
    if (user === 'admin' && pass === '1234') {
        document.getElementById('login-screen').style.display = 'none';
        init();
    }
});

document.getElementById('btn-logout').addEventListener('click', () => location.reload());

async function init() {
    const progress = document.getElementById('main-progress');
    try {
        progress.style.width = '100%';
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&price_change_percentage=7d');
        allCoins = await res.json();
        renderGrid(allCoins);
        renderSidebar(allCoins);
        setTimeout(() => progress.style.width = '0%', 1200);
    } catch (e) { console.error(e); }
}

function renderGrid(coins) {
    const grid = document.getElementById('crypto-grid');
    if (!grid) return;
    grid.innerHTML = coins.map(coin => `
        <div onclick="showDetail('${coin.id}')" class="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group active:scale-95">
            <div class="flex justify-between items-center mb-6">
                <img src="${coin.image}" class="w-12 h-12 group-hover:rotate-12 transition-transform">
                <span class="text-[10px] font-black text-brand-accent bg-purple-50 px-2 py-1 rounded-lg uppercase">${coin.symbol}</span>
            </div>
            <h3 class="text-xl font-extrabold mb-1">${coin.name}</h3>
            <p class="text-2xl font-black text-brand-dark">$${coin.current_price.toLocaleString()}</p>
            <div class="mt-4 flex items-center gap-2 text-xs font-bold ${coin.price_change_percentage_24h > 0 ? 'text-emerald-500' : 'text-red-500'}">
                ${coin.price_change_percentage_24h > 0 ? '▲' : '▼'} ${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </div>
        </div>
    `).join('');
}

window.showDetail = (id) => {
    const coin = allCoins.find(c => c.id === id);
    const mainView = document.getElementById('main-view');
    
    mainView.innerHTML = `
        <div class="max-w-6xl mx-auto animate-in fade-in zoom-in duration-500">
            <button onclick="window.goBack()" class="mb-8 font-black text-brand-accent flex items-center gap-2 hover:underline">
                <span class="text-2xl">←</span> VOLVER AL MERCADO
            </button>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
                    <div class="flex justify-between items-center mb-8">
                        <div class="flex items-center gap-4">
                            <img src="${coin.image}" class="w-16 h-16">
                            <h2 class="text-4xl font-black">${coin.name}</h2>
                        </div>
                        <div class="text-right">
                            <p class="text-3xl font-black text-brand-dark">$${coin.current_price.toLocaleString()}</p>
                            <p class="font-bold text-emerald-500">${coin.price_change_percentage_7d_in_currency.toFixed(2)}% (7d)</p>
                        </div>
                    </div>
                    <canvas id="coinChart" height="150"></canvas>
                </div>

                <div class="bg-white p-10 rounded-[3rem] shadow-xl border-2 border-brand-accent/10">
                    <h3 class="font-black text-xl mb-6">Calculadora Global</h3>
                    <input type="number" id="qty" value="1" class="w-full p-5 bg-slate-50 rounded-2xl mb-6 font-black text-3xl outline-none focus:ring-4 focus:ring-brand-accent/10">
                    <div class="space-y-3">
                        ${Object.keys(RATES).map(r => `
                            <div class="bg-brand-dark text-white p-5 rounded-2xl flex justify-between items-center group hover:bg-brand-accent transition-colors">
                                <span class="text-[10px] font-black opacity-40 uppercase">${r}</span>
                                <span id="val-${r}" class="text-xl font-bold">0</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    // gráfica 
    const ctx = document.getElementById('coinChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: coin.sparkline_in_7d.price.map((_, i) => i),
            datasets: [{
                label: 'Precio (USD)',
                data: coin.sparkline_in_7d.price,
                borderColor: '#7c3aed',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 4,
                pointRadius: 0
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: true, grid: { color: '#f1f5f9' } } }
        }
    });

    const update = () => {
        Object.keys(RATES).forEach(r => document.getElementById(`val-${r}`).innerText = (document.getElementById('qty').value * coin.current_price * RATES[r]).toLocaleString());
    };
    document.getElementById('qty').addEventListener('input', update);
    update();
};

window.goBack = () => {
    document.getElementById('main-view').innerHTML = '<div id="crypto-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"></div>';
    renderGrid(allCoins);
};

// Buscador
document.getElementById('search-input').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allCoins.filter(c => c.name.toLowerCase().includes(term) || c.symbol.toLowerCase().includes(term));
    const notFound = document.getElementById('not-found');
    
    if (term.length > 0 && filtered.length === 0) {
        notFound.classList.remove('hidden');
        renderGrid([]);
    } else {
        notFound.classList.add('hidden');
        renderGrid(filtered);
    }
});

// Siddebar toggle
document.getElementById('open-sidebar').addEventListener('click', () => document.getElementById('sidebar').classList.remove('-translate-x-full'));
document.getElementById('close-sidebar').addEventListener('click', () => document.getElementById('sidebar').classList.add('-translate-x-full'));
document.getElementById('go-home').addEventListener('click', () => { window.goBack(); document.getElementById('sidebar').classList.add('-translate-x-full'); });

function renderSidebar(coins) {
    document.getElementById('sidebar-stats').innerHTML = coins.slice(0, 8).map(c => `
        <div class="p-4 bg-white/5 rounded-2xl flex justify-between text-xs hover:bg-white/10 transition-colors">
            <span class="font-bold opacity-60">${c.name}</span>
            <span class="${c.price_change_percentage_24h > 0 ? 'text-emerald-400' : 'text-red-400'} font-black">${c.price_change_percentage_24h.toFixed(1)}%</span>
        </div>
    `).join('');
}