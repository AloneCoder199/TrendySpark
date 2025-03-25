const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(express.json());

const latestAndroidUserAgent =
  "Mozilla/5.0 (Linux; Android 12; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36";

// ✅ Extract Video ID (Supports Shorts & Normal Videos)
function extractVideoID(url) {
  const regex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|shorts|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// ✅ Detect if the video is a YouTube Short
function isShorts(url) {
  return url.includes("shorts") || url.includes("youtu.be/");
}

// ✅ Function to Generate YouTube Views (Shorts & Normal Videos)
async function generateYouTubeViews(videoURL) {
  let browser;
  try {
    console.log("🚀 Starting YouTube Views Generator...");

    const videoID = extractVideoID(videoURL);
    if (!videoID) throw new Error("Invalid Video URL!");

    const isShort = isShorts(videoURL);

    browser = await puppeteer.launch({
      headless: false, // ❌ Headless mode detect ho sakta hai
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-infobars",
        "--mute-audio",
        "--window-size=360x640",
        process.env.PROXY_SERVER ? `--proxy-server=${process.env.PROXY_SERVER}` : "",
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath(),
    });

    const pagePromises = [];

    for (let i = 0; i < 5; i++) {
      const pagePromise = (async () => {
        const page = await browser.newPage();

        await page.setUserAgent(latestAndroidUserAgent);
        await page.setViewport({ width: 360, height: 640 });

        const videoPageURL = isShort
          ? `https://m.youtube.com/shorts/${videoID}`
          : `https://m.youtube.com/watch?v=${videoID}`;

        console.log(`📺 Opening Video ${i + 1}: ${videoPageURL}`);
        await page.goto(videoPageURL, { waitUntil: "domcontentloaded", timeout: 60000 });

        try {
          await page.waitForSelector("video", { timeout: 60000 });
          console.log(`✅ Video ${i + 1} Loaded Successfully!`);
        } catch (error) {
          console.error(`❌ Error: Video ${i + 1} Player Not Found!`, error);
          await page.close();
          return;
        }

        // ✅ YouTube Shorts Swipe Emulation
        if (isShort) {
          console.log("🎥 This is a YouTube Short! Simulating Swipe...");
          await page.evaluate(() => {
            window.scrollBy(0, 300);
            setTimeout(() => window.scrollBy(0, -300), 500);
          });
        }

        // ✅ Video Play Trick
        await page.evaluate(() => {
          const video = document.querySelector("video");
          if (video) video.play().catch(() => {});
        });

        // ✅ Watch Time Adjustment
        const watchTime = isShort
          ? Math.floor(Math.random() * (60000 - 45000) + 45000) // Shorts: 45-60 sec
          : Math.floor(Math.random() * (150000 - 90000) + 90000); // Long: 1.5-2.5 min

        console.log(`⏳ Watching Video ${i + 1} for ${watchTime / 1000} seconds.`);
        await new Promise((resolve) => setTimeout(resolve, watchTime));

        await page.close();
      })();
      pagePromises.push(pagePromise);
    }

    await Promise.all(pagePromises);
    await browser.close();

    console.log("✅ Views Updated: 5 Views Added!");
    return { success: true, message: "5 views added successfully!" };
  } catch (error) {
    console.error("❌ Error:", error);
    if (browser) await browser.close();
    return { success: false, error: "Something went wrong!" };
  }
}

// ✅ API Endpoint to Start Views
app.post("/start-views", async (req, res) => {
  const { videoURL } = req.body;
  if (!videoURL) {
    return res.status(400).json({ error: "Video URL is required!" });
  }

  const response = await generateYouTubeViews(videoURL);
  if (response.success) {
    res.json({ message: response.message });
  } else {
    res.status(500).json({ error: response.error });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
