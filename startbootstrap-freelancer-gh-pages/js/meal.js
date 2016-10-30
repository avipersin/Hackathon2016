function rsvp() {
    //alert("RSVP Successful");
    swal("RSVP Successful");
    var guests = $("#guests");
    var spots_left = parseInt($("#spots_left").text());
    var total_people = parseInt($("#total_people").text());
    console.log(spots_left);
    if (spots_left == 0) {
        swal("Meal Full");
    }
    else {
        var current_guests = guests.text();
        $.post("about_handler.php", {
            section: "username"
        }, function (result) {
            guests.text(current_guests + ", " + result);
            $("#spots_left").text(spots_left - 1);
        });
    }
}