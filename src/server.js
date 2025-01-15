const http=require('http')

const server = http.createServer(app)

server.listen(8000,()=>{
    console.log('server running on  port 8000')
})