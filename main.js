const website = "https://frapollif.github.io/pet-adoption-data/";

async function getPetsData() {
    const data = await fetch(`${website}/pets.json`);
    const petsData = await data.json();
    return petsData;
}

let speciesSelection = "cat";

async function displayPets() {
    const pets = await getPetsData();
    const template = document.querySelector('#animal-card-template');

    const wrapper = document.querySelector('main');

    console.log(template);

    /*for (let index = 0; index < pets.length; index++) {
        const pet = pets[index];

        if (speciesSelection != pet.species) {
            pets.delete(pet);
        }
        
    }*/


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

displayPets()


function getPetAge(birthYear) {
    const d = new Date();
    let currentYear = d.getFullYear();

    return currentYear - birthYear;
}


function capitalize(species) {
    return species[0].toUpperCase() + species.slice(1);
}


function navigate() {
    selection = this.id;
    console.log(selection);
}


navButtons = document.getElementsByClassName("navBt");
for (let index = 0; index < navButtons.length; index++) {
    const navButton = navButtons[index];

    navButton.addEventListener("click", navigate);
    
}
