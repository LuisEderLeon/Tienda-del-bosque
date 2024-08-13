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

    document.querySelector('footer>div>a').href = `product.html?type=${product.id}`
}