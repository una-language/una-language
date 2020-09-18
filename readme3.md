Types of symmetry
-> --> =->
<- <-- <-=

// First write docs

```
a <- 1 + 2

a <-
    ? (count == 0) 0
    ? (count < 3) 1
    2


<- a
    ? (== count 0) 0
    ? (< count 3) 1
    2
```

```
sum <- (a b) -> (a + b)


<- sum (-> (a b) (+ a b))

```
