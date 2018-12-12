
var breeds = ["Doberman", "Schnauzer", "Pit Bull", "Poodle", "Black Labrador"];

function renderButtons() {

    $("#dog-view").empty();  //clear buttons

    for (var i = 0; i < breeds.length; i++) {
        var button = $('<button>');
        button.text(breeds[i]);
        button.addClass("dogs");
        button.addClass("btn btn-primary")

        $("#dog-view").append(button);   // add buttons
    }
}

function playStopGifs() {  // swap urls 

    // alert("click works swap url");

    var stillGif = $(this).attr("data-name-1");
    var movingGif = $(this).attr("data-name-2");

    if ($(this).attr("src") == stillGif) {
        $(this).attr("src", movingGif)
    }
    else if ($(this).attr("src") == movingGif) {
        $(this).attr("src", stillGif)
    }

    //alert( stillGif + " 2  " +   movingGif )
}


function showDogs() {
    var breed = $(this).text();
    $("#dog-gifs").empty();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + breed + "&api_key=THl5OhDrKR3D0ABoY3RHg8f7VMusLuQ7&limit=1&rating=g";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        for (var i = 0; i < response.data.length; i++) {
            var temp = response.data[i];

            var stillGifUrl = (temp.images["fixed_height_still"].url).replace(/^http:\/\//i, 'https://');;
            var movingGifUrl = (temp.images["fixed_height"].url).replace(/^http:\/\//i, 'https://');

            var img = $('<img />');
            img.attr("src", stillGifUrl);           // static image     
            img.attr("data-name-1", stillGifUrl);    // moving image
            img.attr("data-name-2", movingGifUrl);
            img.addClass("dogGifs");
            $("#dog-gifs").append(img);

            console.log(img)
        }
    });
};

$("#add-dog-breed").on("click", function (event) {   //add button on click
    event.preventDefault();
    var dog = $("#dog-input").val().trim();
    if (dog != "") {
        breeds.push(dog);               //no empty buttons
    }

    $("#dog-input").val("");

    // build buttons
    renderButtons();
});

$(document).on("click", ".dogs", showDogs);    //anything with a dog class calls showDogs methods
$(document).on("click", ".dogGifs", playStopGifs);
renderButtons();

