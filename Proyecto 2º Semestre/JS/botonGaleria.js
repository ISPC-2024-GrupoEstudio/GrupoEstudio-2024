let botonOcultar = document.querySelectorAll(".productos--boton");
let ocultarTexto = document.querySelectorAll(".productos__descripcion--textoOculto");

botonOcultar.forEach((boton, index) => {

    boton.addEventListener('click', () => {
        ocultarTexto[index].classList.toggle('show')

        if(ocultarTexto[index].classList.contains('show')){
            boton.innerHTML = "Ocultar Descripción"
        }
        else{
            boton.innerHTML = "Ver Descripción"
        }
    });
})

