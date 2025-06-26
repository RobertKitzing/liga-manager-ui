export function sortArrayBy<T>(array: T[], key: keyof T, dir: 'asc' | 'desc' = 'asc') {
    return [...array || []].sort((a, b) => {
        if (a[key] > b[key]) {
            return dir === 'asc' ? 1 : -1;
        }
        
        if (a[key] < b[key]) {
            return dir === 'asc' ? -1 : 1;
        }
        return 0;
    });
}
