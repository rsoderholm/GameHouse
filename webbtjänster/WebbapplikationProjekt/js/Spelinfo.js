////////////////////////////////////////////////////////////


var apikey = "3d648576c9b847530e45eb0b1f82b380fd009bf9";
var baseUrl = "http://www.giantbomb.com/api";

// construct the uri with our apikey
var GamesSearchUrl = baseUrl + '/search/?api_key=' + apikey + '&format=json&limit=100';
var query =  GamesSearchUrl + '&query=' + name + '&resources=game';
//alert(query);

// construct the uri with our apikey
var GamesSearchUrl = baseUrl + '/search/?api_key=' + apikey + '&format=json';
//var query = "Dishonored";

$(document).ready(function() {


    var query = window.location.search.substring(1);
    var vars = query.split("?");
    for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == "varTitle"){
                name = pair[1];
                //infoURL = "http://thegamesdb.net/api/GetGame.php?name=" + name;
                //alert("second " + name);
            }
    }
    

    //MyFunction();

    //alert(name);
      // send off the query
      $.ajax({
        url: GamesSearchUrl + '&query=' + name,
        dataType: "json",
        success: searchCallback 
      });
    
    
                // callback for when we get back the results
                function searchCallback(data) {
                    //$('#Container').append('Found ' + data.number_of_total_results + ' results for ' + GamesSearchUrl + '&query=' + encodeURI(name));
                    var games = data.results;
                    $.each(games, function(index, game) {
                        $('#Container').append('<h1>' + game.name + '</h1>');
                        $('#Container').append('<p>' + game.description + '</p>');
                        $('#Container').append('<img src="' + game.posters.thumb_url + '" />');
                    });
                }
    

});



