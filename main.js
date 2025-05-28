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

    console.log(template);


    pets.forEach(pet => {
            const clone = template.content.cloneNode(true);
            console.log(pet)

            // qui modifichiamo il template

            // aggiungiamo l'articolo alla pagina

            const image = clone.querySelector('.animal-card-photo img');
            image.src=pet.photo;

            const name = clone.querySelector('.animal-card-text h1');
            name.textContent = pet.name;

            const p = clone.querySelector('.animal-card-text p');
            p.textContent = pet.description;

            const a = clone.querySelector('.animal-card-text .adopt-button');
            a.href = website.concat("pets/").concat(pet.id).concat("/");


            wrapper.appendChild(clone);
        }
    );

}

displayPets()
