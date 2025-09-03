const website = "https://frapollif.github.io/pet-adoption-data/";

async function getPetsData() {
    const data = await fetch(`${website}/pets.json`);
    const petsData = await data.json();
    return petsData;
}


async function displayPets() {
    
    const pets = await getPetsData();
    const template = document.querySelector('#animal-card-template');

    const wrapper = document.querySelector('main');

    console.log("array:".concat(template));


    pets.forEach(pet => {
        
        const clone = template.content.cloneNode(true);
        console.log(pet);

        // qui modifichiamo il template

        // aggiungiamo l'articolo alla pagina

        const image = clone.querySelector('.animal-card-photo img');
        image.src=pet.photo;

        const name = clone.querySelector('.animal-card-text h1');
        name.textContent = pet.name;


        const small = clone.querySelectorAll('.animal-card-text small span');
        petAge = getPetAge(pet.birthYear);

        if (petAge == 0) {
            small[0].textContent = "less than a year old";
        } else if (petAge == 1) {
            small[0].textContent = petAge + " year old";
        } else {
            small[0].textContent = petAge + " years old";
        }

        small[1].textContent = capitalize(pet.species);


        const p = clone.querySelector('.animal-card-text p');
        p.textContent = pet.description;

        const a = clone.querySelector('.animal-card-text .adopt-button');
        a.href = website.concat("pets/").concat(pet.id).concat("/");
        a.textContent = "Adotta ".concat(pet.name);


        wrapper.appendChild(clone);
    });

}

displayPets();


function getPetAge(birthYear) {
    const d = new Date();
    let currentYear = d.getFullYear();

    return currentYear - birthYear;
}


function capitalize(species) {
    return species[0].toUpperCase() + species.slice(1);
}

// const allButtons = document.querySelectorAll("nav button");
// aggiungi una classe per filtro --> confronta filtri e così == a style hover


function displayFilteredAnimals(e) {

    let petsArticles = document.querySelectorAll("article");

    for (let index = 0; index < petsArticles.length; index++) {
        let petArticle = petsArticles[index];

        const small = petArticle.querySelectorAll('.animal-card-text small span');  // small[1] referes to the species

        if (e.target.dataset.filterAnimal == "All") {
            petArticle.style.display = "flex";
        } else if (small[1].textContent != e.target.dataset.filterAnimal) {
            petArticle.style.display = "none";
        } else {
            petArticle.style.display = "flex";
        }
    }
}


const filterButtons = document.querySelectorAll("nav button");

filterButtons.forEach(_button => {
    _button.setAttribute("clicked", "false");
    if (_button.dataset.filterAnimal == "All") {
        _button.setAttribute("clicked", "true");
    }
});

filterButtons.forEach(button => {

    button.addEventListener("click", (e) => {
        displayFilteredAnimals(e)

        filterButtons.forEach(_button => {
            _button.setAttribute("clicked", "false");
        });

        button.setAttribute("clicked", "true");
    });
});
