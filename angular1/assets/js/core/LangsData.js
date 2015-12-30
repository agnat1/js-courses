(function(){
    'use strict';

    function LangsData(){
        var langs = ['Ukraine', 'England', 'Poland'];

        this.get = function(){
            return langs;
        }

        this.hasLang = function(lang){
            return (langs.indexOf(lang) > -1);
        }
    }

    angular.module("myApp").service("langsData", LangsData);
})();