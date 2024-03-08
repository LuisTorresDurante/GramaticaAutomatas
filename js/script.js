var lineasAgregadas = [];

function agregarLinea() {
    var nuevaLineaTexto = document.getElementById("nuevaRegla").value;
    var listaReglasElaboradas = document.getElementById("listaReglasElaboradas");
    if (nuevaLineaTexto.trim() !== "") {
        var nuevaRegla = document.createElement("div");
        nuevaRegla.className = "row align-items-center borde";

        //texto
        var pColumn = document.createElement("div");
        pColumn.className = "col align-self-center";
        pColumn.innerHTML = '<p>' + nuevaLineaTexto + '</p>';
    
        //basurita
        var buttonColumn = document.createElement("div");
        buttonColumn.className = "col-auto";
        buttonColumn.innerHTML = '<svg onclick="borrarLinea(this)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/></svg>';

        nuevaRegla.appendChild(pColumn);
        nuevaRegla.appendChild(buttonColumn);
    
        listaReglasElaboradas.appendChild(nuevaRegla);
        lineasAgregadas.push(nuevaLineaTexto);
        console.log(lineasAgregadas);
        document.getElementById("nuevaRegla").value = "";
    }
    
}

function borrarLinea(button) {
    var linea = button.closest(".borde"); // Find the closest ancestor with class "borde"
    var listaReglasElaboradas = document.getElementById("listaReglasElaboradas");
    var textoBorrado = linea.querySelector('p').textContent;
    
    lineasAgregadas = lineasAgregadas.filter(function (linea) {
        return linea !== textoBorrado;
    });

    listaReglasElaboradas.removeChild(linea);
}


function descargarTxt() {
    var reglasDescargar = lineasAgregadas.join('\n');
    console.log(reglasDescargar)
    console.log(lineasAgregadas)
    var blob = new Blob([reglasDescargar], { type: "text/plain" });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "gramatica.txt";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

function cargarGramatica() {
    var archivoInput = document.getElementById("cargarArchivo");
    var archivo = archivoInput.files[0];

    if (archivo) {
        var lector = new FileReader();
        lector.onload = function (e) {
            var contenido = e.target.result;
            var lineas = contenido.split('\n');
            lineasAgregadas = lineas;
            actualizarRecuadro();
        };
        lector.readAsText(archivo);
    }
    console.log(lineasAgregadas)
}

function actualizarRecuadro() {
    var listaReglasElaboradas = document.getElementById("listaReglasElaboradas");

    lineasAgregadas.forEach(function (linea) {
        var nuevaRegla = document.createElement("div");
        nuevaRegla.className = "row align-items-center borde";

        // Create a column for the <p> tag
        var pColumn = document.createElement("div");
        pColumn.className = "col align-self-center";
        pColumn.innerHTML = '<p>' + linea + '</p>';

        // Create a column for the trash icon button
        var buttonColumn = document.createElement("div");
        buttonColumn.className = "col-auto";
        buttonColumn.innerHTML = '<svg onclick="borrarLinea(this)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/></svg>';

        // Append the columns to the row
        nuevaRegla.appendChild(pColumn);
        nuevaRegla.appendChild(buttonColumn);

        listaReglasElaboradas.appendChild(nuevaRegla);
        document.getElementById("nuevaRegla").value = "";
    });
}

function insertarLambda() {
    var nuevaRegla = document.getElementById("nuevaRegla");
    nuevaRegla.value += 'λ';
}

function insertarSigma() {
    var nuevaRegla = document.getElementById("nuevaRegla");
    nuevaRegla.value += 'Σ->';
}
function borrarTodasLasLineas() {
    var listaReglasElaboradas = document.getElementById("listaReglasElaboradas");
    
    // Clear the array of lines
    lineasAgregadas = [];

    // Remove all child elements from the listaReglasElaboradas
    while (listaReglasElaboradas.firstChild) {
        listaReglasElaboradas.removeChild(listaReglasElaboradas.firstChild);
    }
}

