<?php 
date_default_timezone_set('America/Chihuahua');
setlocale(LC_ALL, "es_MX.utf8");
header('Content-Type: application/json; charset=utf-8');

// File upload folder 
$uploadDir = './data/charts/'; 
 
// Default response 
$response = array( 
    'status' => 0, 
    'message' => 'Form submission failed, please try again.' 
); 


// If form is submitted 
if (isset($_POST['data'])) { 

        $jsonChartData = json_decode($_POST['data'], true);

        $fileCSV = $jsonChartData["fileCSV"];
        $tittle = $jsonChartData["tittle"];
        $type = $jsonChartData["type"];
        $columnX = $jsonChartData["columnX"];
        $columnY = $jsonChartData["columnY"];
        $labels = $jsonChartData["labels"];
        $dataset = $jsonChartData["dataset"];
        $backgroundColor = $jsonChartData["backgroundColor"];

        // Get the submitted form data         
        // Check whether submitted data is not empty 
        if (!empty($jsonChartData)) { 
            
                $saveStatus = 1; 
                
                // Upload file 
                $uploadedFile = ''; 
                if (!empty($fileCSV)) { 
                    //$fileName = basename($fileCSV); 
                    $updatedGaph = false;
                    $fileName = "Chart_" . time() . ".json";
                    $targetFilePath = $uploadDir . $fileName;

                    $jsonString = '';
                    $jsonChartData = [];

                    if (file_exists($targetFilePath)) {
                        $updatedGaph = true;
                    } else {}

                    $newJsonChartData = [
                            "fileCSV" => $fileCSV,
                            "title" => $tittle,
                            "type" => $type,
                            "columnX" => $columnX,
                            "columnY" => $columnY,
                            "labels" => $labels,
                            "dataset" => $dataset,
                            "backgroundColor" => $backgroundColor,
                            "date" => date("Y-m-d"),
                            "time" => date("h:i:sa")
                    ];

                        // array_push($jsonChartData, $newJsonChartData);
                        // Convert JSON data from an array to a string
                        $jsonString = json_encode($newJsonChartData, JSON_PRETTY_PRINT);
                        // Write in the file
                        $fp = fopen($targetFilePath, 'w');
                        if (fwrite($fp, $jsonString)) {
                            fclose($fp);
                            $saveStatus = 1; 
                        }else {
                            $saveStatus = 0; 
                            $response['message'] = 'Ocurrio un error al guardar la grafica. '; 
                        }

                } 
                
                if ($saveStatus == 1){ 

                        $response['status'] = 1; 
                        $response['message'] = 'Grafica guardada!'; 
                        $response['file'] = $targetFilePath; 
                        $response['json_guardado'] = $jsonString;
                } 
        }
        // Return response 
    echo json_encode($response);

}

