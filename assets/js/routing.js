$(document).ready(routing());

function routing(){
    $('#render').load('views/home.html');
    $(document).on("click","a", routingHandler);
    $(document).on("click","a.command", command);
}

function routingHandler(e){
    e.preventDefault;
    var target = $(this).data("url");
    $("#render").load("views/"+target+'.html');
    $('.button-collapse').sideNav('hide');
}

function command(e){
    e.preventDefault;
    toast('Votre voyage a été ajouté au panier !', 4000);
}
