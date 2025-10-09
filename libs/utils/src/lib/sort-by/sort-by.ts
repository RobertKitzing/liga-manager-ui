export function sortArrayBy(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    array: any[],
    key: string,
    dir: 'asc' | 'desc' = 'asc',
) {
    return [...(array || [])].sort((a, b) => {

        let aValue = a[key];
        if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
        }

        let bValue = b[key];
        if (typeof bValue === 'string') {
            bValue = bValue.toLowerCase();
        }

        if (aValue > bValue) {
            return dir === 'asc' ? 1 : -1;
        }

        if (aValue < bValue) {
            return dir === 'asc' ? -1 : 1;
        }
        return 0;
    });
}
