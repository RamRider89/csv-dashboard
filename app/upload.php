<?php 
date_default_timezone_set('America/Chihuahua');
setlocale(LC_ALL, "es_MX.utf8");
header('Content-Type: application/json; charset=utf-8');

// File upload folder 
$uploadDir = 'uploads/'; 
 
// Allowed file types 
$allowTypes = array('xls', 'txt', 'csv'); 
 
// Default response 
$response = array( 
    'status' => 0, 
    'message' => 'Form submission failed, please try again.' 
); 



// If form is submitted 
if (isset($_POST['titulo']) || isset($_POST['email']) || isset($_POST['user']) || isset($_POST['typeOf']) || isset($_POST['file'])){ 

        // Get the submitted form data 
        $titulo = $_POST['titulo']; 
        $email = $_POST['email']; 
        $user = $_POST['user']; 
        $typeOf = json_decode(stripslashes($_POST['typeOf']));
        $description = $_POST['description'];
        
        // Check whether submitted data is not empty 
        if (!empty($titulo) && !empty($email)){ 
            // Validate email 
            if (filter_var($email, FILTER_VALIDATE_EMAIL) === false){ 
                $response['message'] = 'Ingrese un email valido.'; 
            }else { 
                $uploadStatus = 1; 
                
                // Upload file 
                $uploadedFile = ''; 
                if (!empty($_FILES["file"]["name"])){ 
                    // File path config 
                    //$fileName = basename($_FILES["file"]["name"]); 
                    $ext = substr(strrchr($_FILES["file"]["name"], '.'), 1);
                    $fileName = "File_" . time() . "." . $ext;

                    // create dir struc
                    $uploadDir = createDir();

                    $targetFilePath = $uploadDir . $fileName; 
                    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION); 
                    
                    // Allow certain file formats to upload 
                    if (in_array($fileType, $allowTypes)){ 
                        // Upload file to the server 
                        if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)){ 
                            $uploadedFile = $fileName; 

                        }else { 
                            $uploadStatus = 0; 
                            $response['message'] = 'Ocurrio un error al guardar el archivo. '; 
                        } 
                    }else { 
                        $uploadStatus = 0; 
                        $response['message'] = 'Solamente archivos de tipo: '.implode('/', $allowTypes).' son aceptados. ' . $targetFilePath; 
                    } 
                } 
                
                if ($uploadStatus == 1){ 
                    // Include the database config file 

                        $url = './app/' . $uploadDir;

                        $arrData = [
                                "title" => $titulo,
                                "user" => $user,
                                "email" => $email,
                                "description" => $description,
                                "name" => $fileName,
                                "location" => $url,
                                "date" => date("Y-m-d"),
                                "time" => date("h:i:sa"),
                                "typeOf" => $typeOf
                        ];

                        $json = saveJSON($arrData);

                        $response['status'] = 1; 
                        $response['message'] = 'Archivo guardado!'; 
                        $response['file'] = $targetFilePath; 
                        $response['json_guardado'] = $json;

                } 
            } 
        }else { 
            $response['message'] = 'Rellene todos los campos.'; 
        } 
        // Return response 
    echo json_encode($response);

}

function createDir(){
    // Desired directory structure
    $structure = './uploads/' . date("Y") . '/' . date("m") . '/';

    if (!is_dir($structure)) {
        return (mkdir($structure, 0777, true)) ? $structure : './uploads/';
    }else {
        return $structure;
    }

}


function saveJSON(array $arrData){

    $path = 'data/files_'. date("Y") . '_' . date("m") . '.json';
    $jsonString = '';
    $jsonData = [];

    if (file_exists($path)) {
        $jsonString = file_get_contents($path);
    } else {}

    if (!empty($jsonString)) {
        $jsonData = json_decode($jsonString, true);
    }

    $auxTypeOf = [];
    foreach($arrData["typeOf"] as $row){
        array_push($auxTypeOf, $row);
    }

    // JSON data as an array
    $newJsonData = [
            "title" => $arrData["title"],
            "user" => $arrData["user"],
            "email" => $arrData["email"],
            "description" => $arrData["description"],
            "name" => $arrData["name"],
            "location" => $arrData["location"],
            "date" => date("Y-m-d"),
            "time" => date("h:i:sa"),
            "typeOf" => $auxTypeOf
    ];

    array_push($jsonData, $newJsonData);
    // Convert JSON data from an array to a string
    $jsonString = json_encode($jsonData, JSON_PRETTY_PRINT);
    // Write in the file
    $fp = fopen($path, 'w');
    if (fwrite($fp, $jsonString)) {
        fclose($fp);
        return true;
    }else {
        return false;
    }

}
 

 
