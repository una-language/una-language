Everything should be symbols not words (even return)
Everything should be done by TDD
Make == like === in JS and even with deepEquals
Add macros
Make comments as //
Add babel plugin (https://github.com/jashkenas/coffeescript/issues/4969#issuecomment-366662444)

Declaration

```
= a 1
```

Function

```
= plus -> (x y) (+ x y)

= plus -> (x y)
  + x y

= plus
  -> (x y)
    + x y
```

Async

```
= asFunc --> (x y)
  <-- fetchSomething x y
```

Expression calculation

```
= result <-
  = a 1
  = b 2
  + a b
```

Await expression calculation

```
= result <--
  = a <-- fetch 'GET' '/posts' (: id 3)
  = b + a 2
  / b 2
```

Lists

```
= numbers :: 1 2 3 4 5 6 7 8
```

Maps

```

= object : (a 1) (b 2) (c (: d e))
= object
  a 1
  b 2
  c :
    d
    e

= ((a b) ) object
```

Import module

```
= Module <-= 'module'

```

Export module

```
=-> Module

=-> :
  defaults Module
```

And/or

```
= & true false
= | true false
```

Una 2 - normal lists overriding default
lodash and rambda smooth integration
