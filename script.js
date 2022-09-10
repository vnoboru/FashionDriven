let modelName;
let collarName = '';
let materialName = '';
let nickname = '';
let productsArray = [];

getItems();
userSite();
function userSite(){
    nickname = prompt("Qual o seu nome? ");
}

function selectedModel(optionModel, receivedModelName){    
    modelName = receivedModelName;
    const clickedModel = document.querySelector(".selectedModel");

    if(clickedModel !== null){
        clickedModel.classList.remove('selectedModel');    
    }

    optionModel.classList.add('selectedModel');
    validateOrder();
}

function selectedCollar(selectedCollar, receivedCollarName){   
    collarName = receivedCollarName;
    const clickedCollar = document.querySelector('.selectedCollar');

    if(clickedCollar !== null){
        clickedCollar.classList.remove('selectedCollar');
    }

    selectedCollar.classList.add('selectedCollar');
    validateOrder();
}

function selectedTissue(optionTissue, receivedMaterialName){
    materialName = receivedMaterialName;
    const clickedTissue = document.querySelector('.selectedTissue');

    if(clickedTissue !== null){
        clickedTissue.classList.remove('selectedTissue');
    }

    optionTissue.classList.add('selectedTissue');
    validateOrder();
}

function validateOrder(){
    const validate = /(https?:\/\/.*\.(?:png|jpg))/i;
    const input = document.querySelector('.typeText');
    validateImage = validate.test(input.value);

    const finishOrder = document.querySelector('button');   

    if((validateImage === true) && (modelName !== '') && (collarName !== '') && (materialName !== '')){        
        finishOrder.classList.add('color');

    } else {
        finishOrder.classList.remove('color');
    }
}

function confirmOrder(){
    const validate = /(https?:\/\/.*\.(?:png|jpg))/i;
    const input = document.querySelector('.typeText');
    validateImage = validate.test(input.value);

    if((validateImage !== true) || (modelName === '') || (collarName === '') || (materialName === '')){ 
        return;
    }

    alert("Confirmando a encomenda.");
    let imageTyped = document.querySelector('input').value;
    let sendFormat = {
        "model": modelName,
        "neck": collarName,
        "material": materialName,
        "image": imageTyped,
        "owner": nickname,
        "author": nickname
    };

    const promise = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', sendFormat);
    promise.then(returnSucess);
    promise.catch(returnFail);
}

function returnSucess(){
    alert("encomenda está confirmada! ");
    getItems();
}

function returnFail(){
    alert("Ops, não conseguimos processar sua encomenda! ");
}

function getItems(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
    promise.then(printItems);
    promise.catch(returnErrorPrint);
}

function printItems(product){
    let items = document.querySelector(".container-footer");
    items.innerHTML = '';
    productsArray = product.data;

    for(let i = 0; i < product.data.length; i++){
        items.innerHTML += `
        <div class="container-item" onclick="clickedItem(${product.data[i].id})">
            <img src="${product.data[i].image}">
            <p><strong>Criador:</strong>${product.data[i].owner}<p>
        </div>`
    }
} 

function clickedItem(id){
    let confirmProduct = confirm("Deseja realmente comprar este produto? ");
    let selectedProduct;

    if(confirmProduct === true){
        for(let i = 0; i < productsArray.length; i++){
            if(id === productsArray[i].id){
                selectedProduct = productsArray[i];
                break;
            }
        }

    let sendFormat = {
        "model": selectedProduct.model,
        "neck":  selectedProduct.neck,
        "material": selectedProduct.material,
        "image": selectedProduct.image,
        "owner": selectedProduct.owner,
        "author": nickname
        };
    
    const promise = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', sendFormat);
    promise.then(returnSucess);
    promise.catch(returnFail);
    }
}

function returnErrorPrint(){
    alert("Não foi possível atualizar os produtos! ");
}