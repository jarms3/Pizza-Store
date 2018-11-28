
function orderPage(){
        window.location='http://localhost/PizzaStore/orders.html';


}
function staffPage(){
    window.location='http://localhost/PizzaStore/staff.html';

}

function updateStatus(){
    window.location='http://localhost/PizzaStore/status.html';
}

function orderTotal(){
    window.location='http://localhost/PizzaStore/total.htmls';

}

function submit(){
    var input = document.getElementById("input");
    var expires = "";
    document.cookie = "storeNo=" + input.value + ";path=/";
    var allcookies = document.cookie;
    var cookiearray = allcookies.split(';');
    for(var i=0; i<cookiearray.length; i++){
        name = cookiearray[i].split('=')[0];
        value = cookiearray[i].split('=')[1];
        console.log(name + value);
    }
    console.log(input.value);
    console.log(document.cookie);
}
