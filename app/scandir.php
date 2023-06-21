<?php
$dirJSON    = './data';

echo json_encode(scanDirJSON($dirJSON), JSON_PRETTY_PRINT);


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

?>