window.onload = function(){
    var storeInput = document.createElement("input");
    storeInput.type = "text";
    var storeID = document.getElementById("storeID");
    var button = document.createElement("BUTTON");
    button.appendChild(document.createTextNode("Choose Store"))
    button.addEventListener("click", update);

    storeID.appendChild(button);
    storeID.appendChild(storeInput);
    var storeNumber;

    function update(){
        storeNumber = storeInput.value;
    }
}


function orderPage(){
        window.location='file:///Users/jackcockfield/Documents/GitHub/assignment4/PizzaStore/orders.html';


}
function staffPage(){
    window.location='file:///Users/jackcockfield/Documents/GitHub/assignment4/PizzaStore/staff.html';

}

function updateStatus(){
    window.location='file:///Users/jackcockfield/Documents/GitHub/assignment4/PizzaStore/status.html';
}

function orderTotal(){
    window.location='file:///Users/jackcockfield/Documents/GitHub/assignment4/PizzaStore/total.html';

}

