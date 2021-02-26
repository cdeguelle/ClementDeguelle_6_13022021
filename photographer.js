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

// PAGE DYNAMIQUE \\
// Lecture de photographerID dans l'URL
var photographerID = parseInt(new URLSearchParams(window.location.search).get('photographerID'), 10);

// Requête objet JSON
var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        displayPhotographerInfo(response.photographers.find(photographer => {
            return photographer.id === photographerID;
        }));
        displayPhotographerGrid(response.media.filter(filterById));
    }
};
request.open("GET", "data.json");
request.send();

// Récupération des photos/videos par id de photographe
function filterById (media) {
    if (media.photographerId === photographerID) {
        return true;
    } else {
        return false;
    }
}

// Remplissage dynamique des champs infos photographes
function displayPhotographerInfo (photographer) {
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
        tagsContainerProfile.innerHTML += `<li class="tags__name tags__name--profile">#${photographer.tags[i]}</li>`
    }
}

// Remplissage dynamique de la grille de photos
function displayPhotographerGrid (photographerMedia)  {
    let photographerGrid = document.querySelector('.photo-grid');
    for (let index = 0; index < photographerMedia.length; index++) {
        photographerGrid.innerHTML += `
        <div class="photo-grid__picture">
            <a href="#" class="photo-grid__link">
                ${photographerMedia[index].hasOwnProperty('image') ? `<img src="./public/img/Sample Photos/${photographerMedia[index].name}/${photographerMedia[index].image}" alt="${photographerMedia[index].description}" class="photo">` : ''}
                ${photographerMedia[index].hasOwnProperty('video') ? `<video controls><source src="./public/img/Sample Photos/${photographerMedia[index].name}/${photographerMedia[index].video}" alt="${photographerMedia[index].description}" class="photo" type="video/mp4"></video>` : ''}
            </a>
            <div class="photo-grid__description">
                <h2 class="photo__name">${photographerMedia[index].description}</h2>
                <p class="photo__price">
                    ${photographerMedia[index].price} €
                </p>
                <p class="photo__like">
                    <span class="photo__like-count" id="photo__like-count-${photographerMedia[index].id}">${photographerMedia[index].likes}</span>
                    <i class="fas fa-heart photo__like-icon" id="photo__like-icon-${photographerMedia[index].id}" onclick="incrementPhotoLikesCount('photo__like-count-${photographerMedia[index].id}')"></i>
                </p>
            </div>
        </div>`;
        // Compteur de likes par photos
        /*document.getElementById('photo__like-icon-' + photographerMedia[index].id).addEventListener('click', function(e) {
            console.log('click')
            var photoLikesCount = document.querySelector('#photo__like-count-' + photographerMedia[index].id);
            var likes = parseInt(photoLikesCount.textContent, 10);
            likes ++;
            photoLikesCount.innerHTML = likes;
        })*/
    }
}

function incrementPhotoLikesCount (id) {
    let elem = document.getElementById(id)
    let likes = parseInt(elem.textContent, 10)
    likes++
    elem.innerHTML = likes
}

// Carousel 
class Carousel {
    /**
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} options.slidesToScroll Nombre d'éléments à faire défiler
     * @param {Object} options.slidesVisible Nombre d'éléments visible dans une slide
     */
    constructor (element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)
        this.children = [].slice.call(element.children)
        let root = this.createDivWithClass('carousel')
        let container = this.createDivWithClass('carousel__container')
        root.appendChild(container)
        this.element.appendChild(root)
        this.children.forEach((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            container.appendChild(child)
        })
    }

    createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
}

document.addEventListener('DOMContentLoaded', function () {


    new Carousel(document.querySelector('.photo-grid'), {
        slidesToScroll: 1,
        slidesVisible: 1
    })

})


