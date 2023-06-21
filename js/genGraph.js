let graph;

function validateNewGEnGraph() {

    if (($("#selectEjeX").val() != '0') && ($("#selectEjeY").val() != '0') && ($("#typeGraph").val() != '0') && ($("#tittleGraph").val() != '')) {
        return true;
    }else {return false;}
  
}

function loadNewGraphParams(fileCSV) {
    let dataGraph = {};

    $('#btnGenGraph').on('click', function (ev) {

        if (!validateNewGEnGraph()) {
            console.warn("Complete todos los campos.");
            return;
        }
        let dataSelected = JSON.parse(localStorage.getItem("dataTableModal"));

        if (dataSelected.file == fileCSV) {

            console.log("Generating graph...");

            let columnX = $("#selectEjeX").val();
            let columnY = $("#selectEjeY").val();
            let typeGraph = $("#typeGraph").val();

            let dataColumnX = [];
            let dataColumnY = [];

            dataSelected.data.forEach(row => {
                dataColumnX.push(row[columnX]);
                dataColumnY.push(row[columnY]);
            });

            dataGraph = {
                fileCSV: fileCSV,
                tittle: $("#tittleGraph").val(),
                type: typeGraph,
                columnX: columnX,
                columnY: columnY,
                labels: dataColumnX,
                dataset: dataColumnY
            }

            localStorage.setItem("graphGenModal", JSON.stringify(dataGraph));
            chartTest(dataGraph);

            $("#genGraphDiv").removeClass("hidden");
            $("#btnSaveGenGraph").prop('disabled', false);
            
        }else {
            return;
        }
    }); 


    // save generated graph
    $('#btnSaveGenGraph').on('click', function (ev) {
        ev.preventDefault();
        if (!dataGraph) {return;}

        const formData = new FormData();
        formData.append("data", dataGraph);

        $.ajax({
            type: 'POST',
            url: './app/saveChartGen.php',
            data: { data: JSON.stringify(dataGraph) }, 
            cache: false,
            beforeSend: function () {
                console.info("Saving graph...");
                $("#btnGenGraph").prop('disabled', true);
                $("#btnSaveGenGraph").prop('disabled', true);
                $('#genGraphDiv').css("opacity", ".5");
            },
            success: async function (response) {

                // modal
                await $.ajax({
                    type: 'GET',
                    url: "./components/modal.html",
                    dataType: 'html',
                    async: false,
                    success: async function (html_string) {

                        $("#modalAviso").html(html_string);

                        if (response.status == 1) {
                            console.log(response);
                            $('#modalAlertsBody > p').html('Grafica guardada con <b>exito</b>');
                            $('#modalAlertsBody > p').addClass('alert-success');
                        } else {
                            console.warn(response);
                            console.warn(response.message);
                            $('#modalAlertsBody > p').html('Ocurrio un <b>error</b> al guardar la grafica');
                            $('#modalAlertsBody > p').addClass('alert-warning');
                        }

                        $('#modalAlerts').modal('show');

                    },
                    error: function (request, status, error) { }
                }).done(async function () {});

                    $('#genGraphDiv').css("opacity", "");
                    $("#btnGenGraph").prop('disabled', false);
                    $("#btnSaveGenGraph").prop('disabled', false);
            },
            error: function (err) {
                console.warn(err.responseText);
            }
        });    
    });

}


function chartTest(data) {

    if (graph) {
        graph.destroy();     
    }
    
    graph = new Chart(document.getElementById("myChart"), {
        "type": data.type,
        "data": {
            "labels": data.labels,
            "datasets": [{
                label: data.tittle,
                fill: true,
                lineTension: 0.05,
                backgroundColor: '#36b9cc',
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
            responsive: true
        }
    });

}

