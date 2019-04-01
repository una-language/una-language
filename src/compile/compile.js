#!/usr/bin/env node

const parse = require("./parse");
const prettier = require("prettier");
const IO = require("readline");
const translate = require("./translate");

const io = IO.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const lines = [];
io.on("line", line => {
  if (line.trim().length > 0) lines.push(line);
});
io.on("close", () => {
  const parsedLines = parse(lines);
  const translated = parsedLines.map(translate).join("\n");
  const pretty = prettier.format(translated, {
    parser: "babylon",
    printWidth: 120,
    semi: false,
    singleQuote: true
  });

  pretty.split("\n").forEach(line => console.log(line));
});
