$(document).ready(routing());

function routing() {
    $('#render').load('views/home.html');
    $(document).on("click", "a", routingHandler);
    $(document).on("click", "a.command", command);
}

function routingHandler(e) {
    e.preventDefault;
    var target = $(this).data("url");
    if (target != "users" && target != "read-user" ) {
        $("#render").load("views/" + target + '.html');
        $('.button-collapse').sideNav('hide');
    } else {
        if(target == 'users'){
            navigator.geolocation.getCurrentPosition(locInfo, error);
            $.getJSON("http://local.dev/Api/users/?action=all", function (data) {
                $('#render').empty();
                $.each(data, function(id, donnes){
                    $('#render').append('<div class="row"> <div class="col s12 m6"> <div class="card blue-grey darken-1"> <div class="card-content white-text"> <span class="card-title">' +donnes.nom+ ' ' +donnes.prenom+ '</span> <ul><l1>'+donnes.adresse+'</l1><li>'+donnes.CP+'</li><li>'+donnes.ville+'</li></ul> </div> <div class="card-action"> <a data-id="'+ donnes.id +'" data-url="read-user" class="read-user" href="#">Conslter le profil</a></div> </div> </div> </div>');
                });
            });

        }else {
            e.preventDefault();
            var id = $(this).data('id');
            $.getJSON("http://local.dev/Api/users/?action=read&id="+id, function (data) {
                var donnes = data[0];
                $('#render').empty();
                console.log(data);
                $('#render').append('<div class="row"> <div class="col s12 m6"> <div class="card blue-grey darken-1"> <div class="card-content white-text"> <span class="card-title">' +donnes.nom+ ' ' +donnes.prenom+ '</span> <ul><l1>'+donnes.adresse+'</l1><li>'+donnes.CP+'</li><li>'+donnes.ville+'</li></ul> </div> <div class="card-action"> <a data-id="'+ donnes.id +'" data-url="read-user" class="read-user" href="#">Conslter le profil</a></div> </div> </div> </div>');
            });
        }
    }
}

function locInfo(pos){
    console.log(pos);
}
function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

function command(e) {
    e.preventDefault;
    toast('Votre voyage a été ajouté au panier !', 4000);
}
