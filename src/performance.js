const { performance } = require('perf_hooks');
const scraper = require('./scrape');


const testPopular = async () => {
    let avgList = [];
    let t0 = null;
    let t1 = null;
    for(let i = 0; i < 20; i++) {
        t0 = performance.now();
        await scraper.scrapePopular();
        t1 = performance.now();

        avgList.push(t1 - t0);
    }

    const avg = avgList.reduce((a, b) => a + b) / avgList.length;
    console.log("Average time: " + (avg / 1000));
};

testPopular();