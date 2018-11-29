window.onload = function(){
    var orders = document.getElementById("orders");
    setInterval(function get(){
        var http = new XMLHttpRequest(); //set up the request
        
        var allcookies = document.cookie;
        var cookiearray = allcookies.split(';');
        for(var i=0; i<cookiearray.length; i++){
            name = cookiearray[i].split('=')[0];
            value = cookiearray[i].split('=')[1];
        }
        url = 'http://localhost:8080/api/orders/' + value;
        http.open('GET', url, true);
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                if(orders.childNodes[0] != null){
                    while (orders.firstChild) {
                        orders.removeChild(orders.firstChild);
                    }
                }
                var res = JSON.parse(http.response);

                for(var j = 0; j < res.length; j++){
                    var li = document.createElement("li");
                    var oTxt = document.createTextNode("Order Id : " + res[j].orderID + " ");
                    var amountTxt = document.createTextNode("Amount Total : $" + res[j].amountTotal + " ");
                    var status = document.createTextNode("Status : " + res[j].status + " ");
                    li.appendChild(oTxt);
                    li.appendChild(amountTxt);
                    li.appendChild(status);
                    orders.appendChild(li);
                }
            }
        }
        http.send(null);
    }, 2000);

}