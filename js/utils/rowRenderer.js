import { calculateTrend } from './trendCalculator.js';

export function renderRow(item, index, cleanData, rowTemplate) {
    const prevItem = index > 0 ? cleanData[index - 1] : null;
    const { trendClass, trendIcon } = calculateTrend(item, prevItem);
    
    return rowTemplate
        .replace('[DATE]', item.exchangedate)
        .replace('[RATE]', item.rate.toFixed(4))
        .replace('[TREND_CLASS]', trendClass)
        .replace('[TREND_ICON]', trendIcon);
}