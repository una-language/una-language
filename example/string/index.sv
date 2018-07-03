console.log '--------------------- String ---------------------'

console.log 'Single quoted string with "text inside double quotes"'
console.log "Double quoted string with 'text inside single quotes'"

= planet 'Earth'
console.log 'Hello ${planet}!'

= multiline `
  'First line of text'
  'Second line of text'
  'Third line of text'
console.log multiline
