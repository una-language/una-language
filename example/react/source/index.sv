=-> 'react' React
=-> 'react-dom' ReactDOM

= (: createElement:e) React

= App -> ()
  e 'div' null 'Hello'

ReactDOM.render (e App) (document.getElementById 'root')
