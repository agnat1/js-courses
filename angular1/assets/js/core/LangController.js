(function(){
    'use strict';

    function LangController($scope, $langs){
        $scope.lang = "";
        $scope.langList = $langs.get();

        $scope.addLang = function(){
            if($scope.lang == ''){
                return;
            }
            $scope.langList = $langs.addAndGet($scope.lang);
        };
    }

    angular.module("myApp").controller("LangController", ["$scope", "langsData", LangController]);
})();