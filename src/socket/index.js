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

        socket.on('get-document', async documentId => { 
            
            //отправка списка айди всем клиентам клиентов редактирующие текстовое поле
            let elemNoExists = true
            document.forEach(elem => {
                if(elem.id===documentId)  {elemNoExists = false}
            })
            if(elemNoExists) document.push({id:documentId, data:''})

            const arrIdElem  = []
            document.forEach(elem => {if(elem.id!=documentId) arrIdElem.push({id: elem.id})})
            
            socket.join(documentId)
            socket.emit('load-document', arrIdElem)

            //получения текста от любого клиента и отправка всем клиентам
            socket.on('send-changes', text=>{
                console.log(text)
                io.emit('receive-changes', text)
            })

            //сохранение документа
            socket.on('save-document', async data => {
                document.forEach(elem => { 
                    if(elem.id===documentId) elem.data = data 
                    return elem
                })

                fs.writeFileSync('./src/socket/persons.json', JSON.stringify(document))
            })

            //удаление документа
            socket.on('delete-document', async documentId =>{
                document =  document.filter(elem => elem.id !== documentId)
                fs.writeFileSync('./src/socket/persons.json', JSON.stringify(document))
            })

        })

    })
}


