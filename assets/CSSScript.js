import { GLOBAL_MAP } from "./Utils.js";
export async function CSSLoader(){
    // load custom styling classes
    // adding pixel to top

    GLOBAL_MAP.set('_RESPONSIVE', new Array());

    for(let i = 0; i < 50000; i++){
        const elements = document.getElementsByClassName('top-'+i);
        
        if(elements.length > 0){
            for(const element of elements){
                element.style.top = (element.style.top+i)+'px';
            }
        }
    }
    /*
    // adding pixel to left
    for(let i = 0; i < 50000; i++){
        const elements = document.getElementsByClassName('left-'+i);
        
        if(elements.length > 0){
            for(const element of elements){
                element.style.left = (element.style.left+i)+'px';
                GLOBAL_MAP.get('_RESPONSIVE').push(element);
            }
        }
    }

    // adding pixel to right
    for(let i = 0; i < 50000; i++){
        const elements = document.getElementsByClassName('right-'+i);
        
        if(elements.length > 0){
            for(const element of elements){
                element.style.right = (element.style.right+i)+'px';
                GLOBAL_MAP.get('_RESPONSIVE').push(element);
            }
        }
    }
    */
}

// mobile responsive 
/*
window.addEventListener('scroll', async function(){
    if(this.window.screen.width <= 900){
        let arr = GLOBAL_MAP.get('_RESPONSIVE');

        for(let element of arr){
            let classes = element.classList;

            for(let clazz of classes){
                if(clazz.includes('left') || clazz.includes('right')){
                    
                    //let value = clazz.match(/^left-*([0-9]*)S*$/);
                    
                    element.style.right = 0;
                    element.style.left = 50+'%';
                    element.classList.remove(clazz);
                    element.classList.add('center-horizontal');
                }
                    
            }
        }
    }
});
*/

// fetch('http://203.177.71.218:5000/',{
//     method: 'GET', // or 'PUT'
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     //body: JSON.stringify(data),
// }).then(response => {
//     console.log(response);
// }).catch(err => {
//     console.log('err');
// });