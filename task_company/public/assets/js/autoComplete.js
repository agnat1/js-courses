(function( $ ) {

    $.fn.myAutoComplete = function(options) {

        var settings = $.extend({
            'appendToElement' : 'body',
            'onSelect' : function(){}
        }, options);

        var ac_id = this.attr("id") + "-auto-complete-container";

        $(settings.appendToElement).append("<div id='" + ac_id + "' class='auto-complete-container'><ol></ol></div>");

        var offset = $('#search').offset();
        var height = $('#search').height() + 5;
        var width = $('#search').width() + 4;
        var top = offset.top + height + "px";
        var left = offset.left + "px";

        $("#" + ac_id).css({
            'left': left,
            'top': top,
            'width': width,
            'max-height': '400px'
        }).hide();

        var prev_search_str = "";
        var prev_search_result = [];

        this.on("keyup", function(e){
            if(e.keyCode == 13){
                return true;
            }else if(e.keyCode == 38 || e.keyCode == 40){
                e.preventDefault();
                upDownKeyHandler(e);
                return;
            }
            var search_str = $.trim(this.value);
            if(search_str.length > 2){
                if(search_str.indexOf(prev_search_str) == -1 || prev_search_str == ""){
                    prev_search_str = search_str;
                    $.getJSON("", "ajax=1&"+this.name+"="+this.value, function(data){
                        console.log("from ajax");
                        prev_search_result = data;
                        searchResultHandler(data);
                        $("#" + ac_id).show();
                    });
                }else{
                    console.log("from prev");
                    var data = prev_search_result.filter(function(elem){
                        return elem.str.toLowerCase().indexOf(search_str.toLowerCase()) > -1;
                    });
                    searchResultHandler(data);
                    $("#" + ac_id).show();
                }
            }else{
                $("#" + ac_id).hide();
                prev_search_str = "";
                prev_search_result = [];
            }
        });
        // Тут пишем функционал нашего плагина

        function searchResultHandler(data){
            var ac_ol = $("#" + ac_id + " ol");
            if(ac_ol.children().length > 0){
                ac_ol.children().remove();
            }

            var result_list = '';
            var c = data.length;
            for(var i = 0; i < c; i++){
                result_list += "<li value='" + JSON.stringify(data[i]) + "'>" + data[i].str + "</li>";
            }

            ac_ol.append(result_list);
        }

        function upDownKeyHandler(e){
            var ac_ol = $("#" + ac_id + " ol");
            if(ac_ol.children().length > 0){
                var li_new;
                var li_sel = ac_ol.find("li.selected");
                if(li_sel.length == 0){
                    li_new = ac_ol.children()[0];
                }else{
                    if(e.keyCode == 38){
                        var prev = li_sel.prev();
                        li_new = prev.length == 0 ? li_sel : prev;
                    }else{
                        var next = li_sel.next();
                        li_new = next.length == 0 ? li_sel : next;
                    }
                }
                ac_ol.children().removeClass("selected");
                $(li_new).addClass("selected");
                settings.onSelect($(li_new).attr("value"));
            }
        }
    };


})(jQuery);