<?php

// Palauttaa tietokannassa olevan datan minimi ja maksimi päivämäärä alueen mm. datepickerille.
function getDates() {
    $sql="SELECT MIN(pvm) as MINpvm, MAX(pvm) as MAXpvm FROM saatilasto_harj";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $object = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
		echo $stmt->debugDumpParams().'\n'.var_export($stmt->errorInfo()); // DEBUG
        return '{"data": ' . json_encode($object, JSON_UNESCAPED_UNICODE ). '}';
        } catch(PDOException $e) {
            return '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

// Palauttaa tietokannan taulukon otsikot.
function getHeaders() {
    $sql="SELECT COLUMN_NAME FROM information_schema.columns
	WHERE table_name = 'saatilasto_harj' ORDER BY ordinal_position;";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $object = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
		echo $stmt->debugDumpParams().'\n'.var_export($stmt->errorInfo()); // DEBUG
        return '{"data": ' . json_encode($object, JSON_UNESCAPED_UNICODE ). '}';
        } catch(PDOException $e) {
            return '{"error":{"text":'. $e->getMessage() .'}}';
    }
}


// Luo annetuista parametreistä rajatun haku pyynnön.
// $params on JSON_rajaus tyylinen JSON tiedosto, josta katsotaan tehtävät rajaukset.
function buildSQLquery($params)
{
	// Query on tyhjä, alustavasti.
	$query = " ";
	
	if ($params)
	{
		$whereQuery = [];
		if ($params->alkpvm)
			array_push($whereQuery, "pvm >= :alkpvm");
		if ($params->loppvm)
			array_push($whereQuery, "pvm <= :loppvm");
		if ($params->minLampotila && $params->lampotilaEhto)
		{
			if ($params->lampotilaEhto == 0)
				// Rajaa vain sisälämpötilat.
				array_push($whereQuery, "sisalampotila >= :minlampotila");
			
			elseif ($params->lampotilaEhto == 1)
				// Rajaa vain ulkolämpötilat.
				array_push($whereQuery, "ulkolampotila >= :minlampotila");	
			elseif ($params->lampotilaEhto == 2)
				// Rajaa sekä sisälämpötilat että ulkolämpötilat.
			{
				array_push($whereQuery, "sisalampotila >= :minlampotila
				AND ulkolampotila >= :minlampotila");
			}
		}
		if ($params->maxLampotila && $params->lampotilaEhto)
		{
			if ($params->lampotilaEhto == 0)
				// Rajaa vain sisälämpötilat.
				array_push($whereQuery, "sisalampotila <= :maxlampotila");
			
			elseif ($params->lampotilaEhto == 1)
				// Rajaa vain ulkolämpötilat.
				array_push($whereQuery, "ulkolampotila <= :maxlampotila");	
			elseif ($params->lampotilaEhto == 2)
				// Rajaa sekä sisälämpötilat että ulkolämpötilat.
			{
				array_push($whereQuery, "sisalampotila <= :maxlampotila
				AND ulkolampotila <= :maxlampotila");
			}
		}
		
		if ($params->minTuulennopeus)
			array_push($whereQuery, "tuulennopeus1 <= :minTuulennopeus
			OR tuulennopeus2 <= :minTuulennopeus");	
		
		if ($params->maxTuulennopeus)
			array_push($whereQuery, "tuulennopeus1 <= :maxTuulennopeus
			OR tuulennopeus2 <= :maxTuulennopeus");
		
		if ($params->minSademaara)
			array_push($whereQuery, "sademaara1 <= :minSademaara
			OR sademaara2 <= :minSademaara");
		
		if ($params->maxSademaara)
			array_push($whereQuery, "sademaara1 <= :maxSademaara
			OR sademaara2 <= :maxSademaara");
		
		// Luo valituista rajauksista WHERE -lauseke SQL queryyn.
		$sizeOfWhere = sizeof($whereQuery);
		// Jos kyselyssä on vain järjestys tiedot, ei lisätä WHERE sanaa.
		if ($sizeOfWhere != 0)
			$query .= " WHERE ";
		for ($i = 0; $i < $sizeOfWhere; $i++)
		{
			$query .= $whereQuery[$i];
			// Jos ei ole viimeinen rajaus lauseke, lisää AND.
			if ($i != $sizeOfWhere - 1)
				$query .= " AND ";
		}
		
		// Lisätään lopuksi järjestys queryn perään, mikäli sellainen oli asetettu.
		if ($params->jarjestys && $params->jarjestaja)
		{
			// Jos järjestys on annettu, asetetaan se (ASC tai DESC).
			$query .= " ORDER by :jarjestaja :jarjestys";
		}
	}
	
	return $query;
}


// Hakee kaikki säätiedot tietokannasta.
function getWeatherStats($params) {

	$whereQuery = buildSQLquery($params);
	$sql = "SELECT * FROM saatilasto_harj {$whereQuery}";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
		// Yhdistetään parametrien arvot SQL komentoon.
		if ($params->alkpvm != null)
			$stmt->bindParam(':alkpvm', $params->alkpvm);
		if ($params->loppvm != null)	
			$stmt->bindParam(':loppvm', $params->loppvm);
		if ($params->minLampotila != null && $params->lampotilaEhto != null)
			$stmt->bindParam(':minlampotila', $params->minlampotila);
		if ($params->maxLampotila != null && $params->lampotilaEhto != null)
			$stmt->bindParam(':maxlampotila', $params->maxlampotila);
		if ($params->minTuulennopeus != null)
			$stmt->bindParam(':minTuulennopeus', $params->minTuulennopeus);
		if ($params->maxTuulennopeus != null)
			$stmt->bindParam(':maxTuulennopeus', $params->maxTuulennopeus);
		if ($params->minSademaara != null)
			$stmt->bindParam(':minSademaara', $params->minSademaara);
		if ($params->maxSademaara != null)
			$stmt->bindParam(':maxSademaara', $params->maxSademaara);	
		if ($params->jarjestaja != null && $params->jarjestys != null)
		{
			$stmt->bindParam(':jarjestaja', $params->jarjestaja);
			$stmt->bindParam(':jarjestys', $params->jarjestys);				
		}
	
		
		$stmt->execute();
		$object = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
		//echo $stmt->debugDumpParams().'\n'.var_export($stmt->errorInfo()); // DEBUG
        return '{"data": ' . json_encode($object, JSON_UNESCAPED_UNICODE ). '}';
        } catch(PDOException $e) {
            return '{"error":{"text":'. $e->getMessage() .'}}';
    }
	

}


// Hakee lasketut MAX MIN AVG säätiedot tietokannasta.
function getWeatherSpecs($params) {
	$params->jarjestaja = null;
	$params->jarjestys = null;
	$whereQuery = buildSQLquery($params);
	$sql = "SELECT MAX(tuulennopeus1) as MAXtuulennopeus1, MAX(tuulennopeus2) as MAXtuulennopeus2, MAX(tuulensuunta1) as MAXtuulensuunta1, MAX(tuulensuunta2) as MAXtuulensuunta2, MAX(sademaara1) as MAXsademaara1, MAX(sademaara2) as MAXsademaara2, MAX(ulkolampotila1) as MAXulkolampotila1, MAX(ulkolampotila2) as MAXulkolampotila2, MAX(ulkoilmankosteus) as MAXulkoilmankosteus, MAX(sisailmankosteus) as MAXsisailmankosteus, MAX(sisailmanpaine) as MAXsisailmanpaine, MAX(ulkoilmanpaine) as MAXulkoilmanpaine, AVG(tuulennopeus1) as AVGtuulennopeus1, AVG(tuulennopeus2) as AVGtuulennopeus2, AVG(tuulensuunta1) as AVGtuulensuunta1, AVG(tuulensuunta2) as AVGtuulensuunta2, AVG(sademaara1) as AVGsademaara1, AVG(sademaara2) as AVGsademaara2, AVG(ulkolampotila1) as AVGulkolampotila1, AVG(ulkolampotila2) as AVGulkolampotila2, AVG(ulkoilmankosteus) as AVGulkoilmankosteus, AVG(sisailmankosteus) as AVGsisailmankosteus, AVG(sisailmanpaine) as AVGsisailmanpaine, AVG(ulkoilmanpaine) as AVGulkoilmanpaine, MIN(tuulennopeus1) as MINtuulennopeus1, MIN(tuulennopeus2) as MINtuulennopeus2, MIN(tuulensuunta1) as MINtuulensuunta1, MIN(tuulensuunta2) as MINtuulensuunta2, MIN(sademaara1) as MINsademaara1, MIN(sademaara2) as MINsademaara2, MIN(ulkolampotila1) as MINulkolampotila1, MIN(ulkolampotila2) as MINulkolampotila2, MIN(ulkoilmankosteus) as MINulkoilmankosteus, MIN(sisailmankosteus) as MINsisailmankosteus, MIN(sisailmanpaine) as MINsisailmanpaine, MIN(ulkoilmanpaine) as MINulkoilmanpaine FROM saatilasto_harj {$whereQuery}";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
		// Yhdistetään parametrien arvot SQL komentoon.
		if ($params->alkpvm != null)
			$stmt->bindParam(':alkpvm', $params->alkpvm);
		if ($params->loppvm != null)	
			$stmt->bindParam(':loppvm', $params->loppvm);
		if ($params->minLampotila != null && $params->lampotilaEhto != null)
			$stmt->bindParam(':minlampotila', $params->minlampotila);
		if ($params->maxLampotila != null && $params->lampotilaEhto != null)
			$stmt->bindParam(':maxlampotila', $params->maxlampotila);
		if ($params->minTuulennopeus != null)
			$stmt->bindParam(':minTuulennopeus', $params->minTuulennopeus);
		if ($params->maxTuulennopeus != null)
			$stmt->bindParam(':maxTuulennopeus', $params->maxTuulennopeus);
		if ($params->minSademaara != null)
			$stmt->bindParam(':minSademaara', $params->minSademaara);
		if ($params->maxSademaara != null)
			$stmt->bindParam(':maxSademaara', $params->maxSademaara);	
		if ($params->jarjestaja != null && $params->jarjestys != null)
		{
			$stmt->bindParam(':jarjestaja', $params->jarjestaja);
			$stmt->bindParam(':jarjestys', $params->jarjestys);				
		}
	
		
		$stmt->execute();
		$object = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
		//echo $stmt->debugDumpParams().'\n'.var_export($stmt->errorInfo()); // DEBUG
        return '{"data": ' . json_encode($object, JSON_UNESCAPED_UNICODE ). '}';
        } catch(PDOException $e) {
            return '{"error":{"text":'. $e->getMessage() .'}}';
    }
	

}


