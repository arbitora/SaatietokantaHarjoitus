<?php

	require('queryParameters.php');

	// Haetaan annettu JSON paketti PHP ja muokataan se PHP:lle ymmärrettävään muotoon.
	$inputJSON = file_get_contents('php://input');
	$params = json_decode($inputJSON);
	
    $dbhost="mydb.tamk.fi";
    $dbuser="e5tjokin"; // Your own username
    $dbpass="Salasana2"; // Your own password
    $dbname="dbe5tjokin52"; // Your own database name
	
	$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
	
	if (mysqli_connect_errno())
	{
		die.("Failed to connect to MySQL: " . mysqli_connect_error());
	}
	
	$conn->set_charset('utf8');

	$query = "SELECT * FROM saatilasto_harj" . queryParameters($params) . ";";
	
	$result = $conn->query($query) or die ("Error in Query " . mysqli_error($connection));
	
	while ($row = $result->fetch_assoc())
	{
		$object[] = $row;
	}
	
	echo '{"data":' . json_encode($object, JSON_UNESCAPED_UNICODE) . '}';
	
	mysqli_close($conn);
	