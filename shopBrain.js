var ammounts = document.getElementsByClassName('ammount');
var numbers = [];
if (localStorage.getItem("cartAmmounts") != null){
    numbers = localStorage.getItem("cartAmmounts")
}

var plusButtons = document.getElementsByClassName('more');
var minusButtons = document.getElementsByClassName('less');

for (var i = 0; i < ammounts.length; i++){
    numbers.push(parseInt(ammounts[i].textContent));
}

function increase(index){
    return function(){
        numbers[index] += 1;
        ammounts[index].textContent = numbers[index];
        localStorage.setItem("cartAmmounts", numbers)
    };
}

function decrease(index){
    return function(){
        numbers[index] -= 1;
        ammounts[index].textContent = numbers[index];
        localStorage.setItem("cartAmmounts", numbers)
    };
}

for (var i = 0; i < ammounts.length; i++){
    plusButtons[i].addEventListener('click', increase(i));
    minusButtons[i].addEventListener('click', decrease(i));
}