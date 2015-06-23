<?php
/**
 * MenuController.php
 *
 * @copyright Copyright 2015
 * @author    Christian Blank
 */

define('__DIR__', dirname(dirname(__FILE__)));
require_once(__DIR__.'/DbController.php');

//xhr routing
if(isset($_GET)){
    $method = array_keys($_GET)[0];
    MenuController::$method();
}


class MenuController {

    //function to fetch all articles from database
    public static function getArticles(){

        $query = "SELECT * FROM articles";

        $data = DbController::fetchAssoc($query);

        echo json_encode($data);

    }

    //function to fetch all ingredients from database
    public static function getIngredients(){

        $query = "SELECT * FROM ingredients";

        $data = DbController::fetchAssoc($query);

        foreach($data as $ingredient){
            //predefine size "classic"
            if($ingredient['id'] == 1){
                $data[$ingredient['id']]['selected'] = true;
            }
            else{
                $data[$ingredient['id']]['selected'] = false;
            }
        }

        echo json_encode($data);

    }

}