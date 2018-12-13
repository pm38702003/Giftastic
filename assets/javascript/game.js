
var breeds = ["Doberman", "Schnauzer", "Pit Bull", "Poodle", "Black Labrador"];

function renderButtons() {

    $("#dog-view").empty();  //clear buttons

    for (var i = 0; i < breeds.length; i++) {
        var button = $('<button>');
        button.text(breeds[i]);
        button.addClass("dogs");
        button.addClass("btn btn-primary");
        button.addClass("ml-2");
        button.addClass("mt-2")

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

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + breed + "&api_key=THl5OhDrKR3D0ABoY3RHg8f7VMusLuQ7&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var appendRow;
        for (var i = 0; i < response.data.length; i++) {

            if (i == 0 || (i) % 3 == 0)  // create new row at beginning and every 3rd item
            {
                appendRow = $("<div class='row'></div>").appendTo("#dog-gifs");
            }

            var temp = response.data[i];
            console.log(response)

            var colBS = $("<div class='col-sm'>  </div>").appendTo(appendRow); //create new column everytime and append to row

            var stillGifUrl = (temp.images["fixed_height_still"].url).replace(/^http:\/\//i, 'https://');;
            var movingGifUrl = (temp.images["fixed_height"].url).replace(/^http:\/\//i, 'https://');

            var animalDiv = $("<Div>");
            var p = $("<p>")
            p.text(temp.rating);
            var img = $('<img />');
            img.attr("src", stillGifUrl);           // static image     
            img.attr("data-name-1", stillGifUrl);    // moving image
            img.attr("data-name-2", movingGifUrl);
            img.addClass("dogGifs");

            animalDiv.append(p);
            animalDiv.append(img);

            colBS.append(animalDiv); // append animal div to every column no matter what
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

