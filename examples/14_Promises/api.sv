<-- :
  sendMessage
    -> message
      += Promise (-> resolve (resolve 'message ${message}'))
  processResponse
    -> response
      += Promise (-> resolve (resolve 'response ${response}'))
  fixResult
    -> result
      += Promise (-> resolve (resolve 'result ${result}'))
