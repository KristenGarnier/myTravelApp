$(document).ready(routing());

function routing(){
    $('#render').load('views/home.html');
    $(document).on("click","a", routingHandler);
}

function routingHandler(e){
    e.preventDefault;
    var target = $(this).data("url");
    $("#render").load("views/"+target+'.html');
    $('.button-collapse').sideNav('hide');
}
