export function getDates(start, end) {
    const dates = [];
    const current = new Date(start);
    const last = new Date(end);

    while (current <= last) {
        const formatted = current.toISOString().slice(0, 10).replaceAll('-', '');
        dates.push(formatted);
        current.setDate(current.getDate() + 1);
    }
    return dates;
}