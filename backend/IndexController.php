<?php
/**
* IndexController.php
*
 * @copyright Copyright 2015
* @author    Christian Blank
*/

define('__DIR__', dirname(dirname(__FILE__)));
require_once(__DIR__.'/DbController.php');


if(isset($_GET)){
	$method = array_keys($_GET)[0];
	IndexController::$method();
}


class IndexController{



    public static function getSession(){

        session_start();
        $_SESSION['sessionInitialized'] = true;
        echo json_encode($_SESSION);

    }



    public static function login(){

        if($_GET['username'] && $_GET['password']){

            $user = $_GET['username'];
            $pass = $_GET['password'];


            $query = "SELECT * FROM users WHERE username = '".$user."'";

            $data = DbController::fetchOne($query);

            if($data['password'] == $pass){
                session_start();
                $_SESSION['data'] = $data;
                $_SESSION['username'] = $data['username'];
                $_SESSION['isLoggedIn'] = true;
                echo json_encode($data);
            }

            else echo json_encode(false);

        }

        else echo json_encode(false);
    }



    public static function logout(){
        session_start();
        session_destroy();
    }

}

