/**
 * controllers.js
 *
 * @copyright Copyright 2015
 * @author    Christian Blank
 */


//index controller
app.controller('indexCtrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location){
	
	$scope.indicators = {};
	$scope.indicators.showLoginForm = false;
	$scope.loginData = {};
    $scope.session = {};


	//function to toggle inline login form in navigation
	$scope.toggleLoginForm = function(){
		$scope.indicators.showLoginForm = !$scope.indicators.showLoginForm;
	}


	//function to cancel login 
	$scope.cancelLogin = function(){
		$scope.indicators.showLoginForm = false;
		$scope.loginData = {};
	}


	//function to fetch session data from webserver
	$scope.fetchSession = function(){
		$http.get('http://'+$location.host()+'/pizza/backend/IndexController.php?getSession').
		success(function(data) {
			$scope.session = data;
		});
	}


	//fetch session on load
	$scope.fetchSession();


    //login function
    $scope.login = function(){

        if($scope.loginData.username && $scope.loginData.password){

            $http.get('http://'+$location.host()+'/pizza/backend/IndexController.php?login&username='
                +$scope.loginData.username+'&password='
                +$scope.loginData.password).

                success(function(data) {
                   console.log(data);
                    if(data.username){
                        $scope.fetchSession();
                        $scope.loginData = {};
                        $scope.indicators.showLoginForm = false;
                    }else alert("benutzer oder passwort falsch!");
                });

        }

    }


    //logout function
    $scope.logout = function(){
        $http.get('http://'+$location.host()+'/pizza/backend/IndexController.php?logout').
            success(function(data) {
                console.log(data);
                $scope.fetchSession();
            });
    }


}]);


//home controller
app.controller('homeCtrl', ['$scope', '$rootScope', function($scope, $rootScope){

	$rootScope.setCurrentPage('home');

}]);


//imprint controller
app.controller('imprintCtrl', ['$scope', '$rootScope', function($scope, $rootScope){

	$rootScope.setCurrentPage('imprint');

}]);

//menu controller
app.controller('menuCtrl', ['$scope', '$rootScope', function($scope, $rootScope){

    $rootScope.setCurrentPage('menu');

    //show pizza as default article group
    $scope.currentArticleGroup = 1;

    $scope.selectArticleGroup = function(id){
        $scope.currentArticleGroup = id;
    }

}]);

//menu controller
app.controller('adminCtrl', ['$scope', '$rootScope', function($scope, $rootScope){

    $rootScope.setCurrentPage('admin');

    //show pizza as default article group
    $scope.currentArticleGroup = 1;

    $scope.selectArticleGroup = function(id){
        $scope.currentArticleGroup = id;
    }

}]);

