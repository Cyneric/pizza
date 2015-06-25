<?php
/**
 * AdminController.php
 *
 * @copyright Copyright 2015
 * @author    Christian Blank
 */

define('__DIR__', dirname(dirname(__FILE__)));
require_once(__DIR__.'/DbController.php');


if(isset($_GET)){
    $method = array_keys($_GET)[0];
    AdminController::$method();
}


class AdminController{


    public static function fetchOverviewData(){

        $countUsersQuery = "SELECT COUNT(*) as numResults FROM users";
        $countOrdersQuery = "SELECT COUNT(*) as numResults FROM orders";
        $countOrderedArticlesQuery = "SELECT COUNT(*) as numResults FROM order_items";
        $countUnprocessedOrdersQuery = "SELECT COUNT(*) as numResults FROM orders WHERE completed = 0";
        $countEarningsQuery = "SELECT SUM(order_price) as earnings FROM orders";
        $countArticlesQuery = "SELECT COUNT(*) as numResults FROM articles";

        $ret = array(
            "numUsers" => DbController::fetchOne($countUsersQuery)['numResults'],
            "numOrders" => DbController::fetchOne($countOrdersQuery)['numResults'],
            "numOrderedArticles" => DbController::fetchOne($countOrderedArticlesQuery)['numResults'],
            "numUnprocessedOrders" => DbController::fetchOne($countUnprocessedOrdersQuery)['numResults'],
            "earnings" => round(DbController::fetchOne($countEarningsQuery)['earnings']),
            "numArticles" => DbController::fetchOne($countArticlesQuery)['numResults']
        );

        echo json_encode($ret);

    }


}