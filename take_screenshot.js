import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  
  await page.goto('http://localhost:5173/');
  await new Promise(r => setTimeout(r, 1000));
  
  await page.click('button'); // Start the Journey
  await new Promise(r => setTimeout(r, 3000));
  
  await page.screenshot({ path: 'screenshot_before.png' });
  
  await page.keyboard.down('w');
  await new Promise(r => setTimeout(r, 2000));
  await page.keyboard.up('w');
  
  await page.screenshot({ path: 'screenshot_after.png' });
  
  await browser.close();
})();
