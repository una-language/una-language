module.exports = lines =>
  lines
    .map(line => ({
      value: line.trim(),
      spaces: line.search(/\S/)
    }))
    .filter(line => line.spaces >= 0);
