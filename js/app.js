import { loadTemplate } from './services/templateLoader.js';
import { handleGetRateClick } from './eventHandlers.js';

async function init() {
    const appContainer = document.getElementById('app');
    
    appContainer.innerHTML = await loadTemplate('./templates/app.html');

    const currency = document.getElementById('currency');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const btn = document.getElementById('getRate');
    const result = document.getElementById('result');

    btn.addEventListener('click', () => {
        handleGetRateClick(startDate, endDate, currency, result);
    });
}
init();