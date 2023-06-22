<?php
$dirJSON    = './data';

echo json_encode(scanDirLatestJSON($dirJSON), JSON_PRETTY_PRINT);


// obtiene la lista de registros json
function scanDirLatestJSON($dir) {
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

    return $response[0];
}

?>