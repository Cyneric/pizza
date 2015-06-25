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
    $scope.data = {};

    //toastr configuration
    toastr.options = {
        "closeButton" : true,
        "positionClass": "toast-top-right",
        "timeOut": "2000"
    }


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

            //define shopping cart if not already defined
                if(data.shoppingCart){
                    $rootScope.shoppingCart = data.shoppingCart;
                    $scope.calcConsolidatedPrice();
                }else $rootScope.shoppingCart = [];
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
                        toastr["success"]("Hallo "+data.username, "Login erfolgreich!");
                    }else toastr["error"]("", "Benutzer oder Passwort falsch!");;
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

    //function to remove article from shopping cart
    $scope.removeArticleFromCart = function(id){

        var tmp = $rootScope.shoppingCart[id];
console.log(tmp);
        $rootScope.shoppingCart.splice(id, 1);
        $scope.updateSession($rootScope.shoppingCart);
        $scope.calcConsolidatedPrice();
        toastr["info"](""+$rootScope.articles[tmp.articleId].name, "Artikel wurde entfernt");
    }

    //function to toggle shopping cart
    $scope.indicators.showCart = false;
    $scope.toggleCart = function(){
        $scope.indicators.showCart = !$scope.indicators.showCart;
    }

    //function to calc consolidated price
    $scope.calcConsolidatedPrice = function(){
        $scope.consolidatedPrice = 0;
        angular.forEach($rootScope.shoppingCart, function(value, key) {
                $scope.consolidatedPrice += parseFloat(value.price);
                $scope.consolidatedPrice = Math.round($scope.consolidatedPrice * 100)/100;
        });
    }

    //function to toggle register form
    $scope.indicators.showRegisterModal = false;
    $scope.toggleRegisterModal = function(){
        $scope.indicators.showRegisterModal = !$scope.indicators.showRegisterModal;
    }

    //define registration form object
    $scope.data.register = {
        username:"",
        first_name:"",
        last_name:"",
        street_name:"",
        street_number:"",
        location:"",
        zip:"",
        phone:"",
        password:"",
        email:""
    };

    //functionality to validate form input
    $scope.registrationFormCompleted = false;
    $scope.$watchCollection('data.register', function() {
        $scope.evalRegistrationForm();
    });

    $scope.evalRegistrationForm = function(){
        $scope.registrationFormCompleted = true;
        angular.forEach($scope.data.register, function(value, key) {
            if(!value){
                $scope.registrationFormCompleted = false;
            }
        });
    }

    //function to update session to keep shopping cart
    $scope.updateSession = function(updateData){
        $http({
            url: 'http://'+$location.host()+'/pizza/backend/IndexController.php?updateSession',
            method: "POST",
            data: updateData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
        }).error(function (data, status, headers, config) {
        });
    }

    $scope.addUser = function(){
        $http({
            url: 'http://'+$location.host()+'/pizza/backend/IndexController.php?addUser',
            method: "POST",
            data: $scope.data.register,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            console.log(data);
            if(!data)toastr["error"]("", "Benutzer existiert bereits!");
            else{
                toastr["success"]("", "Benutzer erfolgreich angelegt!");
                $scope.indicators.showRegisterModal = false;
            }
        }).error(function (data, status, headers, config) {
            alert("Es ist ein Fehler aufgetreten!");
        });
    }

    //function to toggle order confirmation modal
    $scope.indicators.showOrderConfirmationModal = false;
    $scope.toggleOrderConfirmationModal = function(){
        $scope.indicators.showOrderConfirmationModal = !$scope.indicators.showOrderConfirmationModal;
    }

    //function to place order
    $scope.placeOrder = function(){

        var preparedData = {
            "shoppingCart" : $rootScope.shoppingCart,
            "userData" : $scope.session.data,
            "orderPrice" : $scope.consolidatedPrice
        }

        $http({
            url: 'http://'+$location.host()+'/pizza/backend/OrderController.php?placeOrder',
            method: "POST",
            data: preparedData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            toastr["success"]("", "Die Bestellung wurde Übermittelt");
            $rootScope.shoppingCart = [];
            $scope.updateSession();
            $scope.calcConsolidatedPrice();
            $scope.indicators.showCart = false;
        }).error(function (data, status, headers, config) {
            toastr["error"]("", "Es ist ein Fehler aufgetreten!");
        });

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

    $scope.indicators.settingsModal = false;
    $scope.toggleSettingsModal = function(){
        $scope.indicators.settingsModal = !$scope.indicators.settingsModal;
        $http.get('http://'+$location.host()+'/pizza/backend/IndexController.php?getUserData').
            success(function(data) {
                $rootScope.userData = data;
                console.log(data);
            });
    }

    $scope.indicators.lastOrdersModal = false;
    $scope.toggleLastOrdersModal = function(){
        $scope.indicators.lastOrdersModal = !$scope.indicators.lastOrdersModal;
        $http.get('http://'+$location.host()+'/pizza/backend/IndexController.php?getUsersLastOrders').
            success(function(data) {
                $rootScope.lastOrders = data;
                console.log(data);
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
        $scope.updateSession($rootScope.shoppingCart);
        $scope.calcConsolidatedPrice();
        toastr["success"](""+$rootScope.articles[$scope.indicators.tempArticle.articleId].name, "Artikel hinzugefügt");
    }

    //adding an article to shopping cart
    $scope.addItemToCart = function(id){
        $scope.indicators.item = {
            articleId: id,
            price: $rootScope.articles[id].price
        };
        $rootScope.shoppingCart.push($scope.indicators.item);
        $scope.updateSession($rootScope.shoppingCart);
        $scope.calcConsolidatedPrice();
        toastr["success"](""+$rootScope.articles[id].name, "Artikel hinzugefügt");
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

    //function to determine that only one size can be selected at the same time
    $scope.evalSize = function(id){
        $rootScope.ingredients[1].selected = false;
        $rootScope.ingredients[2].selected = false;
        $rootScope.ingredients[3].selected = false;
        $rootScope.ingredients[id].selected = true;
        $scope.calcCurrentPrice();
    }

}]);

//admin controller
app.controller('adminCtrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location){

    if($scope.session.data.is_admin < 1){
        $location.path('/');
    }

    $rootScope.setCurrentPage('admin');
    $scope.data = [];

    $scope.fetchOverviewData = function(){
        $http.get('http://'+$location.host()+'/pizza/backend/AdminController.php?fetchOverviewData').
            success(function(data) {
                console.log(data);
                $scope.data.overview = data;
            });
    }

    $scope.fetchOverviewData();

}]);

