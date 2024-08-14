var products, plusButtons, minusButtons, ammounts;
var main = document.querySelector("section.porPagar")
fetch('products.json').then(response => response.json()).then(data => {
    products = data
    initProducts()
});
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

function initProducts(){
    for (var i = 0; i < cart.names.length; i++){
        products.forEach(product => {
            if (product.id === cart.names[i]) {
                let div = document.createElement('div');
                div.classList.add('item');
                div.id = product.id;
                div.innerHTML = `<img src="${product.image}" alt="${product.id}">
                <p><b>${product.name}</b> <br> $ ${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                <section class="pagar">
                    <a href="product.html?type=${product.id}"><img src="https://www.svgrepo.com/show/349679/arrow-up-right.svg" alt="description"></a>
                    <section class="cantidad">
                        <img src="https://cdn.icon-icons.com/icons2/834/PNG/512/plus_icon-icons.com_66718.png" alt="more" class="more">
                        <p class="ammount">${cart.ammounts[i]}</p>
                        <img src="https://cdn.icon-icons.com/icons2/1769/PNG/512/4115236-delete-min-minus_114026.png" alt="less" class="less">
                    </section>
                </section>`
                main.appendChild(div)
            }
        });
    }
    plusButtons = document.getElementsByClassName('more');
    minusButtons = document.getElementsByClassName('less');
    ammounts = document.getElementsByClassName('ammount');
    
    Array.from(plusButtons).forEach(button => {
        button.addEventListener('click', () => {
            let i = Array.from(plusButtons).indexOf(button);
            cart.ammounts[i]++;
            ammounts[i].textContent = cart.ammounts[i].toString();
            localStorage.setItem("cartAmmounts", JSON.stringify(cart.ammounts));
        });
    });
    Array.from(minusButtons).forEach(button => {
        button.addEventListener('click', () => {
            let i = Array.from(minusButtons).indexOf(button);
            cart.ammounts[i]--;
            ammounts[i].textContent = cart.ammounts[i].toString();
            localStorage.setItem("cartAmmounts", JSON.stringify(cart.ammounts));

            if (cart.ammounts[i] === 0) {
                main.removeChild(document.querySelector('div#' + cart.names[i]));
                cart.names.splice(i, 1);
                cart.ammounts.splice(i, 1);
                localStorage.setItem("cartNames", JSON.stringify(cart.names));
                localStorage.setItem("cartAmmounts", JSON.stringify(cart.ammounts));
            }
        });
    });
}
