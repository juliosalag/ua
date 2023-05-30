var icon = document.getElementById("desactivar");
var links = document.querySelectorAll("a, button, i");
var disponibles = true;

icon.addEventListener('click', function(event) {
    //event.stopPropagation();
    disponibles ? disableLinks() : enableLinks();
    disponibles = !disponibles;
});

function disableLinks() {
    icon.className = "fa-solid fa-lock";
    console.log("bloquear pantalla");
    for (var i = 0; i < links.length; i++) {
        if (links[i].id != "desactivar") {
            links[i].addEventListener('click', preventDefault);
            links[i].classList.add('disabled');
            if(links[i].tagName == 'BUTTON')
                links[i].disabled = true;
        }
    }
}

function enableLinks() {
    icon.className = "fa-solid fa-unlock";
    console.log("desbloquear pantalla");
    for (var i = 0; i < links.length; i++) {
        if (links[i].id != "desactivar") {
            links[i].removeEventListener('click', preventDefault);
            links[i].classList.remove('disabled');
            if(links[i].tagName == 'BUTTON')
                links[i].disabled = false;
        }
    }
}

function preventDefault(event) {
    event.preventDefault();
}