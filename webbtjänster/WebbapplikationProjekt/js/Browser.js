$(document).ready(function() {
    //Gömmer varningar
    $("#wishlist_message").hide();
});

function get_games_sale() {
    //Kollar om offer_list existerar
    if (localStorage.getItem("offer_list") == undefined) {
		// Om den inte existerar, skapas en ny, tom offer_list
        var offer_list = [];
    } else {
		// Om den existerar, hämtas den från localStorage
        var offer_list = JSON.parse(localStorage.getItem("offer_list"));
    }
	// Gör så att Ajax kallar på korrekt kategori
    $.ajax({
        url: "http://www.cheapshark.com/api/1.0/deals?sortBy=Metacritic&r=json",
        dataType: "JSON"
    }).done(function(data) {
        // Rensar sökfältet
        $("#search-results").empty();
        var jsonData = data;
        // Kollar om det finns något sökresultat
        if (jsonData != undefined && jsonData.length != 0) {
            //Loopar igenom responsen
            for (i = 0; i < jsonData.length; i++) {

                //Skapar markup med korrekt information
                var html_block = '<li class="game-figure">\
                                <a href="http://www.cheapshark.com/redirect?dealID=' + jsonData[i].dealID + '">\
                                  <img class="game-image" src=' + jsonData[i].thumb + '  alt="' + jsonData[i].external + '">\
                                </a>\
                              <div class="caption">\
                                <a href="http://www.cheapshark.com/redirect?dealID=' + jsonData[i].dealID + '">\
                                  <h4 class="game-title">' + jsonData[i].title + '</h4>\
                                </a>\
                              </div>\
                              <div class="row">\
                                <div class="game-div">\
                                  <p class="game-rating game-text">Omdömespoäng: ' + jsonData[i].metacriticScore + '</p>\
                                </div>\
                                <div class="game-div"">\
                                  <p class="game-price game-text">$' + jsonData[i].salePrice + '</p>\
                                </div>\
                                <div class="game-div"">\
                                  <button id="addToWishlist' + i + '" class="btn btn-info">Lägg till i önskelista</button>\
                                </div>\
                              </div>\
                            </li>';

                //Bifogar block av HTML till listan för sökresultat
                $("#search-results").append(html_block);


            }
            $("#search-results button").click(function() {
                $(this).prop('disabled', true);
				// Hämtar index av knapparnas "great granparent"(list item)
                var index = $(this).parent().parent().parent().index();
                var archived_deal = JSON.stringify(jsonData[index].dealID);
                var dealTitle = jsonData[index].title;
				// Meddelar användare om vilket erbjudande som lagts till i önskelistan
                $("#wishlist_message").alert();
                $("#wishlist_message").fadeTo(2000, 500).slideUp(500, function() {
                    $("#wishlist_message").hide();
                });
				//Bifogar erbjudande till array
                offer_list.push(archived_deal);
                //Arrayen blir till sträng och sparas i localStorage
                localStorage.setItem("offer_list", JSON.stringify(offer_list));
            })
        }
    });
};

function get_games_rating() {
	//Kollar om offer_list existerar
    if (localStorage.getItem("offer_list") == undefined) {
        // Om den inte existerar, skapas en ny, tom offer_list
        var offer_list = [];
    } else {
        //Om den existerar, hämtas den från localStorage
        var offer_list = JSON.parse(localStorage.getItem("offer_list"));
    }
    $.ajax({
        url: "http://www.cheapshark.com/api/1.0/deals?onSale=1&r=json",
        dataType: "JSON"
    }).done(function(data) {
        //Rensar sökfältet
        $("#search-results").empty();
        var jsonData = data;
        //Kollar om det finns något sökresultat
        if (jsonData != undefined && jsonData.length != 0) {
            //Loopar igenom responsen
            for (i = 0; i < jsonData.length; i++) {

                //Skapar markup med korrekt information
                var html_block = '<li class="game-figure">\
                                <a href="http://www.cheapshark.com/redirect?dealID=' + jsonData[i].dealID + '">\
                                  <img class="game-image" src=' + jsonData[i].thumb + ' alt="' + jsonData[i].external + '">\
                                </a>\
                              <div class="caption">\
                                <a href="http://www.cheapshark.com/redirect?dealID=' + jsonData[i].dealID + '">\
                                  <h4 class="game-title">' + jsonData[i].title + '</h4>\
                                </a>\
                              </div>\
                              <div class="row">\
                              <div class="game-div"">\
                                <p class="game-deal game-text">Erbjudandebetyg: ' + jsonData[i].dealRating + '/10</p>\
                              </div>\
                                <div class="game-div"">\
                                  <p class="game-price game-text">$' + jsonData[i].salePrice + '</p>\
                                </div>\
                                <div class="game-div"">\
                                  <button id="addToWishlist' + i + '" class="btn btn-info">Lägg till i önskelista</button>\
                                </div>\
                              </div>\
                            </li>';
				//Bifogar block av HTML till listan av sökresultat
                $("#search-results").append(html_block);
            }

            $("#search-results button").click(function() {
                $(this).prop('disabled', true);
				// Hämtar index av knapparnas "great granparent"(list item)
                var index = $(this).parent().parent().parent().index();
                var archived_deal = JSON.stringify(jsonData[index].dealID);
                var dealTitle = jsonData[index].title;
				// Meddela användare om vilket erbjudande som lagts till i önskelistan
                $("#wishlist_message").alert();
                $("#wishlist_message").fadeTo(2000, 500).slideUp(500, function() {
                    $("#wishlist_message").hide();
                });
				// Bifoga erbjudande till array
                offer_list.push(archived_deal);
				//Arrayen blir till sträng och sparas i localStorage
				localStorage.setItem("offer_list", JSON.stringify(offer_list));
            })
        }
    });
};

