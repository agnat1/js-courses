function autoCompleteInit(){
    var selected = null;
    var prev_search_str = "";
    var prev_search_result = [];

    $("#search-submit").on("click", function(e){
        $("#search-form").attr("event", "click").submit();
    });

    var input = $("input#search");
    var ac_plugin = input.myAutoComplete({
        'appendToElement' : '.search-block',
        'onSelect' : function(data){
            selected = data;
            console.log('selected: ', data);
        }
    });

    input.on("keyup", function(e) {
        if(e.keyCode == 13 || e.keyCode == 38 || e.keyCode == 40){
            return false;
        }
        var search_str = $.trim(this.value);
        if(search_str.length > 2){
            if(search_str.indexOf(prev_search_str) == -1 || prev_search_str == ""){
                prev_search_str = search_str;
                $.getJSON("", "ajax=1&"+this.name+"="+this.value, function(data){
                    console.log("from ajax");
                    prev_search_result = data;
                    ac_plugin.update(data);
                });
            }else{
                console.log("from prev");
                var data = prev_search_result.filter(function(elem){
                    return elem.str.toLowerCase().indexOf(search_str.toLowerCase()) > -1;
                });
                ac_plugin.update(data);
            }
        }else{
            ac_plugin.update();
            prev_search_str = "";
            prev_search_result = [];
        }
    });

    $("#search-form").on("submit", function(e){
        if(selected != null && !$("#search-form").attr("event")){
            e.preventDefault();
            e.stopPropagation();
            ac_plugin.openSelected();
        }else{
            return true;
        }
    });
}

