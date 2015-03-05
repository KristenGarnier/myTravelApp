document.addEventListener("deviceready", init, false);
document.addEventListener("offline", offlineHandler, false);
document.addEventListener("online", onlineHandler, false);
document.addEventListener("backbutton", onBackKeyDown, false);
$(document).ready(init);
var isOffline;

function init() {
    routing();
}


function routing() {
    $('#render').load('views/home.html');
    $(document).on("click", "a", routingHandler);
    $(document).on("click", "#ajoutUtilisateur", inscriptionHandler);
    $(document).on("click", "#modifierUtilisateur", modifyHandler);
    $(document).on("click", "a.command", command);
}

function routingHandler(e) {
    e.preventDefault;
    var target = $(this).data("url");
    console.log(target);
    if (target != "users" && target != "read-user" && target != "deleteUser" && target != 'agency') {
        $("#render").load("views/" + target + '.html');
        $('.button-collapse').sideNav('hide');
        if(isOffline){
            toastOffline();
        }
    } else {

        if (!isOffline) {
            if (target == 'users') {
                navigator.geolocation.getCurrentPosition(locInfo, error);
                $.getJSON("http://local.dev/Api/users/?action=all", function (data) {
                    $('#render').empty();
                    $.each(data, function (id, donnes) {
                        $('#render').append('<div class="row"> <div class="col s12 m6"> <div class="card blue-grey darken-1"> <div class="card-content white-text"> <span class="card-title">' + donnes.nom + ' ' + donnes.prenom + '</span> <ul><l1>' + donnes.adresse + '</l1><li>' + donnes.CP + '</li><li>' + donnes.ville + '</li></ul> </div> <div class="card-action"> <a data-id="' + donnes.id + '" data-url="read-user" class="read-user" href="#">Conslter le profil</a><a data-id="' + donnes.id + '" data-url="modifyUser" class="read-user" href="#"><i class="mdi-image-edit"></i></a><a data-id="' + donnes.id + '" data-url="deleteUser" class="read-user" href"#"><i class="mdi-action-delete"></i></a></div> </div> </div> </div>');
                    });
                });

            } else if (target == "read-user") {
                var id = $(this).data('id');
                $.getJSON("http://local.dev/Api/users/?action=read&id=" + id, function (data) {
                    var donnes = data[0];
                    $('#render').empty();
                    console.log(data);
                    $('#render').append('<div class="row"> <div class="col s12 m6"> <div class="card blue-grey darken-1"> <div class="card-content white-text"> <span class="card-title">' + donnes.nom + ' ' + donnes.prenom + '</span> <ul><l1>' + donnes.adresse + '</l1><li>' + donnes.CP + '</li><li>' + donnes.ville + '</li></ul> </div> <div class="card-action"> <a data-id="' + donnes.id + '" data-url="read-user" class="read-user" href="#">Conslter le profil</a></div> </div> </div> </div>');
                });
            } else if (target == 'deleteUser') {
                var id = $(this).data('id');
                var parent = this.parentNode.parentNode;
                $.getJSON("http://local.dev/Api/users/?action=delete&id=" + id, function (data) {
                    if (data == false) {
                        toast('L\'utilisateur n\'as pas pu être suprimmé', 4000, 'red-text');
                    } else {
                        toast('L\'utilisateur a bien été supprimmé', 4000, 'green-text');
                        parent.className = 'hiddendiv';
                    }
                });
            }
            else {
                $('#render').empty();
                var height = $(window).height()
                $('#render').append('<h5 class="center-align">Retouvez nos agences près de vous : </h5> <div id="map" style="height: 700px;"></div>');
                initialize();
            }
        } else {
            $('#render').empty();
            $('#render').append('<div class="card-panel red lighten-2 white-text center-align"> Ces fonctionalités ne sont acutellesments pas disponible, veuillez vous connecter au réseau</div>');
        }
    }
}

function inscriptionHandler(e) {
    console.log('inscrit !');
    e.preventDefault();
    var nom = $("#ajouter #nom").val();
    var prenom = $("#ajouter #prenom").val();
    var MDP = $("#ajouter #password").val();
    var adresse = $("#ajouter #adresse").val();
    var CP = $("#ajouter #CP").val();
    var ville = $("#ajouter #ville").val();
    var error = false;


    if (nom == '' || prenom == '' || MDP == '' || adresse == '' || CP == '' || ville == '') {
        console.log('toast');
        toast('Veuillez remplir le formulaire en entier', 4000, 'red-text');
        error = true;

    }

    if (error != true) {
        console.log('test');
        $.ajax({
            url: "http://local.dev/Api/users/",
            type: "GET",
            data: {
                action: 'create',
                nom: nom,
                prenom: prenom,
                MDP: MDP,
                adresse: adresse,
                CP: CP,
                ville: ville
            },
            cache: false,
            success: function () {
                // Success message
                toast('Vous avez été enregistré avec success !', 4000, 'green-text');

                //clear all fields
                $('#ajouter').trigger("reset");
            },
            error: function () {
                // Fail message
                toast('Vous n\'avez pas été enregistré, recommencez', 4000, 'orange-text');
            }
        });

    }


}
function modifyHandler(e) {
    console.log('coucou')
    e.preventDefault();
    var id = $(this).data('id');
    var nom = $("#modification #nom").val();
    var prenom = $("#modification #prenom").val();
    var MDP = $("#modification #password").val();
    var adresse = $("#modification #adresse").val();
    var CP = $("#modification #CP").val();
    var ville = $("#modification #ville").val();
    var error = false;
    var data = {};
    data.action = 'update';
    data.id = "27";


    if (nom != '') {
        data.nom = nom;
    }
    if (prenom != '') {
        data.prenom = prenom;
    }
    if (MDP != '') {
        data.MDP = MDP;
    }
    if (adresse != '') {
        data.adresse = adresse;
    }
    if (CP != '') {
        data.CP = CP;
    }
    if (ville != '') {
        data.ville = ville;
    }

    if (error != true) {
        console.log(data);
        $.ajax({
            url: "http://local.dev/Api/users/",
            type: "GET",
            data: data,
            cache: false,
            success: function (data) {
                // Success message
                console.log(data);
                toast('Le profil a été modifié avec success !', 4000, 'green-text');

                //clear all fields
                $('#modification').trigger("reset");
            },
            error: function () {
                // Fail message
                toast('Vous n\'avez pas pu être modifé, recommencez', 4000, 'orange-text');
            }
        });

    }


}


function command(e) {
    e.preventDefault;
    toast('Votre voyage a été ajouté au panier !', 4000);
}

function onBackKeyDown() {
    $('#render').prepend("<p>Back</p>");
}

function onlineHandler() {
    isOffline = false;
}

function offlineHandler() {
    toast('Attention, vous êtes actuellement hors ligne', 4000, 'red-text');
    $('nav li:gt(2)').hide();
    isOffline = true;
}

function toastOffline(){
    toast('Attention, vous êtes actuellement hors ligne',3000,'red-text');
}