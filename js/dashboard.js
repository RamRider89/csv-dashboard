localStorage.removeItem("latestFile");
$("body").ready(async function () {
    let graph;
    loadLatestFiles();
    
    function loadLatestFiles() {
        let dataJsons = localStorage.getItem("latestFile");
        dataJsons = dataJsons ? JSON.parse(dataJsons) : [];

        let diffMinutes;
        if (dataJsons) {
            diffMinutes = moment(dataJsons.date).diff(moment(), 'minutes')
        }
        //if (diffMinutes < 15) { return; }
        localStorage.removeItem("latestFile");

        $.ajax({
            type: 'GET',
            url: './app/scandirLatest.php',
            dataType: 'json',
            async: false,
            beforeSend: function () {
                // ...
            },
            success: async function (response) {

                $.get("./app/data/" + response, async function (json_data) { 
                    let data = json_data[json_data.length - 1];
                    console.info("Loading latest file => " + response);
                    console.info(data);

                    let urlCSV = data['location'] + data['name'];
                    let tableTittle = data['title'];

                    $.ajax({
                        type: 'GET',
                        url: urlCSV,
                        dataType: 'text',
                        async: false,
                        beforeSend: function () {
                            console.info("Loading: " + data['name'] + " =>");
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
                                            file: data['name'],
                                            tittle: data['title'],
                                            labels: titulos,
                                            data: results.data,
                                            typeOf: setValueTypesOptions(data['name'])
                                        }

                                        localStorage.setItem("latestFile", JSON.stringify(dataSelected));
                                        loadNewGraphParams(dataSelected);
                                        loadLatestDataCards(dataSelected);
                                    }
                                },
                                error: function (err, file, inputElem, reason) { console.warn(err); }
                            });

                            await createDataTableCSV();
                            
                            $("#tittleLatestTable").html('<i class="fa fa-table"></i> ' + tableTittle);

                        },
                        error: function (request, status, error) {
                            console.warn(status);
                            console.warn(error);
                        }
                    }).done(async function () { });
                    
                }, 'json');
                //storeInLocalStorage(contents);
                


            },
            error: function (request, status, error) {
                console.warn(request.responseText);
            }
        }).done(async function () { });

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

    async function storeInLocalStorage(args) {
        let dataJsons = localStorage.getItem("latestFile");
        dataJsons = dataJsons ? JSON.parse(dataJsons) : [];
        args.forEach(index => {
            dataJsons.push(index);
        });
        localStorage.setItem("latestFile", JSON.stringify(dataJsons));
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
            } else {
                ejeX.push(column);
            }

        }));

        return typeOfData;

    }

    function genDataGraph(params) {
        let dataJsons = localStorage.getItem("latestFile");
        dataJsons = dataJsons ? JSON.parse(dataJsons) : [];
        
    }

    async function loadNewGraphParams(dataSelected) {
        let dataGraph = {};

            if (dataSelected.file) {

                console.log("Generating graph...");

                let columnX = dataSelected.typeOf.find(element => element.typeof == "string").index;
                let columnY = dataSelected.typeOf.find(element => element.typeof == "number").index;
                let coloR = [];

                /* bar - line - bubble - doughnut - pie - polarArea - radar - scatter */
                let typeGraph = "polarArea";

                let dynamicColors = function () {
                    // let r = Math.floor(Math.random() * 255);
                    // let g = Math.floor(Math.random() * 255);
                    // let b = Math.floor(Math.random() * 255);
                    // return "rgb(" + r + "," + g + "," + b + ", 0.7)";
                    return COLOR_CHARTS_PALETTE[Math.floor(Math.random() * COLOR_CHARTS_PALETTE.length)].color;
                };

                let dataColumnX = [];
                let dataColumnY = [];

                dataSelected.data.forEach(row => {
                    dataColumnX.push(row[columnX]);
                    dataColumnY.push(row[columnY]);
                    coloR.push(dynamicColors());
                });

                

                dataGraph = {
                    fileCSV: dataSelected.file,
                    tittle: dataSelected.tittle,
                    type: typeGraph,
                    columnX: columnX,
                    columnY: columnY,
                    labels: dataColumnX,
                    dataset: dataColumnY,
                    backgroundColor: coloR
                }

                localStorage.setItem("latestGraph", JSON.stringify(dataGraph));
                $("#tittleLatestChartTable").html('<i class="fa fa-chart-simple"></i> ' + dataSelected.tittle);
                await chartTest(dataGraph, "myLatestChart");

            } else {
                return;
            }

    }

    async function chartTest(data, div) {

        if (data.length < 0) {
            return;
        }

        if (graph) {
            graph.destroy();
        }

        new Chart(document.getElementById(div), {
            "type": data.type,
            "data": {
                "labels": data.labels,
                "datasets": [{
                    label: data.title,
                    fill: true,
                    lineTension: 0.05,
                    backgroundColor: data.backgroundColor,
                    borderColor: '#4e73df',
                    data: data.dataset
                }]
            },
            options: {
                elements: { point: { radius: 1 } },
                legend: {
                    display: true,
                    labels: {
                        fontColor: '#000000',
                        fontSize: 14
                    }
                },
                title: {
                    display: true,
                    text: 'titulo',
                    fontSize: 16,
                    maintainAspectRatio: '',
                    fontColor: '#000000'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });

    }

    function loadLatestDataCards(dataSelected) {
        // ..
        let dataCards = new Array("card_1","card_2");
        let leng = dataSelected.data.length -1;

        if (dataSelected.file) {

            console.log("Generating data cards...");

            let dataNumberOne = dataSelected.typeOf.find(element => element.typeof == "number").index;
            let dataNumberTwo = dataSelected.typeOf.findLast(element => element.typeof == "number").index;

            if (dataNumberOne) {
                $("#card_data_one > div.row > div.col > div.title_card_data").html(dataNumberOne);
                $("#card_data_one > div.row > div.col > div.value_card_data > number").html(dataSelected.data[leng][dataNumberOne].toLocaleString(LOCALE_LANG));
            }
                
            if (dataNumberTwo) {
                $("#card_data_two > div.row > div.col > div.title_card_data").html(dataNumberTwo);
                $("#card_data_two > div.row > div.col > div.value_card_data > number").html(dataSelected.data[leng][dataNumberTwo].toLocaleString(LOCALE_LANG));
            }
                

        }else {}
        
    }

    await loadLatestCharts();

    async function loadLatestCharts() {
        let dataJsons = localStorage.getItem("latestCharts");
        dataJsons = dataJsons ? JSON.parse(dataJsons) : [];

        let diffMinutes;
        if (dataJsons) {
            diffMinutes = moment(dataJsons.date).diff(moment(), 'minutes')
        }
        //if (diffMinutes < 15) { return; }
        localStorage.removeItem("latestCharts");

        await $.ajax({
            type: 'GET',
            url: './app/scandirLatestCharts.php',
            dataType: 'json',
            async: false,
            beforeSend: async function () {
                console.info("Loading latest charts =>");
            },
            success: async function (response) {
                console.info(response);

                let contents = await $.get("./app/data/charts/" + response[0], async function () { }, 'json');
                await chartTest(contents, "latestChartOne");
                console.log(contents);
                $("#latestChartDivOne > div > h6.tittle").html(contents.title);
                contents = await $.get("./app/data/charts/" + response[1], async function () { }, 'json');
                await chartTest(contents, "latestChartTwo");
                $("#latestChartDivTwo > div > h6.tittle").html(contents.title);

                // obteniendo el contenido de cada json
                // await Promise.all(response.map(async (file) => {
                //     const contents = await $.get("./app/data/charts/" + file, async function () { }, 'json');
                //     console.info(file + " => ");
                //     console.info(contents);
                    
                // }));
            }
        });
    }

});

function setLocalSideBarStyle() {
    $("#Dashboard").addClass('active');
}