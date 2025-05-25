import { Worker, Job } from "bullmq";
import { chromium, Browser, Page } from "playwright";
import { redisConnection } from "~/config/redisConnection";

const USER_AGENT = 
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

async function checkCampsiteAvailability(url: string, auth?: { username: string; password: string }) {
  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: USER_AGENT,
      viewport: { width: 1280, height: 800 },
      locale: "en-US",
      extraHTTPHeaders: {
        "Accept-Language": "en-US,en;q=0.9",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Dest": "document",
      },
    });

    const page: Page = await context.newPage();

    if (auth) {
      // Example: Basic Auth (customize as needed for the target site)
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.fill('input[name="username"]', auth.username);
      await page.fill('input[name="password"]', auth.password);
      await page.click('button[type="submit"]');
      await page.waitForLoadState("networkidle");
    } else {
      await page.goto(url, { waitUntil: "domcontentloaded" });
    }

    // TODO: Add logic to check for campsite availability on the page
    // Example: const available = await page.$("selector-for-availability");

    // Placeholder for demonstration
    const content = await page.content();

    await browser.close();
    return { success: true, content };
  }
  catch (error) {
    if (browser) await browser.close();
    throw new Error(`Failed to check campsite availability: ${error instanceof Error ? error.message : String(error)}`);
  }
}

const worker = new Worker(
  "book-campsite",
  async (job: Job) => {
    const { url, auth } = job.data;
    if (!url) throw new Error("URL is required for campsite booking");

    console.log("Processing job:", job.id, job.data);
    const result = await checkCampsiteAvailability(url, auth);
    return result;
  },
  { connection: redisConnection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed!`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});