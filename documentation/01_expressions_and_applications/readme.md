[<= Back](../)

# Expressions and Applications

Program is a list of expressions </br>
There are some basic expressions like:

<ul>
  <li>Integer numbers like `1`</li>
  <li>Float numbers like `1.5`</li>
  <li>Strings like `'John'`</li>
  <li>Booleans like `true` or `false`</li>
  <li>Named values like `lines` or `list.size` or `man.profession.title`</li>
</ul>

All other expressions are complex. They are done with application of multiple expressions to another expression.
Applied expressions can be written in the right from the basic expression or on the new lines with tabs.

```
expression parameter1
//or
expression
  parameter1

expression parameter1 parameter2
//or
expression parameter1
  parameter2
//or
expression
  parameter1
  parameter2
```

If expression that's passed in application is also complex it can be written in parentheses or on the new line with tabs.

```
expression (complexParameter parameter1 parameter2)
//or
expression
  complexParameter parameter1 parameter2
//or
expression
  complexParameter
    parameter1
    parameter2
```

These rules are always true for all expressions except some standard ones like `=`, `:` etc.
All exceptions will be explained in next chapters.
