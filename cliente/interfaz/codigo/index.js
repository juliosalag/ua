/* ------------------- CÓDIGO INDEX.HTML Y COMUNES ------------------- */
//Hora reloj analógico
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

function programa() {
    let botones = document.querySelectorAll('.botones'),
        dialogo = document.createElement('dialog'),
        //descripciones para cada programa (MIRAR DE CAMBIAR FORMATO (JSON))
        descrip = ['Limpia la vajilla consumiendo menos agua y electricidad en cada lavado.',
            'Adecuado para lavado rápido y vajillas con poca suciedad.',
            'Lavado de cacerolas, sartenes, vajilla y cubiertos no delicados. Elimina restos de alimentos resecos, fuertemente incrustados o quemados.',
            'Adecuado para vajilla delicada o sensibles a altas temperaturas.',
            'Funcionamiento más sensible y silencioso. Se reduce la presión de ruido del lavado.',
            'Optimiza el lavado en función del grado de suciedad del agua mediante el sistema de sensores.',
            'Lavado de la vajilla colocada en la mitad superior o inferior del lavavajillas. La otra mitad no será lavada.'
        ],
        html = '';

    //recorre todos los botones
    botones.forEach(function(boton, i) {
        //se cogen los parametros del boton
        boton.addEventListener('click', function() {
            let dialogo = document.createElement('dialog'),
                dBoton = document.createElement('button'); //copia boton

            dBoton.className = 'botones';
            dBoton.title = boton.title;
            dBoton.innerHTML = boton.innerHTML;

            let html = `${dBoton.outerHTML}
                        <h2>${this.title}</h2>
                        <p>${descrip[i]}</p>
                        <button id="atras" onclick="cerrarDialogo(0);" class="boton" title="volver atrás"><i class="fa-solid fa-chevron-left"></i></button>`;

            dialogo.innerHTML = html;
            document.body.appendChild(dialogo);
            dialogo.showModal();
        });
    });
}

function cerrarDialogo(valor) {
    document.querySelector('dialog').close(); //en açò NOMÉS no es borra del html
    document.querySelector('dialog').remove(); //en açò si
}