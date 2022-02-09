const fs = require('fs')

module.exports = function (server){
    let document = JSON.parse(fs.readFileSync('./src/socket/persons.json', 'utf8'))
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
        },
    })

    io.on('connection', socket => {
        console.log('connect')

        socket.on('set-document', async documentId => { 
            
            //отправка списка айди всем клиентам клиентов редактирующие текстовое поле
            let elemNoExists = true
            document.forEach(elem => {
                if(elem.id===documentId)  {elemNoExists = false}
            })
            if(elemNoExists) document.push({id:documentId, data:''})

            const arrIdElem  = []
            document.forEach(elem => {if(elem.id!=documentId) arrIdElem.push({id: elem.id})})
            
            socket.join(documentId)
            socket.emit('get-list-id', arrIdElem)

            //сохранение документа
            socket.on('save-document', async data => {
                document.forEach(elem => { 
                    if(elem.id===documentId) elem.data = data 
                    return elem
                })
                fs.writeFileSync('./src/socket/persons.json', JSON.stringify(document))
            })

                    //получения текста от любого клиента и отправка всем клиентам
            socket.on('send-changes', data =>{


                const {innerHTML, idPerson, cursorPosition} = data
                const innerHTMLYourself = innerHTML.replace(`<span class="cursor" id="` + idPerson + `"></span>`,"")

                patOne = innerHTMLYourself.substr(0, cursorPosition+1)
                patTwo = innerHTMLYourself.substr(cursorPosition+1)

                const innerHTMLOthers = patOne + `<span class="cursor" id="` + idPerson + `"></span>` + patTwo
                // socket.broadcast.emit('receive-changes', innerHTMLOthers)
                socket.broadcast.to(documentId).emit('receive-changes', innerHTMLYourself)
                console.log(document)
                for(const elem of arrIdElem) {
                    if(elem.id===undefined) continue
                    socket.broadcast.to(elem.id).emit('receive-changes', innerHTMLOthers)
                }
            })
        })

        //удаление документа
        socket.on('delete-document', async documentId =>{
            document =  document.filter(elem => elem.id !== documentId)
            fs.writeFileSync('./src/socket/persons.json', JSON.stringify(document))
        })

    })
}


