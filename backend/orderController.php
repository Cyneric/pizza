<?php
/**
 * Created by IntelliJ IDEA.
 * User: Christian
 * Date: 23.06.2015
 * Time: 15:28
 */

define('__DIR__', dirname(dirname(__FILE__)));
require_once(__DIR__.'/DbController.php');

//xhr routing
if(isset($_GET)){
    $method = array_keys($_GET)[0];
    MenuController::$method();
}

class orderController{



}