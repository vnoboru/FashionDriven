let modelName = '';
let collarName = '';
let materialName = '';
let nickname = '';

userSite();
function userSite(){
    nickname = prompt("Qual o seu nome? ");
    console.log(nickname);
}

function selectedModel(optionModel, receivedModelName){    
    modelName = receivedModelName;

    const clickedModel = document.querySelector(".selectedModel");
    console.log(clickedModel);

    if(clickedModel !== null){
        clickedModel.classList.remove('selectedModel');    
        console.log(clickedModel);
    }

    optionModel.classList.add('selectedModel');
    console.log(optionModel);
    validateOrder();

    //qtProduto = optionModel.innerHTML;
    //console.log(qtProduto);

    //This
    //Para pegar o texto do elemento
    //const model = optionModel.querySelector('p').innerHTML;
    //console.log(model);
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
    console.log(validateImage);

    if(validateOrder === true && modelName !== '' && collarName !== '' && materialName !== ''){  
        const finishOrder = document.querySelector('button');        
        console.log(finishOrder);
        finishOrder.classList.add('color');
    } else {
    }

}

function confirmOrder(){
    alert("Confirmando a encomenda.")
    imageTyped = document.querySelector('input').value;
    console.log(imageTyped);

    sendFormat = {
        "model": modelName,
        "neck": collarName,
        "material": materialName,
        "image": imageTyped,
        "owner": nickname,
        "author": nickname
    };
    console.log(sendFormat);

    const promise = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', sendFormat);
    promise.then(returnSucess);
    promise.catch(returnFail);
}
