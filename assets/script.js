let cards = document.getElementById('project-group').children;
let current_card_position = cards.length-1;

// social icons clicked
function SocialLinkClicked(option){
    switch(option){
        case 1:
            window.open("https://github.com/jaymar921");
            break;
        case 2:
            window.open("https://www.linkedin.com/in/jayharron-mar-abejar-b414a9169/");
            break;
        case 3:
            window.open("https://www.spigotmc.org/resources/authors/jaymar921.1073076/");
            break;
        case 4:
            window.open("https://www.youtube.com/@jaymar921");
            break;
        case 5:
            window.open("https://www.instagram.com/jerron_mar/");
            break;
        case 6:
            window.open("./photography/");
            break;
    }
}

function nextCard(){
    let front = current_card_position>-1?current_card_position:cards.length-1;
    let center = front-1>-1?front-1:cards.length-1;
    let back = center-1>-1?center-1:cards.length-1;


    cards[front].classList.remove('tenDegRev');
    cards[front].classList.remove('zeroDeg');
    cards[front].classList.add('tenDeg');
    cards[front].classList.add('hideRight');
    setTimeout(()=>{
        cards[front].classList.remove('hideRight');
    },250);
    cards[front].style.zIndex = 1;

    cards[center].classList.remove('tenDegRev');
    cards[center].classList.add('zeroDeg');
    cards[center].style.zIndex = 3;
    setProjectImg(cards[center].id);

    cards[back].classList.remove('tenDeg');
    cards[back].classList.add('tenDegRev');
    cards[back].style.zIndex = 2;

    
    
    current_card_position = current_card_position-1>-1?current_card_position-1:cards.length-1;
}

function backCard(){
    let front = current_card_position+1<cards.length?current_card_position+1:0;
    let center = front+1<cards.length?front+1:0;
    let back = center+1<cards.length?center+1:0;
    
    //cards[front].classList.add('zeroDeg');
    
    
    cards[front].classList.add('showLeft');
    cards[front].classList.add('zeroDeg');
    cards[front].classList.remove('tenDeg');
    setProjectImg(cards[front].id);
    setTimeout(()=>{
        cards[front].classList.remove('showLeft');
    },250);
    cards[front].style.zIndex = 3;
    
    //cards[center].classList.add('tenDegRev');
    cards[center].classList.add('tenDeg');
    cards[center].classList.remove('tenDegRev');
    cards[center].style.zIndex = 1;

   // cards[back].classList.add('tenDeg');
    cards[back].classList.add('hideRight');
    
    
    setTimeout(()=>{
        cards[back].classList.remove('hideRight');
        cards[back].classList.remove('zeroDeg');
        cards[back].classList.add('tenDegRev');
    },250);
    cards[back].style.zIndex = 2;

    /*
    //cards[front].classList.add('zeroDeg');
    cards[front].classList.add('zeroDeg');
    cards[front].classList.remove('tenDeg');
    cards[front].style.zIndex = 3;

    //cards[center].classList.add('tenDegRev');
    cards[center].classList.add('tenDeg');
    cards[center].classList.remove('tenDegRev');
    cards[center].style.zIndex = 1;

   // cards[back].classList.add('tenDeg');
    cards[back].classList.add('hideLeft');
    setTimeout(()=>{
        cards[back].classList.remove('hideLeft');
        cards[back].classList.remove('zeroDeg');
        cards[back].classList.add('tenDegRev');
    },500);
    cards[back].style.zIndex = 2;
    */
    current_card_position = current_card_position+1<cards.length?current_card_position+1:0;
}

function setProjectImg(src){
    let img1 = document.getElementById('project-img1');
    let img2 = document.getElementById('project-img2');

    img1.classList.remove('pic1-activate');
    img2.classList.remove('pic2-activate');

    img1.classList.add('project-pic');
    img2.classList.add('project-pic');

    document.getElementById('project-view').scrollIntoView({ block: 'start',  behavior: 'smooth' });

    setTimeout(()=>{
        img1.src = `assets/images/${src}_1.png`;
        img2.src = `assets/images/${src}_2.png`;
        img1.classList.add('pic1-activate');
        img2.classList.add('pic2-activate');
    },250);
}


window.addEventListener("scroll", ()=>{
    document.getElementById('mountain-bg').style.top = `${0 - document.documentElement.scrollTop/50}px`;
});

