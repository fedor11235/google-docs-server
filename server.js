// const mongoose = require("mongoose")
// const Document = require("./Document")

// mongoose.connect("mongodb://localhost/google-docs-clone", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// })
const fs = require('fs');
let document = JSON.parse(fs.readFileSync('Document.json', 'utf8'));

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})


io.on("connection", socket => {
  console.log('connect')

    socket.on("save-document", async data => { 
      console.log(data)
      document = JSON.parse(fs.readFileSync('Document.json', 'utf8')); //загрузка



      document[0].data = data;
      fs.writeFileSync('Document.json', JSON.stringify(document));
      // await Document.findByIdAndUpdate(documentId, { data })
    })
    socket.emit("load-document", document[0].data)

})





// const defaultValue = ""

// io.on("connection", socket => {
//   socket.on("get-document", async documentId => {
//     const document = await findOrCreateDocument(documentId)
//     socket.join(documentId)
//     socket.emit("load-document", document.data)
//     socket.on("send-changes", delta => {
//       socket.broadcast.to(documentId).emit("receive-changes", delta)
//     })
//     socket.on("save-document", async data => {
//       await Document.findByIdAndUpdate(documentId, { data })
//     })
//   })
// })

// async function findOrCreateDocument(id) {
//   if (id == null) return

//   const document = await Document.findById(id)
//   if (document) return document
//   return await Document.create({ _id: id, data: defaultValue })

// var http = require('http');

// http.get ({
//     host: '88.198.56.226',
//     port: 21000,
//     path: 'https://www.google.com/accounts/OAuthGetRequestToken'
// }, function (response) {
//     console.log (response);
// });