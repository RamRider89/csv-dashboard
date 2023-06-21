$("body").ready(function () {
    console.log("CSV to json");

    // let jqxhr = $.ajax("./app/csvtojson.php")
    //     .done(function (data) {
    //         console.log("success");
    //         //console.log(data);
    //         appendDataTable(data);
    //     })
    //     .fail(function (jqXHR, textStatus) {
    //         console.log("Request failed: " + textStatus);
    //     })
    //     .always(function () {
    //         console.log("complete");
    //     });


});


$(document).ready(function (e) {
    // Submit form data via Ajax
    $("#fupForm").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: './app/upload.php',
            data: new FormData(this),
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function () {
                $('.submitBtn').attr("disabled", "disabled");
                $('#fupForm').css("opacity", ".5");
            },
            success: function (response) {
                $('.statusMsg').html('');
                if (response.status == 1) {
                    $('#fupForm')[0].reset();
                    $('.statusMsg').html('<p class="alert alert-success">' + response.message + '</p>');
                    console.log(response.file);

                    let jqxhr = $.ajax("./app/csvtojson.php", { datafile: response.file})
                        .done(function (data) {
                            console.log("success");
                            console.log(data);
                            appendDataTable(data);
                        })
                        .fail(function (jqXHR, textStatus) {
                            console.log("Request failed: " + textStatus);
                        })
                        .always(function () {
                            console.log("complete");
                        });

                } else {
                    $('.statusMsg').html('<p class="alert alert-danger">' + response.message + '</p>');
                }
                $('#fupForm').css("opacity", "");
                $(".submitBtn").removeAttr("disabled");
            }
        });
    });


    // File type validation
    $("#file").change(function () {
        var file = this.files[0];
        var fileType = file.type;
        var match = ['application/vnd.ms-excel', 'text/csv', 'text/plain'];
        if (!((fileType == match[0]) || (fileType == match[1]) || (fileType == match[2]))) {
            alert('Sorry, only Excel, Plain Text or CSV files are allowed to upload.');
            $("#file").val('');
            return false;
        }
    });

});

function appendDataTable(params) {

    let titulos = Object.keys(params[0]);
    console.log(titulos);

    for (tittle of titulos) { 
        $("#dataTable > thead > tr").append('<td>' + tittle + '</td>');
        $("#dataTable > tfoot > tr").append('<td>' + tittle + '</td>');
     }

    let renglon = "";
    let row;
    for (row of params) {
        //console.log(row);

        $("#dataTableContent").append('<tr id="data-' + titulos[0] + '-' + row[titulos[0]] + '"></tr>');

        // Obteniendo todas las claves del JSON
        for (let key in row) {
            // Controlando que json realmente tenga esa propiedad
            if (row.hasOwnProperty(key)) {
                // Mostrando en pantalla la clave junto a su valor
                //console.log("La clave es " + clave + " y el valor es " + row[key]);
                $("#dataTableContent > tr:last-of-type").append('<td>' + row[key] + '</td>');
            }
        }

        
    }


    // eventos
    $("#dataTableContent > tr").on("click", function() {
        console.log("click: " + this.id);
    });


}