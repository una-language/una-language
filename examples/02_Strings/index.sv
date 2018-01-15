// Passing to function
console.log 'Hello'
console.log "Hello World!"

// Simple
= string 'Hello World!'

console.log string

// String interpolation (expressions are not allowed)
= name 'John'
= greeting 'Hello ${name}'

console.log greeting

// Multiple lines text
= text `
  'First line of text'
  'Second line of text'
  'Third line of text'

console.log text
