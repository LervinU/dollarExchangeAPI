const { utils } = require('../src/utils/utils');
const scrape = require('../src/scrape');

describe('Test utility functions', () => {
    test('Expected to be a number type', () => {
        const str = " sdf 56.24 hjhjd";
        expect(utils.stringToNumber(str)).toBe(56.24);
    });

    test('Expected to return percentage increase', () => {
        expect(utils.getPercentageVariation(56, 55)).toBe('1.82');
    })

    test('Expected to return the spread of the dollar price', () => {
        expect(utils.calculateSpread(56.0, 57.0)).toBe('1.00');
    });

    test('Expected to return the amount variation', () => {
        expect(utils.getAmountVariation(56, 55)).toBe("1.00");
    })

    // test('Expected to return a js Obj', () => {
    //     expect(typeof utils.getScrappedData(scrape.scrapeBR)).toBe(typeof Object)
    // });
})