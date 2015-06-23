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
app.controller('menuCtrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location){

    $rootScope.setCurrentPage('menu');

    //show pizza as default article group
    $scope.currentArticleGroup = 1;

    //define data object
    $scope.data = {};

    //define indicators object
    $scope.indicators = {};

    $scope.selectArticleGroup = function(id){
        $scope.currentArticleGroup = id;
    }

    $scope.indicators.showIngredients = false;
    $scope.toggleIngredientsModal = function(){
        $scope.getIngredients();
        $scope.indicators.showIngredients = !$scope.indicators.showIngredients;
    }

    //function to fetch all articles
    $scope.getArticles = function(){
        $http.get('http://'+$location.host()+'/pizza/backend/MenuController.php?getArticles').
            success(function(data) {
                $rootScope.articles = data;
                console.log(data);
            });
    }

    //function to fetch all ingredients
    $scope.getIngredients = function(){
        $http.get('http://'+$location.host()+'/pizza/backend/MenuController.php?getIngredients').
            success(function(data) {
                $rootScope.ingredients = data;
                console.log(data);
            });
    }

    //fetch data
    $scope.getArticles();
    $scope.getIngredients();

    //function to select current item from menu overview
    $scope.selectArticle = function (id){
        $scope.indicators.currentSelectedArticle = id;
    }

    //function to select / unselect ingredient
    $scope.toggleIngredient = function(id){
        $rootScope.ingredients[id].selected = !$rootScope.ingredients[id].selected;
        console.log($rootScope.ingredients[id]);
    }

    //function to add ingredients to current selected article and move to shopping cart
    $scope.addIngredientsToArticle = function(){
        $scope.indicators.tempArticle = {};
        $scope.indicators.tempArticle.articleId = $rootScope.articles[$scope.indicators.currentSelectedArticle].id;
        $scope.indicators.tempArticle.price = $scope.currentPrice;
        $scope.indicators.tempArticle.ingredients = [];

        //we only want selected ingredients in our article object
        angular.forEach($rootScope.ingredients, function(value, key) {
                if(value.selected){
                   $scope.indicators.tempArticle.ingredients.push($rootScope.ingredients[key].id);
                }
        });

        // $scope.indicators.tempArticle.ingredients = $scope.data.ingredients;
        $rootScope.shoppingCart.push($scope.indicators.tempArticle);
    }

    //adding an article to shopping cart
    $rootScope.shoppingCart = [];
    $scope.addItemToCart = function(id){
        $scope.indicators.item = {
            articleId: id,
            price: $rootScope.articles[id].price
        };
        $rootScope.shoppingCart.push($scope.indicators.item);
    }

    //function to calc current article price (consolidated)
    $scope.calcCurrentPrice = function(){
        $scope.currentPrice = parseFloat($rootScope.articles[$scope.indicators.currentSelectedArticle].price);

        angular.forEach($rootScope.ingredients, function(value, key) {
            if(value.selected){
                $scope.currentPrice += parseFloat(value.price);
                $scope.currentPrice = Math.round($scope.currentPrice * 100)/100;
            }
        });

    }

}]);

//admin controller
app.controller('adminCtrl', ['$scope', '$rootScope', function($scope, $rootScope){

    $rootScope.setCurrentPage('admin');

    //show pizza as default article group
    $scope.currentArticleGroup = 1;

    $scope.selectArticleGroup = function(id){
        $scope.currentArticleGroup = id;
    }

}]);

