function autoCompleteInit(){
    var selected = null;

    $("#search-form").on("submit", function(e){
        if((!e.currentTarget.event || e.currentTarget.event != "click") && selected != null){
            e.preventDefault();
            e.stopPropagation();
            var sel = $.parseJSON(selected);
            $('body').append("<a id='" + sel.id + "' href='/company/" + sel.id + "'></a>");
            $("a#sel.id").click();
        }
    });
    $("#search-submit").on("click", function(e){
        $("#search-form").attr("event", "click").submit();
    });

    $("input#search").myAutoComplete({
        'appendToElement' : '.search-block',
        'onSelect' : function(data){
            selected = data;
            console.log('selected: ', data);
        }
    });
}

