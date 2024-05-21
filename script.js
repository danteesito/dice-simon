let botonInicio = document.getElementById("botonInicio");
let estadoJuego = document.getElementById("estadoJuego");
let numeroDeJuegos = 1;
let combinacion = [];
let secuenciaJugador = [];
let indiceSecuencia = 0;
let botones = [
    document.getElementById("rojo"),
    document.getElementById("amarillo"),
    document.getElementById("verde"),
    document.getElementById("azul")
];

botones.forEach(boton => {
    boton.addEventListener("mousedown", function() {
        this.style.backgroundColor = "black";
    });

    boton.addEventListener("mouseup", function() {
        switch (this.id) {
            case "rojo":
                this.style.backgroundColor = "red";
                break;
            case "amarillo":
                this.style.backgroundColor = "yellow";
                break;
            case "verde":
                this.style.backgroundColor = "green";
                break;
            case "azul":
                this.style.backgroundColor = "blue";
                break;
            default:
                this.style.backgroundColor = "initial";
        }
    });
});

function aleatorio(x) {
    return Math.floor(Math.random() * x);
}

function habilitarBotones(x) {
    for (let i = 0; i < 4; i++) {
        botones[i].disabled = !x;
    }
}

function agregarCombinacion() {
    combinacion.push(aleatorio(4));
    return combinacion;
}

function mostrarSecuencia() {
    for (let i = 0; i < combinacion.length; i++) {
        let colorOriginal = botones[combinacion[i]].style.backgroundColor; 
        setTimeout(() => {
            botones[combinacion[i]].style.backgroundColor = "black"; 
            setTimeout(() => {
                botones[combinacion[i]].style.backgroundColor = colorOriginal; 
            }, 500); 
        }, i * 1000); 
    }
    setTimeout(() => {
        habilitarBotones(true);
        estadoJuego.innerText = "te toca";
    }, combinacion.length * 1000);
}

function verificarSecuencia(idBoton) {
    if (idBoton === combinacion[indiceSecuencia].toString()) {
        secuenciaJugador.push(idBoton);
        indiceSecuencia++;
        if (secuenciaJugador.length === combinacion.length) {
            secuenciaJugador = [];
            indiceSecuencia = 0;
            setTimeout(function() {
                noJugar();
            }, 500);
            jugar();
        }
    } else {
        alert("perdiste, hacertaste: " + (numeroDeJuegos - 1));
        location.reload();
        combinacion = [];
        numeroDeJuegos = 1;
    }
}

function noJugar() {
    habilitarBotones(false);
    numeroDeJuegos++;
    agregarCombinacion();
    estadoJuego.innerText = "espera";
    mostrarSecuencia();
}

function jugar() {
    habilitarBotones(true);
    estadoJuego.innerText = "te toca";
}

botonInicio.addEventListener("click", function () {
    botonInicio.style.display = "none";
    noJugar();
    jugar();
});

botones.forEach(boton => {
    boton.addEventListener("click", function () {
        verificarSecuencia(this.getAttribute("value"));
    });
});

