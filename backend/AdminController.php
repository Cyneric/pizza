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
        $countArticlesQuery = "SELECT COUNT(*) as numResults FROM order_items";

        $ret = array(
            "numUsers" => DbController::fetchOne($countUsersQuery)['numResults'],
            "numOrders" => DbController::fetchOne($countOrdersQuery)['numResults'],
            "numArticles" => DbController::fetchOne($countArticlesQuery)['numResults']
        );

        echo json_encode($ret);

    }


}