console.log 'Hello'
console.log "Hello World!"

= string 'Hello World!'
console.log string

= name 'John'
= greeting 'Hello ${name}'
console.log greeting

= text `
  'First line of text'
  'Second line of text'
  'Third line of text'
  
console.log text
