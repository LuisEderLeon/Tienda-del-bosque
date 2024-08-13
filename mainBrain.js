var favoriteChecklists = document.getElementsByClassName("");
let products;
fetch('products.json').then(response => response.json()).then(data => {
    products = data
    console.log(products)
    init()
});
var main = document.querySelector("main.products");

function init(){
    products.forEach(product => {
        let figure = document.createElement("figure");

        let link = document.createElement("a");
        let image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        link.href = `product.html?type=${product.name}`
        link.appendChild(image)
        figure.appendChild(link)

        let figureDetails = document.createElement("figcaption");
        

        main.appendChild(figure)
    });
}

if (localStorage.getItem("favorites") != null){
    var favorites = localStorage.getItem("favorites");
} else {
    var favorites = []
}