const scrape = require('./scrape');

const getBestRate = async () => {
    const BRData = await scrape.scrapeBR();
    
}

