const fs = require('fs')

module.exports = function (server){
    document = JSON.parse(fs.readFileSync('./src/socket/persons.json', 'utf8'))

    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
        },
    })

    io.on("connection", socket => {
        console.log('connect')

        socket.on("get-document", async documentId => { 
            
            let elemNoExists = true
            document.forEach(elem => {
                if(elem.id===documentId)  {elemNoExists = false}
            })
            if(elemNoExists) document.push({id:documentId, data:''})

            const arrIdElem  = []
            document.forEach(elem => {if(elem.id!=documentId) arrIdElem.push({id: elem.id})})

            console.log(arrIdElem)
            
            socket.join(documentId) //присоединение к комноте с таким-то айди
            socket.emit("load-document", arrIdElem) //отправка документа клиенту

            // socket.on("send-changes", documentId => {
            //     console.log(arrIdElem)
            //     socket.broadcast.to(documentId).emit("receive-changes", arrIdElem)   //отправляет всем сокетам в комнате кроме отпрваителя
            // })

            socket.on("save-document", async data => {
                document.forEach(elem => { 
                    if(elem.id===documentId) elem.data = data 
                    return elem
                })

                fs.writeFileSync('./src/socket/persons.json', JSON.stringify(document)) //сохранение документа
            })

        })
    })
}


