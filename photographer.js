// DOM Elements
const dropdownMenu = document.querySelector('.dropdown');
const dropdownLink = document.querySelector('.filter-dropdown-link');

// Menu déroulant 
function toggleNavbar() {
    if (!dropdownMenu.getAttribute('style') || dropdownMenu.getAttribute('style') === 'display: none;') {
        dropdownMenu.style.display = 'block';
        dropdownLink.setAttribute('aria-expanded', 'true');
    } else {
        dropdownMenu.style.display = 'none';
        dropdownLink.setAttribute('aria-expanded', 'false');
    }
}

dropdownLink.addEventListener('click', function(e) {
    e.preventDefault();
    toggleNavbar();
})

// Page dynamique
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        var photographerId = parseInt(new URLSearchParams(window.location.search).get('photographerId'), 10)
        console.log(photographerId);
        displayPhotographerInfo(response.photographers.find(photographer => {
            return photographer.id === photographerId;
        }))
        displayPhotographerGrid(response.media);
    }
};
request.open("GET", "data.json");
request.send();

function displayPhotographerInfo (photographer) {
    console.log(photographer)
    let photographerCard = document.querySelector('.photographer-card');
    photographerCard.innerHTML += `
    <div class="photographer__infos">
        <div class="photographer__infos-txt">
            <h1 class="photographer__name photographer__name--profile">${photographer.name}</h1>
            <p class="photographer__city photographer__city--profile">${photographer.city}, ${photographer.country}</p>
            <p class="photographer__description photographer__description--profile">${photographer.tagline}</p>
            <ul class="photographer__tags photographer__tags--profile"></ul>
        </div>
        <button class="contact">Contactez moi</button>
        <img src="./public/img/Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="${photographer.name}" class="photographer__picture photographer__picture--profile">
    </div>`;
    var tagsContainerProfile = document.querySelector('.photographer__tags--profile');
    for (let i = 0; i < photographer.tags.length; i++) {
        tagsContainerProfile.innerHTML += ` <li class="tags__name tags__name--profile">#${photographer.tags[i]}</li>`
    }
}


function displayPhotographerGrid (media)  {
    let photographerGrid = document.querySelector('.photo-grid');
    for (let index = 0; index < media.length; index++) {
        photographerGrid.innerHTML =+ `
        <a href="#" class="photo-grid__picture">
            <img src="./public/img/Sample Photos/Mimi/Animals_Rainbow.jpg" alt="Oiseau coloré" class="photo" id="photo-1">
            <div class="photo-grid__description">
                <h2 class="photo__name" id="photo-name-1">Arc en ciel</h2>
                <p class="photo__price">
                    70 €
                    <i class="fas fa-heart photo__like"></i>
                </p>
            </div>
        </a>`;
    }
}
