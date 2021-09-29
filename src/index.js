require('./database')
const server = require('./server')

server.listen(server.get('PORT'), () => {
  console.log('server on port: ', server.get('PORT'))
})
