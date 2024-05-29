alert("Bienvenido 😊")

const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
sectionReiniciar.style.display = "none"
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigo = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo 
let inputRatihuella 
let inputLangostelvis
let inputPydos
let inputTucapalma
let mascotaJudagor
let ataquesMokepon
let ataquesMokeponEnemigo
let botonTierra 
let botonFuego 
let botonAgua 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackgroung = new Image()
mapaBackgroung.src = "./assets/mokemap.webp"
let mascotaJugadorObjeto
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class MokePon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 33
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        );
    }
}


let hipodoge = new MokePon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.webp", 5, "./assets/hipodoge.png")
let capipepo = new MokePon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.webp", 5, "./assets/capipepo.png")
let ratihuella = new MokePon("Ratihuella", "./assets/mokepons_mokepon_ratihuella_attack.webp", 5, "./assets/ratihuella.png")
let langostelvis = new MokePon("Langostelvis", "./assets/mokepons_mokepon_langostelvis_attack.webp", 5, "./assets/langostelvis.png")
let pydos = new MokePon("Pydos", "./assets/mokepons_mokepon_pydos_attack.webp", 5, "./assets/pydos.png")
let tucapalma = new MokePon("Tucapalma", "./assets/mokepons_mokepon_tucapalma_attack.webp", 5, "./assets/tucapalma.png")



const HIPODOGE_ATAQUES = [
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra" }
]

const CAPIPEPO_ATAQUES = [
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
]

const RATIHUELLA_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" }
]

const LANGOSTELVIS_ATAQUES = [
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra" }
]

const PYDOS_ATAQUES = [
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
]

const TUCAPALMA_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" }
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)
capipepo.ataques.push(...CAPIPEPO_ATAQUES)
ratihuella.ataques.push(...RATIHUELLA_ATAQUES)
langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)
pydos.ataques.push(...PYDOS_ATAQUES)
tucapalma.ataques.push(...TUCAPALMA_ATAQUES)

mokepones.push(hipodoge,capipepo,ratihuella,langostelvis,pydos,tucapalma)

function iniciarJuego() {  
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt="Hipodoge">
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatihuella = document.getElementById("Ratihuella")
        inputLangostelvis = document.getElementById("Langostelvis")
        inputPydos = document.getElementById("Pydos")
        inputTucapalma = document.getElementById("Tucapalma")
    })

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    botonReiniciar.addEventListener("click", reiniciarJuego)
    unirseAlJuego()
}

/* fetch sirve para traer el id de los jugadores creado en Node.js */
function unirseAlJuego(){
    fetch("http://192.168.20.43:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJudagor = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJudagor = inputCapipepo.id
    } else if (inputRatihuella.checked) {
        spanMascotaJugador.innerHTML = inputRatihuella.id
        mascotaJudagor = inputRatihuella.id
    } else if (inputLangostelvis.checked) {
        spanMascotaJugador.innerHTML = inputLangostelvis.id
        mascotaJudagor = inputLangostelvis.id
    } else if (inputPydos.checked) {
        spanMascotaJugador.innerHTML = inputPydos.id
        mascotaJudagor = inputPydos.id
    } else if (inputTucapalma.checked) {
        spanMascotaJugador.innerHTML = inputTucapalma.id
        mascotaJudagor = inputTucapalma.id
    }
    else {
        alert("Selecciona una mascota")
        return
    }

    sectionSeleccionarMascota.style.display = "none"
    seleccionarMokepon(mascotaJudagor)
    
    extraerAtaques (mascotaJudagor)
    sectionVerMapa.style.display = "flex"
    
    iniciarMapa()
    
}

function seleccionarMokepon(mascotaJudagor) {
    fetch(`http://192.168.20.43:8080/mokepon/${jugadorId}`, {
        method:"post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJudagor
        })
    } )
}

function extraerAtaques(mascotaJudagor) {
    let ataques 

    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJudagor === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}
    
function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre} </button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonTierra = document.getElementById("boton-tierra")
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")

    botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            let ataqueType = e.target.id; // Get the id of the clicked button
            switch (ataqueType) {
                case "boton-fuego":
                    ataqueJugador.push("FUEGO");
                    break;
                case "boton-agua":
                    ataqueJugador.push("AGUA");
                    break;
                case "boton-tierra":
                    ataqueJugador.push("TIERRA");
                    break;
                default:
                    break;
            }
            console.log(ataqueJugador);
            boton.style.background = "#112f58";
            boton.disabled = true;
            if(ataqueJugador.length === 5) {
                enviarAtaques()
            }
            
        });
    });
}

function enviarAtaques(){
    fetch(`http://192.168.20.43:8080/mokepon/${jugadorId}/ataques`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://192.168.20.43:8080/mokepon/${enemigoId}/ataques`)
    .then(function (res){
        if (res.ok) {
            res.json()
            .then(function({ ataques }){
                if (ataques.length === 5) {
                    ataqueEnemigo = ataques
                    console.log("Ataques del enemigo:", ataqueEnemigo);
                    clearInterval(intervalo);
                    combate()
                }
            })
        }
    })
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(0,mokepones.length -1)
    
    spanMascotaEnemigo.innerHTML = mokepones [mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones [mascotaAleatorio].ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1 )

    if (ataquesMokeponEnemigo[ataqueAleatorio].nombre === "🔥") {
        ataqueEnemigo.push("FUEGO");
    } else if (ataquesMokeponEnemigo[ataqueAleatorio].nombre === "💧") {
        ataqueEnemigo.push("AGUA");
    } else {
        ataqueEnemigo.push("TIERRA");
    }
    console.log(ataqueEnemigo);
    iniciarPelea();
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}
    
function indexAmbosOponentes(jugador,enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    console.log("Iniciando combate"); // Debugging
    console.log("Ataques del jugador:", ataqueJugador); // Debugging
    console.log("Ataques del enemigo:", ataqueEnemigo); // Debugging

    /* clearInterval(intervalo) */
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index,index) 
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "TIERRA") {
            indexAmbosOponentes(index,index) 
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO") {
            indexAmbosOponentes(index,index) 
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA") {
            indexAmbosOponentes(index,index) 
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index,index) 
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    console.log("Victorias del jugador:", victoriasJugador); // Debugging
    console.log("Victorias del enemigo:", victoriasEnemigo); // Debugging
    revisarVictorias()
    }


