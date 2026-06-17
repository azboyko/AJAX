import { filterCleanData } from '../utils/dataFilter.js';

export async function fetchCurrencyRates(dates, currencyValue) {
    const requests = dates.map(date => {
        const URI = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currencyValue}&date=${date}&json`;
        return fetch(URI).then(res => res.json());
    });

    const allResponses = await Promise.all(requests);
    return filterCleanData(allResponses);
}