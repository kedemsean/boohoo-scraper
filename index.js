
// Apify SDK - toolkit for building Apify Actors
import { Actor } from 'apify';
// Web scraping and browser automation library
import { PuppeteerCrawler } from 'crawlee';
// Import the request handler (router)
import { router } from './routes.js';

// Initialize Apify Actor
await Actor.init();

// Get input parameters (Product URLs)
const input = await Actor.getInput();
const startUrls = input?.startUrls || [{ url: 'https://www.boohoo.com/' }];

// Create a proxy configuration
const proxyConfiguration = await Actor.createProxyConfiguration();

// Create and run the PuppeteerCrawler
const crawler = new PuppeteerCrawler({
    proxyConfiguration,
    requestHandler: router,
    launchContext: {
        launchOptions: {
            args: ['--disable-gpu'],
        }
    }
});

await crawler.run(startUrls);

// Gracefully exit
await Actor.exit();
