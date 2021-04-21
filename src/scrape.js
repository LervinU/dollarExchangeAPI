const cheerio = require('cheerio');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');

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
    const browser = await puppeteer.launch( 
        { 
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ]
        });
    const page = await browser.newPage();

    await page.goto("https://popularenlinea.com/personas/Paginas/Home.aspx");

    const data = await page.evaluate(() => {
       return {
            title: "Banco Popular Dominicano",
            buysDollar: document.getElementById("compra_peso_dolar_desktop").value,
            sellsDollar: document.getElementById("venta_peso_dolar_desktop").value
        }
    })

    await browser.close();
    return data;
    
};

// const scrapePromerica = async () => {
//     const $ = getHtml('https://www.promerica.com.do/');
// }

const scrapeBancoCaribe = async () => {
    const $ = await getHtml('https://www.bancocaribe.com.do/');

    return {
        title: $('title').first().text(),
        buysDollar: $('#us_buy_res').text(),
        sellsDollar: $('#us_sell_res').text()
    }
}


// Promise.resolve(scrapeBancoCaribe()).then(data => {
//     console.log(data);
// })

module.exports = {
    scrapeBR,
    scrapeScotiaBank,
    scrapePopular,
    scrapeBancoCaribe
}
