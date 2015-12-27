(function( $ ) {

    $.fn.myAutoComplete = function(options) {

        var settings = $.extend({
            'appendToElement' : 'body',
            'onSelect' : function(){}
        }, options);

        var ac_id = this.attr("id") + "-auto-complete-container";

        $(settings.appendToElement).append("<div id='" + ac_id + "' class='auto-complete-container'><ol></ol></div>");

        var ac_ol = $("#" + ac_id + " ol");

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

        this.on("keydown", function(e){
            if(e.keyCode == 38 || e.keyCode == 40){
                e.preventDefault();
                e.stopPropagation();
                upDownKeyHandler(ac_ol, e, settings.onSelect);
                return false;
            }
        });

        this.on("focus", function(e){
            if(ac_ol.children().length > 0){
                $("#" + ac_id).show();
            }
        });

        this.on("blur", function(e){
            $("#" + ac_id).hide();
            ac_ol.children().removeClass("selected");
        });

        return {
            update : function(data){
                if(data && data.length > 0){
                    searchResultHandler(ac_ol, data);
                    $("#" + ac_id).show();
                }else{
                    ac_ol.children().remove();
                    $("#" + ac_id).hide();
                }
            },
            openSelected : function(){
                openSelected(ac_ol);
            }
        };
    };

    function searchResultHandler(ac_ol, data){
        if(ac_ol.children().length > 0){
            ac_ol.children().remove();
        }

        var result_list = '';
        var c = data.length;
        for(var i = 0; i < c; i++){
            result_list += "<li value='" + JSON.stringify(data[i]) + "'><a href='/company/" + data[i].id + "'>" + data[i].str + "</a></li>";
        }

        ac_ol.append(result_list);
    }

    function upDownKeyHandler(ac_ol, e, callback){
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
            callback($(li_new).attr("value"));
        }
    }

    function openSelected(ac_ol){
        var li_sel = ac_ol.find("li.selected");
        li_sel.find("a")[0].click();
    }
})(jQuery);