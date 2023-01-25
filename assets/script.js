
//Spoontacular-
let kyleSpoonApi = `bdac2658b6ce479987d06bba05dfc637`;
let samSpoonApi = `fc3288e059a143bcbc4ba00aa5866e9b`;
let willSpoonApi = `eff0c27f45264abbb0afaccac9b87b3a`;
let adamSpoonApi = `4173694ca49d4d7498d18a6a3b6883fd`;
let groceryInputEl = document.querySelector(`.groceryinput`)
let grocerySearch = document.querySelector(`#searchbtn`)
//let grocerySearch1 = document.querySelector(`#temp`)


function getProductId(event) {
    event.preventDefault()
    let groceryItem = groceryInputEl.value
    console.log(`made it`);
    fetch(`https://api.spoonacular.com/food/products/search?query=` + groceryItem + `&number=1&apiKey=` + adamSpoonApi)
        .then(function (response) {
            response.json().then(function (data) {
                const pId = data.products[0].id
                const pT = data.products[0].title
                console.log(pT);
                console.log(pId);
                getProductPrice(pId)
            })
        })
}
grocerySearch.addEventListener("click", getProductId);


            function getProductPrice (pId) {
                fetch(`https://api.spoonacular.com/food/products/`+pId + `/?apiKey=`+ willSpoonApi)
                .then(function (response) {
                    response.json().then(function (data) {
                        const productPrice = data.price;
                        console.log(productPrice);
                        getCryptoId(productPrice);
                    })
                })
            }

            function getCryptoId(productPrice) {
                fetch(`https://api.coinstats.app/public/v1/coins?skip=0&limit=10`)
                .then(function (response) {
                    response.json().then(function (data) {
                        let cryptoList = data.coins
                        for (let index = 0; index < cryptoList.length; index++) {
                            const coinName = cryptoList[index].name
                            const coinPrice = cryptoList[index].price
                            console.log(coinName);
                            console.log(coinPrice);
                            if (productPrice>coinPrice){
                               let result1 = productPrice/coinPrice
                               console.log("[grocery item title] is equal to " + Math.round(100 * result1)/100 + " " + coinName);
                            } else if(coinPrice>productPrice) {
                                let result2 = coinPrice/productPrice
                                console.log(coinName + " is worth " + Math.round(100 * result2)/100 + " [grocery item title]'s")
                            } else {
                                console.log("THEY B = ")
                            }
                        }
                        /*const cId = data.coins[0].id;
                        console.log(cId);
                        getCryptoPrice(cId);*/
                    })
                })
            }

           /* function getCryptoPrice(cId) {
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

*/