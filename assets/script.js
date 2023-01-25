
//Spoontacular-
let kyleSpoonApi = `bdac2658b6ce479987d06bba05dfc637`
let samSpoonApi = `fc3288e059a143bcbc4ba00aa5866e9b`
let willSpoonApi = `eff0c27f45264abbb0afaccac9b87b3a`
let adamSpoonApi = `4173694ca49d4d7498d18a6a3b6883fd`

            function getProductId() {
                fetch(`https://api.spoonacular.com/food/products/search?query=beans&number=1&apiKey=` + samSpoonApi)
                .then (function (response) {
                    response.json().then(function (data) {
                        const pId = data.products[0].id
                        console.log(pId);
                        getProductPrice(pId)
                    })
                })
            }

            function getProductPrice (pId) {
                fetch(`https://api.spoonacular.com/food/products/`+pId + `/?apiKey=`+ willSpoonApi)
                .then(function (response) {
                    response.json().then(function (data) {
                        const productPrice = data.price;
                        console.log(productPrice);
                        priceCompare(productPrice);
                    })
                })
            }
            getProductId()

            function getCryptoId() {
                fetch(`https://api.coinstats.app/public/v1/coins`)
                .then(function (response) {
                    response.json().then(function (data) {
                        const cId = data.coins[0].id;
                        console.log(cId);
                        getCryptoPrice(cId);
                    })
                })
            }

            function getCryptoPrice(cId) {
                fetch(`https://api.coinstats.app/public/v1/coins`)
                .then(function (response) {
                    response.json().then(function (data) {
                        const cryptoPrice = data.coins[0].price
                        console.log(cryptoPrice);
                        priceCompare(cryptoPrice);
                    })
                })
            }
            getCryptoId();


function priceCompare(productPrice, cryptoPrice) {
    let y, x, h;
    y = productPrice;
    h = cryptoPrice;
    if(y>h){
        x = (y/h);
    } else if(h>y){
        x = (h/y);
    } else if(h==y){
        console.log("They b equal yipoee");
    } else {
        console.log("error");
    }
    
    console.log(Math.round(100 * x)/100);
};

priceCompare();

