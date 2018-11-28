window.onload = function(){
    var plist = document.getElementById("price");
    var button = document.createElement("BUTTON");
    button.appendChild(document.createTextNode("Choose Order by ID"))
    var input = document.createElement("input");
    input.type = "text";
    //var statInput = document.createElement("input");
    //statInput.type = "text";
    var total = document.getElementById("total");
    button.addEventListener("click", getTotal);
    total.appendChild(input);
    //status.appendChild(statInput);
    total.appendChild(button);
    function getTotal(){
        var http = new XMLHttpRequest(); //set up the request
        url = 'http://localhost:8080/api/' + input.value;
        
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
}
