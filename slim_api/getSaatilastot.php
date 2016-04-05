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

	$query = "SELECT MAX(tuulennopeus1) as MAXtuulennopeus1, MAX(tuulennopeus2) as MAXtuulennopeus2, MAX(tuulensuunta1) as MAXtuulensuunta1, MAX(tuulensuunta2) as MAXtuulensuunta2, MAX(sademaara1) as MAXsademaara1, MAX(sademaara2) as MAXsademaara2, MAX(ulkolampotila1) as MAXulkolampotila1, MAX(ulkolampotila2) as MAXulkolampotila2, MAX(ulkoilmankosteus) as MAXulkoilmankosteus, MAX(sisailmankosteus) as MAXsisailmankosteus, MAX(sisailmanpaine) as MAXsisailmanpaine, MAX(ulkoilmanpaine) as MAXulkoilmanpaine, AVG(tuulennopeus1) as AVGtuulennopeus1, AVG(tuulennopeus2) as AVGtuulennopeus2, AVG(tuulensuunta1) as AVGtuulensuunta1, AVG(tuulensuunta2) as AVGtuulensuunta2, AVG(sademaara1) as AVGsademaara1, AVG(sademaara2) as AVGsademaara2, AVG(ulkolampotila1) as AVGulkolampotila1, AVG(ulkolampotila2) as AVGulkolampotila2, AVG(ulkoilmankosteus) as AVGulkoilmankosteus, AVG(sisailmankosteus) as AVGsisailmankosteus, AVG(sisailmanpaine) as AVGsisailmanpaine, AVG(ulkoilmanpaine) as AVGulkoilmanpaine, MIN(tuulennopeus1) as MINtuulennopeus1, MIN(tuulennopeus2) as MINtuulennopeus2, MIN(tuulensuunta1) as MINtuulensuunta1, MIN(tuulensuunta2) as MINtuulensuunta2, MIN(sademaara1) as MINsademaara1, MIN(sademaara2) as MINsademaara2, MIN(ulkolampotila1) as MINulkolampotila1, MIN(ulkolampotila2) as MINulkolampotila2, MIN(ulkoilmankosteus) as MINulkoilmankosteus, MIN(sisailmankosteus) as MINsisailmankosteus, MIN(sisailmanpaine) as MINsisailmanpaine, MIN(ulkoilmanpaine) as MINulkoilmanpaine FROM saatilasto_harj" . queryParameters($params) . ";";

	$result = $conn->query($query) or die ("Error in Query " . mysqli_error($connection));
	
	while ($row = $result->fetch_assoc())
	{
		$object[] = $row;
	}
	
	echo json_encode($object, JSON_UNESCAPED_UNICODE);
	
	mysqli_close($conn);
	