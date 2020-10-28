const una = require('./index')

// const code = `
// =-> :
//   container :
//     alignItems 'center'
//     display 'flex'
//     flex 1
//     flexDirection 'row'
//     justifyContent 'space-around'
//   hello :
//     color 'blue'
//     fontSize 20
//     fontStyle 'italic'
//   name :
//     color 'red'
//     fontSize 30
// `

const code = `
=-> :
    b :
      c 1
    d 2
`

console.log(una(code))
