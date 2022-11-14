import { sleep } from "./Utils.js";
import { GLOBAL_MAP } from "./Utils.js";

function animateCardItems(){
    const animate = document.getElementsByClassName('anim-right');

    for(let element of animate){
        // get the delay
        let delay = 0
        for(let i = 0; i <=1000; i+=50){
            delay = (element.classList.contains('delay-'+i))?i:delay;
        }
        AnimateTextToChar(element, delay);
    }

    // get all late elements
    const late_items = document.getElementsByClassName('anim-late');
    for(let element of late_items){
        // get the delay
        let delay = 0
        for(let i = 0; i <=5000; i+=50){
            delay = (element.classList.contains('delay-'+i))?i:delay;
        }

        ShowElementInDelay(element, delay);
    }
}

function displayHiddenItems(){
    const animate = document.getElementsByClassName('hide-on-pre-load');

    for(let element of animate){
        
        element.style.display = 'block';
    }
}

async function AnimateTextToChar(element, delay = 50){
    let text = new Array(...element.innerHTML);
    let strcat = text[0];
    
    element.innerHTML = text[0];
    for(let index = 1; index < text.length; index++){
        strcat += text[index];
        await sleep(delay);
        element.innerHTML = strcat + "<a class='animate-flicker-fast' style='color: white;'>_</a>";
    }
    element.innerHTML = strcat;
}

async function ShowElementInDelay(element, delay = 50){
    await sleep(delay);
    FadeInElement(element,delay);
}

async function FadeInElement(element, delay = 0){
    for(let i = 0.0; i <= 1.0; i+=0.01){
        element.style.opacity = i;
        await sleep(delay);
    }
}

async function MoveEntities(){
    const entities = document.getElementsByClassName('entity-character')

    for(const entity of entities){
        if(entity.classList.contains('entity-move')){
            let delay = 0;
            let position = 0;
            for(let i = 0; i <=500; i++){
                delay = (entity.classList.contains('delay-'+i))?i:delay;
                position = (entity.classList.contains('position-'+i))?i:position;
            }
            MoveElementLeftRight(entity, position, 100, delay, entity.classList.contains('flip'));
        }
    }
}

async function MoveElementLeftRight(element, position, offset, delay, flip=false){
    if(flip)
        element.style.transform = 'rotateY(180deg)';

    for(let i = 0; i < offset; i++){
        element.style.left = position+i;
        await sleep(delay);
    }
    element.style.transform = 'rotateY(0deg)';
    for(let i = offset; i >=0; i--){
        element.style.left = position+i;
        await sleep(delay);
    }
    MoveElementLeftRight(element, position, offset, delay, flip);
}

async function AnimateObserver(){
    const observer = new IntersectionObserver(entries => {
        entries.forEach(async(entry) => {
            if(entry.isIntersecting){



                const animate_element = entry.target.querySelector('.animate-right');

                if(!animate_element)
                    return;

                // avoid duplicate async task
                if(GLOBAL_MAP.has(animate_element))
                    return;

                let animation_delay = 0
                for(let i = 0; i <=5000; i+=50){
                    animation_delay = (animate_element.classList.contains('delay-'+i))?i:animation_delay;
                }

                // add the element to the map, reserved task
                GLOBAL_MAP.set(animate_element, 'exist');

                AnimateTextToChar(animate_element,animation_delay).then(()=>{
                    const elements = document.getElementsByClassName('animate-last');
                    
                    for(const element of elements){
                        if(animate_element.contains(element))
                            element.classList.remove('animate-last');
                    }

                    animate_element.classList.remove('animate-right');
                });
                
                return;
            }
            

        });
    });

    for(let element of document.getElementsByClassName('animate-wrapper'))
        observer.observe(element);
}

export function LoadAnimation(){
    
    if(window.innerWidth > 500){
        animateCardItems();
        MoveEntities();
        AnimateObserver();
    }
    displayHiddenItems();
}

