const scrape =  require("../../scrape");
const { utils } = require("../../utils/utils");
const { db } = require('../../db/dbConection');
const { CONSTANTS } = require('../../utils/constants'); 

const ref = db.collection(CONSTANTS.DBCollections.dollarPrice)
              .doc(CONSTANTS.DBDocs.bankInfo)
              .collection(CONSTANTS.DBCollections.exchangePrices);


const getSnapshot = async (bankName) => {
    const snapshot = ref.where('name', '==', bankName).orderBy("date", "desc").limit(1).get();
    return snapshot;
}

const getBRData = async (req, res) => {
    let snapshot = await getSnapshot(CONSTANTS.bankNames.banreservas); 
    snapshot.forEach((doc) => res.json(doc.data()));
}

const getScotiaData = async (req, res) => {
    let snapshot = await getSnapshot(CONSTANTS.bankNames.scotiabank); 
    snapshot.forEach((doc) => res.json(doc.data()));
}

const getPopularData = async (req, res) => {
    let snapshot = await getSnapshot(CONSTANTS.bankNames.popular); 
    snapshot.forEach((doc) => res.json(doc.data()));
}

const getBancoCaribeData = async (req, res) => {
    let snapshot = await getSnapshot(CONSTANTS.bankNames.caribe); 
    snapshot.forEach((doc) => res.json(doc.data()));
}

const getAPAPData = async (req, res) => {
    let snapshot = await getSnapshot(CONSTANTS.bankNames.apap); 
    snapshot.forEach((doc) => res.json(doc.data()));
}

const getBHDData = async (req, res) => {
    let snapshot = await getSnapshot(CONSTANTS.bankNames.bhd); 
    snapshot.forEach((doc) => res.json(doc.data()));
}

const getPromericaData = async (req, res) => {
    let snapshot = await getSnapshot(CONSTANTS.bankNames.promerica); 
    snapshot.forEach((doc) => res.json(doc.data()));
}

const getAllBanksData = async (req, res) => {
    const banks = utils.getBankNames();
    let snapshot = null;
    let result = [];
    for(value of banks) {
        snapshot = await getSnapshot(value);
        snapshot.forEach(doc => {
            result.push(doc.data());
        });
    }
    res.json(result);
}

module.exports = {
    getBRData,
    getScotiaData,
    getPopularData,
    getBancoCaribeData,
    getAPAPData,
    getBHDData,
    getAllBanksData,
    getPromericaData,
    
}
