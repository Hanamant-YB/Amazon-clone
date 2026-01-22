import {cart, removeFromCart,calculateCartquantity,updateQuantity,saveLocalStorage} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartSummaryHTML = '';

cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    
    let matchingProduct;

    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        }
    });

    console.log(matchingProduct);

    cartSummaryHTML+=`
         <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">
              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantityValue}</span>
                  </span>
                  <span class="update-quantity-link link-primary            js-update-link" data-product-id = "${matchingProduct.id}">
                  <button class="update-text link-primary">
                    <span class="js-update">Update</span>
                  </button>
                  <input type="number" value="${cartItem.quantityValue}"class="quantity-input"/>
                  <span class="save-quantity-link">save</span>
                  </span>          
                  <span class="delete-quantity-link link-primary js-delete-link " data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
    `
});
document.querySelector('.js-order-summary')
.innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
.forEach((link)=>{
  link.addEventListener('click',()=>{
    const {productId} = link.dataset;
    removeFromCart(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    let item = calculateCartquantity();
    document.querySelector('.js-total-items')
    .innerHTML = `${item}item`;
  });
});

let item = calculateCartquantity();
document.querySelector('.js-total-items')
.innerHTML = `${item}item`;

document.querySelectorAll('.js-update-link')
.forEach((link)=>{
  link.addEventListener('click',()=>{
    // const{productId} = link.dataset;
    const cartItemContainer = link.closest('.cart-item-container');

    cartItemContainer.classList.add('is-editing-quantity')

  })
});

document.querySelectorAll('.save-quantity-link')
.forEach((save)=>{
  
    save.addEventListener('click',(event)=>{
    event.stopPropagation();
    // const {productId} = save.dataset;

    const cartInfo = save.closest('.cart-item-container')
    cartInfo.classList.remove('is-editing-quantity')
    const productId = cartInfo.querySelector('.js-update-link').dataset.productId;
    const inputValue = cartInfo.querySelector('.quantity-input').value;
    // const userValue = inputValue.value;
    console.log(inputValue);
    const updatedValue = updateQuantity(productId,Number(inputValue))
    // calculateCartquantity();
    if(updatedValue > 0){
      cartInfo.querySelector('.quantity-label').innerHTML=`${updatedValue}`;
      let item = calculateCartquantity();
      document.querySelector('.js-total-items')
      .innerHTML = `${item}item`;
    }else{
      // console.log(productId);
      // const container = document.querySelector(`.js-cart-item-container-${productId}`);
      cartInfo.remove();
      removeFromCart(productId)
      let item = calculateCartquantity();
      document.querySelector('.js-total-items')
      .innerHTML = `${item}item`;
      // saveLocalStorage();
    }
   });   
});

document.querySelectorAll('.quantity-input')
.forEach((enterBtn)=>{
      enterBtn.addEventListener('keydown',(event)=>{
        if(event.key === 'Enter'){
          const cartInfo = enterBtn.closest('.cart-item-container')
          cartInfo.classList.remove('is-editing-quantity')
          const productId = cartInfo.querySelector('.js-update-link').dataset.productId;
          const inputValue = cartInfo.querySelector('.quantity-input').value;
          // const userValue = inputValue.value;
          console.log(inputValue);
          const updatedValue = updateQuantity(productId,Number(inputValue))
          // calculateCartquantity();
          if(updatedValue > 0){
                cartInfo.querySelector('.quantity-label').innerHTML=`${updatedValue}`;
                let item = calculateCartquantity();
                document.querySelector('.js-total-items')
                .innerHTML = `${item}item`;
          }else{
                // console.log(productId);
                // const container = document.querySelector(`.js-cart-item-container-${productId}`);
                cartInfo.remove();
                removeFromCart(productId)
                let item = calculateCartquantity();
                document.querySelector('.js-total-items')
                .innerHTML = `${item}item`;
                // saveLocalStorage();
          }
        }
      })
})
