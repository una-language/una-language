= api (--> './api')

= message 'hello'

|> (api.sendMessage message)
  -> response (api.processResponse response)
  -> result (api.fixResult result)
  -> fixed (>_ fixed)
