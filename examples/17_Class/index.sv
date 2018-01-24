= Pet -> (food voice)
  :
    food
    voice
    toString <- '${food} ${voice}'

= cat Pet 'fish' 'meow'
= dog Pet 'meat' 'woof'

console.log cat.toString
console.log dog.toString