function get_gamesavings() {
    // Kollar om offer_list existerar
    if (localStorage.getItem("offer_list") == undefined) {
        // Om den inte existerar, skapas en ny, tom offer_list
        var offer_list = [];
    } else {
        // Om den existerar, hämta den från localStorage
        var offer_list = JSON.parse(localStorage.getItem("offer_list"));
    }
    $.ajax({
        url: "http://www.cheapshark.com/api/1.0/deals?sortBy=Savings&r=json",
        dataType: "JSON"
    }).done(function(data) {
        //Rensar sökfältet
        $("#search-results").empty();
        var jsonData = data;
        //Kollar om det finns något sökresultat
        if (jsonData != undefined && jsonData.length != 0) {
            //Loopar igenom responsen
            for (i = 0; i < jsonData.length; i++) {

                //Skapar markup med korrekt information
                var html_block = '<li class="game-figure">\
                                <a href="http://www.cheapshark.com/redirect?dealID=' + jsonData[i].dealID + '">\
                                  <img class="game-image" src=' + jsonData[i].thumb + ' alt="' + jsonData[i].external + '">\
                                </a>\
                              <div class="caption">\
                                <a href="http://www.cheapshark.com/redirect?dealID=' + jsonData[i].dealID + '">\
                                  <h4 class="game-title">' + jsonData[i].title + '</h4>\
                                </a>\
                              </div>\
                              <div class="row">\
                                <div class="game-div"">\
                                  <p class="game-price game-text">$' + jsonData[i].salePrice + '</p>\
                                </div>\
                                <div class="game-div"">\
                                  <p class="game-savings game-text">Besparing: $' + parseInt(jsonData[i].savings).toFixed(2) + '</p>\
                                </div>\
                                <div class="game-div"">\
                                  <button id="addToWishlist' + i + '" class="btn btn-info">Lägg till i önskelista</button>\
                                </div>\
                              </div>\
                            </li>';

                //Bifogar block av HTML till listan av sökresultat
                $("#search-results").append(html_block);
            }

            //Om knappen "Lägg till i önskelista" klickas
            $("#search-results button").click(function() {
                $(this).prop('disabled', true);
                // Hämtar index av knapparnas "great granparent"(list item)
                var index = $(this).parent().parent().parent().index();
                var archived_deal = JSON.stringify(jsonData[index].dealID);
                var dealTitle = jsonData[index].title;
				// Meddelar användare om vilket erbjudande som lagts till i önskelistan 
                $("#wishlist_message").alert();
                $("#wishlist_message").fadeTo(2000, 500).slideUp(500, function() {
                    $("#wishlist_message").hide();
                });
				//Bifoga erbjudande till array
                offer_list.push(archived_deal);
                //Arrayen blir till sträng och sparas i localStorage
                localStorage.setItem("offer_list", JSON.stringify(offer_list));
            })
        }
    });
};

function get_gameReleaseDate() {
    //Kollar om offer_list existerar
    if (localStorage.getItem("offer_list") == undefined) {
		// Om den inte existerar, skapa en ny, tom offer_list
        var offer_list = [];
    } else {
		// Om den existerar, hämta det från localStorage
        var offer_list = JSON.parse(localStorage.getItem("offer_list"));
    }
    $.ajax({
        url: "http://www.cheapshark.com/api/1.0/deals?sortBy=Release&r=json",
        dataType: "JSON"
    }).done(function(data) {
        //Rensar sökfältet
        $("#search-results").empty();
        var jsonData = data;
        //Kolla om det finns något sökresultat
        if (jsonData != undefined && jsonData.length != 0) {
            //Loopar igenom responsen
            for (i = 0; i < jsonData.length; i++) {
                //Konverterar Unix timestamps till normala datum
                var a = new Date(jsonData[i].releaseDate * 1000);
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var time = date + ' ' + month + ' ' + year;

                //Skpar markup with korrekt information
                var html_block = '<li class="game-figure">\
                                <a href="http://www.cheapshark.com/redirect?dealID=' + jsonData[i].dealID + '">\
                                  <img class="game-image" src=' + jsonData[i].thumb + ' alt="' + jsonData[i].external + '">\
                                </a>\
                              <div class="caption">\
                                <a href="http://www.cheapshark.com/redirect?dealID=' + jsonData[i].dealID + '">\
                                  <h4 class="game-title">' + jsonData[i].title + '</h4>\
                                </a>\
                              </div>\
                              <div class="row">\
                              <div class="game-div"">\
                                <p class="game-release game-text">' + time + '</p>\
                              </div>\
                                <div class="game-div"">\
                                  <p class="game-sale game-text">$' + jsonData[i].salePrice + '</p>\
                                </div>\
                                <div class="game-div"">\
                                  <button id="addToWishlist' + i + '" class="btn btn-info">Lägg till i önskelista</button>\
                                </div>\
                              </div>\
                            </li>';
				// Bifogar block av HTML till listan av sökresultat
                $("#search-results").append(html_block);
            }

            $("#search-results button").click(function() {
                $(this).prop('disabled', true);
				// Hämtar index av knapparnas "great granparent"(list item)
                var index = $(this).parent().parent().parent().index();
                var archived_deal = JSON.stringify(jsonData[index].dealID);
                var dealTitle = jsonData[index].title;
				// Meddelar användare om vilket erbjudande som lagts till i önskelistan 
                $("#wishlist_message").alert();
                $("#wishlist_message").fadeTo(2000, 500).slideUp(500, function() {
                    $("#wishlist_message").hide();
                });
                //Bifoga erbjudande till array
                offer_list.push(archived_deal);
                //Arrayen blir till sträng och sparas i localStorage
                localStorage.setItem("offer_list", JSON.stringify(offer_list));
            })
        }
    });
};