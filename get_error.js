import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('PAGE ERROR LOG:', msg.text());
    } else {
      console.log('PAGE LOG:', msg.text());
    }
  });
  page.on('pageerror', error => console.log('PAGE EXCEPTION:', error.message));
  
  await page.goto('http://localhost:5173/');
  await new Promise(r => setTimeout(r, 1000));
  
  await page.click('button'); // Start the Journey
  await new Promise(r => setTimeout(r, 3000));
  
  await page.keyboard.press('w');
  await new Promise(r => setTimeout(r, 500));
  await page.keyboard.press('ArrowUp');
  await new Promise(r => setTimeout(r, 500));
  
  await browser.close();
})();
