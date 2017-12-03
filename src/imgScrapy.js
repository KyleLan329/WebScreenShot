const puppeteer = require('puppeteer');
const chalk = require('chalk');
const srcToImg = require('./helper/srcToImg')
const {imgScrapy} = require('./config/default');

(async () => {
   const browser = await puppeteer.launch({headless: false});
   const page = await browser.newPage();
   const url = 'https://image.baidu.com';
   await page.goto(url);
   console.log('go to ' + chalk.blue(url));
   
   await page.setViewport({
    width: 1920,
    height: 1080
   });
   console.log(chalk.green('reset viewport'));

   await page.focus('#kw');
   console.log('focus');
   await page.keyboard.type('cat');
   console.log('input key words');
   await page.click('.s_search');
   console.log('click');
   console.log('go to ' + chalk.blue('search list'));

   page.on('load', async () => {
    console.log(chalk.green('We can scrapying pics now...'));

    const srcs = await page.evaluate(() => {
        const images = document.querySelectorAll('img.main_img');
        return Array.prototype.map.call(images, img => img.src);
    });
    console.log(`get ${srcs.length} images, start download`);

    srcs.forEach(async (src) => {
        await page.waitFor(200);
        await srcToImg(src, imgScrapy);
    });

    await browser.close();
   });

   
})();