var ammounts = document.getElementsByClassName('ammount');
var products;
fetch('products.json').then(response => response.json()).then(data => {
    products = data
    initProducts()
});

function initProducts(){

}
var cart = {
    megacure : 3,
    songflower : 1,
    multiberry : 4,
    magmaleaf: 6
};
if (localStorage.getItem("cart") != null){
    cart = localStorage.getItem("cart")
}

var plusButtons = document.getElementsByClassName('more');
var minusButtons = document.getElementsByClassName('less');

for (var i = 0; i < ammounts.length; i++){
    cart.push(parseInt(ammounts[i].textContent));
}

function increase(index){
    return function(){
        cart[index] += 1;
        ammounts[index].textContent = cart[index];
        localStorage.setItem("cart", cart)
    };
}

function decrease(index){
    return function(){
        cart[index] -= 1;
        ammounts[index].textContent = cart[index];
        localStorage.setItem("cart", cart)
    };
}

for (var i = 0; i < ammounts.length; i++){
    plusButtons[i].addEventListener('click', increase(i));
    minusButtons[i].addEventListener('click', decrease(i));
}