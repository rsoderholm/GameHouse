$(document).ready(function() {
    //Gömmer alla varningar
    $("#wishlist_message").hide();
    $("#search-alert").hide();
    $("#search-char-alert").hide();
    $("#search-failure").hide();

	//Kollar om "Enter" klickas medan fokus är på sökfältet
    $('#search-field').keypress(function(e) {
        if (e.keyCode == 13) {
            //Kör get_games()-funktionen genom klick på sök-knappen
            $('#get-games').click();
            //Tar bort fokus från sökfältet (blur)
            $('#search-field').blur();
        }
    });


});


function get_games() {
    //Hämtar sökterm
    var search = $('#search-field').val();
    //Kollar om offer_list existerar

    if (localStorage.getItem("offer_list") == undefined) {
		// Om den inte existerar, skapa en ny, tom offer_list
        var offer_list = [];
    } else {
		// Om den existerar, hämta den från localStorage
        var offer_list = JSON.parse(localStorage.getItem("offer_list"));
    }

	// Kollar efter olagliga tecken dvs tecken som inte bör användas i detta sammanhang
    if (/^[a-zA-z0-9- ]*$/.test(search) == false) {
        $("#search-char-alert").alert();
        $("#search-char-alert").fadeTo(2000, 500).slideUp(500, function() {
            $("#search-char-alert").hide();
        });
    } else {
        //Ersätter utrymme med %20 (API parameterregler)
        var fixedSearch = search.split(' ').join('%20');
		// Gör så att Ajaz kallar med så kallade "fixed search term"
        $.ajax({
            url: "http://www.cheapshark.com/api/1.0/games?title=" + fixedSearch + "&r=json",
            dataType: "JSON"
        }).done(function(data) {
            //Rensar sökfältet
            $("#search-results").empty();
            var jsonData = data;
            //Kollar om det finns något sökresultat
            if (jsonData.length != 0) {
                //Loopar igenom respons
                for (i = 0; i < jsonData.length; i++) {
                    //Skapar markup med korrekt titel och år
                    var html_block = '<figure class = "game-figure">\
                                <a href="http://www.cheapshark.com/redirect?dealID=' + jsonData[i].cheapestDealID + '">\
                                  <img class="game-image" src=' + jsonData[i].thumb + ' alt="' + jsonData[i].external + '">\
                                </a>\
                              <div class="caption">\
                                	<a href="Spelinfo.html?varTitle=' + jsonData[i].external + '">\
                                  <h4 class="game-title">' + jsonData[i].external + '</h4>\
                                </a>\
                              </div>\
                              <div class="row">\
                                <div class="game-div">\
                                  <p class="game-price game-text">$' + jsonData[i].cheapest + '</p>\
                                </div>\
                                <div class="game-div">\
                                  <button id="addToWishlist' + i + '" class="btn btn-info">Lägg till i önskelista</button>\
                                </div>\
                              </div>\
                            </figure>';
                    //Bifoga block av HTML till listan av sökresultat

                    $("#search-results").append(html_block);
                    $("#search-result").show();

					//Om det finns problem att hämta en thumbnail, används en 404-thumbnail istället
                    $("img").error(function() {
                        $(this).attr("src", "img/404-thumb.png");
                    });
                }                

                $("#search-results button").click(function() {
                    //Inaktivera den klickade knappen
                    $(this).prop('disabled', true);
					// Hämtar index av knapparnas "great granparent"(list item)
                    var index = $(this).parent().parent().parent().index();
                    var archived_deal = JSON.stringify(jsonData[index].cheapestDealID);
                    var dealTitle = jsonData[index].external;
					// Meddela användare om vilket erbjudande som lagts till i önskelistan
                    $("#wishlist_message").alert();
                    $("#wishlist_message").fadeTo(2000, 500).slideUp(500, function() {
                        $("#wishlist_message").hide();
                    });
					// Bifoga erbjudande til array
                    offer_list.push(archived_deal);
					//Arrayen blir till sträng och sparas i localStorage
                    localStorage.setItem("offer_list", JSON.stringify(offer_list));
                })
            } else {
				// Här meddelas användare om det inte finns sökresultat
                $("#search-alert").alert();
                $("#search-alert").fadeTo(2000, 500).slideUp(500, function() {
                    $("#search-alert").hide();
                });
            }
            

        }).fail(function(data) {
			// Meddelar användare att Ajax-anropet misslyckades
            alert('Sökning misslyckades, försök igen senare!')
            $("#search-failure").alert();
            $("#search-failure").fadeTo(2000, 500).slideUp(500, function() {
                $("#search-failure").hide();
            });
        });
    }
};


    
