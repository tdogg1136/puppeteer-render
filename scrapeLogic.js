
const puppeteer = require ("puppeteer");

const scrapeLogic = async(res) =>{

     // Launch the browser and open a new blank page
     const browser = await puppeteer.launch({ timeout: 30000 });

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
        await page.waitForSelector(searchResultSelector);
        await page.click(searchResultSelector);
        
        // Locate the full title with a unique string
        const textSelector = await page.waitForSelector(
            'text/Customize and automate',
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