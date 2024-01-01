fetch('http://localhost:3000/pups')
.then(res => res.json())
.then(results => {
    console.log(results);
    results.forEach((dog) => createDogCard(dog));
});
function createDogCard(dog) {
    let dogBar = document.getElementById('dog-bar');
    let newDogCard = document.createElement('span');
    newDogCard.innerText = dog.name;
    newDogCard.setAttribute('id', `dog-card-${dog.id}`)
    dogBar.appendChild(newDogCard);
    newDogCard.addEventListener('click', (e) => {
        let dogToDisplayElement = e.target;
        let dogToDisplayName = dogToDisplayElement.innerText;
        console.log(dogToDisplayName);
        let dogInfo = document.getElementById('dog-info');
        let dogImage = document.createElement('img');
        dogImage.setAttribute('id', `image-${dog.id}`)
        let dogName = document.createElement('h2');
        let dogButton = document.createElement('button');
        dogButton.setAttribute('id', `dog-button-${dog.id}`);
        let isGoodDog = dog.isGoodDog;
        dogImage.src = dog.image;
        dogName.innerText = dog.name;
        dogName.setAttribute('id', dog.name)
        if (isGoodDog) {
            dogButton.innerText = "Good Dog!"
        }
        else dogButton.innerText = "Bad Dog!"
        dogInfo.appendChild(dogImage);
        dogInfo.appendChild(dogName);
        dogInfo.appendChild(dogButton);
        dogButton.addEventListener('click', (event) => {
            const dogClickedIDFull = event.target.id;
            const lastDigit = dogClickedIDFull.slice(-1);
            if (isGoodDog) {
                isGoodDog = false;
                dogButton.innerText = "Bad Dog!"
            }
            else {
                isGoodDog = true;
                dogButton.innerText = "Good Dog!"
            }
            fetch(`http://localhost:3000/pups/${lastDigit}`,{
                method:'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({isGoodDog})
            }) 
            .then(res => res.json())
            .then(results => console.log(results));
        })
        secondClick = true;
    })
}
document.addEventListener('DOMContentLoaded', () => {
const filterButton = document.getElementById('good-dog-filter');
console.log(filterButton);
    filterButton.addEventListener('click', () => {
        filterButton.innerText = 'Filter good dogs: ON';
        fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(results => {
            results.forEach((result) => {
                if (!result.isGoodDog) {
                    document.getElementById(`dog-card-${result.id}`).style.display = 'none'
                }
            })
        })
    })
})
