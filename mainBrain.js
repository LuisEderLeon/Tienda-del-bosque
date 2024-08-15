var favoriteChecklists = document.getElementsByClassName("");
let products;
let categories;
fetch('categories.json').then(response => response.json()).then(data => {
    categories = data
    initCategories()
});
fetch('products.json').then(response => response.json()).then(data => {
    products = data
    initProducts()
});
var main = document.querySelector("main.products");
var navigation = document.querySelector("nav.categories")

function initCategories() {
    for (var i = 0; i < categories.id.length; i++) {
        let input = document.createElement("input");
        input.type = "checkbox";
        input.id = categories.id[i];
        input.checked = true;
        input.addEventListener("change", initProducts)

        label = document.createElement("label");
        label.htmlFor = categories.id[i];
        label.textContent = categories.name[i];

        navigation.appendChild(input);
        navigation.appendChild(label);
    }
}

function initProducts(){
    main.innerHTML = "";
    products.forEach(product => {
        let canDo = false;
        document.querySelectorAll('nav.categories input').forEach(category => {
            if(product.categories.indexOf(category.id) != -1 && category.checked){
                canDo = true;
            }
        });
        if(canDo){
            let figure = document.createElement("figure");
            product.categories.forEach(category => {
                figure.classList.add(category)
            });

            let link = document.createElement("a");
            let image = document.createElement("img");
            image.src = product.image;
            image.alt = product.name;
            image.id = product.id;
            link.href = `product.html?type=${product.id}`
            link.appendChild(image)
            figure.appendChild(link)

            let figureDetails = document.createElement("figcaption");
            figureDetails.classList.add("description");
            let paragraph = document.createElement("p");
            let price = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            paragraph.innerHTML = `${product.name} <br> $ ${price}`;
            figureDetails.appendChild(paragraph);
            
            let input = document.createElement("input")
            input.type = "checkbox";
            input.id = product.id + "favorite";
            input.class = "favorite"
            figureDetails.appendChild(input);

            let label = document.createElement("label");
            label.htmlFor = product.id + "favorite";
            let emptyStar = document.createElement("img");
            let fullStar = document.createElement("img");
            emptyStar.src = "https://www.iconpacks.net/icons/2/free-favourite-icon-2765-thumb.png";
            fullStar.src = "https://www.iconpacks.net/icons/2/free-star-icon-2768.png";
            fullStar.classList.add("favorited");
            label.appendChild(emptyStar);
            label.appendChild(fullStar);
            figureDetails.appendChild(label);
            figure.appendChild(figureDetails)

            main.appendChild(figure)
        }
    });
}

if (localStorage.getItem("favorites") != null){
    var favorites = localStorage.getItem("favorites");
} else {
    var favorites = []
}