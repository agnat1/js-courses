(function(){
    'use strict';

    function LangsData(){
        var langs = ['Ukraine', 'England', 'Poland'];

        this.get = function(){
            return langs;
        }

        this.add = function(lang){
            langs.push(lang);
            return this;
        }

        this.addAndGet = function(lang){
            return this.add(lang).get();
        }
    }

    angular.module("myApp").service("langsData", LangsData);
})();