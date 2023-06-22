let table;
$("body").ready(function () {


});

let typeofOptions = '';
$.get("./components/typeofOptions.html", function (html_string) {
    typeofOptions = html_string;
}, 'html');


    // url
    function showDataTable(results) {
        //results is usable here
        console.log(results);
        appendDataTable(results);

    }

    function parseData(url, callBack) {
        Papa.parse(url, {
            header: true,
            transformHeader: true,
            download: true,
            dynamicTyping: true,
            comments: false,
            worker: true,
            skipEmptyLines: true,
            complete: function (results) {
                if (results.data.length === 0) {
                    console.warn('El archivo csv no contiene información. Favor de seleccionar otro archivo.');
                } else {
                    callBack(results);
                }
            },
            error: function (err, file, inputElem, reason) {
                console.warn(err);
            }
        });
    }


    function resetTable() {

        $("#dataTable > thead > tr").html('');
        $("#dataTable > tfoot > tr").html('');
        $("#dataTableContent").html('');

    }


    function appendDataTable(results) {

        resetTable();

        let titulos = results.meta.fields;
        console.log(titulos);

        for (tittle of titulos) {
            $("#dataTable > thead > tr").append('<td>' + tittle + '</td>');
            $("#dataTable > tfoot > tr").append('<td>' + tittle + '</td>');
        }

        let row;
        for (row of results.data) {

            $("#dataTableContent").append('<tr id="data-' + titulos[0] + '-' + row[titulos[0]] + '"></tr>');

            for (let key in row) {
                if (row.hasOwnProperty(key)) {
                    $("#dataTableContent > tr:last-of-type").append('<td>' + row[key].toLocaleString(LOCALE_LANG) + '</td>');
                }
            }
        }

        localStorage.setItem("typeOf", JSON.stringify(getTypeOfData(results.data)));

        // eventos
        $("#dataTableContent > tr").on("click", function () {
            console.log("click: " + this.id);
        });

        table = $('#dataTable').DataTable({
            select: {
                style: 'single'
            },
            language: languageDataTable,
            columnDefs: [
                {
                    targets: -1,
                    className: 'dt-body-right'
                }
            ]
        });

    }

function getTypeOfData(data) {
                     // 100
    let espacioMuestras = parseInt(data.length * 0.4);   // 40
    let random = 0;
    let resultsByColumnsMuestras = [];
    const isBooleanValue = (currentValue) => currentValue == "boolean";
    const isStringValue = (currentValue) => currentValue == "string";
    const isNumberValue = (currentValue) => currentValue == "number";

    for (let i = 0; i < espacioMuestras; i++) {
        random = Math.floor(Math.random() * data.length);

        let row = data[random];
        for (let key in row) {

            if (!resultsByColumnsMuestras[key]) {
                resultsByColumnsMuestras[key] = [];
            }

            if (row.hasOwnProperty(key)) {

                if (typeof (row[key]) == "boolean") { resultsByColumnsMuestras[key].push('boolean'); }
                else if (typeof (row[key]) == "string") { resultsByColumnsMuestras[key].push('string'); }
                else { resultsByColumnsMuestras[key].push('number'); }
            }
        }

    }

    let resultsFinal = [];
    i = 0;  
    for (indice in resultsByColumnsMuestras) {

        let dataIndexResults = new Object();
        dataIndexResults['index'] = indice.replaceAll(' ', '_');

        if (resultsByColumnsMuestras[indice].every(isBooleanValue)) {dataIndexResults['typeof'] = 'boolean';} 
        else if (resultsByColumnsMuestras[indice].every(isStringValue)) {dataIndexResults['typeof'] = 'string';} 
        else if (resultsByColumnsMuestras[indice].every(isNumberValue)) {dataIndexResults['typeof'] = 'number';} 
        else {dataIndexResults['typeof'] = 'undefined';}

        resultsFinal[i] = dataIndexResults;
        i++;
        
    }

    //console.log(resultsFinal);
    return resultsFinal;
        
}


$("#saveFileCSV").on('click', function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("titulo", $("#nameFile").val());
        formData.append("email", $("#email").val());
        formData.append("user", $("#user").val());
        formData.append("description", $("#descriptionFile").val());
        formData.append("typeOf", localStorage.getItem("typeOf"));
        formData.append("file", FILE_UP);

        console.log(localStorage.getItem("typeOf"));
        console.log(JSON.parse(localStorage.getItem("typeOf")));

        $.ajax({
            type: 'POST',
            url: './app/upload.php',
            data: formData,
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function () {
                $('#saveFileCSV').attr("disabled", "disabled");
                $('#fupForm').css("opacity", ".5");
            },
            success: function (response) {
                $('.statusMsg').html('');

                $.get("./components/modal.html", function (html_string) {
                    $("#modalAviso").html(html_string);

                    if (response.status == 1) {
                        $('#fupForm')[0].reset();
                        console.log({ response });
                        $('#modalAlertsBody > p').html('Archivo guardado con <b>exito</b>');
                        $('#modalAlertsBody > p').addClass('alert-success');
                    } else {
                        console.warn(response);
                        console.warn(response.message);
                        $('#modalAlertsBody > p').html('Ocurrio un <b>error</b> al guardar el archivo');
                        $('#modalAlertsBody > p').addClass('alert-warning');
                    }
                    $('#fupForm').css("opacity", "");
                    $("#saveFileCSV").removeAttr("disabled");
                    $("#file-info-upload").addClass("hidden");

                    $('#modalAlerts').modal('show');
                    
                }, 'html');

                
            }
        });
    });


function setLocalSideBarStyle() {
    $("#Archivo").addClass('active');
    $("#Archivo > a").removeClass('collapsed');
    $("#collapseArchivo").addClass('show');
    $("#collapseArchivo a:nth-child(1)").addClass('active');
}




