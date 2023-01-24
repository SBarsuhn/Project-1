
//Spoontacular-
let kyleSpoonApi = `bdac2658b6ce479987d06bba05dfc637`
let samSpoonApi = `fc3288e059a143bcbc4ba00aa5866e9b`
let willSpoonApi = `eff0c27f45264abbb0afaccac9b87b3a`
let adamSpoonApi = `4173694ca49d4d7498d18a6a3b6883fd`

            function getProductId() {
                fetch(`https://api.spoonacular.com/food/products/search?query=beans&number=1&apiKey=` + kyleSpoonApi)
                .then (function (response) {
                    response.json().then(function (data) {
                        const pId = data.products[0].id
                        console.log(pId);
                        getProductPrice(pId)
                    })
                })
            }

            function getProductPrice (pId) {
                fetch(`https://api.spoonacular.com/food/products/`+pId + `/?apiKey=`+ adamSpoonApi)
                .then(function (response) {
                    response.json().then(function (data) {
                        const productPrice = data.price;
                        console.log(productPrice);
                        priceCompare(productPrice);
                    })
                })
            }
            getProductId()

//test compare function
let item1 = 143.28;
let item2 = 5.00;

function priceCompare(productPrice) {
    let y, x, h;
    y = productPrice;
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

