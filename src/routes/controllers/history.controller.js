const { utils } = require("../../utils/utils");
const { db } = require('../../db/dbConection');
const { CONSTANTS } = require('../../utils/constants'); 


const ref = db.collection(CONSTANTS.DBCollections.dollarPrice)
              .doc(CONSTANTS.DBDocs.bankInfo)
              .collection(CONSTANTS.DBCollections.exchangePrices);

const getSnapshotForHistory = async (bankName) => {
    const snapshot = ref.where('name', '==', bankName).orderBy("date", "desc").limit(5).get();
    return snapshot;
};

const getObj = (data) => {
    return {
        name: data.name,
        sellsDollar: data.sellsDollar,
        buysDollar: data.buysDollar,
        date: data.date.toDate()
    }
}

const getBRHistory = async (req, res) => {
    let snapshot = await getSnapshotForHistory(CONSTANTS.bankNames.banreservas);
    let history = [];
    snapshot.forEach((doc) => history.push(getObj(doc.data())));
    res.json(history);

}
const getScotiaBankHistory = async (req, res) => {
    let snapshot = await getSnapshotForHistory(CONSTANTS.bankNames.scotiabank);
    let history = [];
    snapshot.forEach((doc) => history.push(getObj(doc.data())));
    res.json(history);

}

const getPopularHistory = async (req, res) => {
    let snapshot = await getSnapshotForHistory(CONSTANTS.bankNames.popular);
    let history = [];
    snapshot.forEach((doc) => history.push(getObj(doc.data())));
    res.json(history);

}

const getBancoCaribeHistory = async (req, res) => {
    let snapshot = await getSnapshotForHistory(CONSTANTS.bankNames.caribe);
    let history = [];
    snapshot.forEach((doc) => history.push(getObj(doc.data())));
    res.json(history);

}

const getPromericaHistory = async (req, res) => {
    let snapshot = await getSnapshotForHistory(CONSTANTS.bankNames.promerica);
    let history = [];
    snapshot.forEach((doc) => history.push(getObj(doc.data())));
    res.json(history);

}

const getAPAPHistory = async (req, res) => {
    let snapshot = await getSnapshotForHistory(CONSTANTS.bankNames.apap);
    let history = [];
    snapshot.forEach((doc) => history.push(getObj(doc.data())));
    res.json(history);
}

const getBHDHistory = async (req, res) => {
    let snapshot = await getSnapshotForHistory(CONSTANTS.bankNames.bhd);
    let history = [];
    snapshot.forEach((doc) => history.push(getObj(doc.data())));
    res.json(history);
}


module.exports = {
    getBRHistory,
    getScotiaBankHistory,
    getPopularHistory,
    getBancoCaribeHistory,
    getPromericaHistory,
    getAPAPHistory,
    getBHDHistory
}