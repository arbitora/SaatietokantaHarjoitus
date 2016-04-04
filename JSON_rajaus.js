// Haun teko JSON parametrit ja rakenne.
var haku = 
{
		// Rajaa hakua päivämäärillä (aloitus ja lopetus).
		alkpvm: $scope.alkpvm, 
		loppvm: $scope.loppvm, 
		
		// Lämpötilarajaus minimi ja maksimilämpötiloilla.
		/*
		lampotilaEhto vaihtoehdot:
		0 = Vain Sisälämpötilan rajaus.
		1 = Vain Ulkolämpötilan rajaus.
		2 = Rajataan kummatkin lämpötilat.
		*/
		minLampotila: $scope.minLampotila,
		maxLampotila: $scope.maxLampotila,
		lampotilaEhto: $scope.lampotilaEhto,

		// Tuulennopeuden rajaus minimi ja maksimi arvoilla.
		minTuulennopeus: $scope.minTuulennopeus,
		maxTuulennopeus: $scope.maxTuulennopeus,

		// Sademäärän rajaus minimi ja maksimi arvoilla.
		minSademaara: $scope.minSademaara,
		maxSademaara: $scope.maxSademaara,
		
		// Nämä arvot säätävät missä järjestyksessä data esitetään.
		/*
		HUOM! KÄYTETÄÄN VAIN PERUSTIETOJEN HAUSSA.
		NÄITÄ ARVOJA EI KÄYTETÄ MAX MIN AVG -TIETOJEN HAUSSA.
			jarjestaja kertoo minkä mukaan järjestetään.
			arvot voivat olla seuraavat:
			id, pvm, kellonaika, tuulennopeus1, tuulennopeus2, 
		
			jarjestys vaikuttaa haetaanko data
			Nousevassa vai Laskevassa järjestyksessä näkyville.
			Arvot voivat olla ASC tai DESC.
		*/
		jarjestaja: $scope.jarjestaja
		jarjestys: $scope.jarjestys
}