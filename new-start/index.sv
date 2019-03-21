// Print the name of a man who's age is the closest to the average age of all people

= people _
  | (name "Alice") (age 24)
  | (name "Bob") (age 15)
  | (name "Chris") (age 46)
  | (name "Daniel") (age 35)
  | (name "Elisabeth") (age 29)
  | (name "Fred") (age 52)

= averageAge /
  _.reduce
    _.map people (-> man man.age))
    -> (x y) (+ x y)
  _.size people

= manWithClosestToAverageAge _.minBy
  _.map people (-> man (| (name man.name) (distance (Math.abs (- averageAge man.age)))))
  "distance"

print manWithClosestToAverageAge.name
