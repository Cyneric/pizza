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
    OrderController::$method();
}

class OrderController{


    public static function placeOrder(){

        $data = json_decode(file_get_contents("php://input"));
        $data = get_object_vars($data);

        $userData = get_object_vars($data['userData']);

        //query to create new entry in order table
        $createOrderQuery = "INSERT INTO orders (user_id, order_price) VALUES (".$userData['id'].", ".$data['orderPrice'].")";

        //insert a new entry into order table and get last insert id
        $orderId = DbController::insert($createOrderQuery);

        foreach($data['shoppingCart'] as $article){

            $article = get_object_vars($article);
            $addArticleQuery = "INSERT INTO order_items (article_id, order_id) VALUES (".$article['articleId'].", ".$orderId.")";
            $orderItemId = DbController::insert($addArticleQuery);

            if(!empty($article['ingredients'])){
                foreach($article['ingredients'] as $ingredient){
                    $addIngredientsQuery = "INSERT INTO order_item_ingredients (order_item_id, ingredient_id) VALUES ($orderItemId, $ingredient)";
                    DbController::insert($addIngredientsQuery);
                }
            }
        }

    }


    public static function fetchOrders(){

        $query = "SELECT o.id, o.user_id, o.time, o.order_price, u.first_name, u.last_name
                  FROM orders o, users u
                  WHERE o.user_id = u.id";

        $data = DbController::fetchAssoc($query);

        echo json_encode($data);

    }


}