const { db } = require('./dbConection');
const scrape =  require("../scrape");
const admin = require('firebase-admin');
const { utils } = require('../utils/utils');
const { CONSTANTS } = require('../utils/constants');

const scrapeTimeInterval = 60000; //1 minutes

const saveToDB = async () => {
    let modelObj = {}
    const { stringToNumber } = utils;
    for (const [key, value] of Object.entries(scrape)) {
        let bankData = await utils.getScrappedData(value)
        .catch(e => console.error(e));
        modelObj = {
            name: bankData.title,
            buysDollar: stringToNumber(bankData.buysDollar),
            sellsDollar: stringToNumber(bankData.sellsDollar),
            date: admin.firestore.Timestamp.fromMillis(Date.now())
        }
        if(modelObj !== null && (typeof modelObj.buysDollar) === "number" && (typeof modelObj.sellsDollar) === "number") {
            validateInsertion(modelObj);
        }
    }
}


const writeToDB = async (modelObj) => {
    await db.collection(CONSTANTS.DBCollections.dollarPrice)
            .doc(CONSTANTS.DBDocs.bankInfo)
            .collection(CONSTANTS.DBCollections.exchangePrices)
            .add(modelObj);
};

const validateInsertion = async (modelObj) => {
    let snapshot;
    const ref = db.collection(CONSTANTS.DBCollections.dollarPrice)
                  .doc(CONSTANTS.DBDocs.bankInfo)
                  .collection(CONSTANTS.DBCollections.exchangePrices);

        snapshot = await ref.where('name', '==', modelObj.name).orderBy("date", "desc").limit(1).get();
        if (snapshot.size < 1) {
            writeToDB(modelObj);
        } else {
            snapshot.forEach(doc => {
                if(modelObj.buysDollar != doc.data().buysDollar || modelObj.sellsDollar != doc.data().sellsDollar) {
                    writeToDB(modelObj);
                }
            });
        }
};


module.exports = {
    saveToDB,
    scrapeTimeInterval
}