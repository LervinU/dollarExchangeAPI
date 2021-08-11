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

    // test('Expected to return a js Obj', () => {
    //     expect(typeof utils.getScrappedData(scrape.scrapeBR)).toBe(typeof Object)
    // });
})