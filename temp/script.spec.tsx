import { func } from './script';

describe('func', () => {
    it('should return "Some string."', () => {
        expect(func()).toEqual('Some string.');
    });

    it('should log "We\'re live." to the console', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        func();
        expect(consoleSpy).toHaveBeenCalledWith("We're live.");
    });
});
