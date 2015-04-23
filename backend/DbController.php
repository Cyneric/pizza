<?php
/**
 * Created by IntelliJ IDEA.
 * User: Christian
 * Date: 21.04.2015
 * Time: 12:17
 */

class DbController{

    public static function fetch($query){

        if($query){

            $conn = new mysqli("localhost", "root", "root", "pizza");

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

}
