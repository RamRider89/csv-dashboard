<?php

$newJsonData ='[
    {
        "field1":"data1-1",
        "field2":"data1-2"
    },
    {
        "field1":"data2-1",
        "field2":"data2-2"
    }
]';


if($encoded=json_decode($newJsonData,true))
{
    echo 'encoded';

    // loop through the json values
    foreach($encoded as $key=>$value)
    {
        echo'<br>object index: '.$key.'<br>';
        foreach($value as $bKey=>$bValue)
        {
            echo '<br>&nbsp;&nbsp;'.$bValue.' = '.$bValue;
        }

    }
    // get a perticular item
    echo '<br>object[0][field1]: '.$encoded[0]['field1'];

}
else
{
    echo'error on syntax';


}
?>