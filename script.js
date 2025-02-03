// script.js

// Variáveis globais
let isDarkMode = false;

// Função para alternar entre modo claro e escuro
document.getElementById('theme-switch').addEventListener('change', () => {
    isDarkMode = document.getElementById('theme-switch').checked;
    document.body.classList.toggle('dark-mode', isDarkMode);
});

// Função para virar o cartão de moeda
const currencyCard = document.getElementById('currency-card');
currencyCard.addEventListener('click', () => {
    currencyCard.classList.toggle('flipped');
});

// Função para buscar cotações da API
async function fetchExchangeRate(fromCurrency, toCurrency) {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        document.getElementById('exchange-rate').textContent = rate.toFixed(4);
        document.getElementById('date').textContent = new Date(data.timestamp * 1000).toLocaleDateString();
        document.getElementById('last-updated').textContent = new Date(data.timestamp * 1000).toLocaleTimeString();
        return rate;
    } catch (error) {
        console.error('Erro ao buscar cotações:', error);
        return null;
    }
}

// Função para converter valores
document.getElementById('convert-btn').addEventListener('click', async () => {
    const fromCurrency = document.getElementById('from-select').value;
    const toCurrency = document.getElementById('to-select').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!isNaN(amount)) {
        const rate = await fetchExchangeRate(fromCurrency, toCurrency);
        if (rate !== null) {
            const convertedAmount = amount * rate;
            document.getElementById('converted-amount').textContent = convertedAmount.toFixed(2);
        }
    } else {
        alert('Por favor, insira um valor válido.');
    }
});

// Atualiza os nomes das moedas exibidas
function updateCurrencyDisplay() {
    const fromCurrency = document.getElementById('from-select').value;
    const toCurrency = document.getElementById('to-select').value;
    document.getElementById('from-currency').textContent = fromCurrency;
    document.getElementById('to-currency').textContent = toCurrency;
}

// Eventos para atualizar as moedas selecionadas
document.getElementById('from-select').addEventListener('change', () => {
    updateCurrencyDisplay();
    fetchExchangeRate(document.getElementById('from-select').value, document.getElementById('to-select').value);
});

document.getElementById('to-select').addEventListener('change', () => {
    updateCurrencyDisplay();
    fetchExchangeRate(document.getElementById('from-select').value, document.getElementById('to-select').value);
});

// Variáveis globais
let isFlipped = false;

// Função para converter valores
document.getElementById('convert-btn').addEventListener('click', async () => {
    const fromCurrency = document.getElementById('from-select').value;
    const toCurrency = document.getElementById('to-select').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!isNaN(amount)) {
        const rate = await fetchExchangeRate(fromCurrency, toCurrency);
        if (rate !== null) {
            const convertedAmount = amount * rate;

            // Atualiza os valores no cartão
            document.getElementById('converted-amount').textContent = convertedAmount.toFixed(2);
            document.getElementById('back-exchange-rate').textContent = rate.toFixed(4);
            document.getElementById('to-currency-symbol').textContent = toCurrency; // Adiciona a sigla da moeda

            // Virar o cartão
            const currencyCard = document.getElementById('currency-card');
            if (!isFlipped) {
                currencyCard.classList.add('flipped');
                isFlipped = true;

                // Alterar o texto do botão
                document.getElementById('convert-btn').textContent = 'Converter Novamente';
            } else {
                // Reverter o cartão
                currencyCard.classList.remove('flipped');
                isFlipped = false;

                // Restaurar o texto do botão
                document.getElementById('convert-btn').textContent = 'Converter';
            }
        }
    } else {
        alert('Por favor, insira um valor válido.');
    }
});

// Função para buscar cotações da API
async function fetchExchangeRate(fromCurrency, toCurrency) {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        document.getElementById('exchange-rate').textContent = rate.toFixed(4);
        document.getElementById('back-exchange-rate').textContent = rate.toFixed(4); // Sincroniza com a parte de trás
        return rate;
    } catch (error) {
        console.error('Erro ao buscar cotações:', error);
        return null;
    }
}

// Inicialização
updateCurrencyDisplay();
fetchExchangeRate('USD', 'BRL');