// Muestra o despliega un elemento 
function show(elementId) {
    const element = document.getElementById(elementId);

    if (element) {
        element.classList.remove("d-none");
    }
}

// Oculta un elemento
function hide(elementId) {
    const element = document.getElementById(elementId);

    if (element) {
        element.classList.add("d-none");
    }
}