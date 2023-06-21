let table;
localStorage.removeItem("fileList");
$("body").ready(function () {

    $.ajax({
        type: 'GET',
        url: './app/scandir.php',
        dataType: 'json',
        async: false,
        beforeSend: function () {
            console.info("Loading files...");
        },
        success: async function (response) {
            // lista de archivos json
            console.info(response);

            // obteniendo el contenido de cada json
            await Promise.all(response.map(async (file) => {
                const contents = await $.get("./app/data/" + file, async function () { }, 'json');
                console.info(file + " => ");
                console.info(contents);
                appendDataTable(contents);
                storeInLocalStorage(contents);
            }));

            
            createDataTable();

        },
        error: function (request, status, error) {
            console.warn(request.responseText);
            console.warn(error);
        }
    }).done(async function () {});


    function storeInLocalStorage(args) {
        let dataJsons = localStorage.getItem("fileList");
        dataJsons = dataJsons ? JSON.parse(dataJsons) : [];
            args.forEach(index => {
                dataJsons.push(index);
            });
        localStorage.setItem("fileList", JSON.stringify(dataJsons));
    }


    function appendDataTable(results) {
        let file;
        for (file of results) {
            //console.log(file);

            $("#dataTable tbody").append('<tr id="' + file['name'] + '"></tr>');

            // Obteniendo todas las claves del JSON
            for (let key in file) {
                if (key == "typeOf") {
                    continue;
                }

                // Controlando que json realmente tenga esa propiedad
                if (file.hasOwnProperty(key)) {
                    // Mostrando en pantalla la clave junto a su valor
                    //console.log("La clave es " + clave + " y el valor es " + file[key]);
                    $("#dataTable tbody > tr:last-of-type").append('<td>' + file[key] + '</td>');
                }
            }


        }

        $('#dataTable tbody tr').on("dblclick", function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
        });

        $('#dataTable tbody tr').on('click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                let data = table.row(this).data();
                console.log("DataTable row =>"); 
                console.log({data}); 
                
                let urlCSV = data[5] + data[4];
                let modalTittle = data[0];


                $.ajax({
                    type: 'GET',
                    url: urlCSV,
                    dataType: 'text',
                    async: false,
                    beforeSend: function () {
                        console.info("Loading: " + data[4] + " =>");
                    },
                    success: async function (csv_file) {
  
                    // modal
                    await $.ajax({
                            type: 'GET',
                            url: "./components/modalTable.html",
                            dataType: 'html',
                            async: false,
                            success: async function (html_string) {

                            $("#modalData").html(html_string);

                            await Papa.parse(csv_file, {
                                    header: true,
                                    transformHeader: true,
                                    dynamicTyping: true,
                                    comments: false,
                                    dynamicTyping: true,
                                    skipEmptyLines: true,
                                    complete: async function (results) {

                                        if (results.data.length === 0) { console.warn('El archivo csv no contiene información.'); }
                                        else {
                                            let titulos = results.meta.fields;
                                            console.log("tittles =>");
                                            console.log(titulos);
                                            console.log("data =>");
                                            console.log(results);

                                            for (tittle of titulos) {
                                                $("#dataTableCSV > thead > tr").append('<td>' + tittle + '</td>');
                                            }

                                            let row;
                                            for (row of results.data) {
                                                $("#dataTableCSV > tbody").append('<tr id="data-' + titulos[0] + '-' + row[titulos[0]] + '"></tr>');
                                                for (let key in row) {
                                                    if (row.hasOwnProperty(key)) {

                                                        $("#dataTableCSV > tbody > tr:last-of-type").append('<td>' + row[key] + '</td>');
                                                    }
                                                }
                                            }

                                            let dataSelected = {
                                                file: data[4],
                                                tittles: titulos,
                                                data: results.data,
                                                typeOf: setValueTypesOptions(data[4])
                                            }

                                            localStorage.setItem("dataTableModal", JSON.stringify(dataSelected));
                                        }
                                    },
                                    error: function (err, file, inputElem, reason) { console.warn(err); }
                                });

                                await createDataTableCSV();
                                $("#modalTableLabel").html('<i class="fa fa-table"></i> ' + modalTittle);
                                loadNewGraphParams(data[4]);
                                $('#modalTable').modal('show');
                                
                            },
                            error: function (request, status, error) {}
                        }).done(async function () {  });
                            
                    },
                    error: function (request, status, error) {
                        console.warn(status);
                        console.warn(error);
                    }
                }).done(async function () {});
                        
        });



    }

    function createDataTable() {

        table = $('#dataTable').DataTable({
            responsive: true,
            colReorder: true,
            rowReorder: true,
            select: false,
            dom: 'Qlfrtip',
            columnDefs: [
                {
                    target: 4,
                    visible: false,
                    searchable: false,
                },
                {
                    target: 5,
                    visible: false,
                },
            ]
        });      
    }

    async function createDataTableCSV() {

        $('#dataTableCSV').DataTable({
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

    function setValueTypesOptions(fileCSV) {

        let dataJsons = JSON.parse(localStorage.getItem("fileList"));
        let typeOfData = {};
        Promise.all(dataJsons.map((file) => {
            if (file.name == fileCSV) {
                typeOfData = file.typeOf;
                return;
            }
        }));
        
        let ejeX = [];
        let ejeY = [];

        Promise.all(typeOfData.map((column) => {
            if (column.typeof == 'boolean') {
                ejeY.push(column);
            } else if (column.typeof == 'number') {
                ejeY.push(column);
            } else if (column.typeof == 'string') {
                ejeX.push(column);
            } else if (column.typeof == 'undefined') {
                ejeX.push(column);
            } else{
                ejeX.push(column);
            }

        }));
        console.log("TypeOfData - X =>");
        console.log(ejeX);
        console.log("TypeOfData - Y =>");
        console.log(ejeY);

        ejeX.forEach(element => {
            $('#selectEjeX').append(new Option(element.index.replaceAll('_', ' '), element.index))
        });

        ejeY.forEach(element => {
            $('#selectEjeY').append(new Option(element.index.replaceAll('_', ' '), element.index))
        });

        return typeOfData;
    
    }

});

function setLocalSideBarStyle() {
    $("#Archivo").addClass('active');
    $("#Archivo > a").removeClass('collapsed');
    $("#collapseArchivo").addClass('show');
    $("#collapseArchivo a:nth-child(2)").addClass('active');
}
