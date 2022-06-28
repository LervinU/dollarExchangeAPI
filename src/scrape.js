const cheerio = require('cheerio');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const { CONSTANTS } = require('./utils/constants');

const { 
    popular,
    banreservas,
    apap,
    bhd,
    promerica,
    caribe,
    scotiabank
         } = CONSTANTS.bankNames;

const args = {
        headless: true,
        'args': [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
}

const getHtml = async (url) => {
    try {
        const res = await fetch(url);
        const html = await res.text();
        const $ = cheerio.load(html);
        return $;
    } catch (err) {
        console.log(err);
    }
}


const scrapeWithPuppeteer = async (pageUrl, bankName) => {
    const browser = await puppeteer.launch(args);
    const page = await browser.newPage();
    

    await page.setRequestInterception(true);
    page.on('request', request => {
        if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet' || request.resourceType() === 'media' || request.resourceType() === 'font')
            request.abort();
        else
            request.continue();
        });

        if(bankName === popular) { 
            await page.goto(pageUrl);
            const data = await page.evaluate(() => {
                return {
                    title: "popular",
                    buysDollar: document.getElementById("compra_peso_dolar_desktop").value,
                    sellsDollar: document.getElementById("venta_peso_dolar_desktop").value
                } 
            });
           await browser.close();
           return data;
        }
        else if(bankName === apap) {
            await page.goto(pageUrl);
            const data = await page.evaluate(() => {
                return {
                    title: "apap",
                    buysDollar: document.getElementById("currency-buy").innerText,
                    sellsDollar: document.getElementById("currency-sell").innerText
                }
            });
            await browser.close();
            return data;
        }
        else if(bankName === bhd) {
            await page.goto(pageUrl);
            const data = await page.evaluate(() => {
                document.querySelector('#footer > section.footer-content-menu.clearfix > div > ul > li:nth-child(5) > a').click();
                return {
                    title: "bhd",
                    buysDollar: document.querySelector('#TasasDeCambio > table > tbody > tr:nth-child(2) > td:nth-child(2)').innerText,
                    sellsDollar: document.querySelector('#TasasDeCambio > table > tbody > tr:nth-child(2) > td:nth-child(3)').innerText      
                }
            });
            await browser.close();
            return data;
        }

        else if(bankName === promerica) {
            await page.goto(pageUrl);
            const data = await page.evaluate(() => {
                return {
                    title: "promerica",
                    buysDollar: document.querySelector('#tipoCambioHome > div:nth-child(2) > p > span:nth-child(1)').innerText,
                    sellsDollar: document.querySelector('#tipoCambioHome > div:nth-child(2) > p > span:nth-child(3)').innerText
                }
            })
            await browser.close();
            return data;
        }
        else if(bankName === banreservas) {
            await page.goto(pageUrl);
            const data = await page.evaluate(() => {
                return {
                    title: "banreservas",
                    buysDollar: document.querySelector('#site-nav-panel > ul:nth-child(1) > li:nth-child(2) > span').innerText.replace(/[^0-9\.]+/g,""),
                    sellsDollar: document.querySelector('#site-nav-panel > ul:nth-child(1) > li:nth-child(3) > span').innerText.replace(/[^0-9\.]+/g,"")
                }
            })
            await browser.close();
            return data;
        }
};


const scrapeBR = async () => {
    const url = "https://www.banreservas.com/";
    const bankName = banreservas;

    const data = await scrapeWithPuppeteer(url, bankName);
    return data;
};

const scrapeScotiaBank = async () => {
    const $ = await getHtml("https://do.scotiabank.com/banca-personal/tarifas/tasas-de-cambio.html");

    return {
            title: scotiabank,
            buysDollar: $('.bns--table > tbody >  tr:nth-child(2) > td:nth-child(3)').text(),
            sellsDollar: $('.bns--table > tbody >  tr:nth-child(2) > td:nth-child(4)').text(),
            
        } 
};

const scrapePopular = async () => {
    const url = "https://popularenlinea.com/personas/Paginas/Home.aspx";
    const bankName = popular;

    const data = await scrapeWithPuppeteer(url, bankName);
    return data;
    
};


const scrapeBancoCaribe = async () => {
    const $ = await getHtml('https://www.bancocaribe.com.do/');
    return {
        title: caribe,
        buysDollar: $('#us_buy_res').text(),
        sellsDollar: $('#us_sell_res').text()
    }
}

const scrapeAPAP = async () => {
    const url = 'https://www.apap.com.do/'
    const bankName = apap;

    const data = await scrapeWithPuppeteer(url, bankName);
    return data;
}

const scrapeBHD = async () => {
    const url = "https://www.bhdleon.com.do/wps/portal/BHD/Inicio/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziTSxdDDxNTAy93T3cDAwcjXxMLYOD_IO8Hc30w_Eq8DfVjyJGvwEO4GhAnH48CqLwGx-uH4XXCpAPCJlRkBsaGmGQ6QgAIyLKwQ!!/dz/d5/L2dBISEvZ0FBIS9nQSEh/";
    const bankName = bhd;

    const data = await scrapeWithPuppeteer(url, bankName);
    return data;
};

const scrapePromerica = async () => {
    const url = "https://www.promerica.com.do/";
    const bankName = promerica;

    const data = await scrapeWithPuppeteer(url, bankName);
    return data;
}



    Promise.resolve(scrapeBR()).then(data => {
        console.log(data);
    })

    // scrapeScotiaBank();

module.exports = {
    scrapeBR,
    scrapeScotiaBank,
    scrapePopular,
    scrapeBancoCaribe,
    scrapeAPAP,
    scrapeBHD,
    scrapePromerica
}
