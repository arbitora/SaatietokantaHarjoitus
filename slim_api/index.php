<?php
header("Access-Control-Allow-Origin: *");
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';
require 'db.php';
require 'functions.php';

$app = new \Slim\App;


// Hakee valittavan päivämäärä alueen mm. Date Pickerille.
$app->get('/dates',function (Request $request, Response $response) {
    $json = getDates();
    $response->getBody()->write($json);
    return $response;
});

// Hakee otsikko tiedot joilla saatietoja voidaan järjestää.
$app->get('/headers',function (Request $request, Response $response) {
    $json = getHeaders();
    $response->getBody()->write($json);
    return $response;
});


$app->post('/saatiedot',function (Request $request, Response $response) {
	$body = $request->getBody();
	$params = json_decode($body);
    $json = getWeatherStats($params);
    $response->getBody()->write($json);
    return $response;
});

$app->post('/saatilastot',function (Request $request, Response $response) {
	$body = $request->getBody();
	$params = json_decode($body);
    $json = getWeatherSpecs($params);
    $response->getBody()->write($json);
    return $response;
});

$app->run();

?>

