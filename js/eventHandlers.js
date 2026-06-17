import { getDates } from './utils/dateRange.js';
import { sortDataByDate } from './utils/dataSorter.js';
import { renderRow } from './utils/rowRenderer.js';
import { fetchCurrencyRates } from './services/api.js';
import { loadTemplate } from './services/templateLoader.js';

export async function handleGetRateClick(startDate, endDate, currency, result) {
    if (!startDate.value || !endDate.value) {
        result.innerHTML = await loadTemplate('./templates/msg_error_dates.html');
        return;
    }

    const dates = getDates(startDate.value, endDate.value);
    result.innerHTML = await loadTemplate('./templates/msg_loading.html');

    try {
        const rawData = await fetchCurrencyRates(dates, currency.value);
        const cleanData = sortDataByDate(rawData);

        result.innerHTML = "";

        if (cleanData.length === 0) {
            result.innerHTML = await loadTemplate('./templates/msg_no_data.html');
            return;
        }

        const rowTemplate = await loadTemplate('./templates/row.html');

        cleanData.forEach((item, index) => {
            result.innerHTML += renderRow(item, index, cleanData, rowTemplate);
        });

    } catch (error) {
        console.error(error);
        result.innerHTML = await loadTemplate('./templates/msg_error_network.html');
    }
}