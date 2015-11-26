function sendForm(){
    eltname = document.getElementById("name").value;
    document.getElementById("name").value = "";
    eltmessage = document.getElementById("message").value;
    document.getElementById("message").value = "";
    $.post("http://localhost:4567/stories/submit",
            JSON.stringify({
                name: eltname,
                message: eltmessage
            }), function(response) {
                var start = document.createTextNode("“");
                var end = document.createTextNode("”");
                var r = JSON.parse(response);
                var wrapper = document.createElement("div");
                var newMessage = document.createElement("p");
                newMessage.className = "story";
                var span1 = document.createElement("span");
                var span2 = document.createElement("span");
                var span3 = document.createElement("span");
                span1.className = "bqstart";
                span2.className = "col-lg-20";
                span3.className = "bqend";
                span1.appendChild(start);
                span3.appendChild(end);
                var node = document.createTextNode(r.message);
                var name = document.createTextNode("-"+r.name);

                var element = document.createElement("b");
                element.innerHTML = "-"+ r.name;

                span2.appendChild(element);
                newMessage.appendChild(span1);
                newMessage.appendChild(node);
                newMessage.appendChild(span2);
                newMessage.appendChild(span3);
                wrapper.appendChild(newMessage);
                var messages_div = document.getElementById("messages_div");
                messages_div.appendChild(wrapper);

            });
}
