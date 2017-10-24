
$(document).ready(function() {

    

window.onload = function() {
    //var qs = new Querystring();
    //alert(qs);
    //var v1 = qs.get("varTitle");   
    //var queryString = url.substring( url.indexOf('?') + 1 );    
    //alert("HEJ");    
    
    var query = window.location.search.substring(1);
    var vars = query.split("?");
    for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == "varTitle"){
                alert(pair[1]);
            }
    }
    return(false);    
}});
