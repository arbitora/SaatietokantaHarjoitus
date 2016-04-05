<?php

// Luo annetuista parametreistä rajatun haku pyynnön.
// $params on JSON_rajaus tyylinen JSON tiedosto, josta katsotaan tehtävät rajaukset.
function queryParameters($params)
{
	// Query on tyhjä, alustavasti.
	$query = " ";
	
	if ($params)
	{
		$whereQuery = [];
		if ($params->alkpvm != null && $params->alkpvm != "undefined")
			array_push($whereQuery, 'pvm >= "'.$params->alkpvm.'"');
		if ($params->loppvm != null && $params->loppvm != "undefined")
			array_push($whereQuery, 'pvm <= "'.$params->loppvm.'"');
		if ($params->minLampotila != null && $params->minLampotila != "undefined")
		{
			array_push($whereQuery, "ulkolampotila1 >= $params->minLampotila
			AND ulkoLampotila2 >= $params->minLampotila");
		}
		if ($params->maxLampotila != null && $params->maxLampotila != "undefined")
		{
			array_push($whereQuery, "ulkolampotila1 <= $params->maxLampotila
			AND ulkoLampotila2 <= $params->maxLampotila");
		}
		
		if ($params->minTuulennopeus != null && $params->minTuulennopeus != "undefined")
			array_push($whereQuery, "tuulennopeus1 >= $params->minTuulennopeus
			OR tuulennopeus2 >= $params->minTuulennopeus");	
		
		if ($params->maxTuulennopeus != null && $params->maxTuulennopeus != "undefined")
			array_push($whereQuery, "tuulennopeus1 <= $params->maxTuulennopeus
			OR tuulennopeus2 <= $params->maxTuulennopeus");
		
		if ($params->minSademaara != null && $params->minSademaara != "undefined")
			array_push($whereQuery, "sademaara1 <= $params->minSademaara
			OR sademaara2 <= $params->minSademaara");
		
		if ($params->maxSademaara != null && $params->maxSademaara != "undefined")
			array_push($whereQuery, "sademaara1 <= $params->maxSademaara
			OR sademaara2 <= $params->maxSademaara");
		
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
		if ($params->jarjestys != null && $params->jarjestaja != null)
		{
			// Jos järjestys on annettu, asetetaan se (ASC tai DESC).
			$query .= " ORDER by $params->jarjestaja $params->jarjestys";
		}
	}
	
	return $query;
}
