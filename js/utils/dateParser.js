export function parseDateString(str) {
    const [d, m, y] = str.split('.');
    return new Date(`${y}-${m}-${d}`);
}