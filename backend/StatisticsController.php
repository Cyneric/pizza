<?php
/**
 * Created by IntelliJ IDEA.
 * User: Christian
 * Date: 25.06.2015
 * Time: 15:40
 */

define('__DIR__', dirname(dirname(__FILE__)));
require_once(__DIR__.'/DbController.php');

//xhr routing
if(isset($_GET)){
    $method = array_keys($_GET)[0];
    StatisticsController::$method();
}

class StatisticsController{

    public static function fetchStatisticsData(){

       $articlesQuery = "SELECT a.article_type_id, COUNT(oi.id) as result FROM order_items oi, articles a WHERE oi.article_id = a.id GROUP BY a.article_type_id";
       $ingredientsQuery = "SELECT ig.name, COUNT(*) as y FROM order_item_ingredients i, ingredients ig WHERE ig.id = i.ingredient_id AND i.ingredient_id > 3 GROUP BY i.ingredient_id";

       $articles = DbController::fetchQuery($articlesQuery);
        $ingredients = DbController::fetchQuery($ingredientsQuery);


        $articlesData = array(
            array("name" => "Pizza","y" => intval($articles[0]['result'])),
            array("name" => "Salat","y" => intval($articles[1]['result'])),
            array("name" => "Getränke","y" => intval($articles[2]['result']))
        );

        $ingredientsData = array();

        foreach($ingredients as $ingredient){
            $ingredient['y'] = intval($ingredient['y']);
            array_push($ingredientsData, $ingredient);
        }

        $data = array(
            "articles" => $articlesData,
            "ingredients" => $ingredientsData
        );

        echo json_encode($data);
    }

}
