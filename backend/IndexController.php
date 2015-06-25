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



    public static function updateSession(){

        //get post data
        $data = json_decode(file_get_contents("php://input"));

        session_start();

        //add data to session
        $_SESSION['shoppingCart'] = $data;

        if(!empty($data)){
            echo json_encode(true);
        }else echo json_encode(false);
    }



    public static function addUser(){

        //get post data
        $data = json_decode(file_get_contents("php://input"));

        $query = "SELECT * FROM users WHERE username = '".$data->username."'";
        $user = DbController::fetchOne($query);

        //if user already exists
        if($user){
            exit();
        }

        else{

            $preparedInsertData = array();

            /*
            foreach(get_object_vars($data) as $tmp){
                utf8_encode($tmp);
                array_push($preparedInsertData, $tmp);
            }
            */

            $insertQuery = "INSERT INTO users (".implode(array_keys(get_object_vars($data)), ', ').") VALUES (\"".implode(array_values(get_object_vars($data)),'","')."\")";

            //insert into database
            $success = DbController::insert($insertQuery);

            echo json_encode(true);
        }


    }


    public static function getUserData(){

        session_start();
        $data = $_SESSION['data'];

       echo json_encode($_SESSION['data']);

    }


    public static function getUsersLastOrders(){

        session_start();
        $id = $_SESSION['data']['id'];

        $query = "SELECT id, user_id, UNIX_TIMESTAMP(time) as time, order_price, completed FROM orders WHERE user_id = $id";
        $result = DbController::fetchAssoc($query);

        echo json_encode($result);

    }

}

