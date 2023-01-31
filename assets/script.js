let kyleSpoonApi = `bdac2658b6ce479987d06bba05dfc637`;
let samSpoonApi = `fc3288e059a143bcbc4ba00aa5866e9b`;
let willSpoonApi = `eff0c27f45264abbb0afaccac9b87b3a`;
let adamSpoonApi = `4173694ca49d4d7498d18a6a3b6883fd`;
let groceryInputEl = document.querySelector(`.groceryinput`)
let grocerySearch = document.querySelector(`#searchbtn`)
let cardEl = document.querySelector(".card");
let grocery
let productContainer = $(`.product_btn`)
let productButton = $(`.btnP`)
let productBtn = []
let reloadBtn = document.querySelector(".reloadbtn")
let modalBtn = document.querySelector(".modalbtn")
let modalEl = document.querySelector(".modal")

$('.btnP').on("click", modalClose);
function modalClose() {
    modalEl.classlist.remove("open")
    console.log(REMOVED);
}



$(document).ready(function(){
    $('.modal').modal();
  });

 


reloadBtn.addEventListener("click", reloadPage)


function reloadPage() {
location.reload()
}
//let grocerySearch1 = document.querySelector(`#temp`)
//local storage to get buttons
function createProductBtn() {
    let storedProduct = localStorage.getItem('product')
    if (storedProduct) {
        productBtn = JSON.parse(storedProduct)

    }
    makeBtn()
}
createProductBtn()
function makeBtn() {
    productContainer.empty()
    
    for (let index = 0; index < productBtn.length; index++) {
        let newProductBtn = document.createElement('button');
        newProductBtn.addEventListener("click", getProductIdClick)
        document.querySelector('.product_btn').prepend(newProductBtn);
        newProductBtn.setAttribute("type", 'button');
        newProductBtn.setAttribute(`class`, `btnP`);
        newProductBtn.textContent = productBtn[index];
    }
}
function getProductIdClick() {
    
    const $el = $(this)
    let productSelect = $el.text()
    console.log(productSelect);
    console.log(`made it`);
    fetch(`https://api.spoonacular.com/food/products/search?query=` + productSelect + `&number=1&apiKey=` + willSpoonApi)
        .then(function (response) {
            response.json().then(function (data) {
                const pId = data.products[0].id
                const pT = data.products[0].title
                grocery = pT;
                console.log(pT);
                console.log(pId);
                getProductPrice(pId)
            })
            showComp();
        })
}
function getProductId(event) {
    
    event.preventDefault()
    cardEl.classList.add("slidedownout");
    modalBtn.classList.add("hide")
    let groceryItem = groceryInputEl.value
    console.log(`made it`);
    fetch(`https://api.spoonacular.com/food/products/search?query=` + groceryItem + `&number=1&apiKey=` + willSpoonApi)
        .then(function (response) {
            response.json().then(function (data) {
                const pId = data.products[0].id
                const pT = data.products[0].title
                grocery = pT;
                console.log(pT);
                console.log(pId);
                getProductPrice(pId)
                productBtn.push(groceryItem)
                localStorage.setItem("product", JSON.stringify(productBtn))
            })
            showComp();
        })
}
grocerySearch.addEventListener("click", getProductId);

function errorFunc() {
    let errorCard = (`<div class="cardcontainer container">
    <div class="card searchcard z-depth-5">
           <div class="cardtitle">
           <h3 class="z-depth-2"> Error </h3>
           <p> This item has no value</p>
           
           
       </div>
   </div>
</div>`)
$(".result").append(errorCard)}


            function getProductPrice (pId) {
                fetch(`https://api.spoonacular.com/food/products/`+pId + `/?apiKey=`+ willSpoonApi)
                .then(function (response) {
                    response.json().then(function (data) {
                        const productPrice = data.price;
                        
                        //if,then for when productPrice == 0
                        productPrice==0? errorFunc() : getCryptoId(productPrice);

                        
                        // console.log("This item has no value :( ") : getCryptoId(productPrice);
                    })
                })
            }

            function getCryptoId(productPrice) {
                
                fetch(`https://api.coinstats.app/public/v1/coins?skip=0&limit=10`)
                .then(function (response) {
                    response.json().then(function (data) {
                        console.log("$" + productPrice)
                        let cryptoList = data.coins
                        let compCard = $(`
                        <div class="cardcontainer container">
                             <div class="card resultcard z-depth-5">
                                    <div class="cardtitle">
                                    <h3 class="z-depth-2"> RESULT </h3>
                                    <p> 1 ${cryptoList[0].name} is worth ${Math.round(100*cryptoList[0].price/productPrice)/100} ${grocery}</p>
                                    <p> 1 ${cryptoList[1].name} is worth ${Math.round(100*cryptoList[1].price/productPrice)/100} ${grocery}</p>
                                    <p> 1 ${cryptoList[2].name} is worth ${Math.round(100*cryptoList[2].price/productPrice)/100} ${grocery}</p>
                                    <p> 1 ${cryptoList[3].name} is worth ${Math.round(100*cryptoList[3].price/productPrice)/100} ${grocery}</p>
                                    <p> 1 ${cryptoList[4].name} is worth ${Math.round(100*cryptoList[4].price/productPrice)/100} ${grocery}</p>
                                    <p> 1 ${cryptoList[5].name} is worth ${Math.round(100*cryptoList[5].price/productPrice)/100} ${grocery}</p>
                                    <p> 1 ${cryptoList[7].name} is worth ${Math.round(100*cryptoList[6].price/productPrice)/100} ${grocery}</p>
                                    <p> 1 ${cryptoList[8].name} is worth ${Math.round(100*cryptoList[7].price/productPrice)/100} ${grocery}</p>
                                    <p> 1 ${cryptoList[9].name} is worth ${Math.round(100*cryptoList[8].price/productPrice)/100} ${grocery}</p>
                                    
                                </div>
                            </div>
                        </div>`);
                        $(".result").append(compCard);
                        for (let index = 0; index < cryptoList.length; index++) {
                            const coinName = cryptoList[index].name
                            const coinPrice = cryptoList[index].price
                            console.log(coinName);
                            console.log("$" + coinPrice);
                            if (productPrice>coinPrice){
                               let result1 = productPrice/coinPrice
                               console.log("1 unit of " + grocery + " is worth " + Math.round(100 * result1)/100 + " " + coinName);
                            } else if(coinPrice>productPrice) {
                                let result2 = coinPrice/productPrice
                                console.log(coinName + " is worth " + Math.round(100 * result2)/100 + " units of " + grocery)
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

            function showComp() {
                $(".result").addClass("slidedownin");
                $(".reloadbtn").removeClass("hide")
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