function cargarDatos(){
    tipos = ['Programa ECO',
            'Programa rápido',
            'Programa intensivo',
            'Programa copas',
            'Programa silencioso',
            'Programa automático',
            'Programa media carga'
];
    descrip = ['Limpia la vajilla consumiendo menos agua y electricidad en cada lavado.',
            'Adecuado para lavado rápido y vajillas con poca suciedad.',
            'Lavado de cacerolas, sartenes, vajilla y cubiertos no delicados. Elimina restos de alimentos resecos, fuertemente incrustados o quemados.',
            'Adecuado para vajilla delicada o sensibles a altas temperaturas.',
            'Funcionamiento más sensible y silencioso. Se reduce la presión de ruido del lavado.',
            'Optimiza el lavado en función del grado de suciedad del agua mediante el sistema de sensores.',
            'Lavado de la vajilla colocada en la mitad superior o inferior del lavavajillas. La otra mitad no será lavada.'
    ];
    tiempos = ['120',
            '20',
            '50',
            '60',
            '50',
            '5',
            '30'
    ];
    temperaturas = ['30',
            '45',
            '90',
            '30',
            '50',
            '50',
            '70'
    ];

    var tipo = document.querySelectorAll('#tipoPrograma');
    var desc = document.getElementById("descPrograma");

    const params = new URLSearchParams(window.location.search);
    const tipoPar = params.get('tipo');

    tipo.forEach(function(elemento) {
        elemento.textContent = tipos[tipoPar-1];
    });
    desc.textContent = descrip[tipoPar-1];

    var tiempo = document.getElementById("tiempo");
    var temperatura = document.getElementById("temperatura");
    
    tiempo.value = tiempos[tipoPar-1] + ' min';
    temperatura.value = temperaturas[tipoPar-1] + 'º';
}

cargarDatos();

function empezarLavado(){
    var info = document.querySelector('.grid');
    info.style.visibility = "hidden";

    var info = document.querySelector('.programaIniciado');
    info.style.visibility = "visible";
    
    sessionStorage.setItem("lavado", true);
    sessionStorage.setItem("tiempoRestante", 42+parseFloat(document.getElementById('tiempo').value));

    disableLinks()
}

function terminarLavado(){
    var info = document.querySelector('.grid');
    info.style.visibility = "visible";

    var info = document.querySelector('.programaIniciado');
    info.style.visibility = "hidden";

    sessionStorage.setItem("lavado", false);
    sessionStorage.setItem("tiempoRestante", null);

    enableLinks()

    window.location.href = "index.html";
}

function actualizarValores(){
    sessionStorage.setItem("tiempoRestante", sessionStorage.getItem("tiempoRestante") - 1);

    var tiempoRestante = document.getElementById('tiempoRestante');
    tiempoRestante.textContent = 'Tiempo restante: ' + sessionStorage.getItem("tiempoRestante") + ' min';

    var temperaturaActual = document.getElementById('temperaturaActual');
    temperaturaActual.textContent = 'Temperatura: ' + electro.temperatura + 'º';

    var consumoActual = document.getElementById('consumoActual');
    consumoActual.textContent = 'Consumo: ' + electro.consumo + ' kWh/ciclo';
}

setInterval(() => {
    actualizarValores();
}, 1000);

/*
<h2 id="tiempoRestante">Tiempo restante</h2>
<h2 id="temperaturaActual">Temperatura</h2>
<h2 id="consumoActual">Consumo</h2>
*/