//function compararMascota() {
   // let tipoJugador = mascotaJudagor.tipo
   // let tipoEnemigo = mascotaEnemigo.tipo

   //if (tipoJugador == "🔥" && tipoEnemigo == "🌱" || tipoJugador == "💧" && tipoEnemigo == "🔥" || tipoJugador == "🌱" && tipoEnemigo == "💧") {
        //tipoJugador == "🔥" ?ataquesMokeponJugador
   // }
//}

function revisarVictorias() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!!")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else {
        crearMensajeFinal("Lo siento, perdiste :(")
    }

}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
} 

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal 

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    
    sectionReiniciar.style.display = "block"

}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
     
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackgroung,
        0,
        0,
        mapa.width,
        mapa.height
    )

    mascotaJugadorObjeto.pintarMokepon()
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigo.forEach(function (mokepon){
        if(mokepon != undefined){
            mokepon.pintarMokepon()
            revisarColision(mokepon)
        }
        
    })

        if (mascotaJugadorObjeto.x < 0) {
            mascotaJugadorObjeto.x = 0; 
        } else if (mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho > mapa.width) {
            mascotaJugadorObjeto.x = mapa.width - mascotaJugadorObjeto.ancho; 
        }
    
        if (mascotaJugadorObjeto.y < 0) {
            mascotaJugadorObjeto.y = 0; 
        } else if (mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto > mapa.height) {
            mascotaJugadorObjeto.y = mapa.height - mascotaJugadorObjeto.alto; 
        }  

    
    /* if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratihuellaEnemigo)
        revisarColision(langostelvisEnemigo)
        revisarColision(pydosEnemigo)
        revisarColision(tucapalmaEnemigo)
    } */
}


function enviarPosicion(x,y){
    fetch(`http://192.168.20.43:8080/mokepon/${jugadorId}/posicion`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if(res.ok) {
            res.json()
                .then(function( {enemigos} ){
                    console.log(enemigos)
                    
                    mokeponesEnemigo = enemigos.map(function(enemigo){

                        let mokeponEnemigo = null   
                    if (enemigo.mokepon != undefined) {
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if(mokeponNombre === "Hipodoge") {
                            mokeponEnemigo = new MokePon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.webp", 5, "./assets/hipodoge.png", enemigo.id)
                        } else if(mokeponNombre === "Capipepo"){
                            mokeponEnemigo = new MokePon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.webp", 5, "./assets/capipepo.png", enemigo.id)
                        } else if(mokeponNombre === "Ratihuella") {
                            mokeponEnemigo = new MokePon("Ratihuella", "./assets/mokepons_mokepon_ratihuella_attack.webp", 5, "./assets/ratihuella.png", enemigo.id)
                        } else if(mokeponNombre === "Langostelvis") {
                            mokeponEnemigo = new MokePon("Langostelvis", "./assets/mokepons_mokepon_langostelvis_attack.webp", 5, "./assets/langostelvis.png", enemigo.id)
                        } else if(mokeponNombre === "Pydos") {
                            mokeponEnemigo = new MokePon("Pydos", "./assets/mokepons_mokepon_pydos_attack.webp", 5, "./assets/pydos.png", enemigo.id)
                        } else if(mokeponNombre === "Tucapalma") {
                            mokeponEnemigo = new MokePon("Tucapalma", "./assets/mokepons_mokepon_tucapalma_attack.webp", 5, "./assets/tucapalma.png", enemigo.id)
                        }
                        
                        mokeponEnemigo.x = enemigo.x || aleatorio(0, mapa.width - mokeponEnemigo.ancho);
                        mokeponEnemigo.y = enemigo.y || aleatorio(0, mapa.height - mokeponEnemigo.alto);

                        return mokeponEnemigo
                    } })

            })
        }                
    })
}


function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
    console.log()
}

function sePrecionoUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowRight":
            moverDerecha()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        default:
            break
    }
}

function iniciarMapa() {

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJudagor)
    intervalo = setInterval(pintarCanvas, 50)
   
    window.addEventListener("keydown", sePrecionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJudagor === mokepones[i].nombre) {
            return mokepones [i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = 
        enemigo.y
    const abajoEnemigo = 
        enemigo.y + enemigo.alto
    const derechaEnemigo = 
        enemigo.x + enemigo.ancho
    const izquierdaEnemigo = 
        enemigo.x

    const arribaMascota = 
        mascotaJugadorObjeto.y
    const abajoMascota = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
        mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    }
    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
    
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre;
    ataquesMokeponEnemigo = enemigo.ataques;
    secuenciaAtaque();
}


window.addEventListener("load", iniciarJuego)

//https://github.com/Torofms37/Juego-Web