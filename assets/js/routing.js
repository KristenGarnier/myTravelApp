$(document).ready(routing());

function routing() {
    $('#render').load('views/home.html');
    $(document).on("click", "a", routingHandler);
    $(document).on("click", "a.command", command);
}

function routingHandler(e) {
    e.preventDefault;
    var target = $(this).data("url");
    if (target != "sejours") {
        $("#render").load("views/" + target + '.html');
        $('.button-collapse').sideNav('hide');
    } else {
        $.getJSON( "http://kristengarnier.com/serveur/item.php", function( data ) {
            console.log(data);
            var nom = data.title;
            var nom = '<h1>' + nom + '</h1>';
            var content = data.content;
            var content = '<p>' + content + '</p>';
            $('#render').html(nom + content);
        }).fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });
        // $("#render").load("../../serveur/item.php");
    }
}

function command(e) {
    e.preventDefault;
    toast('Votre voyage a été ajouté au panier !', 4000);
}
