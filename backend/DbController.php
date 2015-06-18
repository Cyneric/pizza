<?php
/**
 * Created by IntelliJ IDEA.
 * User: Christian
 * Date: 21.04.2015
 * Time: 12:17
 */

class DbController{

    static $host = "localhost";
    static $user = "root";
    static $pass = "root";
    static $db   = "pizza";

    //fetch one row from database
    public static function fetchOne($query){

        if($query){

            $conn = new mysqli(DbController::$host, DbController::$user, DbController::$pass, DbController::$db);

            $result = $conn->query($query);

            $data = array();

            while($row = mysqli_fetch_array($result))
            {
                foreach($row as $k => $row){
                    if(is_numeric($k))continue;
                    $data[$k] = utf8_encode($row);
                }
            }

            return $data;

        }

        else return false;

    }

    //fetch associative data from database (multiple rows)
    public static function fetchAssoc($query){

        if($query){

            $conn = new mysqli(DbController::$host, DbController::$user, DbController::$pass, DbController::$db);

            $result = $conn->query($query);

            $ret = array();

            while($row = mysqli_fetch_array($result))
            {

                $temp = array();

                foreach($row as $k => $v){

                    if(is_numeric($k))continue;
                    $temp[$k] = utf8_encode($v);

                }

                $ret[$row['id']] = $temp;

            }

            return $ret;

        }

        else return false;

    }

}
