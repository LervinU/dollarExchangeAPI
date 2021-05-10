const cheerio = require('cheerio');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');

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

        if(bankName === "popular") { 
            await page.goto(pageUrl);
            const data = await page.evaluate(() => {
                return {
                    title: "Banco Popular Dominicano",
                    buysDollar: document.getElementById("compra_peso_dolar_desktop").value,
                    sellsDollar: document.getElementById("venta_peso_dolar_desktop").value
                } 
            });
           return data;
        }
        else if(bankName === "APAP") {
            await page.goto(pageUrl);
            const data = await page.evaluate(() => {
                return {
                    title: "APAP",
                    buysDollar: document.getElementById("currency-buy").innerText,
                    sellsDollar: document.getElementById("currency-sell").innerText
                }
            });
            return data;
        }
        else if(bankName === "BHD") {
            await page.goto(pageUrl);
            const data = await page.evaluate(() => {
                document.querySelector('#footer > section.footer-content-menu.clearfix > div > ul > li:nth-child(5) > a').click();
                return {
                    title: "BHD",
                    buysDollar: document.querySelector('#TasasDeCambio > table > tbody > tr:nth-child(2) > td:nth-child(2)').innerText,
                    sellsDollar: document.querySelector('#TasasDeCambio > table > tbody > tr:nth-child(2) > td:nth-child(3)').innerText      
                }
            });
            return data;
        }

        await browser.close();
        
};

const scrapeBR = async () => {
    const $ = await getHtml("https://www.banreservas.com/");

    return {
        title: $('title').first().text(),
        buysDollar: $('.currency-nav').find('.first').find('span').text(),
        sellsDollar: $('.currency-nav').find('.last').find('span').text()
    }
};

const scrapeScotiaBank = async () => {
    const $ = await getHtml("https://do.scotiabank.com/banca-personal/tarifas/tasas-de-cambio.html");

    return {
            title: $('title').first().text(),
            buysDollar: $('.bns--table > tbody >  tr:nth-child(2) > td:nth-child(3)').text(),
            sellsDollar: $('.bns--table > tbody >  tr:nth-child(2) > td:nth-child(4)').text(),
            
        } 
};

const scrapePopular = async () => {
    const url = "https://popularenlinea.com/personas/Paginas/Home.aspx";
    const bankName = "popular";

    const data = await scrapeWithPuppeteer(url, bankName);
    return data;
    
};


const scrapeBancoCaribe = async () => {
    const $ = await getHtml('https://www.bancocaribe.com.do/');

    return {
        title: $('title').first().text(),
        buysDollar: $('#us_buy_res').text(),
        sellsDollar: $('#us_sell_res').text()
    }
}

const scrapeAPAP = async () => {
    const url = 'https://www.apap.com.do/'
    const bankName = "APAP";

    const data = await scrapeWithPuppeteer(url, bankName);
    return data;
}

const scrapeBHD = async () => {
    const url = "https://www.bhdleon.com.do/wps/portal/BHD/Inicio/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziTSxdDDxNTAy93T3cDAwcjXxMLYOD_IO8Hc30w_Eq8DfVjyJGvwEO4GhAnH48CqLwGx-uH4XXCpAPCJlRkBsaGmGQ6QgAIyLKwQ!!/dz/d5/L2dBISEvZ0FBIS9nQSEh/";
    const bankName = "BHD";

    const data = await scrapeWithPuppeteer(url, bankName);
    return data;
};



// Promise.resolve(scrapeAPAP()).then(data => {
//     console.log(data);
// })

module.exports = {
    scrapeBR,
    scrapeScotiaBank,
    scrapePopular,
    scrapeBancoCaribe,
    scrapeAPAP,
    scrapeBHD
}
