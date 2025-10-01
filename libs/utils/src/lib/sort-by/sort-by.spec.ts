import { sortArrayBy } from './sort-by';

describe('sortArrayBy', () => {
    it('should sort an array by key asc', () => {
        const array = [
            {
                name: 'zZZZZZ',
            },
            {
                name: 'BBBBBB',
            },
            {
                name: 'ZZZZZZ',
            },
            {
                name: 'aAAAAA',
            },
        ];
        const sorted = sortArrayBy(array, 'name');
        expect(sorted).toStrictEqual([
            {
                name: 'aAAAAA',
            },
            {
                name: 'BBBBBB',
            },
            {
                name: 'zZZZZZ',
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
