const express = require ("express");
const puppeteer = require ("puppeteer");
const app = express();
const {scrapeLogic} = require("./scrapeLogic"); 
const PORT = process.env.PORT || 4000;


app.get("/scrape", (req,res) => {
    scrapeLogic(res);
});

app.get("/", (req,res) => {
    res.send(`Render Puppeteer is up and runnimg`)
});


app.listen(PORT, ()=>{
    console.log(`Listening on port: ${PORT}`)
});


