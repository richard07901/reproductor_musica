let opcionesBoton = document.getElementById("opcionBoton")
let opciones = document.querySelector('.opciones')
let cancionesBoton = document.getElementById("cancionesBoton")
let canciones = document.querySelector('.playlist')
let escogida = document.getElementById("escogida")
let slider = document.getElementById("slider")
let repeat = document.getElementById("repeat")
let titulo = document.getElementById("titulo")
let minutos =  document.getElementById("minutos")
let segundos = document.getElementById("segundos")


const playlist = document.querySelector("#playlist")

opcionesBoton.addEventListener("click", ()=>{
    opciones.classList.toggle("activo")
})

cancionesBoton.addEventListener("click", ()=>{
    canciones.classList.toggle("active")
})

let anterior = document.getElementById("anterior")
let play = document.getElementById("play")
let siguiente = document.getElementById("siguiente")

let sonando = false

let track = document.createElement('audio')
var listaCanciones = []
let carga = false
var ind = 0
let autoplay = false
let timer
let min = 0
let seg = 0


document.getElementById("seleccion").addEventListener("change", function(event){
    files = event.target.files
    console.log(files)
    for(var i=0; i<files.length; i++){
        playlist.innerHTML += `
            <div onclick="cargarCancion(${i})" class="cancion" id="escogida">
                <p class ="p_cancion" id="titulo_cancion">${files[i].name}</p>
            </div>
        `
        listaCanciones.push(files[i])
    }
    track.src = files[ind].webkitRelativePath
    track.load()
    opciones.classList.toggle("activo")
})

function cargarCancion(ind){
    // console.log(listaCanciones[ind])
    track.src = listaCanciones[ind].webkitRelativePath
    // ind = indice
    track.load()
    // min = track.duration / 60
    // minutos.innerHTML = `<p id="minutos">${Math.round(min)}</p>`
    // segundos.innerHTML = `<p id="segundos">${Math.round( (min - Math.round(min))*60 )}</p>`
    playCancion()
}

function callback(){
    min = track.duration / 60
    seg = (min - Math.round(min)) * 60
    if (seg < 0){
        min = min - 1
        seg = seg + 60
    }
    minutos.innerHTML = `<p id="minutos">${Math.round(min)}</p>`
    segundos.innerHTML = `<p id="segundos">${Math.round(seg)}</p>`
    // console.log(track.duration)
}

function playCancion(){
    sonando = true
    track.play()
    function dur(a, callback){
        setTimeout(()=>{
            callback()
        }, 100)
        return console.log(a)
    }
    dur("Siiiiu", callback)
    // min = track.duration / 60
    // minutos.innerHTML = `<p id="minutos">${Math.round(min)}</p>`
    // segundos.innerHTML = `<p id="segundos">${Math.round( (min - Math.round(min))*60 )}</p>`
    // console.log(track.duration)
    titulo.innerHTML = `<p id="titulo">${listaCanciones[ind].name}</p>`
    setInterval(setSlider, 1000)
    play.innerHTML = '<i class="bx bx-pause"></i>';
}

function pauseCancion(){
    track.pause()
    sonando = false
    play.innerHTML = '<i class="bx bx-play"></i>';
}

function reproduciendo(){
    if(sonando === false){
        playCancion()
    } else {
        pauseCancion()
    }
}

anterior.addEventListener("click", ()=>{
    if(ind === 0){
        ind = listaCanciones.length - 1
    } else {
        ind = ind -1 
    }
    cargarCancion(ind)
})

siguiente.addEventListener("click", ()=>{
    if(ind === (listaCanciones.length - 1)){
        ind = 0
    } else {
        ind = ind + 1
    }
    cargarCancion(ind)
})

function setSlider(){
    // console.log("Aqui")
    let posicion = 0
    if(!isNaN(track.duration)){
        posicion = track.currentTime * (100 / track.duration)
        slider.value = posicion
    }
    if(track.ended) {
        play.innerHTML = `<i class="bx bx-play"></i>`
        if(autoplay){
            ind += 1
            cargarCancion(ind)
        }
    }
}

slider.addEventListener("click", ()=>{
    track.currentTime = track.duration * (slider.value / 100)
})

repeat.addEventListener("click", ()=>{
    if(autoplay){
        autoplay = false
        repeat.style.background = "#566573"
    } else {
        autoplay = true
        repeat.style.background = "#FF5722"
    }
})
