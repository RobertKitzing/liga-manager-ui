export function sortArrayBy<T>(array: T[], key: keyof T) {
    return [...array].sort((a, b) => {
        if (a[key] > b[key]) {
            return 1;
        }
        if (a[key] < b[key]) {
            return -1;
        }
        return 0;
    });
}
