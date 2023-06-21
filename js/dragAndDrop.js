// drag and drop
const preventDefaults = event => {
    event.preventDefault();
    event.stopPropagation();
};

let FILE_UP;

$(document).ready(function () {

    FILE_UP = document.getElementById("upload-file-csv");

    const target = document.getElementById("dropFiles");
    target.addEventListener("dragenter", (event) => {
        resetStyleDropFileArea(event);
    });

    target.addEventListener("dragover", (event) => {
        resetStyleDropFileArea(event);
    });

    target.addEventListener("dragleave", (event) => {
        resetStyleDropFileArea(event);
    });

    target.addEventListener("drop", (event) => {
        // Dropping files
        resetStyleDropFileArea(event);
        // Clear previous messages
        $("#messages").empty();
        if (event.dataTransfer) {
            if (event.dataTransfer.files.length) {
                let droppedFiles = event.dataTransfer.files;
                console.log({ droppedFiles });

                if (!validateFileCSV(droppedFiles[0].type)) {
                    console.warn("El archivo no es valido");
                    return;
                } else {
                    if (typeof (table) === 'object') {
                        table.destroy();
                    }

                    FILE_UP.value = '';
                    FILE_UP = droppedFiles[0];
                    parseData(droppedFiles[0], showDataTable);
                    console.log(droppedFiles[0]);
                    //$("#messages").append("<br /> <b>Dropped File </b>" + droppedFiles[0].name);
                    //resetStyleDropFileArea(event);
                    $("#file-info-upload").removeClass("hidden");
                }


            }
        }
        return false;
    });



    $("#upload-file-csv").on('change', function (ev) {

//        let file = FILE_UP.files[0];
        FILE_UP = document.getElementById("upload-file-csv");
        FILE_UP = FILE_UP.files[0];

        if (!validateFileCSV(FILE_UP.type)) {
            // el archivo no es csv
            console.warn("El archivo no es valido");
            return;
        }else{
            if (typeof (table) === 'object') {
                table.destroy();
            }
            $("#file-info-upload").removeClass("hidden");
            parseData(FILE_UP, showDataTable);  
        }
        
        
    });

    function validateFileCSV(fileType) {

        let match = ['application/vnd.ms-excel', 'text/csv', 'text/plain'];
        if (!((fileType == match[0]) || (fileType == match[1]) || (fileType == match[2]))) {
            console.warn('Sorry, only Excel, Plain Text or CSV files are allowed to upload.');
            return false;
        }else{
            return true;
        }
        
    }

    function resetStyleDropFileArea(event) {
        preventDefaults(event);

        switch (event.type) {
            case "dragenter":
            case "dragover":
                $("#dropFiles").addClass("highlightDropArea");
                $("#dropFiles .icon-cloud").addClass("icon-cloud-hover");
                $("#dropFiles .icon-cloud :nth-child(2)").addClass("icon-cloud-child-hover");
                $("#dropFiles .icon-cloud :nth-child(2)").addClass("bounce2");
                break;
            case "dragleave":
            case "drop":
                $("#dropFiles").removeClass("highlightDropArea");
                $("#dropFiles .icon-cloud").removeClass("icon-cloud-hover");
                $("#dropFiles .icon-cloud :nth-child(2)").removeClass("icon-cloud-child-hover");
                $("#dropFiles .icon-cloud :nth-child(2)").removeClass("bounce2");
                break;
        }

    }

})