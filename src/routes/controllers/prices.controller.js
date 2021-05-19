const scrape =  require("../../scrape");

const getData = async (scrapeFunc) => {
    try {
        const data = await scrapeFunc();
        return data;
    } catch(error) { throw error; }
}

const getBRData = async (req, res) => {
    const BRData = await getData(scrape.scrapeBR)
    .catch( e => { console.error(e) });
    res.json(BRData);
}

const getScotiaData = async (req, res) => {
    const scotiaData = await getData(scrape.scrapeScotiaBank)
    .catch( e => { console.error(e) });
    res.json(scotiaData);
}

const getPopularData = async (req, res) => {
    const popularData = await getData(scrape.scrapePopular)
    .catch( e => { console.error(e) });
    res.json(popularData);
}

const getBancoCaribeData = async (req, res) => {
    const bancoCaribeData = await getData(scrape.scrapeBancoCaribe)
    .catch( e => { console.error(e) });
    res.json(bancoCaribeData);
}

const getAPAPData = async (req, res) => {
    const APAPData = await getData(scrape.scrapeAPAP)
    .catch( e => { console.error(e) });
    res.json(APAPData);
}

const getBHDData = async (req, res) => {
    const BHDData = await getData(scrape.scrapeBHD)
    .catch( e => { console.error(e) });
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
