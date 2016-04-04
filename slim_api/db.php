<?php
function getDB() {
    $dbhost="mydb.tamk.fi";
    $dbuser="e5tjokin"; // Your own username
    $dbpass="Salasana2"; // Your own password
    $dbname="dbe5tjokin52"; // Your own database name
    $dbConnection = new PDO("mysql:host=$dbhost;
	dbname=$dbname;charset=utf8", 
	$dbuser, $dbpass,array(PDO::MYSQL_ATTR_INIT_COMMAND 
	=> "SET NAMES 'utf8'"));
    
    return $dbConnection;
}