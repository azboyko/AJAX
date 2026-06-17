export function filterCleanData(allResponses) {
    const result = []; 
    for (const item of allResponses) {
        if (item && item.length > 0) {
            result.push(item[0]); 
        }
    }
    return result; 
}