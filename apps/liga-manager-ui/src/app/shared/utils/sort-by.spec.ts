import { sortArrayBy } from './sort-by';

describe('sortArrayBy', () => {
    it('should sort an array by key', () => {
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
        sortArrayBy(array, 'name');
        expect(array).toStrictEqual([
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
});
