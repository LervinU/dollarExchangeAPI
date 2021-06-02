const scrape = require('../scrape');

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
    } 

}

module.exports = {
    utils
}

