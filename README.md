# ShotBot

### Setup
1. Clone repository
2. Run npm install

### Use

Run the following command in your terminal:

    node scrape.js <URL> [outputPath]

Replace <URL> with the URL of the website you want to capture and [outputPath] with the path where you want to save the screenshot. If you don't provide an output path, the screenshot will be saved as screenshot.png in your project directory.

Example:

    node scraper.js https://www.example.com example_screenshot.png

This command will take a screenshot of the "https://www.example.com" website and save it as "example_screenshot.png" in the project folder, in the downloads folder.

That's it! You now have a web scraper in Node.js that can visit any website, take a high-resolution screenshot, and download it to your computer.