<?php
$dirJSON    = './data';
$dirCSV    = './data';

// obteniendo lista de registros json
//$jsonFiles = json_encode(scanDirJSON($dirJSON));
$jsonFiles = scanDirJSON($dirJSON);


$csvFiles = scanDirCSV($jsonFiles);

echo $csvFiles;


// obtiene la lista de registros json
function scanDirJSON($dir) {
    $only = array('.json');

    $response = array();    
    foreach (scandir($dir) as $file) {

        $ext = substr(strrchr($file, '.'), 1);

        if($ext == 'json'){
            $response[$file] = filemtime($dir . '/' . $file);
        }
        
    }

    arsort($response);
    $response = array_keys($response);

    return $response;
}

// obtiene el contenido de los archivos CSV
function scanDirCSV($jsonFiles){

    $path = 'data/';
    $jsonString = '';
    $jsonData = [];

    foreach ($jsonFiles as $file => $value) {

        $path = 'data/' . $value;

        if (file_exists($path)) {
            $jsonString = file_get_contents($path);
        } else {}

        if (!empty($jsonString)) {
            $newJsonData = json_decode($jsonString, true);
        }

        array_push($jsonData, $newJsonData);
    }

    return json_encode($jsonData, JSON_PRETTY_PRINT);

}
?>