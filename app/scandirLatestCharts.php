<?php
$dirJSON    = './data/charts';

echo json_encode(scanDirLatestChartsJSON($dirJSON), JSON_PRETTY_PRINT);


// obtiene la lista de registros json
function scanDirLatestChartsJSON($dir) {
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

    if (count($response) > 1) {
        array_splice($response, 2);
    }

    return $response;
}

?>