const imagesContainer = document.getElementById("images-container");

// Collection summer
const collectionId = 3403106
/* Based on this http://jsfiddle.net/brettwp/J4djY/*/
function detectDoubleTapClosure(id) {
    let lastTap = 0;
    let timeout;
    return function detectDoubleTap(event) {
      const curTime = new Date().getTime();
      const tapLen = curTime - lastTap;
      if (tapLen < 500 && tapLen > 0) {
        triggerAnimation(id);
        event.preventDefault();
      } else {
        timeout = setTimeout(() => {
          clearTimeout(timeout);
        }, 500);
      }
      lastTap = curTime;
    };
  }
  
// Function accepts id for image search and call unisplash api
function getImageById(id) {  
    try {
        fetch(`https://source.unsplash.com/collection/${collectionId}/?sig=${id}`)
        .then((response) => {
            let imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');
            imageContainer.innerHTML = `<img id="${id}" class="image" src="${response.url}" alt="image from unisplash"/>
                <i id="${id}_animated" class="fas fa-heart like-animated-icon"></i>
            `;
            imageContainer.addEventListener('dblclick', function(e) {
                triggerAnimation(id);
            });

            /* Regex test to determine if user is on mobile */
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                imageContainer.addEventListener('touchend', detectDoubleTapClosure(id));
            }

            imagesContainer.appendChild(imageContainer);
        });
    } catch (error){
        console.error(error)
    }
}

function addLoadingSpinner() {
    let loadingSpinnerDiv = document.createElement('div');    
    loadingSpinnerDiv.classList.add('loading-spinner-container');
    loadingSpinnerDiv.innerHTML = `<img src="static/Spin-1s-100px.svg"/>`;
    
    imagesContainer.appendChild(loadingSpinnerDiv);
}

async function triggerAnimation(id) {
    let likeIcon = document.getElementById(`${id}_animated`);
    likeIcon.classList.add('animation-trigger');
    await new Promise(r => setTimeout(r, 2000));
    likeIcon.classList.remove('animation-trigger');
}


getImageById(3);
getImageById(4);