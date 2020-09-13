=-> 'react' React
=-> 'react-dom' ReactDOM
=-> './styles' styles

= (: createElement:e) React

= App -> ((: name))
  e 'div' (: (style styles.container))
    e 'div' (: (style styles.hello)) 'Hello'
    e 'div' (: (style styles.name)) name

ReactDOM.render (e App (: (name 'John'))) (document.getElementById 'root')
