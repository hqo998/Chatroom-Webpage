#!/usr/bin/env node
import fs from "fs";
import path from "path";

if (process.argv.length !== 4) {
  console.error("Usage: node generateHtmlHeader.js <input.html> <output.h>");
  process.exit(1);
}

const inputPath = path.resolve(process.argv[2]);
const outputPath = path.resolve(process.argv[3]);

if (!fs.existsSync(inputPath)) {
  console.error(`Input file does not exist: ${inputPath}`);
  process.exit(1);
}

// Read HTML
let html = fs.readFileSync(inputPath, "utf-8");

// Optional: Clean up whitespace for a smaller binary
html = html
  .replace(/\s+/g, " ")
  .replace(/>\s+</g, "><")
  .trim();

// Build header content using C++ Raw String Literal
// We use "DELIMITER" to ensure that even if your HTML/JS
// contains )", it won't accidentally close the string.
const header = `#pragma once
// Auto-generated from ${path.basename(inputPath)}
// Do not edit manually.

constexpr const char INDEX_HTML[] = R"raw(
${html}
)raw";
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, header);

console.log(`Generated header: ${outputPath}`);
