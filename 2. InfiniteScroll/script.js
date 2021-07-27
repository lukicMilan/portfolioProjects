const imagesContainer = document.getElementById("images-container");

// Collection summer
const collectionId = 3403106

// Function accepts id for image search and call unisplash api
function getImageById(id) {  
    try {
        fetch(`https://source.unsplash.com/collection/${collectionId}/?sig=${id}`)
        .then((response) => {
            let imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');
            console.log(response)
            imageContainer.innerHTML = `<img id="${id}" class="image" src="${response.url}" alt="image from unisplash"/>`;
            imagesContainer.appendChild(imageContainer);
        });
    } catch (error){
        console.error(error)
    }
}

function addLoadingSpinner(){
    let loadingSpinnerDiv = document.createElement('div');    
    loadingSpinnerDiv.classList.add('loading-spinner-container');
    loadingSpinnerDiv.innerHTML = `<img src="static/Spin-1s-100px.svg"/>`;
    
    imagesContainer.appendChild(loadingSpinnerDiv);
}


getImageById(3);
getImageById(3);