export async function loadTemplate(path) {
    const response = await fetch(path);
    return await response.text();
}