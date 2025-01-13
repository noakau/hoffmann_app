const server = require("./app")
const port = 3000

  
server.listen(port, () => {
    console.log(`App ruuning and listening on port ${port}`)
})