(function(){
    'use strict';

    function LangController($scope, $langs){
        $scope.lang = "";
        $scope.langList = $langs.get();

        $scope.addLang = function(){
            if($scope.lang == ''){
                return;
            }else if($langs.hasLang($scope.lang)){
                alert('You cannot learn "'+$scope.lang+'" language 2 times :)');
                return;
            }
            $scope.langList.push($scope.lang);
        };

        $scope.remove = function(index){
            $scope.langList.splice(index, 1);
        };
    }

    angular.module("myApp").controller("LangController", ["$scope", "langsData", LangController]);
})();