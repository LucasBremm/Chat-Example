var express = require("express") // importa modulo express
var app = express() // executa função do express para gerar server
var bodyParser = require("body-parser") // importa bodyParser para receber formularios

var Message = require("./models/Message")

var messages

Message.find().sort("createdAt").then((resultado) => {
  messages = resultado
})

app.set("view engine", "ejs") // Informa que a engine de renderização de views é o ejs (o ejs será usado)
app.set("views", "./views/") // Informa onde se encontra o diretorio de views 

app.use(express.static('./public')); // Informa pasta estatica, para acesso direto a conteudos da pasta de fora do servidor

app.use(bodyParser.urlencoded({ extended: true })) // Configura o middleware BodyParser para receber dados urlencoded

require("./controllers/homeController")(app)

// Inicializa o server ouvindo a porta 3000 (cria-se uma variavel para passar a socket.io)
var server = app.listen(3000, () => {
  console.log("Listening on *:3000")
})

//cria o socket e configura para escutar o servidor recem criado
var io = require('socket.io').listen(server)

//variavel para armazenar nome dos usuarios conectados
var apelidos = []

// evento de conexao com usuario
io.on("connection", (socket) => {
  // recupera o nome informado pelo usuario
  var apelido = socket.handshake.query.apelido;
  // salva esse nome na lista de nomes de usuarios
  apelidos.push(apelido);

  // avisa todos os usuarios da conexao do novo usuario
  socket.emit("user connect", { apelido, apelidos, messages })
  socket.broadcast.emit("user connect", { apelidos, apelido })

  // Evento de mensagem enviada por um usuario
  socket.on("chat message", (data) => {
    // envia a mensagem a todos os outros usuarios
    Message.create({ message: data.mensagem, apelido: data.apelido }).then((resultado) => {
      messages.push(resultado)
    })
    socket.broadcast.emit("chat message", data)
  })

  socket.on("typingMessage", (apelido) => {
    socket.broadcast.emit("typingMessage", apelido)
  })

  socket.on("noLongerTypingMessage", () => {
    socket.broadcast.emit("noLongerTypingMessage", apelido)
  })

  // Evento de desconexão com usuario
  socket.on("disconnect", () => {
    //retira o nome do usuario da lista de nomes
    apelidos.pop(apelidos.indexOf(apelido))

    // Avisa a todos os usuarios da desconexão
    socket.emit("user disconnect", { apelidos, apelido })
    socket.broadcast.emit("user disconnect", { apelidos, apelido })

    socket.emit("noLongerTypingMessage", apelido)
    socket.broadcast.emit("noLongerTypingMessage", apelido)
  })
})
