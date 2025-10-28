import {cart,removeFromCart,updateDeliveryOption} from '../data/cart.js';
import {products}  from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import {deliveryOptions} from '../data/deliveryOption.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


const today=dayjs();
const DeliveryDate=today.add(7,'days');

console.log(DeliveryDate.format('dddd ,  MMMM D'));


 let cartSummaryHTML = '' ;
   cart.forEach((cartItem)=>{
          
          const productId=cartItem.productId;
                    let matchingProduct;
            products.forEach((product)=>{
                if(productId===product.id){
                   matchingProduct=product;
                }
            });
                        if(!matchingProduct){
                            console.warn(`No product found for cart item ${productId}`);
                            return;
                        }
         
        const deliveryOptionId = cartItem.deliveryOptionId;      
        let deliveryOption;
        
        deliveryOptions.forEach((option)=>{
                if(option.id  === deliveryOptionId){
                deliveryOption=option;
                }
        });
           const today = dayjs();
    const deliveryDate = today.add(
        deliveryOption.deliveryDays ,'days'
    );    
    const dateString = deliveryDate.format(
        'dddd ,MMMM D'
    );
        

      cartSummaryHTML +=  `    
            <div class="cart-item-container     
            js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" 
                    data-product-id ="${matchingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                       ${DeliveryOptionsHTML(matchingProduct,cartItem)}
                 
                  
                </div>
                </div>
            </div>

   `;

   });

   function DeliveryOptionsHTML(matchingProduct,cartItem){
    let html='';
    const productDeliveryOptions = matchingProduct.deliveryOptions || deliveryOptions;
    productDeliveryOptions.forEach((deliveryOption)=>{

    const today = dayjs();
    const deliveryDate = today.add(
        deliveryOption.deliveryDays ,'days'
    );    
    const dateString = deliveryDate.format(
        'dddd ,MMMM D'
    );
    const priceString = deliveryOption.priceCents === 0
    ?
    'FREE Shipping'
    :
    `$${formatCurrency(deliveryOption.priceCents)} -`;

    const ischecked = deliveryOption.id === cartItem.deliveryOptionId;
 html+= `
  <div class="delivery-option  js-delivery-option">
                data-product-id ="${matchingProduct.id}"
                data-delivery-option-id = "${deliveryOption.id}">
                    <input type="radio"
                  ${ischecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                          ${formatString}
                        </div>
                        <div class="delivery-option-price">
                        ${priceString}- Shipping
                        </div>
                    </div>
                    </div>
  `

    })
    return html;
   }
    document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;
//    console.log(cartSummaryHTML);
    

 
   document.querySelectorAll('.js-delete-link')
   .forEach((link)=>{
    link.addEventListener('click',()=>{
       const productId=link.dataset.productId;
      removeFromCart(productId);
       
       const containerToRemove = document.querySelector(`.js-cart-item-container-${productId}`);

    //    console.log(containerToRemove);

       containerToRemove.remove();
    })
   })

   document.querySelectorAll('.js-delivery-option')
   .forEach((element)=>{
    element.addEventListener('click',()={
         const {productId,deliveryOptionId}=element.dataset;
         updateDeliveryOption(productId,deliveryOptionId);
    })

   })