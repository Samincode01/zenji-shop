/**
 * Development helper: verify remote image URLs used by the ZENJI storefront.
 * Usage: node scripts/validate-images.mjs
 *
 * Exits non-zero if any URL fails to return an image response.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["src/data", "src/components"];
const URL_RE =
  /https:\/\/images\.unsplash\.com\/[^\s"'`)]+/g;

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (/\.(js|jsx|ts|tsx|mjs|cjs)$/.test(entry)) files.push(full);
  }
  return files;
}

function collectUrls() {
  const found = new Map();

  for (const dir of SCAN_DIRS) {
    const abs = join(ROOT, dir);
    for (const file of walk(abs)) {
      const text = readFileSync(file, "utf8");
      const matches = text.match(URL_RE) ?? [];
      for (const url of matches) {
        if (!found.has(url)) found.set(url, []);
        found.get(url).push(relative(ROOT, file).replaceAll("\\", "/"));
      }
    }
  }

  return found;
}

async function checkUrl(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: { Accept: "image/*,*/*" },
    });

    const contentType = response.headers.get("content-type") ?? "";
    const ok =
      response.ok &&
      (contentType.startsWith("image/") || contentType.includes("octet-stream"));

    return {
      ok,
      status: response.status,
      contentType,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      contentType: "",
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timer);
  }
}

const urls = collectUrls();

if (urls.size === 0) {
  console.error("No Unsplash image URLs found under src/data or src/components.");
  process.exit(1);
}

console.log(`Checking ${urls.size} unique Unsplash image URL(s)…\n`);

let failed = 0;

for (const [url, files] of urls) {
  const result = await checkUrl(url);
  const short = url.replace("https://images.unsplash.com/", "");

  if (result.ok) {
    console.log(`OK  ${short}`);
  } else {
    failed += 1;
    console.error(`FAIL ${short}`);
    console.error(`     status=${result.status} type=${result.contentType || "n/a"}`);
    if (result.error) console.error(`     error=${result.error}`);
    console.error(`     used in: ${files.join(", ")}`);
  }
}

console.log("");

if (failed > 0) {
  console.error(`${failed} image URL(s) failed validation.`);
  process.exit(1);
}

console.log("All storefront image URLs returned valid image responses.");