//orders controller
app.controller('ordersCtrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location){

    if($scope.session.data.is_admin < 1){
        $location.path('/');
    }

    $rootScope.setCurrentPage('admin');
    $scope.data = [];
    $scope.showDetails = false;

    if(!$rootScope.articles)$scope.getArticles();
    if(!$rootScope.ingredients)$scope.getIngredients();

    $scope.fetchOrders = function(){
        $http.get('http://'+$location.host()+'/pizza/backend/OrderController.php?fetchOrders').
            success(function(data) {
                console.log(data);
                $scope.data.orders = data;
            });
    }

    $scope.fetchOrders();

    $scope.showOrderDetails = function(id){
        $http.get('http://'+$location.host()+'/pizza/backend/OrderController.php?fetchOrderDetails&id='+id).
            success(function(data) {
                console.log(data);
                $scope.data.orderDetails = data;
                $scope.showDetails = true;
                $scope.currentSelectedOrder = id;
            });
    }


    $scope.toggleOrderDetailsModal = function(){
        $scope.showDetails = !$scope.showDetails;
    }

    //function to mark an order as completed
    $scope.completeOrder = function(id){
        $http.get('http://'+$location.host()+'/pizza/backend/OrderController.php?completeOrder&id='+id).
            success(function(data) {
                $scope.fetchOrders();
            });
    }

    //function to mark an order as uncompleted
    $scope.uncompleteOrder = function(id){
        $http.get('http://'+$location.host()+'/pizza/backend/OrderController.php?uncompleteOrder&id='+id).
            success(function(data) {
                $scope.fetchOrders();
            });
    }

}]);


//statistics controller
app.controller('statisticsCtrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location){

    if($scope.session.data.is_admin < 1){
        $location.path('/');
    }

    $rootScope.setCurrentPage('admin');
    $scope.data = [];

    $scope.fetchStatisticsData = function(){
        $http.get('http://'+$location.host()+'/pizza/backend/StatisticsController.php?fetchStatisticsData').
            success(function(data) {
                console.log(data);
                $scope.data.statistics = data;
                $scope.drawChart();
            });
    }

    $scope.fetchStatisticsData();

    //highcharts configuration
    $scope.drawChart = function(){

        $(function () {

            $(document).ready(function () {

                // Build the chart
                $('#statistic').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Verkaufte Artikel nach Kategorie'
                    },
                    tooltip: {
                        pointFormat: '{series.name} {point.y} stk. - <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        name: "Anteil",
                        colorByPoint: true,
                        data: $scope.data.statistics.articles
                    }]
                });
            });
        });


        $(function () {

            // Make monochrome colors and set them as default for all pies
            Highcharts.getOptions().plotOptions.pie.colors = (function () {
                var colors = [],
                    base = Highcharts.getOptions().colors[0],
                    i;

                for (i = 0; i < 10; i += 1) {
                    // Start out with a darkened base color (negative brighten), and end
                    // up with a much brighter color
                    colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
                }
                return colors;
            }());

            // Build the chart
            $('#ingredients').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Verbrauchte Zutaten'
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '{series.name} {point.y} stk. - <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: "Zutaten",
                    colorByPoint: true,
                    data: $scope.data.statistics.ingredients
                }]
            });
        });

    }

}]);

