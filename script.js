    const btnIcon=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('.cart-close');
btnIcon.addEventListener('click',()=>{
    console.log("clicked")
    cart.classList.add('cart-active')
});
btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active')
});
document.addEventListener('DOMContentLoaded',loadFoods);
function loadFoods(){
    loadContent();
}   
function loadContent(){
    let btnRemove=document.querySelectorAll('#cart-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeBtn);
    });
    let cartAdd=document.querySelectorAll('#add-cart');
    cartAdd.forEach((cart)=>{
        cart.addEventListener('click',addCart);
    });
    let qtyElements=document.querySelectorAll('.caer-quantity');
    qtyElements.forEach((input)=>{
        input.addEventListener('change',changeQty);
    })
    updateTotal(); 
}
function removeBtn(){
    if(confirm('Are You Sure To Remove')){
        let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContent()
    }
}
function changeQty(){
    if(isNaN(this.value) || this.value<1){
        this.value=1
    }
    loadContent();
}
let itemList =[]
function addCart(){
    let food=this.parentElement;
    let title=food.querySelector('.food-title').innerHTML;
    let price=food.querySelector('.food-price').innerHTML;
    let imgSrc=food.querySelector('.food-image').src;
    let newPro={title,price,imgSrc}
    if(itemList.find((el)=>el.title==newPro.title)){
        alert('Product Already Added In Cart')
        return;
    }else{
        itemList.push(newPro);
    }
    let newProduct=createProduct(title,price,imgSrc);
    let div=document.createElement('div');
    div.innerHTML=newProduct;
    let cartBasket=document.querySelector('.cart-content');
    cartBasket.append(div);
    loadContent();
}
function createProduct(title,price,imgSrc){
    return `
    <div class="cart-box">
        <img src="${imgSrc}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-food-title">${title}</div>
            <div class="price-box">
                <div class="cart-price">${price}</div>
                <div class="cart-amt">${price}</div>
            </div>
            <input type="number" value="1" class="caer-quantity">
        </div>
        <i class="fa-solid fa-trash" id="cart-remove"></i>
    </div>
    `
}
function updateTotal(){
    const cartItem=document.querySelectorAll('.cart-box');
    const totalValue=document.querySelector('.total-price');
    let total=0;
    cartItem.forEach(product=>{
        let priceElement=product.querySelector('.cart-price');
        let prices=parseFloat(priceElement.innerHTML.replace("Rs.",""));
        let qty=product.querySelector('.caer-quantity').value;
        total+=(prices*qty);
        product.querySelector('.cart-amt').innerText="Rs."+prices*qty;
    });
    totalValue.innerHTML="Rs."+total;
    const cartCount=document.querySelector('.cart-count');
    let count=itemList.length;
    cartCount.innerHTML=count;
    if(count==0){
        cartCount.style.display="none";
    }else{
        cartCount.style.display="block";
    }     
}