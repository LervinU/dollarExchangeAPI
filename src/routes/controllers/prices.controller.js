const scrape =  require("../../scrape");

const getBRData = async (req, res) => {
    const BRData = await scrape.scrapeBR();
    res.json(BRData);
}

const getScotiaData = async (req, res) => {
    const scotiaData = await scrape.scrapeScotiaBank();
    res.json(scotiaData);
}

const getPopularData = async (req, res) => {
    const popularData = await scrape.scrapePopular();
    res.json(popularData);
}

const getBancoCaribeData = async (req, res) => {
    const bancoCaribeData = await scrape.scrapeBancoCaribe();
    res.json(bancoCaribeData);
}

const getAllBanksData = async (req, res) => {
    const data = [
        await scrape.scrapeBR(),
        await scrape.scrapeScotiaBank(),
        await scrape.scrapePopular(),
        await scrape.scrapeBancoCaribe()
    ]
    res.json(data);
}

module.exports = {
    getBRData,
    getScotiaData,
    getPopularData,
    getBancoCaribeData,
    getAllBanksData
}
