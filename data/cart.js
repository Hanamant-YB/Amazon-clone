export const cart = [];


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
}
