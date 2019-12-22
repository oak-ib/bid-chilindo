const puppeteer = require("puppeteer");
const delay = require("delay");
const log = require("./logger");
require("dotenv").config({ path: __dirname + "/.env" });
const item = require("./config/config.json");

function forIn(obj, fn, thisObj) {
  var key,
    i = 0;
  for (key in obj) {
    if (exec(fn, obj, key, thisObj) === false) {
      break;
    }
  }
  function exec(fn, obj, key, thisObj) {
    return fn.call(thisObj, obj[key], key, obj);
  }
  return forIn;
}

forIn(item, function(config) {
  async function bid() {
    const browser = await puppeteer.launch(JSON.parse(process.env["HEADLESS"]));
    const page = await browser.newPage();
    await page.goto(config.url);
    try{
    await page.waitForSelector("input#ContentPlaceHolder1_txtBidNew");
    let price = await page.$eval(
      "input#ContentPlaceHolder1_txtBidNew",
      el => el.value
    );
    if (price > config.price) {
      await log.info('name^'+config.name, '|item-price^'+price , '|bid-price^'+config.price, "|action^first exit");
    }else{
      try {
        await page.click('li[lang="th"]');
        await page.click("a.country-btn");
      } catch (e) {}
  
      await page.waitForSelector("div#Signin1_pnlLoginModals.register_sign.signlogin_popup",
        {
          timeout: 5000,
          visible: true
        }
      );
  
      await delay(1000);
      await page.waitForSelector("#Signin1_loginsignup_info #mutedlogin");
      await page.click("#Signin1_loginsignup_info #mutedlogin");
      await page.waitForSelector('input[name="ctl00$Signin1$txtEmail"]');
      await page.type('input[name="ctl00$Signin1$txtEmail"]',process.env["USERNAME"]);
      await page.type('input[name="ctl00$Signin1$txtPassword"]',process.env["PASSWORD"]);
      await page.click("input#Signin1_btnSignIn");
      await delay(2000);
      await page.waitForSelector("input#ContentPlaceHolder1_txtBidNew");
      price = await page.$eval("input#ContentPlaceHolder1_txtBidNew",el => el.value);
      if (price <= config.price) {
        // await page.waitForSelector("a#ContentPlaceHolder1_btnBid");
        // await page.click("a#ContentPlaceHolder1_btnBid");
        // __doPostBack('ctl00$ContentPlaceHolder1$btnBid','')
        await page.evaluate(() => theForm.__EVENTTARGET.value = 'ctl00$ContentPlaceHolder1$btnBid')
        await page.evaluate(() => theForm.submit())
        try{
          // await page.waitForSelector("#dvSucessBidReponsePopup.fade.modal.in");
          await log.info('name^'+config.name, '|item-price^'+price , '|bid-price^'+config.price, "|action^bid");
          await delay(3000);
        }catch(e){
          console.log(e.message)
          await log.info('name^'+config.name, '|item-price^'+price , '|bid-price^'+config.price, "|error^"+e.message);
        }
      } else {
        await log.info('name^'+config.name, '|item-price^'+price , '|bid-price^'+config.price, "|action^last exit");
      }
    }
  }catch(e){
    console.log(e.message)
  }
    await browser.close();
  }

  if(process.env["RUN_NOLOOP"] == 1){
    bid();
  }else{
    const timmer = config.loop_time * 60000;
    let i = 0;
    setInterval(() => {
      i = i + 1;
      log.info(config.name, "Round " + i.toString());
      bid();
    }, timmer);
  }
});