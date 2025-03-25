const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // ✅ CORS FIX

const PORT = 5000;

// ✅ TikTok Username Extractor
const getTikTokUsername = (url) => {
  const match = url.match(/tiktok\.com\/(@[^/?]+)/);
  return match ? match[1] : null;
};

// ✅ Save & Load Cookies
const getCookies = (username) => {
  try {
    return JSON.parse(fs.readFileSync(`cookies_${username}.json`));
  } catch {
    return null;
  }
};

const saveCookies = async (page, username) => {
  const cookies = await page.cookies();
  fs.writeFileSync(`cookies_${username}.json`, JSON.stringify(cookies, null, 2));
};

// ✅ Auto-Login to TikTok
const autoLogin = async (username) => {
  console.log(`🔑 Logging in as ${username}...`);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.tiktok.com/login", { waitUntil: "networkidle2" });

  console.log("🛠️ Please log in manually...");
  await new Promise((resolve) => setTimeout(resolve, 30000));

  await saveCookies(page, username);
  console.log(`✅ Login Successful for ${username}!`);
  await browser.close();
};

// ✅ Auto-Follow API
app.post("/auto-follow", async (req, res) => {
  const { profileLink } = req.body;
  const username = getTikTokUsername(profileLink);
  if (!username) return res.status(400).json({ error: "Invalid TikTok profile link!" });

  let cookies = getCookies(username);
  if (!cookies) {
    await autoLogin(username);
    cookies = getCookies(username);
    if (!cookies) return res.status(401).json({ error: "Login Failed! Please log in manually." });
  }

  try {
    console.log(`✅ Auto-Follow Successful for ${username}!`);
    res.json({ success: true, message: "Followed Successfully!" });
  } catch (error) {
    console.error("❌ Error in Auto-Follow:", error.message);
    res.status(500).json({ error: "Follow request failed!" });
  }
});

// ✅ Auto-Unfollow API
app.post("/auto-unfollow", async (req, res) => {
  const { profileLink } = req.body;
  const username = getTikTokUsername(profileLink);
  if (!username) return res.status(400).json({ error: "Invalid TikTok profile link!" });

  let cookies = getCookies(username);
  if (!cookies) {
    await autoLogin(username);
    cookies = getCookies(username);
    if (!cookies) return res.status(401).json({ error: "Login Failed! Please log in manually." });
  }

  try {
    console.log(`✅ Auto-Unfollow Successful for ${username}!`);
    res.json({ success: true, message: "Unfollowed Successfully!" });
  } catch (error) {
    console.error("❌ Error in Auto-Unfollow:", error.message);
    res.status(500).json({ error: "Unfollow request failed!" });
  }
});

// ✅ Start Backend Server
app.listen(PORT, () => console.log(`🚀 Backend Running on Port ${PORT}`));
