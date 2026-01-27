
export let cart = JSON.parse(localStorage.getItem('cart'));
// import { removeItemFromContainer } from "../scripts/checkout"; 
 if(!cart){
    cart = [{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantityValue:2,
        deliveryOptionsId:'1',

    },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantityValue:1,
        deliveryOptionsId:'2',
    }];
 } 

export function saveLocalStorage(){
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

                clearTimeout(hideMessageTimer);

                hideMessageTimer = setTimeout(()=>{
                    addedCartText.classList.remove('visiable-added-image-text')
            },1000);
              
            }else{
                cart.push({

                    productId,
                    quantityValue,
                    deliveryOptionsId:'1'
                });

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

export function calculateCartquantity(){
    let cartQuantity = 0;
    cart.forEach((cartItem)=>{
    cartQuantity+=cartItem.quantityValue;
    });
    return cartQuantity;
};

export function updateQuantity(productId,newQuantity){
    let updatedValue = 0
    cart.forEach((item)=>{
      // const {productId} = item.dataset;
      if(item.productId === productId ){
        
        item.quantityValue = newQuantity;
        updatedValue = item.quantityValue;
        
        saveLocalStorage();
        }
      })
   return updatedValue;
}
 
export function updateDeliveryOption(productId,deliveryOptionId){
        let matchingItem;
        cart.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
            });

        matchingItem.deliveryOptionsId = deliveryOptionId;
        saveLocalStorage();
}