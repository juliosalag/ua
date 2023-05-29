/* ------------------- CÓDIGO INDEX.HTML Y COMUNES ------------------- */
//Hora reloj analógico
if(document.getElementById("hour")) {
    setInterval(() => {
        d = new Date(); //object of date()
        hr = d.getHours();
        min = d.getMinutes();
        sec = d.getSeconds();
        hr_rotation = 30 * hr + min / 2; //converting current time
        min_rotation = 6 * min;
        sec_rotation = 6 * sec;

        hour.style.transform = `rotate(${hr_rotation}deg)`;
        minute.style.transform = `rotate(${min_rotation}deg)`;
        second.style.transform = `rotate(${sec_rotation}deg)`;

        let ampm = document.getElementById("ampm");
        ampm.innerHTML = hr < 12 ? "AM" : "PM";

    }, 1000);
}

function getPagina() {
    let pagina = window.location.href.split('/').pop();

    pagina = pagina.split('.')[0]; //li llevem el .html
    //console.log(pagina);

    return pagina;
}

//Index con estilo predeterminado no común con el resto de páginas
function customStyle() {
    if (getPagina() === 'index') {
        const root = document.documentElement, //para cambiar tamaño #contenido
            hora = document.getElementById('hora');

        root.style.setProperty('--w2', '310pt');
        root.style.setProperty('--h2', '145pt');
        hora.style.setProperty('display', 'none');
    }
}

/* ------------------- CÓDIGO PROGRAMAS.HTML ------------------- */
var prg; //variable global de programa

/* seleccion de programa + info */
function programa() {
    let botones = document.querySelectorAll('.botones'),
        //descripciones para cada programa (MIRAR DE CAMBIAR FORMATO (JSON))
        descrip = ['Limpia la vajilla consumiendo menos agua y electricidad en cada lavado.',
            'Adecuado para lavado rápido y vajillas con poca suciedad.',
            'Lavado de cacerolas, sartenes, vajilla y cubiertos no delicados. Elimina restos de alimentos resecos, fuertemente incrustados o quemados.',
            'Adecuado para vajilla delicada o sensibles a altas temperaturas.',
            'Funcionamiento más sensible y silencioso. Se reduce la presión de ruido del lavado.',
            'Optimiza el lavado en función del grado de suciedad del agua mediante el sistema de sensores.',
            'Lavado de la vajilla colocada en la mitad superior o inferior del lavavajillas. La otra mitad no será lavada.'
        ];

    //recorre todos los botones
    botones.forEach(function(boton, i) {
        //se cogen los parametros del boton
        boton.addEventListener('click', function() {
            let url = '#mprograma',
                botonera = document.getElementById('ctrl_izq'),
                modal = document.getElementById('info-programa'),
                dBoton = document.createElement('button'), //copia boton
                html, info,
                play = document.getElementById('lavar');

            location.href += url;

            dBoton.className = 'botones img-programa';
            dBoton.title = boton.title;
            dBoton.innerHTML = boton.innerHTML;
            dBoton.style = boton.style;
            dBoton.setAttribute('disabled', 'true');

            html = `${dBoton.outerHTML}`;
            info = `<h2>${this.title}</h2>
                    <p>${descrip[i]}</p>`;

            botonera.insertAdjacentHTML('afterbegin', html);
            modal.insertAdjacentHTML('beforeend', info);

            prg = this.title; //asignar variable global
            deshabilitarBotones();
        });
    });
}

//si estem en info-programa, deshabilitar botons elecció de programa
function deshabilitarBotones(){
    let pagina = window.location.href.split('#').pop();
    
    if(pagina == 'mprograma'){
        //disablejar tots els botons
        let botones = document.querySelectorAll('.botones'),
            atras = document.getElementById('atras');

        botones.forEach(function(boton, i) {   
            boton.setAttribute('disabled', 'true');
        });
        atras.setAttribute('tabindex', '-1'); //s'havia quedat l'enllaç per darrere tabejable
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
      const focusedElement = document.activeElement;
      console.log(focusedElement); // Output: The currently focused element
    }
  });

// settear info de lavado en el sessionStorage
function infoLavado(prg){
    let a = prg.split(' ').pop(),
        // JavaScript object
        info ={ programa: a,
                tiempo: 1,
                temperatura: 60
              },
        jsonString = JSON.stringify(info); // Convertir a JSON string
    
    // Set the JSON string to session storage
    sessionStorage.setItem('infoPrograma', jsonString);

    //redirigir a index (modificar per a que siga especial)
    window.location.href = 'index.html'
}