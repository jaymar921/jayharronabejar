const api_url = 'http://192.53.114.221:9500';
const RetrieveAllEvents = () => {
    const rows = document.getElementById('repository-rows');
    fetch(api_url+'/Repository/JayMar921')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            rows.appendChild(DisplayRepository(element));
        });
    })
}

const DisplayRepository = (data) => {

    const column = document.createElement('div');
    column.classList.add('col-sm-12','col-md-6','col-lg-4','d-flex','justify-content-center','mdfy-col');

    const card = document.createElement('div');
    card.classList.add('card','mdfy-card');

    const img = document.createElement('img');
    img.classList.add('card-img-top','mdfy-img');
    retrieveRepositoryImage(data.title, data.imageLink, img);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.innerHTML = data.title;

    const contents = data.description.split('|');

    const desc = document.createElement('p');
    desc.classList.add('card-text');
    desc.innerText = contents[0];

    const dsc2 = document.createElement('p');
    dsc2.classList.add('card-text');
    dsc2.innerHTML = `<small class="text-muted">${contents[1]}<br>${contents[2]}</small>`

    const buttonOpen = document.createElement('a');
    buttonOpen.onclick = function (e) {
        loadImages(data.title);
    }
    buttonOpen.classList.add('btn','btn-primary');
    buttonOpen.innerHTML = 'View Photos';

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(desc);
    cardBody.appendChild(dsc2);
    cardBody.appendChild(buttonOpen);

    card.appendChild(img);
    card.appendChild(cardBody);

    column.appendChild(card)

    return column;
}

const retrieveRepositoryImage = (repository, filename, img) => {
    fetch(`${api_url}/Photo/${repository}/${filename}`)
    .then(response => {
        img.src = response.url;
    })
}

const loadImages = async (repository) => {
    document.getElementById('image-view-modal').classList.remove('hidden');
    const imagesDiv = document.getElementById('images');
    imagesDiv.innerHTML = '';
    const arr = [];
    await fetch(`${api_url}/Photo/${repository}`)
    .then(r => r.json())
    .then(data => {
        
        data.forEach(imgName => {
            arr.push(imgName);
            
        })
    })

    const generator = imgGen(arr);

    loadMoreImages(generator, imagesDiv, repository)   
}

const imgGen = function*(arr){
    yield* arr;
}

const loadMoreImages = async (imgGen, imagesDiv, repository) => {
    for(let i = 0; i < 25; i++){
        const imgName = imgGen.next().value;

        if(imgName !== undefined){
            const img = document.createElement('img');
            await fetch(`${api_url}/Photo/${repository}/${imgName}`)
            .then(response => {
                img.src = response.url;
                imagesDiv.appendChild(img);
            })
        }else{
            return;
        }
    }

    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.id = 'loadMoreBtn';
    loadMoreBtn.classList.add('btn','btn-primary')
    loadMoreBtn.innerHTML = 'Load More';
    loadMoreBtn.onclick = function(){
        let el = document.getElementById('loadMoreBtn');
        el.remove();
        loadMoreImages(imgGen, imagesDiv, repository);
    }

    imagesDiv.appendChild(loadMoreBtn);
}


function closeModal() {
    document.getElementById('image-view-modal').classList.add('hidden');
}

RetrieveAllEvents();