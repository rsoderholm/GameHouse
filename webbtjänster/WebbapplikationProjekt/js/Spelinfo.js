$(document).ready(function() {
    
    var infoURL = "";
    var name = "";

    function MyFunction(){

        var query = window.location.search.substring(1);
        var vars = query.split("?");
        for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == "varTitle"){
                    name = pair[1];
                    infoURL = "http://thegamesdb.net/api/GetGame.php?name=" + name;
                    //alert("first " + name);
                }
        }
        return(false); 
    }
    
    $(document).ready(function(){

        MyFunction();

        $.ajax({
         type: "GET",
         dataType: "XML",
         crossDomain: true,         
         url: infoURL,
         success: function(xml){
             //alert("SUCCESS");
          $(xml).find("Data").each(function(i){
            $(xml).find("Game").each(function(i){
            
                if(i < 1){
                    $("#Summary").text($(this).find("Overview").text());
                    $("#Title").text($(this).find("GameTitle").text());
                    var url=$(this).find("Youtube").text();                     
                    var urlSplit=url.split("=");
                    var completerURL = "https://www.youtube.com/embed/" + urlSplit[1];

                    //alert(urlSplit[1]);
                    var html_block = 
                    '<iframe id="Trailer" width="854" height="480" src="' + completerURL +'" frameborder="0" gesture="media" allowfullscreen></iframe>';
                    $("#trailerDiv").append(html_block);

                   // alert("https://www.youtube.com/embed/" + urlSplit[1]);
                    
                    var baseImageUrl = $(this).find("baseImgUrl")
                    $("#GameCover").attr("src", $(this).find("baseImgUrl"));
                    $(xml).find("Images").each(function(i){
                        if(i<2){
                        var imageUrl = $(this).find("boxart").text();
                        $("#GameCover").attr("src", "http://thegamesdb.net/banners/" + imageUrl);
                        }   
                    });    
                  }
            }); 
          });
         }
        });   
    });         
});


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
        url: GamesSearchUrl + '&query=' + encodeURI(name),
        dataType: "json",
        success: searchCallback 
      });
    
    
        // callback for when we get back the results
        function searchCallback(data) {
            $('#test').append('Found ' + data.number_of_total_results + ' results for ' + GamesSearchUrl + '&query=' + encodeURI(name));
            var games = data.results;
            $.each(games, function(index, game) {
                $('#test').append('<h1>' + game.name + '</h1>');
                $('#test').append('<p>' + game.description + '</p>');
                $('#test').append('<img src="' + game.posters.thumb_url + '" />');
            });
        }
    

});



