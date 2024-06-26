const express = require("express")
/* Instalar libreria express con el comando npm install express y también cors*/
const cors = require("cors")
const app = express()

app.use(express.static("public"))
app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador {
    constructor(id){
        this.id = id
        this.x = 0; // Initialize with default values
        this.y = 0;
    }
    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }
    actualizarPosicion(x, y){
        this.x = x
        this.y = y
    }
    asignarAtaques(ataques){
        this.ataques = ataques
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}
/* get sirve para solicitar un recurso */
/* post segundo plano enviar información */
/* el id crea un identificador unico para cada jugador */
/* se utiliza setHeader para permitir que se conecte el archivo de mokepon */
app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)
    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
  
    if(jugadorIndex >=0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
  
    if(jugadorIndex >=0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y); // Corrected typo here
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)
    
    res.send({
        enemigos
    })
})

app.post("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
  
    if(jugadorIndex >=0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    
    res.end()
})

app.get("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.id ===jugadorId)
    res.send({
        ataques: jugador.ataques || []
    })
})

app.listen(8080, () => {
    console.log("Servidor funcionando")
})

/* cd C:\Users\melis\Desktop\PROGRAMAR\mokepon */