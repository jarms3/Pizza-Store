window.onload = function(){
    var staffAvail = document.getElementById("staff");
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
                staffAvail.appendChild(table);
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
