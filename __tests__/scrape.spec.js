const scrape = require("../src/scrape");

describe('Scrape functions test', () => {
    test('Expected to be a Function', () => {
        expect(typeof scrape.scrapeBR).toBe(typeof Function);
    });
    test('Expected to be a Function', () => {
        expect(typeof scrape.scrapeBHD).toBe(typeof Function);
    });
    test('Expected to be a Function', () => {
        expect(typeof scrape.scrapeAPAP).toBe(typeof Function);
    });
    test('Expected to be a Function', () => {
        expect(typeof scrape.scrapePopular).toBe(typeof Function);
    });
    test('Expected to be a Function', () => {
        expect(typeof scrape.scrapeBancoCaribe).toBe(typeof Function);
    });
    test('Expected to be a Function', () => {
        expect(typeof scrape.scrapeScotiaBank).toBe(typeof Function);
    });
});