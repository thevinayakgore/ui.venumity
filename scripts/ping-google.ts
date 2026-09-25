// scripts/ping-google.ts
const SITE_URL = "https://ui.venumity.com";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

async function ping() {
  const endpoints = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    `https://yandex.com/indexnow?url=${encodeURIComponent(SITEMAP_URL)}`,
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url);
      console.log(`Pinged ${url} → ${res.status}`);
    } catch (err) {
      console.error(`Failed to ping ${url}:`, err);
    }
  }
}

ping();