module.exports = code =>
  (code.includes("\n") ? code.split("\n") : [code])
    .filter(line => line)
    .filter(line => !line.trim().startsWith("//"));
