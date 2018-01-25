[<= Back](../)

# Declarations

The most common operation is the named value declaration. </br>
Its structure is simple:

```
// Create named value with name 'name' and value 'expression'
= name expression
```

If you want you can create named value with complex expressions like this:

```
= name (expression parameter)
// or
= name
  expression parameter
// or
= name expression parameter
// or
= name expression
  parameter
```

As you see there's an exception from basic application rule. The `=` operator

## Examples

```
= greeting 'Hello'

= two (+ 1 1)

= three
  - 4 1

= four * 2 2

= six /
  12
  2
```
