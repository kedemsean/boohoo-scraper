
import { createRouter } from 'crawlee';

export const router = createRouter();

router.addDefaultHandler(async ({ request, page, log, pushData }) => {
    log.info(`Scraping product page: ${request.url}`);

    // Extract main product images
    const productImages = await page.evaluate(() => {
        const getAllAttrs = (selector, attr) => 
            Array.from(document.querySelectorAll(selector)).map(el => el.getAttribute(attr));

        return getAllAttrs('.image-container img', 'src').slice(0, 3); // Extract only first 3 images
    });

    // Save data to Apify dataset
    await pushData({
        url: request.url,
        product_image_urls: productImages,
    });

    log.info(`Scraped ${productImages.length} images from ${request.url}`);
});
