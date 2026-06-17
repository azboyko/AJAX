import { parseDateString } from './dateParser.js';

export function sortDataByDate(cleanData) {
    return cleanData.sort((a, b) => {
        return parseDateString(a.exchangedate) - parseDateString(b.exchangedate);
    });
}