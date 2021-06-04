const scrape = require('../scrape');
const { CONSTANTS } = require('./constants');

const utils = {
    
    stringToNumber: (string) => {
        return parseFloat(string.replace(/[^\d.-]/g, ''));
    },

    getBestRate: async () => {
        const BRData = await scrape.scrapeBR();
    },

    getScrappedData: async (scrapeFunc) => {
        try {
            const data = await scrapeFunc();
            return data;
        } catch(error) { throw error; }
    },

    getBankNames: () => {
        const banks = (() => {
            let names = [];
            for(const [key, value] of Object.entries(CONSTANTS.bankNames)) {
                names.push(value);
            }
            return names;
        })();
        return banks;
    }

}

module.exports = {
    utils
}
