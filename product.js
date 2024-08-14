const type = new URLSearchParams(window.location.search).get("type");

var product;
fetch('products.json').then(response => response.json()).then(data => {
    data.forEach(element => {
        if (element.id === type){
            product = element;
        }
    });
    init()
});

function init(){
    let picture = document.querySelector('main>img');
    picture.src = product.image;
    picture.alt = product.id;

    document.querySelector('main>input').id = product.id + "favorite";
    document.querySelector('main>label').htmlFor = product.id + "favorite";

    document.querySelector('figcaption>section>div#name').textContent = product.name;
    document.querySelector('figcaption>section>div#price').textContent = "$ " +  product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    document.querySelector('figcaption>article>p#description').textContent = product.description;

    document.querySelector('footer>div>#buyNow').addEventListener('click', function(){
        var cart = {
            names : ["megacure","songflower","multiberry","magmaleaf"],
            ammounts : [3,1,4,6]
        };
        if (localStorage.getItem("cartAmmounts") != null){
            cart.ammounts = JSON.parse(localStorage.getItem("cartAmmounts"));
        }else {
            localStorage.setItem("cartAmmounts", JSON.stringify(cart.ammounts));
        }
        if (localStorage.getItem("cartNames") != null){
            cart.names = JSON.parse(localStorage.getItem("cartNames"))
        } else {
            localStorage.setItem("cartNames", JSON.stringify(cart.names));
        }
        
        if (cart.names.indexOf(product.id) != -1){
            cart.ammounts[cart.names.indexOf(product.id)]++;
            localStorage.setItem("cartAmmounts", JSON.stringify(cart.ammounts));
        } else {
            cart.names.push(product.id);
            cart.ammounts.push(1);
            localStorage.setItem("cartNames", JSON.stringify(cart.names));
            localStorage.setItem("cartAmmounts", JSON.stringify(cart.ammounts));
        }
    });
}