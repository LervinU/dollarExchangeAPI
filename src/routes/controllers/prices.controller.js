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

const getAPAPData = async (req, res) => {
    const APAPData = await scrape.scrapeAPAP();
    res.json(APAPData);
}

const getBHDData = async (req, res) => {
    const BHDData = await scrape.scrapeBHD();
    res.json(BHDData);
}

const getAllBanksData = async (req, res) => {
    const data = [];
    for (const [key, value] of Object.entries(scrape)) {
        data.push(await value())
    }
    res.json(data);
}




module.exports = {
    getBRData,
    getScotiaData,
    getPopularData,
    getBancoCaribeData,
    getAPAPData,
    getBHDData,
    getAllBanksData
    
}
