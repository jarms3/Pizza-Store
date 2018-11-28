window.onload = function(){
    var staffAvail = document.getElementById("staff");
    var http = new XMLHttpRequest(); //set up the request
        url = 'http://localhost:8080/api/staff';
  
        http.open('GET', url, true);
    var button = document.createElement("BUTTON");
    button.appendChild(document.createTextNode("Add Staff Member with Name"))
    button.addEventListener("click", addStaff);
    var input = document.createElement("input");
    input.type = "text";
    staffAvail.appendChild(input);
    staffAvail.appendChild(button);

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
                var nameYeet = document.createElement("TD");
                var staffName = document.createTextNode("Staff Name");
                var streetNum = document.createElement("TD");
                var sn = document.createTextNode("Orders being handled");
               
                streetNum.appendChild(sn);
                name.appendChild(n);
                nameYeet.appendChild(staffName);
                attributes.appendChild(name);
                attributes.appendChild(nameYeet);
                attributes.appendChild(streetNum);
                table.appendChild(attributes);
                staffAvail.appendChild(table);
                var res = JSON.parse(http.response);
                for(var j = 0; j < res.length; j++){
                    var data = document.createElement("TR");
                    var value = document.createElement("TD");
                    value.appendChild(document.createTextNode(res[j].staffID));
                    var yeet = document.createElement("TD");
                    yeet.appendChild(document.createTextNode(res[j].name));
                    var snum = document.createElement("TD");
                    snum.appendChild(document.createTextNode(res[j].orders));
                    data.appendChild(value);
                    data.appendChild(yeet);
                    data.appendChild(snum);
                    table.appendChild(data);
                    
                }
            }
        }
    function addStaff(){
        var http = new XMLHttpRequest();
        url = 'http://localhost:8080/api/' + input.value;
        var params = 'name=' + "'" + input.value + "'";
        
        http.open('POST', url, true);
        
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                console.log(http.responseText);
            }
        }
        http.send(params);
    }

        http.send(null);
    }
