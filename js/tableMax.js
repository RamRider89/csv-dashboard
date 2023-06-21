table = $('#dataTable').DataTable({
    responsive: true,
    colReorder: true,
    rowReorder: true,
    select: {
        style: 'single'
    },
    dom: 'Qlfrtip',
    columnDefs: [
        {
            targets: -1,
            className: 'dt-body-right'
        }
    ]
});

filterByColumns();


function filterByColumns() {
    // Setup - add a text input to each footer cell
    $('#dataTable tfoot td').each(function () {
        let title = $('#dataTable thead td').eq($(this).index()).text();
        $(this).html('<input type="text" placeholder="Search ' + title + '" />');
        console.log(title);
    });

    // Apply the filter
    $("#dataTable tfoot input").on('keyup change', function () {
        table
            .column($(this).parent().index() + ':visible')
            .search(this.value)
            .draw();
    });
}
