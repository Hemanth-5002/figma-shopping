import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'C:\\Users\\HEMAN\\.gemini\\antigravity\\brain\\baefa019-6e04-47d7-9a75-6563bb0759a5\\screenshot.png' });
    await browser.close();
})();
