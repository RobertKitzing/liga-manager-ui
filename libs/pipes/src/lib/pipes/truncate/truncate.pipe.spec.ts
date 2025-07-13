import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {

    let pipe: TruncatePipe;

    beforeEach(() => {
        pipe = new TruncatePipe();
    });

    it('should init', () => {
        expect(pipe).toBeTruthy();
    })

    it('should return only the first letter', () => {
        expect(pipe.transform('test')).toBe('t');
    })

});
