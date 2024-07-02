const socket = new WebSocket("ws://192.168.35.121:9875");

function reloadPIDs(){
    socket.send("{\"device\":\"web\", \"request\":\"controller\",\"type\":\"getPIDs\", \"args\":[]}");
}

function sendPIDv(p, i, d){
    socket.send("{\"device\":\"web\", \"request\":\"controller\",\"type\":\"getPID\", \"args\":[], \"target\":\"controller\"}");
}

function setPID(id){
    console.log(id);
    socket.send("{\"device\":\"web\", \"request\":\"controller\",\"type\":\"setPID\", \"args\":[\""+id+"\"]}");
}

function delPID(id){
    socket.send("{\"device\":\"web\", \"request\":\"controller\",\"type\":\"delPID\", \"args\":[\""+id+"\"]}");
}

socket.addEventListener("open", function (event){
    console.log("Connected");
    var con = document.getElementsByClassName("connect")[0];
    con.style.display = "block";

    setTimeout(function (){
        var con = document.getElementsByClassName("connect")[0];
        con.style.display = "none";
    }, 2000);

});

socket.addEventListener("message", function (event) {
    var json = JSON.parse(event.data);
    console.log("Message from server ", json);

    if (json['request']=="ControllerEvent"){
        if (json['type']=="getPID"){
            var p = document.getElementsByClassName("p")[0];
            var i = document.getElementsByClassName("i")[0];
            var d = document.getElementsByClassName("d")[0];
            console.log(p);
            p.innerText = json['p']
            i.innerText = json['i']
            d.innerText = json['d']
        } else if (json['type']=="getPIDs"){
            var l = document.getElementsByClassName("pid_list")[0];
            var div = "<div class=\"pid_items\">";
            for (i=0; i<json['data'].length; i++){
                div += "<div class=\"pid_item\">";
                div += "<p class=\"pid_p\">P: "+json["data"][i][1]+"</p>";
                div += "<p class=\"pid_i\">I: "+json["data"][i][2]+"</p>";
                div += "<p class=\"pid_d\">D: "+json["data"][i][3]+"</p>";
                div += "<button onclick=\"setPID('"+json["data"][i][0]+"');\">이 값으로 지정</button>";
                div += "<button onclick=\"delPID('"+json["data"][i][0]+"');\">이 값 삭제</button>";
                div += "<hr>";
                div += "</div>";
            }
            div += "</div>";
            l.innerHTML = div;
        }
    }
});