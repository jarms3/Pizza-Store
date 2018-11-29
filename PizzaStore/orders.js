window.onload = function(){
    var orders = document.getElementById("orders");
    var allcookies = document.cookie;
        var cookiearray = allcookies.split(';');
        for(var i=0; i<cookiearray.length; i++){
            name = cookiearray[i].split('=')[0];
            value = cookiearray[i].split('=')[1];
        }
    setInterval(function get(){
        var http = new XMLHttpRequest(); //set up the request
        
        
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

    setInterval(function(){
        var customers = document.getElementById("customers");
        var http = new XMLHttpRequest(); //set up the request
        url = 'http://localhost:8080/api/customers/' + value;
  
        http.open('GET', url, true);

        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                if(customers.childNodes[0] != null){
                    while (customers.firstChild) {
                        customers.removeChild(customers.firstChild);
                    }
                }

                var table = document.createElement("TABLE");
                var attributes = document.createElement("TR");
                var name = document.createElement("TD");
                var n = document.createTextNode("Name");
                var streetNum = document.createElement("TD");
                var sn = document.createTextNode("Street Number");
                var streetName = document.createElement("TD");
                var sna = document.createTextNode("Street Name");
                streetName.appendChild(sna);
                streetNum.appendChild(sn);
                name.appendChild(n);
                attributes.appendChild(name);
                attributes.appendChild(streetNum);
                attributes.appendChild(streetName);
                table.appendChild(attributes);
                customers.appendChild(table);
                var res = JSON.parse(http.response);
                for(var j = 0; j < res.length; j++){
                    var data = document.createElement("TR");
                    var value = document.createElement("TD");
                    value.appendChild(document.createTextNode(res[j].name));
                    var snum = document.createElement("TD");
                    snum.appendChild(document.createTextNode(res[j].streetNum));
                    var sname = document.createElement("TD");
                    sname.appendChild(document.createTextNode(res[j].streetName));
                    data.appendChild(value);
                    data.appendChild(snum);
                    data.appendChild(sname);
                    table.appendChild(data);
                }
            }
            
        }

        http.send(null);
    }, 2000)

}