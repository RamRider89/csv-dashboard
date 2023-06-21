<?php
setlocale(LC_ALL, "es_MX.utf8");
header('Content-Type: application/json; charset=utf-8');

$filecsv = $_POST["datafile"];

$response = csvToJson($filecsv);

// php function to convert csv to json format
function csvToJson($fname) {

    // open csv file
    if (!($fp = fopen($fname, 'r'))) {
        die("Can't open file...");
    }
    
    //read csv headers
    $key = fgetcsv($fp, 1000, ",");
    
    // parse csv rows into array
    $json = array();
    $json = array_map('utf8_encode', $json);
    while ($row = fgetcsv($fp, 1000, ",")) {
        $json[] = array_combine($key, $row);
    }

    
    // release file handle
    fclose($fp);
    
    // encode array to json
    return json_encode($json);
}



echo $response;

?>