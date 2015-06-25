/**
 * application.js
 *
 * @copyright Copyright 2015
 * @author    Christian Blank
 */


//application module
var app = angular.module("application", [
	'ngRoute',
	'ui.bootstrap'
]);


//global application configuration
app.config(['$routeProvider', function($routeProvider){

		//global routing setup
		$routeProvider
		//home
		.when('/', {
			templateUrl : 'templates/home/home.html',
			controller  : 'homeCtrl'
		})
		//imprint
		.when('/imprint', {
			templateUrl : 'templates/imprint/imprint.html',
			controller  : 'imprintCtrl'
		})
        //menu
        .when('/menu', {
            templateUrl : 'templates/menu/menu.html',
            controller  : 'menuCtrl'
         })
        //admin
        .when('/admin', {
            templateUrl : 'templates/admin/admin.html',
            controller  : 'adminCtrl'
        })
        //admin orders
        .when('/admin/orders', {
            templateUrl : 'templates/admin/orders.html',
            controller  : 'ordersCtrl'
        })
        //admin statistics
        .when('/admin/statistics', {
            templateUrl : 'templates/admin/statistics.html',
            controller  : 'statisticsCtrl'
        })
		//if route not found
		.otherwise({redirectTo: '/'});

}]);


app.run(function($rootScope, $http, $location) {

    $rootScope.setCurrentPage = function(page) {
        $rootScope.currentPage = page;
        return $rootScope.currentPage;
    };

});


