$(document).ready(function() {
    $("#wishlist_message").hide();
    //Här tömms önskelistan
    $("#wishlist").empty();
	//Hämta önskelista från localStorage
    var wishlist = JSON.parse(localStorage.getItem("offer_list"));
	// Itererar genom alla "items" i önskelistan
    for (i = 0; i < wishlist.length; i++) {
        var dealID = wishlist[i];
		//Gör Ajax-anrop med korrekt dealID
        $.ajax({
            url: "http://www.cheapshark.com/api/1.0/deals?id=" + dealID,
            dataType: "JSON"
        }).done(function(data) {
			//Kollar om det finns sökresultat
            if (data.length != 0) {
			    //Skapar markup med korrekt information
                var html_block = '<li class="game-figure">\
                              <a href="http://www.cheapshark.com/redirect?dealID=' + dealID + '">\
                                <img class="game-image" src=' + data.gameInfo.thumb + ' alt="' + data.gameInfo.name + '">\
                              </a>\
                            <div class="caption">\
                              <a href="http://www.cheapshark.com/redirect?dealID=' + dealID + '">\
                                <h4 class="group inner list-group-item-heading">' + data.gameInfo.name + '</h4>\
                              </a>\
                            </div>\
                            <div class="row">\
                              <div class="col-xs-12">\
                                <p class="group inner list-group-item-text">$' + data.gameInfo.salePrice + '</p>\
                              </div>\
                              <div class="col-xs-12">\
                                <button id="deal' + i + '" type="button" class="btn btn-danger btn-sm delete">\
                                  <span class="glyphicon glyphicon-trash"></span>\
                                </button>\
                              </div>\
                            </div>\
                          </li>';
                var c = $(html_block);
                //Bifoga markup till ul
                $("#wishlist").append(c);

				// Om en radera-knapp klickas
                c.find("button").on("click", function() {
                    // Hämtar index av knapparnas "great granparent"(list item)
                    var index = $(this).parent().parent().parent().index();
					// Tar bort korrekt item från listan
                    wishlist.splice(index, 1);
					// Detta item tas även bort i localStorage
                    localStorage.removeItem(wishlist[index]);
					// Uppdaterar listan i localStorage
                    localStorage.setItem("offer_list", JSON.stringify(wishlist));
					// Meddela användare att ett erbjudande har raderats
                    $("#wishlist_message").alert();
                    $("#wishlist_message").fadeTo(2000, 500).slideUp(500, function() {
                        $("#wishlist_message").hide();
                    });
                    // Uppdaterar sidan efter en liten fördröjning(delay)
                    setTimeout(function() { location.reload() }, 1500);
                });
            }
        });
    }
});