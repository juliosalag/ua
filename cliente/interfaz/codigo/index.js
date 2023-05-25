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

function getPagina(){
    let pagina = window.location.href.split('/').pop();

    pagina = pagina.split('.')[0]; //li llevem el .html
    //console.log(pagina);

    return pagina;
}

//Index con estilo predeterminado no común con el resto de páginas
function customStyle(){
    if(getPagina() === 'index'){
        const root = document.documentElement,  //para cambiar tamaño #contenido
            hora = document.getElementById('hora');

        root.style.setProperty('--w2', '310pt');
        root.style.setProperty('--h2', '145pt');
        hora.style.setProperty('display', 'none');
    }
}