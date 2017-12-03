const puppeteer = require('puppeteer');
const {screenshot} = require('./config/default');

(async () => {
   const browser = await puppeteer.launch();
   const page = await browser.newPage();
   await page.goto('https://www.bilibili.com');
   await page.screenshot({
       path: `${screenshot}/${Date.now()}.png`
   }); 
   await browser.close();
})();