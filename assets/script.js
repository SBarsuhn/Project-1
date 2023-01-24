
let item1 = 143.28;
let item2 = 0.79;

function priceCompare() {
    let y, x, h;
    y = item1;
    h = item2;
    if(y>h){
        x = (y/h);
    } else if(h>y){
        x = (h/y);
    } else {
        console.log("They b equal yipoee");
    }
    
    console.log(Math.round(100 * x)/100);
};

priceCompare();