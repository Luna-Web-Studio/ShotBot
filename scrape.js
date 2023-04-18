const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const puppeteer = require('puppeteer');

async function takeScreenshot(url, outputPath, options = {}) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle2' });

  const screenshotBuffer = await page.screenshot({fullPage: true, ...options });

  await browser.close();

  const optimizedImage = sharp(screenshotBuffer)
    .resize({ width: 300, height: 500, fit: 'inside' }) // Resize image
    .webp({ quality: 100 }) // Convert to Webp and set quality
    .toBuffer(); // Convert back to buffer

    fs.writeFileSync(outputPath, await optimizedImage);
}

async function main() {
  const url = process.argv[2];
  const downloadsFolderPath = path.join(__dirname, 'downloads');

    if (!fs.existsSync(downloadsFolderPath)) {
        fs.mkdirSync(downloadsFolderPath);
    }

   const outputPath = path.join(downloadsFolderPath, process.argv[3]) || path.join(downloadsFolderPath, 'screenshot.png');

  if (!url) {
    console.error('Usage: node scraper.js <URL> [outputPath]');
    process.exit(1);
  }

  try {
    await takeScreenshot(url, outputPath);
    console.log(`Screenshot saved to: ${outputPath}`);
  } catch (error) {
    console.error(`Error taking screenshot: ${error.message}`);
    process.exit(1);
  }
}

main();