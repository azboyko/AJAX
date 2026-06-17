export function calculateTrend(item, prevItem) {
    const upIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`;
    const downIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="7" x2="17" y2="17"></line><polyline points="17 7 17 17 7 17"></polyline></svg>`;
    const neutralIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;

    if (!prevItem) return { trendClass: "up", trendIcon: upIcon };

    if (item.rate < prevItem.rate) {
        return { trendClass: "down", trendIcon: downIcon };
    } else if (item.rate === prevItem.rate) {
        return { trendClass: "neutral", trendIcon: neutralIcon };
    }

    return { trendClass: "up", trendIcon: upIcon };
}