window.onload = function(){
    var total = document.getElementById('total');
    var totBTN = document.createElement("BUTTON");
    var upBTN = document.createElement("BUTTON");
    var getCust = document.createElement("BUTTON");
    var totTXT = document.createTextNode("Get Price");
    var update = document.createTextNode("Update");
    var cust = document.createTextNode("Get Customers");
    var staffAvail = document.getElementById("staffAvail");
    var staffBTN = document.createElement("BUTTON");
    staffBTN.appendChild(document.createTextNode("Check Staff Availability"));
    var inputOne = document.createElement("input");
    var plist = document.getElementById("price");
    var orders = document.getElementById("orders");
    var status = document.getElementById("status");
    var large = document.getElementById("large");
    var customers = document.getElementById("customers");
    var getem = document.getElementById("getCust");
    var inputTwo = document.createElement("input");
    var inputThree = document.createElement("input");
    inputOne.type = "text";
    inputTwo.type = "text";
    inputThree.type = "text";
    status.appendChild(inputTwo);
    status.appendChild(inputThree);
    status.appendChild(upBTN);
    totBTN.appendChild(totTXT);
    upBTN.appendChild(update);
    getCust.appendChild(cust);
    staffAvail.appendChild(staffBTN);
    totBTN.addEventListener("click", getTotal);
    upBTN.addEventListener("click", updateStatus);
    getCust.addEventListener("click", getCustomers);
    staffBTN.addEventListener("click", checkStaff);
    total.appendChild(inputOne);
    total.appendChild(totBTN);
    getem.appendChild(getCust);

    setInterval(function get(){
        var http = new XMLHttpRequest(); //set up the request
        url = 'http://localhost:8080/api';

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

    function getTotal(){
        var http = new XMLHttpRequest(); //set up the request
        url = 'http://localhost:8080/api/' + inputOne.value;
  
        http.open('GET', url, true);

        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                if(plist.childNodes[0] != null){
                    while (plist.firstChild) {
                        plist.removeChild(plist.firstChild);
                    }
                }
                var response = JSON.parse(http.response);

                var li = document.createElement("li");
                li.appendChild(document.createTextNode("Total : $ " + response[0].amountTotal));
                plist.appendChild(li);
            }
        }

        http.send(null);
    }

    function updateStatus(){
        var http = new XMLHttpRequest();
        url = 'http://localhost:8080/api/' + inputTwo.value;   
        var params = 'status=' + "'" + inputThree.value + "'";

        http.open('POST', url, true);

        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                console.log(http.responseText);
            }
        }
        http.send(params);
    }

    function getCustomers(){
        var http = new XMLHttpRequest(); //set up the request
        url = 'http://localhost:8080/api/customers';
  
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
    }

    function checkStaff(){
        var http = new XMLHttpRequest(); //set up the request
        url = 'http://localhost:8080/api/staff';
  
        http.open('GET', url, true);  

        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                if(staffAvail.childNodes[0] != null){
                    while (staffAvail.firstChild) {
                        staffAvail.removeChild(staffAvail.firstChild);
                    }
                }

                var table = document.createElement("TABLE");
                var attributes = document.createElement("TR");
                var name = document.createElement("TD");
                var n = document.createTextNode("Staff Id");
                var streetNum = document.createElement("TD");
                var sn = document.createTextNode("Orders being handled");
                streetNum.appendChild(sn);
                name.appendChild(n);
                attributes.appendChild(name);
                attributes.appendChild(streetNum);
                table.appendChild(attributes);
                customers.appendChild(table);
                var res = JSON.parse(http.response);
                for(var j = 0; j < res.length; j++){
                    var data = document.createElement("TR");
                    var value = document.createElement("TD");
                    value.appendChild(document.createTextNode(res[j].staffID));
                    var snum = document.createElement("TD");
                    snum.appendChild(document.createTextNode(res[j].orders));
                    data.appendChild(value);
                    data.appendChild(snum);
                    table.appendChild(data);
                }
            }
        }

        http.send(null);
    }
}