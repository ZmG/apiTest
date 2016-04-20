<?php
/**
 * Created by PhpStorm.
 * User: Zhaky
 * Date: 03/04/15
 * Time: 17:31
 */

class Core_Utils {

     public static function is_https()  {

        return strtolower(substr($_SERVER["SERVER_PROTOCOL"],0,5))=='https'? true : false;
    }



} 