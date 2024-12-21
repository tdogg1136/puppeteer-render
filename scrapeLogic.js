
const puppeteer = require ("puppeteer");
require("dotenv").config();


const scrapeLogic = async(res) =>{

     // Launch the browser and open a new blank page
     const browser = await puppeteer.launch({ timeout: 60000,
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no=zygote"
        ], 
        executablePath: process.env.NODE_ENV === 'production' 
            ? process.env.PUPPETEER_EXECUTABLE_PATH 
            : puppeteer.executablePath()
      });

     try {

        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(60000); 

        
        // Navigate the page to a URL
        await page.goto('https://developer.chrome.com/', { timeout: 60000, waitUntil: 'networkidle2' });
        
        // Set screen size
        await page.setViewport({width: 1080, height: 1024});
        
        // Type into search box
        await page.type('.devsite-search-field', 'automate beyond recorder');
        
        // Wait and click on first result
        const searchResultSelector = '.devsite-result-item-link';
        await page.waitForSelector(searchResultSelector, {timeout: 120000});
        await page.click(searchResultSelector);
        
        // Locate the full title with a unique string
        const textSelector = await page.waitForSelector(
            'text/Customize and automate', {timeout: 120000}
        );
        const fullTitle = await textSelector?.evaluate(el => el.textContent);
        
        // Print the full title
        const logStatement = `The title of this blog post is: ${fullTitle}`;
        console.log(logStatement);
        res.send(logStatement);

    } catch (error){
        console.log(`This is the error: ${error}`);
        res.send(`Something went wrong while running Puppeteer! ${error}`);
    } finally {
        await browser.close();
    }
    

};

module.exports = {scrapeLogic};