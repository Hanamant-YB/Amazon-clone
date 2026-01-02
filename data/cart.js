 export let cart =JSON.parse(localStorage.getItem('cart'));
 if(!cart){
    cart = [{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantityValue:2
    },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantityValue:1
    }];
 } 


function saveLocalStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}


export function addToCart(b,hideMessageTimer){
        const {productId} = b.dataset;
        const mainContainer = b.closest('.product-container');
        const retriveQuantityClass = mainContainer.querySelector(`.js-quantity-selector`);
        const quantityValue = Number(retriveQuantityClass.value);    
        let matchingItem;
        cart.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
            });
        
            if(matchingItem){
                matchingItem.quantityValue+=quantityValue;
                const addedCartText = mainContainer.querySelector('.added-to-cart')
                addedCartText.classList.add('visiable-added-image-text');
                mainContainer.querySelector('.addedMessage').innerHTML='Added'
                // let interval = 0;
                clearTimeout(hideMessageTimer);


                hideMessageTimer = setTimeout(()=>{
                    addedCartText.classList.remove('visiable-added-image-text')
            },1000);
              
            }else{
                cart.push({

                    productId,
                    quantityValue
                });

                //   addedCart.classList.add('js-from-javascript')
                //   addedCart.innerHTML = 
            
                const addedCartText = mainContainer.querySelector('.added-to-cart')
                addedCartText.classList.add('visiable-added-image-text');
                mainContainer.querySelector('.addedMessage').innerHTML='Added'
                
                setTimeout(()=>{
                    addedCartText.classList.remove('visiable-added-image-text')
                },1000);       
            }
            saveLocalStorage();
}

export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveLocalStorage();
}