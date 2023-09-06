let table;

$("body").ready(async function () {

    let dataFile = localStorage.getItem("tableSelected");
    dataFile = dataFile ? JSON.parse(dataFile) : [];

    if (dataFile.length < 1) {
        $("#dataTableCSV > thead > tr").append('<td>Seleccione un archivo en la barra de busqueda</td>');
        return;
    }
    loadData(dataFile);

    function loadData(params) {

        $.ajax({
            type: 'GET',
            url: dataFile.location + dataFile.name,
            dataType: 'text',
            async: false,
            beforeSend: function () {
                console.info("Loading: " + dataFile.name + " =>");
            },
            success: async function (csv_file) {

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

                                        $("#dataTableCSV > tbody > tr:last-of-type").append('<td>' + row[key].toLocaleString(LOCALE_LANG) + '</td>');
                                    }
                                }
                            }

                            let dataSelected = {
                                file: dataFile.name,
                                tittles: titulos,
                                data: results.data,
                                typeOf: dataFile.typeOf
                            }

                            localStorage.setItem("dataTableModal", JSON.stringify(dataSelected));

                        }
                    },
                    error: function (err, file, inputElem, reason) { console.warn(err); }
                });

                await createDataTableCSV();
                $("#tittleTable").html(" " + dataFile.title);
                setValueTypesOptions(dataFile.typeOf);
                loadNewGraphParams(dataFile.name);
                $("#genNewGraph").fadeIn();

            },
            error: function (request, status, error) {
                console.warn(status);
                console.warn(error);
            }
        }).done(async function () { });
        
    }





    function storeInLocalStorage(args) {
        let dataJsons = localStorage.getItem("fileList");
        dataJsons = dataJsons ? JSON.parse(dataJsons) : [];
            args.forEach(index => {
                dataJsons.push(index);
            });
        localStorage.setItem("fileList", JSON.stringify(dataJsons));
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

    function setValueTypesOptions(typeOfData) {

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
            } else {
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

    }

});

function setLocalSideBarStyle() {
    $("#Tables").addClass('active');
}
