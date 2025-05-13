const fs = require("fs");
const process = require("process");
const axios = require("axios");
const { URL } = require("url");
const path = require("path");

// Check if filename is provided
if (process.argv.length !== 3) {
  console.error("Usage: node urls.js FILENAME");
  process.exit(1);
}

const filename = process.argv[2];

async function processUrls(urls) {
  for (let url of urls) {
    try {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      const { hostname } = new URL(url);
      const response = await axios.get(url);
      const outputFilename = hostname;

      fs.writeFileSync(outputFilename, response.data);
      console.log(`Wrote to ${outputFilename}`);
    } catch (err) {
      console.error(`Couldn't download ${url}: ${err.message}`);
    }
  }
}

try {
  const data = fs.readFileSync(filename, "utf8");
  const urls = data.trim().split("\n");
  console.log(`Found ${urls.length} URLs to process`);
  processUrls(urls);
} catch (err) {
  console.error(`Error reading ${filename}: ${err.message}`);
  process.exit(1);
}
