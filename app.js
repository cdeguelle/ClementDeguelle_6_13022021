var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        displayPhotographers(response.photographers);
    }
};
request.open("GET", "data.json");
request.send();

function displayPhotographers (photographers) {
    let photographersContainer = document.querySelector('.photographers-grid');
    for (let index = 0; index < photographers.length; index++) {
        photographersContainer.innerHTML += `
        <div class="photographer">
            <a href="./photographer.html?photographerID=${photographers[index].id}" class="photographer__link" id="photographer-${photographers[index].id}">
                <img src="./public/img/Sample Photos/Photographers ID Photos/${photographers[index].portrait}" alt="${photographers[index].name}" class="photographer__picture">
                <h2 class="photographer__name">${photographers[index].name}</h2>
            </a>
            <p class="photographer__city">${photographers[index].city}, ${photographers[index].country}</p><br>
            <p class="photographer__description">${photographers[index].tagline}</p><br>
            <p class="photographer__price">${photographers[index].price}€/jour</p><br>
            <ul class="photographer__tags" id="photographer-tags-${photographers[index].id}"></ul>
        </div>`;
        var tagsContainer = document.querySelector('#photographer-tags-' + photographers[index].id);
        for (let i = 0; i < photographers[index].tags.length; i++) {
            tagsContainer.innerHTML += `<li class="tags__name">#${photographers[index].tags[i]}</li>`        
        }
    } 
}

