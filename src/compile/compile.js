#!/usr/bin/env node

const parse = require("./parse");
const readline = require("readline");
const translate = require("./translate");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const lines = [];
reader.on("line", line => {
  if (line.trim().length > 0) lines.push(line);
});
reader.on("close", () => {
  const parsedLines = parse(lines);
  const translatedLines = parsedLines.map(translate);
  console.log(translatedLines);
});
