const map = L.map('mapid').setView([-27.222633, -49.6455874], 15);

//Create and add titeLayer

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


//Create icon
    
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
})

let marker;

// create and add markers

map.on('click', (event) => {

    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;


    // Remove icon 
    marker && map.removeLayer(marker)

    //add icon layer
    marker = L.marker([lat, lng], { icon })
    .addTo(map)
})

// photos upload

function addPhotoField() {
    // pegar o container de fotos 
    const container = document.querySelector('#images')
    // pegar o container para duplicar .new-image
    const fieldsContainer  = document.querySelectorAll('.new-upload')
    // realizar o clone da ultíma imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)

    //Verificar se o campo está vazio se sim, não adicionar ao container de imagens

    const input = newFieldContainer.children[0]

    if (input.value == "") {
        return
    }

    //Limpar o campo antes de adicionar ao container de imagens
    input.value = ""
    //adicionar o clone ao container de #images 
    container.appendChild(newFieldContainer)
}

function deleteField(event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length <= 1) {
        //limpar o valor do campo
        span.parentNode.children[0].value = ""
        return
    }

    //deletar o campo
    span.parentNode.remove();
}

//selecionar do sim e não

function toggleSelected(event) {
   //retirar a class .active (dos botoes)
    document.querySelectorAll('.button-select button')

    .forEach(function(button) {
        button.classList.remove('active')
    })
    //colocar a class .active
    const button = event.currentTarget
    button.classList.add('active')

    //atualizar o meu input hidden com o valor selecionado

    const input = document.querySelector('[name="open_on_weekends"]')
    
    input.value = button.dataset.value
}

function validate(event) {

    //validar se lat e lng estão preenchidos
    const needsLatAndLng = false;
    if(needsLatAndLng) {
        event.preventDefault()
        alert('Selecione um ponto no mapa')
    }
}
