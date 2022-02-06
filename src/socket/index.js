const fs = require('fs')
let document = JSON.parse(fs.readFileSync('./src/socket/persons.json', 'utf8'))

module.exports = function (server){

    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
        },
    })

    io.on("connection", socket => {
    console.log('connect')

        socket.on("get-document", async documentId => { 
    
            document = JSON.parse(fs.readFileSync('./src/socket/persons.json', 'utf8')) //загрузка документа с бд

            socket.join(documentId) //присоединение к комноте с таким-то айди

            socket.emit("load-document", document[documentId].data) //отправка документа клиенту

            socket.on("send-changes", delta => {
                socket.broadcast.to(documentId).emit("receive-changes", delta)   //отправляет всем сокетам в комнате кроме отпрваителя
            })

            socket.on("save-document", async data => {
                console.log(data, '!!!')
                document[documentId].data = data 
                fs.writeFileSync('./src/socket/persons.json', JSON.stringify(document)) //сохранение документа
            })

        })
    })
}


