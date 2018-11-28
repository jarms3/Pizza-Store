window.onload = function(){
    var button = document.createElement("BUTTON");
    button.appendChild(document.createTextNode("Update"))
    var input = document.createElement("input");
    input.type = "text";
    var statInput = document.createElement("input");
    statInput.type = "text";
    var status = document.getElementById("status");
    button.addEventListener("click", update);
    status.appendChild(input);
    status.appendChild(statInput);
    status.appendChild(button);

    function update(){
        var http = new XMLHttpRequest();
        url = 'http://localhost:8080/api/' + input.value;   
        var params = 'status=' + "'" + statInput.value + "'";

        http.open('POST', url, true);

        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                alert(http.response);
                alert("Status updated");
            }
        }

        http.send(params);
    }
    
        
}