import { sortArrayBy } from './sort-by';

describe('sortArrayBy', () => {
    it('should sort an array by key asc', () => {
        const array = [
            {
                name: 'ZZZZZZ',
            },
            {
                name: 'BBBBBB',
            },
            {
                name: 'ZZZZZZ',
            },
            {
                name: 'AAAAAA',
            },
        ];
        const sorted = sortArrayBy(array, 'name');
        expect(sorted).toStrictEqual([
            {
                name: 'AAAAAA',
            },
            {
                name: 'BBBBBB',
            },
            {
                name: 'ZZZZZZ',
            },
            {
                name: 'ZZZZZZ',
            },
        ]);
    });

    it('should sort an array by key desc', () => {
        const array = [
            {
                name: 'ZZZZZZ',
            },
            {
                name: 'BBBBBB',
            },
            {
                name: 'ZZZZZZ',
            },
            {
                name: 'AAAAAA',
            },
        ];
        const sorted =sortArrayBy(array, 'name', 'desc');
        expect(sorted).toStrictEqual([
            {
                name: 'ZZZZZZ',
            },
            {
                name: 'ZZZZZZ',
            },
            {
                name: 'BBBBBB',
            },
            {
                name: 'AAAAAA',
            },
        ]);
    });
});
