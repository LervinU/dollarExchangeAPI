const { utils } = require("../../utils/utils");
const { db } = require('../../db/dbConection');
const { CONSTANTS } = require('../../utils/constants'); 

const ref = db.collection(CONSTANTS.DBCollections.dollarPrice)
              .doc(CONSTANTS.DBDocs.bankInfo)
              .collection(CONSTANTS.DBCollections.exchangePrices);


const getSnapshot = async (bankName) => {
    const snapshot = ref.where('name', '==', bankName).orderBy("date", "desc").limit(2).get();
    return snapshot;
}

const getObj = (data) => {
    return {
        name: data.name,
        sellsDollar: data.sellsDollar,
        buysDollar: data.buysDollar,
        spread: utils.calculateSpread(data.buysDollar, data.sellsDollar),
        date: data.date.toDate()
    }
}

const getResultArr = (resultArr) => {
    let result = resultArr; // [0] is the most resent record
    if(resultArr.length > 1) {
        result[0].variation = {
            buyVariation: utils.getPercentageVariation(result[0].buysDollar, result[1].buysDollar),
            sellVariation: utils.getPercentageVariation(result[0].sellsDollar, result[1].sellsDollar),
            buyVariationAmount: utils.getAmountVariation(result[0].buysDollar, result[1].buysDollar),
            sellVariationAmount: utils.getAmountVariation(result[0].sellsDollar, result[1].sellsDollar),
        };
        return result[0];
    } else {
        result[0].variation = {
            buyVariation: "0.00",
            sellVariation: "0.00",
            buyVariationAmount: "0.00",
            sellVariationAmount: "0.00"
        };
        return resultArr[0];
    }
};

const getResponseObj = (snapshot) => {
    let result = []; 
    snapshot.forEach((doc) => result.push(getObj(doc.data())));
    result = getResultArr(result);
    return result;
};

const getBRData = async (req, res) => {
    let snapshot = await getSnapshot(CONSTANTS.bankNames.banreservas);
    const result = getResponseObj(snapshot);
    res.json(result);
}

const getScotiaData = async (req, res) => {
    let snapshot = await getSnapshot(CONSTANTS.bankNames.scotiabank);
    const result = getResponseObj(snapshot);
    res.json(result);
}
9
const getPopularData = async (req, res) => {
    let snapshot = await getSnapshot(CONSTANTS.bankNames.popular); 
    const result = getResponseObj(snapshot);
    res.json(result);
}

const getBancoCaribeData = async (req, res) => {
    let snapshot = await getSnapshot(CONSTANTS.bankNames.caribe); 
    const result = getResponseObj(snapshot);
    res.json(result);
}

const getAPAPData = async (req, res) => {
    let snapshot = await getSnapshot(CONSTANTS.bankNames.apap); 
    const result = getResponseObj(snapshot);
    res.json(result);
}

const getBHDData = async (req, res) => {
    let snapshot = await getSnapshot(CONSTANTS.bankNames.bhd); 
    const result = getResponseObj(snapshot);
    res.json(result);
}

const getPromericaData = async (req, res) => {
    let snapshot = await getSnapshot(CONSTANTS.bankNames.promerica); 
    const result = getResponseObj(snapshot);
    res.json(result);
}

const getAllBanksData = async (req, res) => {
    const banks = utils.getBankNames();
    let snapshot = null;
    let result = [];
    let bankData = null;
    for(value of banks) {
        snapshot = await getSnapshot(value);
        bankData = getResponseObj(snapshot);
        result.push(bankData);
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
