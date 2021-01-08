const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { default: axios } = require('axios');

const LOGIN_URL = 'https://sketchfab.com/login';

const user = {
  // sketchfab login info
};

(async () => {
  let url = `https://sketchfab.com/3d-models/glass-bottle-beb69bc08a8f487ab8c5207fb155cbf2`;

  let browser = await puppeteer.launch({
    headless: false,
  });
  let page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  // goto login page
  await page.goto(LOGIN_URL);
  // wait for the page to load
  await page.waitForSelector('[name="email"]');
  await page.waitForSelector('[name="password"]');
  // fill login form then login
  let emailField = await page.$('[name="email"]');
  await emailField.type(user.email);
  let passwordField = await page.$('[name="password"]');
  await passwordField.type(user.password);
  await page.$eval('[data-selenium="submit-button"]', btn => btn.click());

  // wait until login is complete
  await page.waitForNavigation();

  // goto model page
  await page.goto(url);

  // click on download button
  await page.$eval('[data-selenium="open-download-popup"]', btn => btn.click());

  await page.setRequestInterception(true);
  page.on('request', async request => {
    console.log(request.url());
    if (request.url().indexOf('sketchfab-prod-media.s3') > 0) {
      let headers = request._headers;
      const cookies = await page.cookies();
      headers.Cookie = cookies.map(ck => ck.name + '=' + ck.value).join(';');

      console.log('headers.Cookie', headers.Cookie);

      let { data: buffer } = await axios({
        url: request._url,
        method: request._method,
        data: request._postData,
        responseType: 'arraybuffer',
        headers,
      });

      // buffer is the downloaded file buffer

      let filename = path.join(__dirname, 'file.zip');
      fs.writeFileSync(filename, buffer); //Save file
    } else {
      request.continue();
    }
  });

  // click on gltf button to download
  await page.waitForSelector('.button.btn-primary.btn-large.button-gltf');
  await page.$eval('.button.btn-primary.btn-large.button-gltf', btn =>
    btn.click(),
  );

  // await browser.close();
})();
