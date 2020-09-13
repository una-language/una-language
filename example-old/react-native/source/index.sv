=-> '../app.json' (: name)
=-> 'react' React
=-> 'react-native' (: AppRegistry Text View)
=-> './styles' styles

= (: createElement:e) React

= Application -> ()
  e View (: (style styles.container))
    e Text (: (style styles.hello)) 'Hello'


AppRegistry.registerComponent name (-> () Application)
