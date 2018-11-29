window.onload = function(){
    var staffAvail = document.getElementById("staff");
    var http = new XMLHttpRequest(); //set up the request
    var allcookies = document.cookie;
    var cookiearray = allcookies.split(';');
    for(var i=0; i<cookiearray.length; i++){
        name = cookiearray[i].split('=')[0];
        value = cookiearray[i].split('=')[1];
    }
    var staffB = document.getElementById("addstaff");
    var button = document.createElement("BUTTON");
    button.appendChild(document.createTextNode("Add Staff Member with Name"))
    button.addEventListener("click", addStaff);
    button.className ="button";
    var input = document.createElement("input");
    input.type = "text";
    staffB.appendChild(input);
    staffB.appendChild(button);
    url = 'http://localhost:8080/api/staff/' + value;

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
            var Name = document.createElement("TD");
            Name.appendChild(document.createTextNode("Name"));
            var streetNum = document.createElement("TD");
            var sn = document.createTextNode("Orders being handled");
            streetNum.appendChild(sn);
            name.appendChild(n);
            attributes.appendChild(name);
            attributes.appendChild(Name);
            attributes.appendChild(streetNum);
            table.appendChild(attributes);
            staffAvail.appendChild(table);
            var res = JSON.parse(http.response);
            for(var j = 0; j < res.length; j++){
                var data = document.createElement("TR");
                var value = document.createElement("TD");
                value.appendChild(document.createTextNode(res[j].staffID));
                var bigname = document.createElement("TD");
                bigname.appendChild(document.createTextNode(res[j].name));
                var snum = document.createElement("TD");
                snum.appendChild(document.createTextNode(res[j].orders));
                data.appendChild(value);
                data.appendChild(bigname);
                data.appendChild(snum);
                table.appendChild(data);
            }
        }
    }

    http.send(null);

    function addStaff(){
        var httpA = new XMLHttpRequest();
        urll = 'http://localhost:8080/api/staff/' + value;
        var params = 'name=' + "'" + input.value + "'";
        
        httpA.open('POST', urll, true);
        
        httpA.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        httpA.onreadystatechange = function() {//Call a function when the state changes.
            if(httpA.readyState == 4 && httpA.status == 200) {
                console.log(httpA.responseText);
            }
        }
        httpA.send(params);
    }
}
