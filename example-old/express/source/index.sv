=-> './database' database
=-> 'express' express

= application express ()

application.get '/'
  -> (request response) (response.sendStatus 200)

application.get '/user/:id'
  -> (request response) (response.send (database.getUserById request.params.id))

application.listen 8080
  -> () (console.log 'Application is listening on port 8080')